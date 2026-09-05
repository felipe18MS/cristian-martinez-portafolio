import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Education from "./Education";

describe("Education", () => {
  test("muestra el título de educación", () => {
    // Renderizamos la sección.
    render(<Education />);

    // Comprobamos el encabezado principal.
    expect(
      screen.getByRole("heading", {
        name: /what it's built on/i,
      }),
    ).toBeInTheDocument();
  });

  test("muestra la información académica", () => {
    // Renderizamos Education.
    render(<Education />);

    // El componente obtiene la información desde EDUCATION.
    // Comprobamos que exista contenido académico.
    const timelineItems = document.querySelectorAll(".tl-item");

    expect(timelineItems.length).toBeGreaterThan(0);
  });

  test("muestra la estructura de la línea de tiempo", () => {
    // Renderizamos el componente.
    render(<Education />);

    // Cada elemento de educación debe pertenecer
    // a la línea de tiempo.
    expect(document.querySelector(".timeline")).toBeInTheDocument();

    expect(
      document.querySelectorAll(".tl-item").length,
    ).toBeGreaterThan(0);
  });
});