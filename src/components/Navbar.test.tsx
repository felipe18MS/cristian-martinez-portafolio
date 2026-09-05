import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("muestra las opciones de navegación", () => {
    // Creamos el mock de navegación.
    const onNavigate = vi.fn();

    // Creamos el mock para abrir el menú móvil.
    const onOpenMenu = vi.fn();

    // Renderizamos Navbar.
    render(
      <Navbar
        activeSection="hero"
        onNavigate={onNavigate}
        onOpenMenu={onOpenMenu}
      />,
    );

    // Verificamos algunas opciones visibles.
    expect(
      screen.getByRole("button", { name: /about/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /experience/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /skills/i }),
    ).toBeInTheDocument();
  });

  test("permite navegar a una sección", async () => {
    // Configuramos userEvent.
    const user = userEvent.setup();

    // Mock de navegación.
    const onNavigate = vi.fn();

    const onOpenMenu = vi.fn();

    // Renderizamos Navbar.
    render(
      <Navbar
        activeSection="hero"
        onNavigate={onNavigate}
        onOpenMenu={onOpenMenu}
      />,
    );

    // Buscamos el botón Experience.
    const experienceButton = screen.getByRole("button", {
      name: /experience/i,
    });

    // Simulamos el clic.
    await user.click(experienceButton);

    // Comprobamos el argumento.
    expect(onNavigate).toHaveBeenCalledWith("experience");
  });

  test("permite volver al inicio desde el logo", async () => {
    // Configuramos userEvent.
    const user = userEvent.setup();

    const onNavigate = vi.fn();
    const onOpenMenu = vi.fn();

    // Renderizamos Navbar.
    render(
      <Navbar
        activeSection="experience"
        onNavigate={onNavigate}
        onOpenMenu={onOpenMenu}
      />,
    );

    // El logo es un botón.
    const logoButton = screen.getByRole("button", {
      name: /c·m/i,
    });

    // Hacemos clic.
    await user.click(logoButton);

    // Debe navegar hacia hero.
    expect(onNavigate).toHaveBeenCalledWith("hero");
  });

  test("abre el menú móvil", async () => {
    // Configuramos userEvent.
    const user = userEvent.setup();

    const onNavigate = vi.fn();
    const onOpenMenu = vi.fn();

    // Renderizamos Navbar.
    render(
      <Navbar
        activeSection="hero"
        onNavigate={onNavigate}
        onOpenMenu={onOpenMenu}
      />,
    );

    // Buscamos el botón mediante su aria-label.
    const menuButton = screen.getByRole("button", {
      name: /open menu/i,
    });

    // Simulamos el clic.
    await user.click(menuButton);

    // Verificamos que se haya solicitado abrir el menú.
    expect(onOpenMenu).toHaveBeenCalledTimes(1);
  });

  test("marca como activa la sección actual", () => {
    // Renderizamos Navbar con experience activa.
    render(
      <Navbar
        activeSection="experience"
        onNavigate={vi.fn()}
        onOpenMenu={vi.fn()}
      />,
    );

    // Buscamos el botón Experience.
    const experienceButton = screen.getByRole("button", {
      name: /experience/i,
    });

    // Comprobamos la clase active.
    expect(experienceButton).toHaveClass("active");
  });

  test("muestra el enlace de descarga del CV", () => {
    // Renderizamos Navbar.
    render(
      <Navbar
        activeSection="hero"
        onNavigate={vi.fn()}
        onOpenMenu={vi.fn()}
      />,
    );

    // Buscamos el enlace de descarga.
    const resumeLink = screen.getByRole("link", {
      name: /resume/i,
    });

    // Verificamos que esté disponible.
    expect(resumeLink).toBeInTheDocument();

    // Verificamos que sea una descarga.
    expect(resumeLink).toHaveAttribute(
      "download",
      "Cristian_Martinez_CV.pdf",
    );
  });
});