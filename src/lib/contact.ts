export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactValidation =
  | { status: "ok"; data: ContactFields }
  | { status: "spam" }
  | { status: "invalid"; errors: Partial<Record<keyof ContactFields, true>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validation serveur du formulaire de contact (pure, testable). */
export function validateContact(input: unknown): ContactValidation {
  const body =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};
  const read = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  // Honeypot : un humain ne remplit jamais ce champ
  if (read("company") !== "") {
    return { status: "spam" };
  }

  const data: ContactFields = {
    name: read("name"),
    email: read("email"),
    subject: read("subject"),
    message: read("message"),
  };

  const errors: Partial<Record<keyof ContactFields, true>> = {};
  if (data.name.length < 2 || data.name.length > 100) errors.name = true;
  if (!EMAIL_RE.test(data.email) || data.email.length > 200) errors.email = true;
  if (data.subject.length < 2 || data.subject.length > 150) errors.subject = true;
  if (data.message.length < 10 || data.message.length > 5000) errors.message = true;

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors };
  }
  return { status: "ok", data };
}
