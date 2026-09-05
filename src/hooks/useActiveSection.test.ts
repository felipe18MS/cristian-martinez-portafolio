import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';

describe('useActiveSection', () => {
  // Mock del IntersectionObserver que utilizaremos
  // para controlar manualmente su comportamiento.
  let observerMock: {
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  };

  // Guardamos el callback que recibe IntersectionObserver.
  // Esto nos permite simular posteriormente una intersección.
  let intersectionCallback: IntersectionObserverCallback | undefined;

  beforeEach(() => {
    vi.clearAllMocks();

    observerMock = {
      observe: vi.fn(),
      disconnect: vi.fn(),
    };

    // Simulamos IntersectionObserver porque JSDOM
    // no implementa esta API del navegador.
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((callback: IntersectionObserverCallback) => {
        intersectionCallback = callback;

        return observerMock as unknown as IntersectionObserver;
      }),
    );
  });

  afterEach(() => {
    // Eliminamos el mock global después de cada prueba.
    vi.unstubAllGlobals();

    // Limpiamos la referencia al callback.
    intersectionCallback = undefined;

    // Limpiamos el DOM para evitar que una prueba
    // interfiera con otra.
    document.body.innerHTML = '';
  });

  // ==========================================================
  // Helper
  // ==========================================================

  /**
   * Crea una IntersectionObserverEntry válida para las pruebas.
   *
   * Solo nos interesan realmente target e isIntersecting,
   * pero completamos el resto de propiedades requeridas
   * por TypeScript.
   */
  const createIntersectionEntry = (
    target: HTMLElement,
    isIntersecting: boolean,
  ): IntersectionObserverEntry => ({
    target,
    isIntersecting,
    boundingClientRect: target.getBoundingClientRect(),
    intersectionRatio: isIntersecting ? 1 : 0,
    intersectionRect: target.getBoundingClientRect(),
    rootBounds: null,
    time: performance.now(),
  });

  // ==========================================================
  // 1. Estado inicial
  // ==========================================================

  test('usa la primera sección como sección activa inicialmente', () => {
    const ids = ['hero', 'experience', 'skills'];

    const { result } = renderHook(() => useActiveSection(ids));

    expect(result.current).toBe('hero');
  });

  // ==========================================================
  // 2. No crea observer si no existen las secciones
  // ==========================================================

  test('no crea el observer cuando ninguna sección existe', () => {
    const ids = ['hero', 'experience'];

    renderHook(() => useActiveSection(ids));

    // Como no existen elementos con esos IDs,
    // document.getElementById() devuelve null.
    expect(IntersectionObserver).not.toHaveBeenCalled();
  });

  // ==========================================================
  // 3. Observa las secciones existentes
  // ==========================================================

  test('observa todas las secciones existentes', () => {
    const hero = document.createElement('section');
    hero.id = 'hero';

    const experience = document.createElement('section');
    experience.id = 'experience';

    document.body.append(hero, experience);

    const ids = ['hero', 'experience'];

    renderHook(() => useActiveSection(ids));

    // Debe observar las dos secciones encontradas.
    expect(observerMock.observe).toHaveBeenCalledTimes(2);

    expect(observerMock.observe).toHaveBeenCalledWith(hero);
    expect(observerMock.observe).toHaveBeenCalledWith(experience);
  });

  // ==========================================================
  // 4. Actualiza la sección activa
  // ==========================================================

  test('actualiza la sección activa cuando entra en el viewport', () => {
    const hero = document.createElement('section');
    hero.id = 'hero';

    const experience = document.createElement('section');
    experience.id = 'experience';

    document.body.append(hero, experience);

    const ids = ['hero', 'experience'];

    const { result } = renderHook(() => useActiveSection(ids));

    // Estado inicial.
    expect(result.current).toBe('hero');

    // Simulamos que Experience entra
    // en la zona observada.
    act(() => {
      intersectionCallback?.(
        [
          createIntersectionEntry(experience, true),
        ],
        {} as IntersectionObserver,
      );
    });

    // React procesa el setActive realizado por el hook.
    expect(result.current).toBe('experience');
  });

  // ==========================================================
  // 5. Ignora elementos que no están intersectando
  // ==========================================================

  test('no cambia la sección activa cuando el elemento no está intersectando', () => {
    const hero = document.createElement('section');
    hero.id = 'hero';

    const experience = document.createElement('section');
    experience.id = 'experience';

    document.body.append(hero, experience);

    const ids = ['hero', 'experience'];

    const { result } = renderHook(() => useActiveSection(ids));

    expect(result.current).toBe('hero');

    // Experience NO está intersectando.
    act(() => {
      intersectionCallback?.(
        [
          createIntersectionEntry(experience, false),
        ],
        {} as IntersectionObserver,
      );
    });

    // La sección activa debe permanecer en Hero.
    expect(result.current).toBe('hero');
  });

  // ==========================================================
  // 6. Procesa varias entradas
  // ==========================================================

  test('procesa múltiples entradas del IntersectionObserver', () => {
    const hero = document.createElement('section');
    hero.id = 'hero';

    const experience = document.createElement('section');
    experience.id = 'experience';

    const skills = document.createElement('section');
    skills.id = 'skills';

    document.body.append(hero, experience, skills);

    const ids = ['hero', 'experience', 'skills'];

    const { result } = renderHook(() => useActiveSection(ids));

    act(() => {
      intersectionCallback?.(
        [
          createIntersectionEntry(experience, true),
          createIntersectionEntry(skills, true),
        ],
        {} as IntersectionObserver,
      );
    });

    // El hook procesa las entradas en orden.
    // Experience se activa primero y Skills después.
    expect(result.current).toBe('skills');
  });

  // ==========================================================
  // 7. Cleanup
  // ==========================================================

  test('desconecta el IntersectionObserver al desmontarse', () => {
    const hero = document.createElement('section');
    hero.id = 'hero';

    document.body.append(hero);

    const ids = ['hero'];

    const { unmount } = renderHook(() => useActiveSection(ids));

    unmount();

    // El cleanup del useEffect debe desconectar
    // el IntersectionObserver.
    expect(observerMock.disconnect).toHaveBeenCalledTimes(1);
  });

  // ==========================================================
  // 8. Configuración del observer
  // ==========================================================

  test('configura correctamente el IntersectionObserver', () => {
    const hero = document.createElement('section');
    hero.id = 'hero';

    document.body.append(hero);

    const ids = ['hero'];

    renderHook(() => useActiveSection(ids));

    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      },
    );
  });
});