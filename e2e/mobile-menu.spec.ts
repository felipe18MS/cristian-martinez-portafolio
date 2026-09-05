import { test, expect } from '@playwright/test';

/**
 * Pruebas E2E del menú móvil.
 *
 * Utilizamos un viewport móvil para comprobar el comportamiento
 * de navegación específico para dispositivos pequeños.
 */
test.describe('Mobile Menu', () => {
  test.beforeEach(async ({ page }) => {
    // Simulamos una pantalla móvil.
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    // Abrimos el portafolio.
    await page.goto('/');
  });

  /**
   * Comprueba que el botón para abrir el menú
   * está disponible en una pantalla móvil.
   */
  test('muestra el botón del menú en móvil', async ({ page }) => {
    const menuButton = page.getByRole('button', {
      name: 'Open menu',
    });

    await expect(menuButton).toBeVisible();
  });

  /**
   * Comprueba que al pulsar el botón aparece
   * el menú móvil.
   */
  test('permite abrir el menú móvil', async ({ page }) => {
    const menuButton = page.getByRole('button', {
      name: 'Open menu',
    });

    await menuButton.click();

    // El menú móvil debería aparecer.
    await expect(page.locator('.mobile-menu')).toBeVisible();
  });

  /**
   * Comprueba que seleccionar una sección desde el menú
   * cierra el menú y realiza la navegación.
   */
  test('navega a una sección y cierra el menú', async ({ page }) => {
    // Abrimos el menú.
    await page.getByRole('button', {
      name: 'Open menu',
    }).click();

    // Comprobamos que está abierto.
    const mobileMenu = page.locator('.mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Seleccionamos Experience.
    await mobileMenu.getByRole('button', {
      name: 'Experience',
      exact: true,
    }).click();

    // Esperamos la animación de scroll.
    await page.waitForTimeout(800);

    // El menú debería haberse cerrado.
    await expect(mobileMenu).not.toBeVisible();

    // Experience debe existir en la página.
    await expect(page.locator('#experience')).toBeVisible();
  });
});