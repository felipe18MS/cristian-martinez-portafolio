import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  test("muestra el título de la sección", () => {
    // Renderizamos el componente About.
    render(<About />);

    // Comprobamos que el título principal de la sección
    // esté disponible para el usuario.
    expect(
      screen.getByRole("heading", {
        name: /a developer who thinks in layers/i,
      }),
    ).toBeInTheDocument();
  });

  test("muestra el contenido sobre el desarrollador", () => {
    // Renderizamos About.
    render(<About />);

    // Verificamos que exista el texto principal de ABOUT_TEXT.
    // Usamos getByText sobre una parte del contenido para evitar
    // acoplar demasiado el test al texto completo.
    expect(
      screen.getByText(/interface layer — about/i),
    ).toBeInTheDocument();
  });

  test("muestra los datos principales del perfil", () => {
    // Renderizamos el componente.
    render(<About />);

    // ABOUT_FACTS genera dinámicamente sus elementos.
    // Comprobamos que exista al menos un elemento de información.
    const facts = document.querySelectorAll(".about-facts > div");

    expect(facts.length).toBeGreaterThan(0);
  });
});