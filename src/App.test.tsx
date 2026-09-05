import { afterEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./components/Navbar", () => ({
  default: ({ onOpenMenu }: { onOpenMenu: () => void }) => (
    <button onClick={onOpenMenu}>Open menu</button>
  ),
}));

vi.mock("./components/MobileMenu", () => ({
  default: ({
    onNavigate,
    onClose,
  }: {
    onNavigate: (id: string) => void;
    onClose: () => void;
  }) => (
    <div data-testid="mobile-menu">
      <button onClick={onClose}>Close menu</button>
      <button onClick={() => onNavigate("experience")}>Experience</button>
    </div>
  ),
}));

vi.mock("./components/Scene3D", () => ({
  default: () => <div data-testid="scene-3d" />,
}));

vi.mock("./components/LayerNav", () => ({
  default: () => <div data-testid="layer-nav" />,
}));

describe("App", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("el menú móvil está cerrado inicialmente", () => {
    render(<App />);

    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  test("muestra el menú móvil al abrirlo", async () => {
    const user = userEvent.setup();

    render(<App />);

    const openButton = screen.getByRole("button", {
      name: /open menu/i,
    });

    await user.click(openButton);

    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  test("oculta el menú móvil al cerrarlo", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: /open menu/i,
      }),
    );

    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /close menu/i,
      }),
    );

    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  test("navega a la sección experience al hacer click en el enlace del menú móvil", async () => {
    const user = userEvent.setup();

    const scrollIntoViewSpy = vi
      .spyOn(Element.prototype, "scrollIntoView")
      .mockImplementation(() => {});

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: /open menu/i,
      }),
    );

    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /experience/i,
      }),
    );

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });

    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
});
