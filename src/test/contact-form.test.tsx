import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import fr from "../../messages/fr.json";
import ContactForm from "@/components/sections/ContactForm";

function renderForm() {
  return render(
    <NextIntlClientProvider locale="fr" messages={fr}>
      <ContactForm />
    </NextIntlClientProvider>
  );
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
  await user.type(screen.getByLabelText(fr.contact.form.name), "Mael");
  await user.type(screen.getByLabelText(fr.contact.form.email), "mael@example.com");
  await user.type(screen.getByLabelText(fr.contact.form.subject), "Alternance");
  await user.type(screen.getByLabelText(fr.contact.form.message), "Un message assez long.");
  await user.click(screen.getByRole("button", { name: fr.contact.form.submit }));
}

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("annonce le succès dans la zone de statut et vide le formulaire", async () => {
    vi.stubGlobal("fetch", fetchResponding(200, { ok: true }));
    renderForm();
    await fillAndSubmit();
    expect(await screen.findByText(fr.contact.form.success)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(fr.contact.form.success);
    expect(screen.getByLabelText(fr.contact.form.name)).toHaveValue("");
  });

  it("affiche les erreurs de champ près du champ, reliées par aria-describedby", async () => {
    vi.stubGlobal(
      "fetch",
      fetchResponding(422, { error: "validation", fields: { email: true } })
    );
    renderForm();
    await fillAndSubmit();
    const error = await screen.findByText(fr.contact.form.fieldErrors.email);
    const input = screen.getByLabelText(fr.contact.form.email);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", error.id);
    expect(screen.getByRole("status")).toHaveTextContent(fr.contact.form.errorValidation);
  });

  it("explique proprement l’absence de configuration du service d’envoi", async () => {
    vi.stubGlobal("fetch", fetchResponding(503, { error: "unconfigured" }));
    renderForm();
    await fillAndSubmit();
    expect(await screen.findByText(fr.contact.form.errorUnconfigured)).toBeInTheDocument();
  });
});
