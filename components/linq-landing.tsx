"use client";

import {
  Building2,
  Globe2,
  LayoutDashboard,
  Link2,
  QrCode,
  Ticket,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CrowdCanvas from "@/components/ui/skiper39";
import { DiscRevealList, type DiscRevealItem } from "@/components/ui/disc-reveal-list";
import AetherFlowBackground from "@/components/ui/aether-flow-background";
import { motion } from "motion/react";
import { HeroSection4Animation, heroItemVariants } from "@/components/ui/hero-section-4";
import { HowItWorks, type StepItem } from "@/components/ui/how-it-works";
import { AnimatedFeatureCard } from "@/components/ui/feature-card-1";
import { DoodleCrewFooter } from "@/components/ui/doodle-crew-footer";

// Self-host this sprite in /public for production (e.g. "/crowd/peeps.png").
const CROWD_SRC =
  "https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png";

const REGISTER_URL = "https://linq.avtive.app/organization/register";
const LOGIN_URL = "https://linq.avtive.app/login";
const AVTIVE_URL = "https://www.avtive.app";

// ── Linq Core Services (Disc Reveal List) ──
const discRevealItems: DiscRevealItem[] = [
  {
    id: "organization-onboarding",
    number: "01",
    title: "Organization Onboarding",
    subtitle: "Register once and manage your organization through a dedicated portal.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format&fit=crop",
        alt: "Professional team working together",
      },
      {
        url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80&auto=format&fit=crop",
        alt: "Collaborative organization meeting",
      },
      {
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80&auto=format&fit=crop",
        alt: "Team strategy and onboarding session",
      },
    ],
  },
  {
    id: "one-link-registration",
    number: "02",
    title: "One-Link Registration",
    subtitle: "Share one event link and let attendees register through a simple flow.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80&auto=format&fit=crop",
        alt: "Conference stage and keynote event",
      },
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop",
        alt: "Audience participating in professional event",
      },
      {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80&auto=format&fit=crop",
        alt: "Event registration and presentation space",
      },
    ],
  },
  {
    id: "attendee-networking",
    number: "03",
    title: "Attendee Networking",
    subtitle: "Every attendee receives a scannable card to make connecting with others easier.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80&auto=format&fit=crop",
        alt: "Conference attendees connecting and sharing ideas",
      },
      {
        url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80&auto=format&fit=crop",
        alt: "People networking and engaging at an event",
      },
      {
        url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop",
        alt: "Professional connecting with peers",
      },
    ],
  },
];

// ── How It Works Steps ──
const steps: StepItem[] = [
  {
    step: "01",
    tagline: "Organization Onboarding",
    title: "Register your organization",
    description: "Set up your organization once. Linq handles onboarding in a single step.",
    icon: Building2,
  },
  {
    step: "02",
    tagline: "One-Link Event Registration",
    title: "Share one event link",
    description: "Send attendees a single link to register for your event.",
    icon: Link2,
  },
  {
    step: "03",
    tagline: "Attendee Networking",
    title: "Attendees get scannable cards",
    description: "Each attendee generates a card that others can scan to connect.",
    icon: QrCode,
  },
];

// ── Features ──
const features = [
  {
    index: "001",
    tag: "EVENT REGISTRATION",
    title: "One-link registration",
    description: "Attendees register through a single shareable link.",
    imageSrc:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop",
    imageAlt: "Event and digital registration environment",
  },
  {
    index: "002",
    tag: "ATTENDEE NETWORKING",
    title: "Scannable attendee cards",
    description: "Every attendee gets a card that is quick to scan and share.",
    imageSrc:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80&auto=format&fit=crop",
    imageAlt: "Digital attendee pass and card on mobile device",
  },
  {
    index: "003",
    tag: "ORGANIZATION SETUP",
    title: "Organization onboarding",
    description: "Bring each organization on board in one step.",
    imageSrc:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format&fit=crop",
    imageAlt: "Professional team onboarding and collaborating",
  },
  {
    index: "004",
    tag: "ORGANIZATION PORTALS",
    title: "Portals for every role",
    description: "Event creators and organizations each work from their own portal.",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop",
    imageAlt: "Organization management portal workspace",
  },
  {
    index: "005",
    tag: "MANAGEMENT",
    title: "All organizations, one place",
    description: "Manage every organization on your events without switching tools.",
    imageSrc:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80&auto=format&fit=crop",
    imageAlt: "Centralized organization management meeting",
  },
  {
    index: "006",
    tag: "GLOBAL NETWORKING",
    title: "Global networking",
    description: "Connections made at your event travel well beyond the venue.",
    imageSrc:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80&auto=format&fit=crop",
    imageAlt: "Professionals networking and connecting at event",
  },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-violet-600 font-extrabold text-white shadow-md shadow-violet-600/30">
        L
      </span>
      <span className="text-2xl font-bold tracking-tight text-slate-900">
        Linq
      </span>
    </div>
  );
}

