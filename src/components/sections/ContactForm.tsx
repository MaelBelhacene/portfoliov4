"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";
type FieldKey = "name" | "email" | "subject" | "message";

/** Chaînes résolues côté serveur (Contact.tsx) — aucun runtime i18n côté client. */
export type ContactFormLabels = Record<FieldKey, string> & {
  submit: string;
  sending: string;
  success: string;
  errorValidation: string;
  errorUnconfigured: string;
  errorGeneric: string;
  fieldErrors: Record<FieldKey, string>;
};

const FIELDS: { key: Exclude<FieldKey, "message">; type: "text" | "email"; autoComplete: string }[] = [
  { key: "name", type: "text", autoComplete: "name" },
  { key: "email", type: "email", autoComplete: "email" },
  { key: "subject", type: "text", autoComplete: "off" },
];

export default function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, boolean>>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
    };

    setStatus("sending");
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        fields?: Partial<Record<FieldKey, boolean>>;
      };

      setStatus("error");
      if (res.status === 422 && body.fields) {
        setFieldErrors(body.fields);
        setErrorMsg(labels.errorValidation);
      } else if (res.status === 503) {
        setErrorMsg(labels.errorUnconfigured);
      } else {
        setErrorMsg(labels.errorGeneric);
      }
    } catch {
      setStatus("error");
      setErrorMsg(labels.errorGeneric);
    }
  }

  const inputClasses = (hasError: boolean) =>
    `mt-3 w-full border-b bg-transparent py-3 text-body text-ink outline-none transition-colors focus:border-accent motion-reduce:transition-none ${
      hasError ? "border-accent" : "border-ink"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      {/* Honeypot — invisible pour les humains, hors tabulation */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        {FIELDS.map(({ key, type, autoComplete }) => (
          <div key={key} className={key === "subject" ? "sm:col-span-2" : ""}>
            <label htmlFor={`contact-${key}`} className="label block text-ink-muted">
              {labels[key]}
            </label>
            <input
              id={`contact-${key}`}
              name={key}
              type={type}
              autoComplete={autoComplete}
              required
              aria-invalid={Boolean(fieldErrors[key])}
              aria-describedby={fieldErrors[key] ? `contact-${key}-error` : undefined}
              className={inputClasses(Boolean(fieldErrors[key]))}
            />
            {fieldErrors[key] && (
              <p id={`contact-${key}-error`} className="mt-2 text-small text-accent">
                {labels.fieldErrors[key]}
              </p>
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="label block text-ink-muted">
            {labels.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
            className={`${inputClasses(Boolean(fieldErrors.message))} resize-y`}
          />
          {fieldErrors.message && (
            <p id="contact-message-error" className="mt-2 text-small text-accent">
              {labels.fieldErrors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <button type="submit" disabled={status === "sending"} className="btn-primary">
          {status === "sending" ? labels.sending : labels.submit}
        </button>

        <p role="status" aria-live="polite" className="text-small">
          {status === "success" && (
            <span className="font-medium text-ink">{labels.success}</span>
          )}
          {status === "error" && errorMsg && <span className="text-accent">{errorMsg}</span>}
        </p>
      </div>
    </form>
  );
}
