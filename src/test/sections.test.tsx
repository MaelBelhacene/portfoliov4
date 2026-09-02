import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import fr from "../../messages/fr.json";
import en from "../../messages/en.json";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Expertise from "@/components/sections/Expertise";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

function renderWith(locale: "fr" | "en", children: ReactNode) {
  const messages = locale === "fr" ? fr : en;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

describe("rendu des sections (fr)", () => {
  it("Hero : titre de niveau 1 avec l’accent sur « le réel » et deux appels à l’action", () => {
    renderWith("fr", <Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Aligner la sécurité sur le réel.");
    expect(h1.querySelector("em")).toHaveTextContent("le réel");
    expect(screen.getByRole("link", { name: fr.hero.ctaProjects })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: fr.hero.ctaContact })).toHaveAttribute("href", "#contact");
  });

  it("À propos : titre, exergue, portrait (ou fallback) et chiffres clés", () => {
    renderWith("fr", <About />);
    expect(screen.getByRole("heading", { level: 2, name: fr.about.title })).toBeInTheDocument();
    expect(screen.getByText(fr.about.quote)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: fr.about.portraitAlt })).toBeInTheDocument();
    expect(screen.getByText(fr.about.stats.ects.label)).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
  });

  it("Services : les 4 terrains d’intervention numérotés", () => {
    renderWith("fr", <Services />);
    expect(fr.services.items).toHaveLength(4);
    for (const item of fr.services.items) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
    expect(screen.getByText("04")).toBeInTheDocument();
  });

  it("Expertises : les 3 piliers, leurs items et l’environnement quotidien cyber d’abord", () => {
    renderWith("fr", <Expertise />);
    expect(fr.expertise.pillars).toHaveLength(3);
    for (const pillar of fr.expertise.pillars) {
      expect(screen.getByText(pillar.title)).toBeInTheDocument();
    }
    expect(screen.getAllByText("Active Directory / GPO").length).toBeGreaterThan(0);
    expect(fr.expertise.tools[0].items.map((item) => item.label)).toContain("SentinelOne");
    for (const group of fr.expertise.tools) {
      expect(screen.getByText(group.label)).toBeInTheDocument();
      for (const item of group.items) {
        // Logo ou monogramme, toujours nommé pour les lecteurs d’écran
        expect(screen.getByRole("img", { name: item.label })).toBeInTheDocument();
      }
    }
    expect(screen.getByRole("img", { name: "GitLab" }).tagName).toBe("svg");
    expect(screen.getByRole("img", { name: "SentinelOne" })).toHaveTextContent("S1");
  });

  it("Expérience : les 5 postes avec période et monogramme d’organisation", () => {
    renderWith("fr", <Experience />);
    expect(fr.experience.items).toHaveLength(5);
    expect(fr.experience.items[0].role).toBe("Ingénieur cybersécurité");
    for (const role of fr.experience.items) {
      expect(screen.getByText(role.period)).toBeInTheDocument();
      expect(screen.getByText(role.role)).toBeInTheDocument();
    }
    expect(screen.getAllByRole("img", { name: "DOMPLUS Groupe" })).toHaveLength(4);
    expect(screen.getByRole("img", { name: "PROWEBCE" })).toBeInTheDocument();
  });

  it("Formation : Master en cours, diplômes et certification ONU", () => {
    renderWith("fr", <Education />);
    expect(fr.education.items).toHaveLength(3);
    expect(fr.education.items[0].degree).toContain("Master");
    for (const item of fr.education.items) {
      expect(screen.getByText(item.degree)).toBeInTheDocument();
    }
    expect(
      screen.getByText(`${fr.education.cert.title} — ${fr.education.cert.org}`)
    ).toBeInTheDocument();
    expect(screen.getByText(fr.education.cert.id)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "United Nations" })).toBeInTheDocument();
  });

  it("Projets : 3 études de cas avec contexte, rôle et stack", () => {
    renderWith("fr", <Projects />);
    expect(fr.projects.items).toHaveLength(3);
    for (const project of fr.projects.items) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.context)).toBeInTheDocument();
      expect(screen.getByText(project.stack.join(" · "))).toBeInTheDocument();
    }
    expect(screen.getAllByText(fr.projects.contextLabel)).toHaveLength(3);
  });

  it("Contact : formulaire complet, labels visibles, honeypot et liens directs", () => {
    const { container } = renderWith("fr", <Contact />);
    expect(screen.getByLabelText(fr.contact.form.name)).toBeInTheDocument();
    expect(screen.getByLabelText(fr.contact.form.email)).toBeInTheDocument();
    expect(screen.getByLabelText(fr.contact.form.subject)).toBeInTheDocument();
    expect(screen.getByLabelText(fr.contact.form.message)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: fr.contact.form.submit })).toBeInTheDocument();
    expect(container.querySelector('input[name="company"]')).not.toBeNull();
    expect(screen.getByRole("link", { name: fr.contact.cvLabel })).toHaveAttribute("download");
  });
});

describe("rendu des sections (en)", () => {
  it("les sections rendent le contenu anglais", () => {
    renderWith("en", <Services />);
    for (const item of en.services.items) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
  });

  it("le hero anglais met l’accent sur « reality »", () => {
    renderWith("en", <Hero />);
    expect(screen.getByRole("heading", { level: 1 }).querySelector("em")).toHaveTextContent(
      "reality"
    );
  });
});
