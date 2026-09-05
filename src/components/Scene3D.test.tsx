import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import * as THREE from "three";

// ============================================================
// MOCKS HOISTED
// ============================================================
// Vitest mueve los vi.mock() al inicio del archivo.
// vi.hoisted() garantiza que estos mocks existan antes
// de que Vitest ejecute las fábricas de los módulos simulados.
const { mockInitScene, mockUseReducedMotion, mockUseScrollProgressRef } =
  vi.hoisted(() => ({
    mockInitScene: vi.fn(),
    mockUseReducedMotion: vi.fn(),
    mockUseScrollProgressRef: vi.fn(),
  }));

// ============================================================
// MOCK DE initScene
// ============================================================
// No queremos crear WebGL real durante las pruebas.
// Scene3D solamente necesita recibir los handles de la escena.
vi.mock("../three/scene", () => ({
  initScene: mockInitScene,
}));

// ============================================================
// MOCK DE useReducedMotion
// ============================================================
// Controlamos desde cada prueba si está activado
// prefers-reduced-motion.
vi.mock("../hooks/useReducedMotion", () => ({
  useReducedMotion: mockUseReducedMotion,
}));

// ============================================================
// MOCK DE useScrollProgressRef
// ============================================================
vi.mock("../hooks/useScrollProgressRef", () => ({
  useScrollProgressRef: mockUseScrollProgressRef,
}));

// Importamos Scene3D después de declarar los mocks.
// Vitest se encargará de resolverlo usando los módulos simulados.
import Scene3D from "./Scene3D";

describe("Scene3D", () => {
  let mockSceneHandles: {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: {
      setSize: ReturnType<typeof vi.fn>;
      render: ReturnType<typeof vi.fn>;
    };
    floaters: THREE.Object3D[];
    particles: THREE.Points;
    scanPlane: THREE.Mesh;
    topY: number;
    bottomY: number;
    dispose: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Limpiamos las llamadas anteriores de los mocks.
    vi.clearAllMocks();

    // Por defecto simulamos que el usuario NO tiene
    // activado prefers-reduced-motion.
    mockUseReducedMotion.mockReturnValue(false);

    // El scroll comienza en 0%.
    mockUseScrollProgressRef.mockReturnValue({
      current: 0,
    });

    // --------------------------------------------------------
    // Cámara simulada
    // --------------------------------------------------------
    const camera = new THREE.PerspectiveCamera();

    // Scene3D utiliza estos métodos durante la animación
    // y durante el evento resize.
    vi.spyOn(camera, "lookAt").mockImplementation(() => {});
    vi.spyOn(camera, "updateProjectionMatrix").mockImplementation(() => {});

    // --------------------------------------------------------
    // Geometría de partículas simulada
    // --------------------------------------------------------
    const particleGeometry = new THREE.BufferGeometry();

    const positions = new Float32Array([0, 0, 0, 1, 1, 1]);

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particles = new THREE.Points(particleGeometry);

    // --------------------------------------------------------
    // Objeto flotante simulado
    // --------------------------------------------------------
    const floater = new THREE.Object3D();

    floater.userData = {
      baseY: 1,
      phase: 0,
      spin: 0.2,
    };

    // --------------------------------------------------------
    // Handles simulados que normalmente devuelve initScene()
    // --------------------------------------------------------
    mockSceneHandles = {
      scene: new THREE.Scene(),

      camera,

      renderer: {
        setSize: vi.fn(),
        render: vi.fn(),
      },

      floaters: [floater],

      particles,

      scanPlane: new THREE.Mesh(),

      topY: 10,
      bottomY: -10,

      dispose: vi.fn(),
    };

    mockInitScene.mockReturnValue(mockSceneHandles);
  });

  afterEach(() => {
    // Desmontamos cualquier componente renderizado.
    cleanup();

    // Restauramos los spies creados sobre objetos de Three.js.
    vi.restoreAllMocks();
  });

  // ==========================================================
  // 1. Render básico
  // ==========================================================
  test("renderiza correctamente el contenedor de la escena", () => {
    const { container } = render(<Scene3D />);

    const sceneContainer = container.querySelector(".scene3d-mount");

    expect(sceneContainer).toBeInTheDocument();

    // La escena 3D es puramente visual y no necesita
    // ser interpretada por tecnologías asistivas.
    expect(sceneContainer).toHaveAttribute("aria-hidden", "true");
  });

  // ==========================================================
  // 2. Inicialización desktop
  // ==========================================================
  test("inicializa la escena como desktop cuando la ventana es >= 768px", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
    });

    render(<Scene3D />);

    expect(mockInitScene).toHaveBeenCalledTimes(1);

    expect(mockInitScene).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      false,
    );
  });

  // ==========================================================
  // 3. Inicialización mobile
  // ==========================================================
  test("inicializa la escena como mobile cuando la ventana es < 768px", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 390,
    });

    render(<Scene3D />);

    expect(mockInitScene).toHaveBeenCalledTimes(1);

    expect(mockInitScene).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      true,
    );
  });

  // ==========================================================
  // 4. Render del ciclo de animación
  // ==========================================================
  test("ejecuta el ciclo de animación y renderiza la escena", () => {
    const requestAnimationFrameSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 1);

    render(<Scene3D />);

    // animate() solicita el siguiente frame.
    expect(requestAnimationFrameSpy).toHaveBeenCalled();

    // El renderer recibe la escena y la cámara.
    expect(mockSceneHandles.renderer.render).toHaveBeenCalledWith(
      mockSceneHandles.scene,
      mockSceneHandles.camera,
    );
  });

  // ==========================================================
  // 5. Evento resize
  // ==========================================================
  test("actualiza la cámara y el renderer al cambiar el tamaño", () => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 1);

    const addEventListenerSpy = vi.spyOn(window, "addEventListener");

    render(<Scene3D />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    // Buscamos específicamente el callback registrado
    // para el evento resize.
    const resizeCall = addEventListenerSpy.mock.calls.find(
      ([event]) => event === "resize",
    );

    expect(resizeCall).toBeDefined();

    const resizeHandler = resizeCall?.[1] as EventListener;

    resizeHandler(new Event("resize"));

    expect(mockSceneHandles.camera.updateProjectionMatrix).toHaveBeenCalled();

    expect(mockSceneHandles.renderer.setSize).toHaveBeenCalled();
  });

  // ==========================================================