export default function LinqLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-violet-100 selection:text-violet-900">
      {/* ───────── 1. Hero ───────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_80%_100%,#ede9fe_0%,#ffffff_70%)]">
        {/* Minimal Header */}
        <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" aria-label="Linq home" className="transition-opacity hover:opacity-90">
            <Logo />
          </a>
          <nav className="flex items-center gap-2 sm:gap-6">
            <a href="#overview" className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-violet-700 sm:block">
              Overview
            </a>
            <a href="#how-it-works" className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-violet-700 sm:block">
              How it works
            </a>
            <a href="#features" className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-violet-700 sm:block">
              Features
            </a>
            <Button
              asChild
              variant="ghost"
              className="text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-700"
            >
              <a href={LOGIN_URL}>Log in</a>
            </Button>
          </nav>
        </header>

        {/* Subtle Aether Flow particle network animation */}
        <AetherFlowBackground className="pointer-events-none absolute inset-0 z-0" />

        {/* Existing Human Crowd Canvas in exact original position */}
        <CrowdCanvas src={CROWD_SRC} className="top-[38%] z-0" />

        {/* Hero Content (Prominent & High Contrast above the distant crowd) */}
        <div className="relative z-20 mx-auto w-full max-w-7xl flex-1 px-6 pt-10 sm:pt-16 lg:pt-20 pb-20">
          <HeroSection4Animation className="relative max-w-3xl">
            {/* Subtle soft white-to-transparent gradient behind text area to ensure 100% crisp readability */}
            <div
              className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.45)_50%,transparent_80%)]"
              aria-hidden="true"
            />

            {/* Supporting Tagline Badge (Item 1) */}
            <motion.div
              variants={heroItemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-white/95 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-violet-700 shadow-sm shadow-violet-100 backdrop-blur-md"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-violet-600"></span>
              </span>
              Every connection creates opportunity.
            </motion.div>

            {/* Main Headline (Item 2) */}
            <motion.h1
              variants={heroItemVariants}
              className="text-5xl font-black leading-[1.04] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-[5.25rem]"
            >
              <span className="block text-violet-700 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
                One Link.
              </span>
              <span className="block bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
                Every Connection.
              </span>
            </motion.h1>

            {/* Short Hero Description (Item 3) */}
            <motion.p
              variants={heroItemVariants}
              className="mt-6 max-w-xl text-lg sm:text-xl font-normal leading-relaxed text-slate-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
            >
              Simplify event registration, connect attendees, and manage your organization with Linq.
            </motion.p>

            {/* Hero Action Buttons (Item 4) */}
            <motion.div
              variants={heroItemVariants}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/40 hover:from-violet-700 hover:to-purple-700 active:translate-y-0"
              >
                <a href={REGISTER_URL}>Register Your Organization</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-2 border-violet-200 bg-white/95 px-8 text-base font-semibold text-violet-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50/90 hover:text-violet-800 active:translate-y-0"
              >
                <a href="#overview">Explore Linq</a>
              </Button>
            </motion.div>
          </HeroSection4Animation>
        </div>
      </section>

      {/* ───────── 2. Services (Disc Reveal List) ───────── */}
      <section id="overview" className="scroll-mt-12 border-t border-violet-100/70 bg-gradient-to-b from-white via-violet-50/25 to-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              What Linq brings together.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              From organization onboarding to attendee networking, Linq brings the entire event registration experience into one place.
            </p>
          </div>

          <div className="mt-14 sm:mt-16">
            <DiscRevealList items={discRevealItems} />
          </div>
        </div>
      </section>

      {/* ───────── 3. How It Works ───────── */}
      <section id="how-it-works" className="scroll-mt-12 bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100/80 px-3 py-1 text-xs font-semibold text-violet-700">
            <span>Step-by-Step</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-violet-700 sm:text-4xl">
            From sign-up to scan in three steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Organizations and event creators set things up once. Attendees only need the link.
          </p>
        </div>
        <div className="mt-14 sm:mt-16">
          <HowItWorks features={steps} />
        </div>
      </section>

      {/* ───────── 4. Features ───────── */}
      <section id="features" className="scroll-mt-12 bg-gradient-to-b from-white via-violet-50/40 to-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-violet-700 sm:text-4xl">
              Built for organizations and event creators
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-600">
              Purpose-built tools to streamline your registration process and maximize networking outcomes.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => (
              <AnimatedFeatureCard
                key={feature.title}
                index={feature.index}
                tag={feature.tag}
                title={feature.title}
                description={feature.description}
                imageSrc={feature.imageSrc}
                imageAlt={feature.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. Final CTA ───────── */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[radial-gradient(ellipse_at_top,#7c3aed_0%,#5b21b6_100%)] px-6 py-16 text-center text-white shadow-2xl shadow-violet-900/20 sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Your event deserves one link.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base sm:text-lg text-violet-100">
            Register your organization and start collecting connections.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-white px-8 text-base font-semibold text-violet-700 shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 active:translate-y-0"
            >
              <a href={REGISTER_URL}>
                <span>Register Your Organization</span>
                <ArrowRight className="ml-1.5 size-4" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 rounded-full px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <a href={LOGIN_URL}>Log in</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ───────── 6. Footer (Doodle Crew Footer) ───────── */}
      <DoodleCrewFooter
        logo={<Logo />}
        brandDescription="A product of Avtive. Bringing organizations, events and people together through one simple link."
        columns={[
          {
            title: "Explore",
            links: [
              { label: "Overview", href: "#overview" },
              { label: "How it works", href: "#how-it-works" },
              { label: "Features", href: "#features" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Avtive", href: AVTIVE_URL, external: true },
            ],
          },
        ]}
        primaryCta={{
          label: "Register your organization",
          href: REGISTER_URL,
        }}
        secondaryCta={{
          label: "Log in",
          href: LOGIN_URL,
        }}
        socialLinks={{
          linkedin: "https://www.linkedin.com/company/linqavtive/posts/?viewAsMember=true",
          instagram: "https://www.instagram.com/linq.me/?utm_source=ig_web_button_share_sheet",
        }}
        copyright={`© ${new Date().getFullYear()} Avtive. All rights reserved.`}
        attribution={
          <span>
            Crowd animation adapted from Skiper UI · illustration by{" "}
            <a
              href="https://www.openpeeps.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-[#7546C8] hover:underline"
            >
              Open Peeps
            </a>
          </span>
        }
      />
    </main>
  );
}
