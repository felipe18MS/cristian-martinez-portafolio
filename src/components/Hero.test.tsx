import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi, afterEach } from "vitest";
import Hero from "./Hero";

describe("Hero", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("muestra el nombre del desarrollador", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", {
      name: /cristian felipe.*martínez sánchez/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test("muestra el rol del desarrollador", () => {
    render(<Hero />);

    const role = screen.getByText(/full stack web developer/i);

    expect(role).toBeInTheDocument();
  });

  test("muestra el tagline del desarrollador", () => {
    render(<Hero />);

    const tagline = screen.getByText(
      /building layered, maintainable web systems/i,
    );

    expect(tagline).toBeInTheDocument();
  });

  test("muestra la ubicación del desarrollador", () => {
    render(<Hero />);

    const location = screen.getByText(/florencia, huila, colombia/i);

    expect(location).toBeInTheDocument();
  });

  test("muestra el correo electrónico del desarrollador", () => {
    render(<Hero />);

    const email = screen.getByRole("link", {
      name: /cristianmartinez4002@gmail.com/i,
    });

    expect(email).toBeInTheDocument();

    expect(email).toHaveAttribute(
      "href",
      "mailto:cristianmartinez4002@gmail.com",
    );
  });

  test("muestra el botón de explorar perfil", () => {
    render(<Hero />);

    const exploreButton = screen.getByRole("button", {
      name: /explore profile/i,
    });

    expect(exploreButton).toBeInTheDocument();
  });

  test("muestra el botón de descargar CV", () => {
    render(<Hero />);

    const downloadButton = screen.getByRole("link", {
      name: /cv \/ resume/i,
    });

    expect(downloadButton).toBeInTheDocument();
  });

  test("muestra la foto de perfil del desarrollador", () => {
    render(<Hero />);

    const profileImage = screen.getByAltText(
      /cristian felipe martínez sánchez/i,
    );

    expect(profileImage).toBeInTheDocument();
  });

  test("muestra el estado del desarrollador", () => {
    render(<Hero />);

    const status = screen.getByText(/sys \/\/ online/i);

    expect(status).toBeInTheDocument();
  });

  test("hace scroll hacia experience al hacer click en explorar perfil", async () => {
    const user = userEvent.setup();

    const scrollIntoViewSpy = vi.spyOn(Element.prototype, "scrollIntoView");

    render(
      <>
        <Hero />
        <section id="experience">Experience</section>
      </>,
    );

    const button = screen.getByRole("button", {
      name: /explore profile/i,
    });

    await user.click(button);

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });

  test("hace scroll hacia about al hacer click en el indicador de scroll", async () => {
    const user = userEvent.setup();

    const scrollIntoViewSpy = vi
      .spyOn(Element.prototype, "scrollIntoView")
      .mockImplementation(() => {});

    render(
      <>
        <Hero />
        <section id="about">About</section>
      </>,
    );

    const scrollButton = screen.getByRole("button", {
      name: /scroll to about section/i,
    });

    await user.click(scrollButton);

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });

  test("mockReturnValue devuelve un valor específico", () => {
    const getName = vi.fn();

    getName.mockReturnValue("Cristian");

    expect(getName()).toBe("Cristian");
  });
});