// 6. Evento mousemove
// ==========================================================
test("actualiza el parallax al mover el mouse", () => {
  let animationCallback: FrameRequestCallback | undefined;

  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    animationCallback = callback;
    return 1;
  });

  const addEventListenerSpy = vi.spyOn(window, "addEventListener");

  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: 1000,
  });

  render(<Scene3D />);

  const mouseMoveCall = addEventListenerSpy.mock.calls.find(
    ([event]) => event === "mousemove",
  );

  expect(mouseMoveCall).toBeDefined();

  const mouseMoveHandler = mouseMoveCall?.[1] as EventListener;

  mouseMoveHandler(
    new MouseEvent("mousemove", {
      clientX: 750,
    }),
  );

  expect(animationCallback).toBeDefined();

  animationCallback?.(0);

  expect(mockSceneHandles.camera.position.x).toBeGreaterThan(0);
});

  // ==========================================================
  // 7. Reduced motion
  // ==========================================================
  test("respeta prefers-reduced-motion", () => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 1);

    mockUseReducedMotion.mockReturnValue(true);

    render(<Scene3D />);

    // Incluso con reduced motion activo, la escena
    // debe inicializarse y continuar renderizando.
    expect(mockInitScene).toHaveBeenCalledTimes(1);

    expect(mockSceneHandles.renderer.render).toHaveBeenCalled();
  });

  // ==========================================================
  // 8. Cleanup de la animación
  // ==========================================================
  test("cancela la animación y libera los recursos al desmontarse", () => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 123);

    const cancelAnimationFrameSpy = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => {});

    const { unmount } = render(<Scene3D />);

    unmount();

    // Debemos cancelar el último frame solicitado.
    expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(123);

    // También debemos liberar los recursos de Three.js.
    expect(mockSceneHandles.dispose).toHaveBeenCalledTimes(1);
  });

  // ==========================================================
  // 9. Cleanup de listeners
  // ==========================================================
  test("elimina los listeners al desmontarse", () => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 1);

    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(<Scene3D />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function),
    );
  });
});
