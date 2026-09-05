import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Skills from "./Skills";

describe("Skills", () => {
  test("muestra el título de habilidades", () => {
    // Renderizamos Skills.
    render(<Skills />);

    // Verificamos el título.
    expect(
      screen.getByRole("heading", {
        name: /the stack, grouped the way i build with it/i,
      }),
    ).toBeInTheDocument();
  });

  test("muestra los grupos de habilidades", () => {
    // Renderizamos el componente.
    render(<Skills />);

    // Cada grupo se representa mediante una tarjeta.
    const cards = document.querySelectorAll(".skill-card");

    // Debe existir al menos un grupo.
    expect(cards.length).toBeGreaterThan(0);
  });

  test("muestra las etiquetas de tecnologías", () => {
    // Renderizamos Skills.
    render(<Skills />);

    // Las tecnologías se muestran mediante elementos .tag.
    const tags = document.querySelectorAll(".tag");

    // Debe haber varias tecnologías.
    expect(tags.length).toBeGreaterThan(0);
  });
});