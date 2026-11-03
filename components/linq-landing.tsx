import {
  Building2,
  Globe2,
  LayoutDashboard,
  Link2,
  QrCode,
  Ticket,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CrowdCanvas from "@/components/ui/skiper39";

// Self-host this sprite in /public for production (e.g. "/crowd/peeps.png").
const CROWD_SRC =
  "https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png";

const REGISTER_URL = "https://linq.avtive.app/organization/register";
const LOGIN_URL = "https://linq.avtive.app/login";
const AVTIVE_URL = "https://www.avtive.app";
const LINKEDIN_URL = "https://www.linkedin.com/company/linqavtive/posts/?viewAsMember=true";
const INSTAGRAM_URL = "https://www.instagram.com/linq.me/?utm_source=ig_web_button_share_sheet";

// ── How It Works ──
const steps = [
  {
    step: "01",
    title: "Register your organization",
    body: "Set up your organization once. Linq handles onboarding in a single step.",
  },
  {
    step: "02",
    title: "Share one event link",
    body: "Send attendees a single link to register for your event.",
  },
  {
    step: "03",
    title: "Attendees receive scannable cards",
    body: "Each attendee generates a card that others can scan to connect.",
  },
];

// ── Essential Features ──
const features = [
  {
    icon: Ticket,
    title: "One-link registration",
    body: "Attendees register through a single shareable link.",
  },
  {
    icon: QrCode,
    title: "Scannable attendee cards",
    body: "Every attendee gets a card that is quick to scan and share.",
  },
  {
    icon: Building2,
    title: "Organization onboarding",
    body: "Bring each organization on board in one simple step.",
  },
  {
    icon: LayoutDashboard,
    title: "Portals for every role",
    body: "Event creators and organizations each work from their own portal.",
  },
  {
    icon: Users,
    title: "All organizations, one place",
    body: "Manage every organization on your events without switching tools.",
  },
  {
    icon: Globe2,
    title: "Global networking",
    body: "Connections made at your event travel well beyond the venue.",
  },
];

// ── Minimal Brand Logo ──
function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`text-xl font-semibold tracking-tight text-slate-900 transition-colors hover:text-violet-700 ${className}`}>
      Linq
    </span>
  );
}

// ── Social Icons (Clean, lightweight SVGs) ──
function LinkedInIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.62.73-1.62 1.63 0 .9.72 1.63 1.62 1.63s1.63-.73 1.63-1.63c0-.9-.73-1.63-1.63-1.63Z" />
    </svg>
  );
}

function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function LinqLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-violet-100 selection:text-violet-900">
      {/* ───────── 1. Hero ───────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,243,255,0.75)_0%,#ffffff_70%)]">
        {/* Navigation */}
        <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <a href="/" aria-label="Linq home">
            <Logo />
          </a>
          <nav className="flex items-center gap-6 sm:gap-8">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Features
            </a>
            <a
              href={LOGIN_URL}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Log in
            </a>
          </nav>
        </header>

        {/* Calm Crowd Animation in original position */}
        <CrowdCanvas src={CROWD_SRC} className="top-[38%] z-0" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-12 pb-32 sm:pt-16 sm:pb-40">
          <div className="max-w-2xl">
            {/* Tagline */}
            <p className="text-sm font-medium text-violet-700 sm:text-base">
              Every connection creates opportunity.
            </p>

            {/* Headline */}
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
              One Link. Every Connection.
            </h1>

            {/* Supporting Line */}
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl">
              Bring organizations, events and people together through one simple link.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-violet-600 px-6 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-violet-700 active:scale-[0.98]"
              >
                <a href={REGISTER_URL}>Register your organization</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-full border border-slate-200 bg-white/70 px-6 text-sm font-medium text-slate-700 backdrop-blur-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
              >
                <a href="#how-it-works">How it works</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 2. How It Works ───────── */}
      <section id="how-it-works" className="scroll-mt-12 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              How it works
            </h2>
            <p className="mt-2 text-base text-slate-600">
              From sign-up to scan in three simple steps.
            </p>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8 lg:gap-12">
            {steps.map(({ step, title, body }) => (
              <div key={title} className="flex flex-col">
                <span className="font-mono text-xs font-semibold tracking-widest text-violet-600 uppercase">
                  {step}
                </span>
                <h3 className="mt-3 text-lg font-medium text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. Features ───────── */}
      <section id="features" className="scroll-mt-12 border-t border-slate-100 bg-slate-50/50 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Built for modern events
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Everything organizations and event creators need to connect effortlessly.
            </p>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-12 sm:gap-y-12">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex flex-col">
                <div className="flex size-8 items-center justify-center rounded-lg bg-violet-100/70 text-violet-700">
                  <Icon className="size-4" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="mt-4 text-base font-medium text-slate-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. Final CTA ───────── */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl rounded-3xl border border-violet-100/70 bg-gradient-to-b from-violet-50/60 via-violet-50/20 to-white px-8 py-16 text-center sm:py-20 sm:px-12">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Your event deserves one link.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-slate-600">
            Register your organization and start creating meaningful connections today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-violet-600 px-6 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-violet-700 active:scale-[0.98]"
            >
              <a href={REGISTER_URL}>Register your organization</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-full border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
            >
              <a href={LOGIN_URL}>Log in</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ───────── 5. Footer ───────── */}
      <footer className="border-t border-slate-100 bg-white px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-slate-500">
              A product of{" "}
              <a
                href={AVTIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-700 underline-offset-4 hover:underline"
              >
                Avtive
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:items-end">
            <nav className="flex flex-wrap gap-6 text-sm text-slate-600 sm:gap-8">
              <a
                href={LOGIN_URL}
                className="transition-colors hover:text-slate-900"
              >
                Log in
              </a>
              <a
                href={REGISTER_URL}
                className="transition-colors hover:text-slate-900"
              >
                Register Organization
              </a>
              <a
                href={AVTIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-slate-900"
              >
                Avtive
              </a>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4 text-slate-500">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-slate-900"
              >
                <LinkedInIcon className="size-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-slate-900"
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Avtive. All rights reserved.</span>
          <span>
            Crowd animation adapted from Skiper UI · illustration by{" "}
            <a
              href="https://www.openpeeps.com/"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 hover:underline"
            >
              Open Peeps
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
