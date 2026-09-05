import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const result = validateContact(body);

  // Honeypot rempli : on répond 200 sans rien envoyer (le bot ne doit rien apprendre)
  if (result.status === "spam") {
    return NextResponse.json({ ok: true });
  }

  if (result.status === "invalid") {
    return NextResponse.json(
      { error: "validation", fields: result.errors },
      { status: 422 }
    );
  }

  // Clés uniquement en variables d’environnement — réponse propre si absentes
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const { name, email, subject, message } = result.data;
  const resend = new Resend(apiKey);

  let error;
  try {
    ({ error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `De : ${name} <${email}>\n\n${message}`,
    }));
  } catch (thrown) {
    // Panne réseau ou clé malformée : Resend lève au lieu de renvoyer `error`.
    error = thrown;
  }

  if (error) {
    // Journalisé côté serveur uniquement (visible dans les logs Vercel) : le
    // visiteur ne doit rien apprendre de la configuration, mais sans cette
    // trace un échec d’envoi est indiagnosticable en production.
    console.error("[contact] échec de l’envoi Resend :", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
