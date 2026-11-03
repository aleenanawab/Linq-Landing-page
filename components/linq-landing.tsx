"use client";

import { useState } from "react";
import {
  Building2,
  Globe2,
  LayoutDashboard,
  Link2,
  QrCode,
  Ticket,
  Users,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CrowdCanvas from "@/components/ui/skiper39";
import { DiscRevealList, type DiscRevealItem } from "@/components/ui/disc-reveal-list";
import AetherFlowBackground from "@/components/ui/aether-flow-background";
import { motion, AnimatePresence } from "motion/react";
import { HeroSection4Animation, heroItemVariants } from "@/components/ui/hero-section-4";
import { HowItWorks, type StepItem } from "@/components/ui/how-it-works";
import { AnimatedFeatureCard } from "@/components/ui/feature-card-1";
import StringTieFooter from "@/components/ui/string-tie-footer";
import {
  OneLinkIllustration,
  ScannableCardIllustration,
  QrCheckInIllustration,
  RolePortalsIllustration,
  AllOrgsIllustration,
  GlobalNetworkingIllustration,
} from "@/components/ui/feature-illustrations";

// Self-host this sprite in /public for production (e.g. "/crowd/peeps.png").
const CROWD_SRC =
  "https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png";

const REGISTER_URL = "https://linq.avtive.app/organization/register";
const LOGIN_URL = "https://linq.avtive.app/login";
const AVTIVE_URL = "https://www.avtive.app";

// ── Linq Core Services (Disc Reveal List) ──
const discRevealItems: DiscRevealItem[] = [
  {
    id: "one-link-registration",
    number: "01",
    title: "One-Link Event Registration",
    subtitle: "Create and share one event registration link. Attendees can access the registration flow through a single, simple link.",
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
    id: "qr-attendee-cards-checkin",
    number: "02",
    title: "QR Attendee Cards & Check-in",
    subtitle: "Every registered attendee receives a scannable digital card. Event teams can scan the QR code to verify entry and record attendance.",
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
  {
    id: "organization-event-management",
    number: "03",
    title: "Organization & Event Management",
    subtitle: "Dedicated portals help organizations and event creators manage their work and keep event activities organized in one place.",
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
        alt: "Corporate representatives managing portal operations",
      },
    ],
  },
];

// ── How It Works Steps ──
const steps: StepItem[] = [
  {
    step: "01",
    tagline: "Organization Setup",
    title: "Set Up Your Organization",
    description: "Register your organization and access its dedicated Linq portal to get started.",
    icon: Building2,
  },
  {
    step: "02",
    tagline: "One Event Link",
    title: "Share One Event Link",
    description: "Create and share a single registration link so attendees can easily sign up for your event.",
    icon: Link2,
  },
  {
    step: "03",
    tagline: "Attendee Check-in",
    title: "Scan Attendee Cards",
    description: "Give attendees their QR-based cards and scan them to verify entry and record event attendance.",
    icon: QrCode,
  },
];

// ── Features ──
const features = [
  {
    index: "001",
    tag: "EVENT REGISTRATION",
    title: "One-Link Registration",
    description: "Attendees register through a single shareable event link.",
    visual: <OneLinkIllustration />,
  },
  {
    index: "002",
    tag: "ATTENDEE PASSES",
    title: "Scannable Attendee Cards",
    description: "Every attendee receives a digital card with a QR code that is quick to scan and share.",
    visual: <ScannableCardIllustration />,
  },
  {
    index: "003",
    tag: "ATTENDANCE TRACKING",
    title: "QR Check-in & Attendance",
    description: "Scan attendee QR cards to verify event entry and record attendance.",
    visual: <QrCheckInIllustration />,
  },
  {
    index: "004",
    tag: "DEDICATED PORTALS",
    title: "Portals for Every Role",
    description: "Event creators and organizations each work from their own portal.",
    visual: <RolePortalsIllustration />,
  },
  {
    index: "005",
    tag: "ORGANIZATION SUITE",
    title: "Centralized Organization Management",
    description: "Manage multiple organizations and their event activities from one place.",
    visual: <AllOrgsIllustration />,
  },
  {
    index: "006",
    tag: "EVENT NETWORKING",
    title: "Attendee Networking",
    description: "Help attendees make meaningful professional connections at your events and beyond.",
    visual: <GlobalNetworkingIllustration />,
  },
];

function Logo({
  className = "",
  imgClassName = "h-8 md:h-9 w-auto",
}: {
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/linq-logo.png"
        alt="Linq"
        className={`${imgClassName} object-contain transition-transform duration-200 hover:scale-105`}
        width={914}
        height={554}
        loading="eager"
      />
    </div>
  );
}

