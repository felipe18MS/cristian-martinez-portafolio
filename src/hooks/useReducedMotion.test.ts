import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi, afterEach } from "vitest";
import { useReducedMotion } from "./useReducedMotion";

describe("useReducedMotion", () => {
  afterEach(() => {
    // Restauramos todos los mocks después de cada prueba
    vi.restoreAllMocks();
  });

  test("devuelve false cuando el usuario no tiene activado reduced motion", () => {
    // Simulamos matchMedia para indicar que reduced motion está desactivado
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);

    // Ejecutamos el hook
    const { result } = renderHook(() => useReducedMotion());

    // Esperamos que el hook indique que no se debe reducir el movimiento
    expect(result.current).toBe(false);
  });

  test("devuelve true cuando el usuario tiene activado reduced motion", () => {
    // Simulamos que el navegador tiene activada la preferencia
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  test("registra y elimina el listener de cambios", () => {
    // Creamos funciones mock para comprobar el ciclo de vida del listener
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();

    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener,
      removeEventListener,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);

    // renderHook ejecuta el useEffect del hook
    const { unmount } = renderHook(() => useReducedMotion());

    // Verificamos que se registró el listener
    expect(addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    // Desmontamos el componente para ejecutar el cleanup
    unmount();

    // Verificamos que el listener fue eliminado
    expect(removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  test("actualiza el estado cuando cambia la preferencia del navegador", () => {
    // Variable que representa la preferencia actual
    let matches = false;

    const listeners: Array<() => void> = [];

    vi.spyOn(window, "matchMedia").mockImplementation(() => {
      return {
        get matches() {
          return matches;
        },
        media: "(prefers-reduced-motion: reduce)",
        onchange: null,

        // Guardamos el listener para poder simular el cambio
        addEventListener: vi.fn((_event, callback) => {
          listeners.push(callback as () => void);
        }),

        removeEventListener: vi.fn(),

        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      } as unknown as MediaQueryList;
    });

    const { result } = renderHook(() => useReducedMotion());

    // Inicialmente reduced motion está desactivado
    expect(result.current).toBe(false);

    // Simulamos que el usuario activa reduced motion
    matches = true;

    // Ejecutamos el listener registrado por el hook
    act(() => {
      listeners.forEach((listener) => listener());
    });

    // El hook debe actualizar su estado
    expect(result.current).toBe(true);
  });
});