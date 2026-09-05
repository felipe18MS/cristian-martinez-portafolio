import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import LayerNav from './LayerNav';
import type { SectionId } from '../data/content';

describe('LayerNav', () => {
  test('muestra los botones de navegación de las capas', () => {
    // Creamos el mock de navegación.
    const onNavigate = vi.fn();

    // Renderizamos LayerNav con hero como sección activa.
    render(
      <LayerNav
        activeSection="hero"
        onNavigate={onNavigate}
      />,
    );

    // El componente genera cuatro botones,
    // uno por cada elemento de LAYERS.
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(4);
  });

  test('permite navegar a una capa', async () => {
    // userEvent permite simular la interacción real del usuario.
    const user = userEvent.setup();

    // Mock de la función recibida por props.
    const onNavigate = vi.fn();

    render(
      <LayerNav
        activeSection="hero"
        onNavigate={onNavigate}
      />,
    );

    const buttons = screen.getAllByRole('button');

    // Hacemos clic en la segunda capa.
    await user.click(buttons[1]);

    // Según LAYER_TARGET, la segunda capa navega a experience.
    expect(onNavigate).toHaveBeenCalledWith('experience');
  });

  test('marca como activa la capa correspondiente', () => {
    const onNavigate = vi.fn();

    // Usamos experience como sección activa.
    render(
      <LayerNav
        activeSection="experience"
        onNavigate={onNavigate}
      />,
    );

    const buttons = screen.getAllByRole('button');

    // La segunda capa corresponde a experience.
    expect(buttons[1]).toHaveClass('active');
  });

  test('usa la primera capa cuando la sección activa no existe', () => {
    const onNavigate = vi.fn();

    // Este es un caso defensivo.
    //
    // SectionId normalmente impide recibir valores inválidos,
    // pero queremos comprobar que el fallback ?? 0 funciona
    // correctamente en tiempo de ejecución.
    render(
      <LayerNav
        activeSection={'unknown' as SectionId}
        onNavigate={onNavigate}
      />,
    );

    const buttons = screen.getAllByRole('button');

    // SECTION_LAYER['unknown'] devuelve undefined.
    // Por lo tanto:
    //
    // undefined ?? 0
    //
    // produce 0 y activa la primera capa.
    expect(buttons[0]).toHaveClass('active');

    expect(buttons[1]).not.toHaveClass('active');
    expect(buttons[2]).not.toHaveClass('active');
    expect(buttons[3]).not.toHaveClass('active');
  });
});