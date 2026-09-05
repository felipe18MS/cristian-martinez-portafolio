import { test, expect } from '@playwright/test';

/**
 * Pruebas E2E del portafolio.
 *
 * Estas pruebas verifican el comportamiento de la aplicación
 * desde el punto de vista de un usuario real.
 */
test.describe('Portfolio', () => {
  /**
   * Comprueba que la página principal carga correctamente
   * y muestra la información principal del Hero.
   */
  test('carga correctamente la página principal', async ({ page }) => {
    await page.goto('/');

    // Verificamos que el nombre principal sea visible.
    await expect(
      page.getByRole('heading', { name: /Cristian Felipe/i })
    ).toBeVisible();

    // Buscamos el texto específicamente dentro del Hero.
    // Esto evita conflictos con el mismo texto existente en Experience.
    await expect(
      page.locator('#hero').getByText('Full Stack Web Developer', {
        exact: true,
      })
    ).toBeVisible();

    // Verificamos que el botón principal del Hero exista.
    await expect(
      page.getByRole('button', { name: /Explore profile/i })
    ).toBeVisible();
  });

  /**
   * Comprueba que las principales secciones del portafolio
   * están presentes en la página.
   */
  test('muestra todas las secciones principales', async ({ page }) => {
    await page.goto('/');

    // IDs de las secciones principales de App.tsx.
    const sections = [
      'hero',
      'about',
      'experience',
      'skills',
      'education',
      'contact',
    ];

    // Comprobamos que cada sección exista en el DOM.
    for (const sectionId of sections) {
      await expect(page.locator(`#${sectionId}`)).toBeAttached();
    }
  });

  /**
   * Comprueba la navegación desde el botón principal
   * del Hero hasta la sección Experience.
   */
  test('permite navegar desde Hero hasta Experience', async ({ page }) => {
    await page.goto('/');

    // Localizamos el botón principal del Hero.
    const exploreButton = page.getByRole('button', {
      name: /Explore profile/i,
    });

    await expect(exploreButton).toBeVisible();

    // Hacemos clic para navegar hacia Experience.
    await exploreButton.click();

    // Esperamos la animación de desplazamiento.
    await page.waitForTimeout(800);

    // Comprobamos que Experience exista y sea visible.
    await expect(page.locator('#experience')).toBeVisible();

    // Comprobamos que la página se haya desplazado.
    const scrollPosition = await page.evaluate(() => window.scrollY);

    expect(scrollPosition).toBeGreaterThan(0);
  });

  /**
   * Comprueba que el Navbar contiene las principales
   * opciones de navegación.
   */
  test('muestra las opciones principales del Navbar', async ({ page }) => {
    await page.goto('/');

    const navigationItems = [
      'About',
      'Experience',
      'Skills',
      'Education',
      'Contact',
    ];

    // Comprobamos cada opción del Navbar.
    for (const item of navigationItems) {
      await expect(
        page.getByRole('button', { name: item, exact: true })
      ).toBeVisible();
    }
  });

  /**
   * Comprueba que el logotipo permite volver al inicio.
   */
  test('permite volver al inicio mediante el logotipo', async ({ page }) => {
    await page.goto('/');

    // Nos desplazamos hasta Experience.
    await page.locator('#experience').scrollIntoViewIfNeeded();

    // Localizamos el botón del logotipo.
    const logoButton = page.locator('.navbar-mark');

    await expect(logoButton).toBeVisible();

    // Volvemos al inicio.
    await logoButton.click();

    // Esperamos la animación de scroll.
    await page.waitForTimeout(800);

    // Comprobamos que estamos cerca de la parte superior.
    const scrollPosition = await page.evaluate(() => window.scrollY);

    expect(scrollPosition).toBeLessThan(100);
  });

  /**
   * Comprueba que existe un enlace para descargar el CV.
   */
  test('muestra el enlace de descarga del CV', async ({ page }) => {
    await page.goto('/');

    // Buscamos enlaces que tengan el atributo download esperado.
    const resumeLinks = page.locator(
      'a[download="Cristian_Martinez_CV.pdf"]'
    );

    // No imponemos una cantidad exacta.
    // Solo verificamos que exista al menos uno.
    await expect(resumeLinks.first()).toBeVisible();
  });
});