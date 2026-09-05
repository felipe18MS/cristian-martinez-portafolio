import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("muestra el pie de página", () => {
    // Renderizamos Footer.
    render(<Footer />);

    // Buscamos el elemento semántico footer.
    const footer = screen.getByRole("contentinfo");

    // Verificamos que exista.
    expect(footer).toBeInTheDocument();
  });

  test("muestra la información del desarrollador", () => {
    // Renderizamos el componente.
    render(<Footer />);

    // Verificamos que aparezca el nombre.
    expect(
      screen.getByText(/Cristian Felipe Martínez Sánchez/i),
    ).toBeInTheDocument();
  });

  test("muestra la ubicación", () => {
    // Renderizamos Footer.
    render(<Footer />);

    // Comprobamos que la ubicación esté presente.
    expect(
      screen.getByText(/Florencia, Colombia/i),
    ).toBeInTheDocument();
  });
});