
import { describe, expect, test,vi } from "vitest";
import * as THREE from "three";

import {
  createBracketNode,
  createRingNode,
  createDbStackNode,
  createServerNode,
  createTechNode,
  createCircuitTraces,
  createGlowSprite,
} from "./shapes";

describe("shapes", () => {
  const HEX_COLOR = 0x00ffff;

  test("crea correctamente un nodo tipo bracket", () => {
    const node = createBracketNode(HEX_COLOR);

    // La función debe devolver un Group de Three.js
    expect(node).toBeInstanceOf(THREE.Group);

    // El bracket está compuesto por dos grupos principales
    expect(node.children).toHaveLength(2);
  });

  test("crea correctamente un nodo tipo ring", () => {
    const node = createRingNode(HEX_COLOR);

    expect(node).toBeInstanceOf(THREE.Group);

    // El ring contiene el aro y el hub central
    expect(node.children).toHaveLength(2);
  });

  test("crea correctamente un nodo de base de datos", () => {
    const node = createDbStackNode(HEX_COLOR);

    expect(node).toBeInstanceOf(THREE.Group);

    // La base de datos está formada por tres discos
    expect(node.children).toHaveLength(3);
  });

  test("crea correctamente un nodo de servidor", () => {
    const node = createServerNode(HEX_COLOR);

    expect(node).toBeInstanceOf(THREE.Group);

    // Chassis + edges + 3 LEDs
    expect(node.children).toHaveLength(5);
  });

  test("crea un nodo tecnológico según el tipo solicitado", () => {
    const node = createTechNode("ring", HEX_COLOR);

    expect(node).toBeInstanceOf(THREE.Group);

    // Debe haber creado la estructura correspondiente al ring
    expect(node.children).toHaveLength(2);
  });

  test("aplica correctamente la escala al nodo tecnológico", () => {
    const node = createTechNode("server", HEX_COLOR, 2);

    expect(node.scale.x).toBe(2);
    expect(node.scale.y).toBe(2);
    expect(node.scale.z).toBe(2);
  });

  test("crea correctamente los circuit traces", () => {
    const group = createCircuitTraces(HEX_COLOR, 14, 5);

    expect(group).toBeInstanceOf(THREE.Group);

    // Cada circuito genera:
    // 1 Line + 1 via
    // Por lo tanto 5 circuitos = 10 objetos
    expect(group.children).toHaveLength(10);
  });

 test("crea correctamente el glow sprite", () => {
  // JSDOM no implementa CanvasRenderingContext2D.
  // Mockeamos únicamente las funciones que utiliza createGlowSprite.
  const gradient = {
    addColorStop: vi.fn(),
  };

  const context = {
    createRadialGradient: vi.fn(() => gradient),
    fillStyle: "",
    fillRect: vi.fn(),
  };

  // Sustituimos getContext por nuestro contexto simulado.
  const getContextSpy = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(context as unknown as CanvasRenderingContext2D);

  const sprite = createGlowSprite(HEX_COLOR);

  // La función debe devolver un Sprite de Three.js.
  expect(sprite).toBeInstanceOf(THREE.Sprite);

  // El material utilizado debe ser SpriteMaterial.
  expect(sprite.material).toBeInstanceOf(THREE.SpriteMaterial);

  // El material debe tener una textura asociada.
  expect(
    (sprite.material as THREE.SpriteMaterial).map,
  ).toBeInstanceOf(THREE.Texture);

  // Comprobamos que se creó el gradiente radial.
  expect(context.createRadialGradient).toHaveBeenCalledTimes(1);

  // Comprobamos que se configuraron los dos puntos del gradiente.
  expect(gradient.addColorStop).toHaveBeenCalledTimes(2);

  // Comprobamos que se dibujó el gradiente sobre el canvas.
  expect(context.fillRect).toHaveBeenCalledWith(
    0,
    0,
    128,
    128,
  );

  // Restauramos el comportamiento original de getContext.
  getContextSpy.mockRestore();
});
});