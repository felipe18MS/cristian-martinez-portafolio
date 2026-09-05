import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Experience from "./Experience";

describe("Experience", () => {
  test("muestra el título de experiencia", () => {
    // Renderizamos la sección.
    render(<Experience />);

    // Verificamos el encabezado.
    expect(
      screen.getByRole("heading", {
        name: /where the code has shipped/i,
      }),
    ).toBeInTheDocument();
  });

  test("muestra la experiencia profesional", () => {
    // Renderizamos Experience.
    render(<Experience />);

    // La experiencia contiene un cargo y una empresa.
    expect(document.querySelector(".exp-role")).toBeInTheDocument();
    expect(
      document.querySelector(".exp-company"),
    ).toBeInTheDocument();
  });

  test("muestra la lista de responsabilidades", () => {
    // Renderizamos el componente.
    render(<Experience />);

    // Las responsabilidades se renderizan dentro de una lista.
    const items = screen.getAllByRole("listitem");

    // Debe existir al menos una responsabilidad.
    expect(items.length).toBeGreaterThan(0);
  });
});