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
import StringTieFooter from "@/components/ui/string-tie-footer";
import {
  OneLinkIllustration,
  ScannableCardIllustration,
  OrgOnboardingIllustration,
  RolePortalsIllustration,
  AllOrgsIllustration,
  GlobalNetworkingIllustration,
} from "@/components/ui/feature-illustrations";

// Local corporate crowd sprite sheet (15 cols x 7 rows, business attire).
const CROWD_SRC = "/crowd/linq-corporate-peeps.png";

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
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=85&auto=format&fit=crop",
        alt: "Professional organization team onboarding and collaborating",
      },
      {
        url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&q=85&auto=format&fit=crop",
        alt: "Corporate leadership and organizational strategy meeting",
      },
      {
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=85&auto=format&fit=crop",
        alt: "Corporate representatives onboarding on dedicated portal",
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
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=85&auto=format&fit=crop",
        alt: "Corporate conference hall and keynote registration",
      },
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=85&auto=format&fit=crop",
        alt: "Event attendees registering and participating in keynote",
      },
      {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=700&q=85&auto=format&fit=crop",
        alt: "Digital registration and presentation space",
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
        url: "/images/linq-attendee-card-qr.jpg",
        alt: "Conference attendee pass with clearly visible scannable QR code scanned by smartphone",
      },
      {
        url: "/images/linq-digital-pass-networking.jpg",
        alt: "Corporate professionals networking and connecting via digital QR attendee pass",
      },
      {
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=700&q=85&auto=format&fit=crop",
        alt: "Business event attendees building long-term professional connections",
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
    visual: <OneLinkIllustration />,
  },
  {
    index: "002",
    tag: "ATTENDEE NETWORKING",
    title: "Scannable attendee cards",
    description: "Every attendee gets a card that is quick to scan and share.",
    visual: <ScannableCardIllustration />,
  },
  {
    index: "003",
    tag: "ORGANIZATION SETUP",
    title: "Organization onboarding",
    description: "Bring each organization on board in one step.",
    visual: <OrgOnboardingIllustration />,
  },
  {
    index: "004",
    tag: "ORGANIZATION PORTALS",
    title: "Portals for every role",
    description: "Event creators and organizations each work from their own portal.",
    visual: <RolePortalsIllustration />,
  },
  {
    index: "005",
    tag: "MANAGEMENT",
    title: "All organizations, one place",
    description: "Manage every organization on your events without switching tools.",
    visual: <AllOrgsIllustration />,
  },
  {
    index: "006",
    tag: "GLOBAL NETWORKING",
    title: "Global networking",
    description: "Connections made at your event travel well beyond the venue.",
    visual: <GlobalNetworkingIllustration />,
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
            {/* Naturally feathered radial background gradient & subtle backdrop blur behind text area for maximum legibility */}
            <div
              className="pointer-events-none absolute -inset-x-8 -inset-y-12 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.85)_40%,rgba(255,255,255,0.35)_75%,transparent_90%)] backdrop-blur-[2.5px]"
              aria-hidden="true"
            />

            {/* Supporting Tagline Badge (Item 1) */}
            <motion.div
              variants={heroItemVariants}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-violet-300 bg-white/95 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-violet-950 shadow-sm shadow-violet-200/50 backdrop-blur-md ring-1 ring-violet-200/60"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-violet-700"></span>
              </span>
              Every connection creates opportunity.
            </motion.div>

            {/* Main Headline (Item 2) */}
            <motion.h1
              variants={heroItemVariants}
              className="text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]"
            >
              <span className="block text-[#4C1D95] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                One Link.
              </span>
              <span className="block bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#3B0764] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                Every Connection.
              </span>
            </motion.h1>

            {/* Short Hero Description (Item 3) */}
            <motion.p
              variants={heroItemVariants}
              className="mt-6 max-w-xl text-lg sm:text-xl font-medium leading-relaxed text-slate-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
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
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#24212B] sm:text-4xl">
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
            <h2 className="text-3xl font-bold tracking-tight text-[#24212B] sm:text-4xl">
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
                visual={feature.visual}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. Final CTA ───────── */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[radial-gradient(ellipse_at_top,#7959BF_0%,#6447A8_50%,#4E3488_100%)] px-6 py-16 text-center text-white shadow-xl shadow-purple-950/15 ring-1 ring-white/15 sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Your event deserves one link.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base sm:text-lg text-[#EDE6FA]">
            Register your organization and start collecting connections.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-white px-8 text-base font-semibold text-[#5B3BA6] shadow-md shadow-purple-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F3EDFF] active:translate-y-0"
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

      {/* ───────── 6. Footer (Minimal String Tie Envelope Footer) ───────── */}
      <StringTieFooter
        logo={<Logo />}
        title="Linq"
        titleAccent=""
        tapes={["Every connection", "creates opportunity."]}
        noteMessage="A simpler way to bring organizations, events and people together. One link. Every connection."
        noteCta={{
          label: "Register organization",
          href: REGISTER_URL,
        }}
        columns={[
          {
            title: "Platform",
            links: [
              { label: "Overview", href: "#overview" },
              { label: "How it works", href: "#how-it-works" },
              { label: "Features", href: "#features" },
            ],
          },
          {
            title: "Organization",
            links: [
              { label: "Register organization", href: REGISTER_URL, external: true },
              { label: "Log in", href: LOGIN_URL, external: true },
              { label: "Avtive", href: AVTIVE_URL, external: true },
            ],
          },
        ]}
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
