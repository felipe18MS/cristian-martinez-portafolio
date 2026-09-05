import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import MobileMenu from "./MobileMenu";

describe("MobileMenu", () => {
  test("muestra el botón para cerrar el menú", () => {
    const onNavigate = vi.fn();
    const onClose = vi.fn();

    render(<MobileMenu onNavigate={onNavigate} onClose={onClose} />);

    expect(
      screen.getByRole("button", {
        name: /close menu/i,
      }),
    ).toBeInTheDocument();
  });

  test("permite cerrar el menú", async () => {
    const user = userEvent.setup();

    const onNavigate = vi.fn();
    const onClose = vi.fn();

    render(<MobileMenu onNavigate={onNavigate} onClose={onClose} />);

    await user.click(
      screen.getByRole("button", {
        name: /close menu/i,
      }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("permite navegar a Experience", async () => {
    const user = userEvent.setup();

    const onNavigate = vi.fn();
    const onClose = vi.fn();

    render(<MobileMenu onNavigate={onNavigate} onClose={onClose} />);

    await user.click(
      screen.getByRole("button", {
        name: /experience/i,
      }),
    );

    expect(onNavigate).toHaveBeenCalledWith("experience");
  });

  test("muestra el enlace para descargar el CV", () => {
    const onNavigate = vi.fn();
    const onClose = vi.fn();

    render(<MobileMenu onNavigate={onNavigate} onClose={onClose} />);

    const downloadLink = screen.getByRole("link", {
      name: /download résumé/i,
    });

    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute(
      "download",
      "Cristian_Martinez_CV.pdf",
    );
  });
});