export default function LinqLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-violet-100 selection:text-violet-900">
      {/* ───────── Structured InGo-Inspired Header ───────── */}
      <header className="sticky top-0 z-50 w-full border-b border-violet-100/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          {/* Left: Linq Logo */}
          <a href="/" aria-label="Linq home" className="transition-opacity hover:opacity-90">
            <Logo />
          </a>

          {/* Center navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#overview"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50/70 hover:text-violet-700 active:text-violet-800"
            >
              Overview
            </a>
            <a
              href="#how-it-works"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50/70 hover:text-violet-700 active:text-violet-800"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50/70 hover:text-violet-700 active:text-violet-800"
            >
              Features
            </a>
          </nav>

          {/* Right side: Log in & Register CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="h-10 rounded-full px-5 text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-800"
            >
              <a href={LOGIN_URL}>Log in</a>
            </Button>
            <Button
              asChild
              size="sm"
              className="h-10 rounded-full bg-[#7546C8] hover:bg-[#6439B3] px-5 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <a href={REGISTER_URL}>Register Your Organization</a>
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex size-10 items-center justify-center rounded-xl text-slate-700 hover:bg-violet-50 hover:text-violet-700 focus:outline-hidden"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="border-b border-violet-100 bg-white px-6 pb-6 pt-2 md:hidden overflow-hidden shadow-lg shadow-violet-950/5"
            >
              <nav className="flex flex-col gap-1">
                <a
                  href="#overview"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                >
                  Overview
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                >
                  How It Works
                </a>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                >
                  Features
                </a>
                <div className="mt-4 flex flex-col gap-2.5 pt-4 border-t border-violet-100/80">
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 w-full rounded-xl border-violet-200 text-base font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-800"
                  >
                    <a href={LOGIN_URL}>Log in</a>
                  </Button>
                  <Button
                    asChild
                    className="h-11 w-full rounded-xl bg-[#7546C8] hover:bg-[#6439B3] text-base font-semibold text-white shadow-sm shadow-violet-600/20"
                  >
                    <a href={REGISTER_URL}>Register Your Organization</a>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ───────── 1. Hero ───────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_80%_100%,#ede9fe_0%,#ffffff_70%)]">
        {/* Subtle Aether Flow particle network animation */}
        <AetherFlowBackground className="pointer-events-none absolute inset-0 z-0" />

        {/* Existing Human Crowd Canvas in exact original position */}
        <CrowdCanvas src={CROWD_SRC} className="top-[38%] z-0" />

        {/* Hero Content (Prominent & High Contrast above the distant crowd) */}
        <div className="relative z-20 mx-auto w-full max-w-7xl flex-1 px-6 pt-10 sm:pt-16 lg:pt-20 pb-20">
          <HeroSection4Animation className="relative max-w-3xl">
            {/* Soft feathered elliptical radial gradient with 100% transparent boundaries and zero rectangular blur box */}
            <div
              className="pointer-events-none absolute -inset-x-16 -inset-y-20 -z-10 bg-[radial-gradient(ellipse_75%_65%_at_30%_40%,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.45)_50%,transparent_100%)]"
              aria-hidden="true"
            />

            {/* Supporting Tagline Badge (Item 1) */}
            <motion.div
              variants={heroItemVariants}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-violet-300 bg-white/95 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-violet-950 shadow-sm shadow-violet-200/50 ring-1 ring-violet-200/60"
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

            {/* Explanatory Hero Description (Item 3) */}
            <motion.p
              variants={heroItemVariants}
              className="mt-6 max-w-xl text-lg sm:text-xl font-medium leading-relaxed text-slate-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
            >
              Linq helps organizations and event creators manage event registration, issue scannable attendee cards, track event attendance and bring people together.
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
      <section id="overview" className="scroll-mt-16 border-t border-violet-100/70 bg-gradient-to-b from-white via-violet-50/25 to-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Everything Your Event Needs, Connected.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              From registration to attendee check-in, Linq simplifies the event experience for organizations, creators and attendees.
            </p>
          </div>

          <div className="mt-14 sm:mt-16">
            <DiscRevealList items={discRevealItems} />
          </div>
        </div>
      </section>

      {/* ───────── 3. How It Works ───────── */}
      <section id="how-it-works" className="scroll-mt-16 bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100/80 px-3 py-1 text-xs font-semibold text-violet-700">
            <span>Step-by-Step</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#24212B] sm:text-4xl">
            From Registration to Check-in in Three Steps.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Set up your organization, share one event link and manage attendee check-in through scannable digital cards.
          </p>
        </div>
        <div className="mt-14 sm:mt-16">
          <HowItWorks features={steps} />
        </div>
      </section>

      {/* ───────── 4. Features ───────── */}
      <section id="features" className="scroll-mt-16 bg-gradient-to-b from-white via-violet-50/40 to-white px-6 py-20 sm:py-28">
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
