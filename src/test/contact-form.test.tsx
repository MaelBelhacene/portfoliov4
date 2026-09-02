import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fr from "../../messages/fr.json";
import ContactForm from "@/components/sections/ContactForm";

const labels = fr.contact.form;

function renderForm() {
  return render(<ContactForm labels={labels} />);
}

function fetchResponding(status: number, body: unknown) {
  return vi.fn(async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  );
}

async function fillAndSubmit() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(labels.name), "Mael");
  await user.type(screen.getByLabelText(labels.email), "mael@example.com");
  await user.type(screen.getByLabelText(labels.subject), "Alternance");
  await user.type(screen.getByLabelText(labels.message), "Un message assez long.");
  await user.click(screen.getByRole("button", { name: labels.submit }));
}

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("annonce le succès dans la zone de statut et vide le formulaire", async () => {
    vi.stubGlobal("fetch", fetchResponding(200, { ok: true }));
    renderForm();
    await fillAndSubmit();
    expect(await screen.findByText(labels.success)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(labels.success);
    expect(screen.getByLabelText(labels.name)).toHaveValue("");
  });

  it("affiche les erreurs de champ près du champ, reliées par aria-describedby", async () => {
    vi.stubGlobal(
      "fetch",
      fetchResponding(422, { error: "validation", fields: { email: true } })
    );
    renderForm();
    await fillAndSubmit();
    const error = await screen.findByText(labels.fieldErrors.email);
    const input = screen.getByLabelText(labels.email);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", error.id);
    expect(screen.getByRole("status")).toHaveTextContent(labels.errorValidation);
  });

  it("explique proprement l’absence de configuration du service d’envoi", async () => {
    vi.stubGlobal("fetch", fetchResponding(503, { error: "unconfigured" }));
    renderForm();
    await fillAndSubmit();
    expect(await screen.findByText(labels.errorUnconfigured)).toBeInTheDocument();
  });
});
