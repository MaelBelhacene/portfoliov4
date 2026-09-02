import { describe, expect, it } from "vitest";
import { validateContact } from "./contact";

const valid = {
  name: "Mael Belhacene",
  email: "test@example.com",
  subject: "Alternance",
  message: "Bonjour, je souhaite échanger au sujet de la gouvernance.",
  company: "",
};

describe("validateContact", () => {
  it("accepte une soumission valide et retourne les données nettoyées", () => {
    const result = validateContact({ ...valid, name: "  Mael Belhacene  " });
    expect(result.status).toBe("ok");
    if (result.status === "ok") {
      expect(result.data.name).toBe("Mael Belhacene");
    }
  });

  it("détecte le honeypot rempli comme spam", () => {
    const result = validateContact({ ...valid, company: "ACME Corp" });
    expect(result.status).toBe("spam");
  });

  it("rejette un email invalide", () => {
    const result = validateContact({ ...valid, email: "pas-un-email" });
    expect(result.status).toBe("invalid");
    if (result.status === "invalid") {
      expect(result.errors.email).toBe(true);
      expect(result.errors.name).toBeUndefined();
    }
  });

  it("rejette les champs manquants ou trop courts", () => {
    const result = validateContact({ email: "test@example.com" });
    expect(result.status).toBe("invalid");
    if (result.status === "invalid") {
      expect(result.errors.name).toBe(true);
      expect(result.errors.subject).toBe(true);
      expect(result.errors.message).toBe(true);
    }
  });

  it("rejette un message trop long", () => {
    const result = validateContact({ ...valid, message: "a".repeat(5001) });
    expect(result.status).toBe("invalid");
  });

  it("tolère une entrée non-objet sans lever d’exception", () => {
    expect(validateContact(null).status).toBe("invalid");
    expect(validateContact("texte").status).toBe("invalid");
  });
});
