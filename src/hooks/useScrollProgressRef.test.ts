import { renderHook, act } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { useScrollProgressRef } from "./useScrollProgressRef";

describe("useScrollProgressRef", () => {
  afterEach(() => {
    // Restauramos los mocks después de cada prueba
    vi.restoreAllMocks();
  });

  test("inicia el progreso en 0 cuando no existe scroll", () => {
    // Simulamos un documento sin contenido desplazable
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 800,
    });

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    });

    // Ejecutamos el hook
    const { result } = renderHook(() => useScrollProgressRef());

    // Si no existe scroll disponible, el progreso debe ser 0
    expect(result.current.current).toBe(0);
  });

  test("calcula correctamente el progreso del scroll", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 1800,
    });

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });

    // Tenemos 1000px disponibles para hacer scroll
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useScrollProgressRef());

    // 500 / 1000 = 0.5
    expect(result.current.current).toBe(0.5);
  });

  test("limita el progreso máximo a 1", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 1800,
    });

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });

    // Colocamos el scroll por encima del máximo permitido
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 1500,
    });

    const { result } = renderHook(() => useScrollProgressRef());

    // El hook nunca debe devolver un valor superior a 1
    expect(result.current.current).toBe(1);
  });

  test("limita el progreso mínimo a 0", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 1800,
    });

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });

    // Simulamos un valor negativo de scroll
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: -100,
    });

    const { result } = renderHook(() => useScrollProgressRef());

    // El progreso nunca debe ser inferior a 0
    expect(result.current.current).toBe(0);
  });

  test("actualiza el progreso después de un evento scroll", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 1800,
    });

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    });

    // Ejecutamos inmediatamente el callback recibido por requestAnimationFrame
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });

    const { result } = renderHook(() => useScrollProgressRef());

    expect(result.current.current).toBe(0);

    // Cambiamos la posición del scroll
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 750,
    });

    // Disparamos el evento scroll
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // 750 / 1000 = 0.75
    expect(result.current.current).toBe(0.75);
  });


test("ignora eventos scroll adicionales mientras ya hay una medición pendiente", () => {
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 1800,
  });

  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: 800,
  });

  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: 0,
  });

  const requestAnimationFrameSpy = vi
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation(() => 1);

  renderHook(() => useScrollProgressRef());

  // El measure inicial ya se ejecutó.
  requestAnimationFrameSpy.mockClear();

  act(() => {
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("scroll"));
  });

  expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
});

  test("registra y elimina los listeners de scroll y resize", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useScrollProgressRef());

    // Comprobamos que el hook registra ambos eventos
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      { passive: true },
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    // Ejecutamos el cleanup
    unmount();

    // Comprobamos que ambos listeners fueron eliminados
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });
});