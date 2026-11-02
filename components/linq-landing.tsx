import { Building2, Globe2, LayoutDashboard, Link2, QrCode, Ticket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import CrowdCanvas from "@/components/ui/skiper39";

// Self-host this sprite in /public for production (e.g. "/crowd/peeps.png").
const CROWD_SRC =
  "https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png";

const REGISTER_URL = "/organization/register";
const LOGIN_URL = "/login";

const steps = [
  {
    icon: Building2,
    title: "Register your organization",
    body: "Set up your organization once. Linq handles onboarding in a single step.",
  },
  {
    icon: Link2,
    title: "Share one event link",
    body: "Send attendees a single link to register for your event.",
  },
  {
    icon: QrCode,
    title: "Attendees get scannable cards",
    body: "Each attendee generates a card that others can scan to connect.",
  },
];

const features = [
  { icon: Ticket, title: "One-link registration", body: "Attendees register through a single shareable link." },
  { icon: QrCode, title: "Scannable attendee cards", body: "Every attendee gets a card that is quick to scan and share." },
  { icon: Building2, title: "Organization onboarding", body: "Bring each organization on board in one step." },
  { icon: LayoutDashboard, title: "Portals for every role", body: "Event creators and organizations each work from their own portal." },
  { icon: Users, title: "All organizations, one place", body: "Manage every organization on your events without switching tools." },
  { icon: Globe2, title: "Global networking", body: "Connections made at your event travel well beyond the venue." },
];

function Logo({ className = "" }: { className?: string }) {
  // Swap for <img src="/linq-logo.png" /> to use the production logo.
  return <span className={`text-2xl font-semibold tracking-tight text-violet-700 ${className}`}>Linq</span>;
}

export default function LinqLanding() {
  return (
    <main className="bg-white text-slate-900 antialiased">
      {/* ───────── Hero ───────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_80%_100%,#ede9fe_0%,#ffffff_70%)]">
        <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" aria-label="Linq home">
            <Logo />
          </a>
          <nav className="flex items-center gap-2 sm:gap-6">
            <a href="#how-it-works" className="hidden text-sm text-slate-600 hover:text-violet-700 sm:block">
              How it works
            </a>
            <a href="#features" className="hidden text-sm text-slate-600 hover:text-violet-700 sm:block">
              Features
            </a>
            <Button asChild variant="ghost" className="text-slate-700 hover:text-violet-700">
              <a href={LOGIN_URL}>Log in</a>
            </Button>
          </nav>
        </header>

        <CrowdCanvas src={CROWD_SRC} className="top-[38%] z-0" />

        <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-6 pt-10 sm:pt-16 lg:pt-20">
          <div className="mb-6 inline-flex items-center rounded-full border border-violet-200/80 bg-white/80 px-3.5 py-1 text-xs font-medium text-violet-700 shadow-sm backdrop-blur-sm">
            Every connection creates opportunity
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-violet-700 sm:text-6xl lg:text-7xl">
            One link.
            <br />
            Every connection.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
            Linq turns event registration and organization onboarding into a single step. Share one
            link and every attendee leaves with a scannable card.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-violet-600 px-7 text-base shadow-lg shadow-violet-600/25 hover:bg-violet-700"
            >
              <a href={REGISTER_URL}>Register your organization</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-violet-200 px-7 text-base text-violet-700 hover:bg-violet-50">
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section id="how-it-works" className="scroll-mt-8 bg-gradient-to-b from-white via-violet-50/60 to-white px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-violet-700 sm:text-4xl">
            From sign-up to scan in three steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Organizations and event creators set things up once. Attendees only need the link.
          </p>
        </div>
        <ol className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="flex flex-col items-center text-center">
              <div className="relative grid size-16 place-items-center rounded-2xl bg-white text-violet-600 shadow-[0_8px_30px_-8px_rgba(124,58,237,0.35)] ring-1 ring-violet-100">
                <Icon className="size-7" aria-hidden />
                <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────── Features ───────── */}
      <section id="features" className="scroll-mt-8 px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-violet-700 sm:text-4xl">
            Built for organizations and event creators
          </h2>
          <div className="mt-14 grid overflow-hidden rounded-3xl border border-violet-100 bg-violet-100 sm:grid-cols-2 lg:grid-cols-3 gap-px">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white p-8">
                <Icon className="size-6 text-violet-600" aria-hidden />
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[radial-gradient(ellipse_at_top,#7c3aed_0%,#5b21b6_100%)] px-6 py-16 text-center text-white sm:py-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your event deserves one link.</h2>
          <p className="mx-auto mt-4 max-w-md text-violet-100">
            Register your organization and start collecting connections.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-white px-7 text-base text-violet-700 hover:bg-violet-50">
              <a href={REGISTER_URL}>Register your organization</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full px-7 text-base text-white hover:bg-white/10 hover:text-white">
              <a href={LOGIN_URL}>Log in</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="border-t border-violet-100 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-slate-500">
              A product of{" "}
              <a href="https://www.avtive.app" className="text-violet-700 underline-offset-4 hover:underline">
                Avtive
              </a>
            </p>
          </div>
          <nav className="flex gap-8 text-sm text-slate-600">
            <a href={LOGIN_URL} className="hover:text-violet-700">Log in</a>
            <a href={REGISTER_URL} className="hover:text-violet-700">Register organization</a>
            <a href="https://www.avtive.app" className="hover:text-violet-700">Avtive</a>
          </nav>
        </div>
        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Avtive. All rights reserved.</span>
          <span>
            Crowd animation adapted from Skiper UI · illustration by{" "}
            <a href="https://www.openpeeps.com/" className="underline-offset-2 hover:underline">Open Peeps</a>
          </span>
        </div>
      </footer>
    </main>
  );
}
