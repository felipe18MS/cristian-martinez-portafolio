import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

describe("Contact", () => {
  test("muestra el título de contacto", () => {
    // Renderizamos la sección Contact.
    render(<Contact />);

    // Verificamos que el encabezado sea visible.
    expect(
      screen.getByRole("heading", {
        name: /let's build something layered/i,
      }),
    ).toBeInTheDocument();
  });

  test("muestra los medios de contacto", () => {
    // Renderizamos Contact.
    render(<Contact />);

    // Buscamos enlaces de correo y teléfono.
    // Al usar role="link" estamos probando la interfaz
    // desde la perspectiva del usuario.
    const links = screen.getAllByRole("link");

    // Contact contiene al menos:
    // - email
    // - teléfono
    // - descarga del CV
    expect(links.length).toBeGreaterThanOrEqual(3);
  });

  test("configura correctamente el enlace del CV", () => {
    // Renderizamos el componente.
    render(<Contact />);

    // Localizamos el enlace mediante su nombre accesible.
    const downloadLink = screen.getByRole("link", {
      name: /download résumé \(pdf\)/i,
    });

    // Verificamos que sea un enlace de descarga.
    expect(downloadLink).toHaveAttribute(
      "download",
      "Cristian_Martinez_CV.pdf",
    );
  });
});