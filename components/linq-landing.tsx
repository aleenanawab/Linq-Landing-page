"use client";

import { useState } from "react";
import {
  Building2,
  CalendarPlus,
  Check,
  CheckCircle2,
  Copy,
  LayoutDashboard,
  Link2,
  Mail,
  Menu,
  QrCode,
  ScanLine,
  UserCheck,
  UserPlus,
  Users,
  X,
  ArrowRight,
  Sparkles,
  Calendar,
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

// Production sprite source (hosted or fallback)
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
    subtitle:
      "Create and share one event registration link. Attendees can access the registration flow through a single, simple link.",
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
    subtitle:
      "Every registered attendee receives a scannable digital card. Event teams can scan the QR code to verify entry and record attendance.",
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
    subtitle:
      "Dedicated portals help organizations and event creators manage their work and keep event activities organized in one place.",
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

// ── Booking & Event Process: 9-Step Complete Lifecycle (Requirement 4) ──
interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ProcessPhase {
  phaseTitle: string;
  badge: string;
  steps: ProcessStep[];
}

const eventProcessPhases: ProcessPhase[] = [
  {
    phaseTitle: "Organization Onboarding",
    badge: "Phase 1",
    steps: [
      {
        number: "01",
        title: "Create your Linq account",
        description: "Sign up with your credentials to initialize your account on the Linq platform.",
        icon: UserPlus,
      },
      {
        number: "02",
        title: "Register your organization",
        description: "Submit your organization name, profile, and branding in a single onboarding step.",
        icon: Building2,
      },
      {
        number: "03",
        title: "Access your organization portal",
        description: "Open your dedicated portal to view past events, active registrations, and team settings.",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    phaseTitle: "Event Setup & Registration",
    badge: "Phase 2",
    steps: [
      {
        number: "04",
        title: "Set up your event",
        description: "Configure your event schedule, dates, venue, attendee limits, and ticketing details.",
        icon: CalendarPlus,
      },
      {
        number: "05",
        title: "Generate and share your event registration link",
        description: "Obtain your unique, shareable Linq URL to distribute via invitations, emails, and channels.",
        icon: Link2,
      },
      {
        number: "06",
        title: "Attendees register through the link",
        description: "Guests open the link and register in seconds on any mobile device or desktop browser.",
        icon: UserCheck,
      },
    ],
  },
  {
    phaseTitle: "Check-in & Live Networking",
    badge: "Phase 3",
    steps: [
      {
        number: "07",
        title: "Attendees receive their scannable cards",
        description: "Each confirmed attendee receives a digital pass containing their unique, scannable QR card.",
        icon: QrCode,
      },
      {
        number: "08",
        title: "Scan attendee cards and record attendance",
        description: "Check in guests quickly at venue entrances by scanning their cards to record live attendance.",
        icon: ScanLine,
      },
      {
        number: "09",
        title: "Enable attendees to connect and network",
        description: "Attendees use their scannable cards to exchange contacts and build valuable relationships.",
        icon: Users,
      },
    ],
  },
];

// ── Six Animated Features (Preserved Feature Cards) ──
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

  // Functional Demo Form State
  const [demoOrg, setDemoOrg] = useState("");
  const [demoEmail, setDemoEmail] = useState("");
  const [demoSize, setDemoSize] = useState("100-500 attendees");
  const [demoCopied, setDemoCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("demo@avtive.app");
    setDemoCopied(true);
    setTimeout(() => setDemoCopied(false), 2200);
  };

  const handleMailtoDemo = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Linq Demo Request - ${demoOrg || "Organization"}`);
    const body = encodeURIComponent(
      `Hello Linq Team,\n\nI would like to request a 15-minute product walkthrough of Linq.\n\n` +
        `Organization Name: ${demoOrg || "Not provided"}\n` +
        `Work Email: ${demoEmail || "Not provided"}\n` +
        `Estimated Event Size: ${demoSize}\n\n` +
        `Please let me know the upcoming available times.\n\nThank you!`
    );
    window.location.href = `mailto:demo@avtive.app?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-violet-100 selection:text-violet-900">
      {/* ───────── 1. InGo-Inspired Header ───────── */}
      <header className="sticky top-0 z-50 w-full border-b border-violet-100/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          {/* Left: Existing Linq Logo */}
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
              href="#event-process"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50/70 hover:text-violet-700 active:text-violet-800"
            >
              Process
            </a>
            <a
              href="#features"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50/70 hover:text-violet-700 active:text-violet-800"
            >
              Features
            </a>
          </nav>

          {/* Right side: Log in & Book a Demo CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="h-10 rounded-full px-4 text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-800"
            >
              <a href={LOGIN_URL}>Log in</a>
            </Button>
            <Button
              asChild
              size="sm"
              className="h-10 rounded-full bg-[#7546C8] hover:bg-[#6439B3] px-5 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <a href="#book-a-demo">Book a Demo</a>
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
                  href="#event-process"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                >
                  Process
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
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <a href="#book-a-demo">Book a Demo</a>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="h-10 w-full rounded-xl text-sm font-medium text-violet-700 hover:bg-violet-50"
                  >
                    <a href={REGISTER_URL}>Register Organization</a>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ───────── 2. Hero Section ───────── */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_80%_100%,#ede9fe_0%,#ffffff_70%)]">
        {/* Subtle particle network animation */}
        <AetherFlowBackground className="pointer-events-none absolute inset-0 z-0" />

        {/* Crisp Human Crowd Canvas along the bottom ground (no blur, zero content overlap) */}
        <CrowdCanvas
          src={CROWD_SRC}
          className="bottom-0 top-auto h-[44%] md:h-[48%] pointer-events-none z-0"
        />

        {/* Hero Content (Positioned cleanly in upper half with crisp contrast) */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-12 sm:pt-16 lg:pt-20 pb-32 md:pb-40">
          <HeroSection4Animation className="relative max-w-3xl">
            {/* Original Exact Tagline Badge */}
            <motion.div variants={heroItemVariants} className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/95 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-violet-800 shadow-xs">
                <Sparkles className="size-3.5 text-violet-600" />
                Every connection creates opportunity.
              </span>
            </motion.div>

            {/* Main Headline (Clean typography, no clipping or cut-offs) */}
            <motion.h1
              variants={heroItemVariants}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.75rem] leading-[1.08] text-slate-900"
            >
              <span className="block text-[#4C1D95]">One Link.</span>
              <span className="block bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] bg-clip-text text-transparent pb-1">
                Every Connection.
              </span>
            </motion.h1>

            {/* Clear Human-written Description */}
            <motion.p
              variants={heroItemVariants}
              className="mt-5 max-w-xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-700"
            >
              Linq streamlines event registration and organization onboarding into a single link. Issue scannable attendee cards, verify check-ins in real time, and bring people together effortlessly.
            </motion.p>

            {/* Hero Action Buttons */}
            <motion.div
              variants={heroItemVariants}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-[#7546C8] hover:bg-[#6439B3] px-8 text-base font-semibold text-white shadow-md shadow-violet-600/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <a href="#book-a-demo">Book a Demo</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-2 border-violet-200 bg-white/95 px-8 text-base font-semibold text-violet-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50/80 active:translate-y-0"
              >
                <a href={REGISTER_URL}>Register Organization</a>
              </Button>
            </motion.div>
          </HeroSection4Animation>
        </div>
      </section>

      {/* ───────── 3. Services (Disc Reveal List) ───────── */}
      <section
        id="overview"
        className="scroll-mt-16 border-t border-violet-100/70 bg-gradient-to-b from-white via-violet-50/25 to-white px-6 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Everything Your Event Needs, Connected.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              From registration to attendee check-in, Linq simplifies the event experience for organizations, creators, and attendees.
            </p>
          </div>

          <div className="mt-14 sm:mt-16">
            <DiscRevealList items={discRevealItems} />
          </div>
        </div>
      </section>

      {/* ───────── 4. How It Works (Timeline) ───────── */}
      <section id="how-it-works" className="scroll-mt-16 bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100/80 px-3 py-1 text-xs font-semibold text-violet-700">
            <span>Three-Step Summary</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#24212B] sm:text-4xl">
            From Registration to Check-in in Three Steps.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Set up your organization, share one event link, and manage attendee check-in through scannable digital cards.
          </p>
        </div>
        <div className="mt-14 sm:mt-16">
          <HowItWorks features={steps} />
        </div>
      </section>

      {/* ───────── 5. Booking & Event Process — A to Z (Requirement 4) ───────── */}
      <section
        id="event-process"
        className="scroll-mt-16 border-t border-violet-100/70 bg-gradient-to-b from-white via-violet-50/30 to-white px-6 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100/80 px-3.5 py-1 text-xs font-semibold text-violet-700">
              <span>Complete Event Journey</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Booking & Event Process — A to Z
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              A comprehensive walkthrough of the actual Linq platform workflow, from initial account setup to live on-site attendee networking.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {eventProcessPhases.map((phase) => (
              <div key={phase.phaseTitle} className="rounded-3xl border border-violet-100/90 bg-white p-6 sm:p-8 shadow-xs">
                {/* Phase Header */}
                <div className="mb-6 flex items-center justify-between border-b border-violet-100/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                      {phase.badge}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                      {phase.phaseTitle}
                    </h3>
                  </div>
                  <span className="hidden sm:inline-block text-xs font-medium text-slate-400">
                    Linq Standard Workflow
                  </span>
                </div>

                {/* 3 Steps inside this phase */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {phase.steps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.number}
                        className="group relative flex flex-col justify-between rounded-2xl border border-violet-100/80 bg-gradient-to-b from-white to-violet-50/20 p-5 sm:p-6 transition-all duration-200 hover:border-violet-200 hover:shadow-md hover:shadow-violet-950/5"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="grid size-8 place-items-center rounded-xl bg-violet-100 font-mono text-xs font-bold text-violet-700">
                              {step.number}
                            </span>
                            <div className="grid size-9 place-items-center rounded-xl bg-violet-50 text-violet-700 transition-transform duration-200 group-hover:scale-110">
                              <Icon className="size-4.5" />
                            </div>
                          </div>
                          <h4 className="mt-4 text-base font-bold text-slate-900 tracking-tight">
                            {step.title}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA footer for the process */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-center">
            <span className="text-sm text-slate-600">Ready to run your event with Linq?</span>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-[#7546C8] hover:bg-[#6439B3] px-5 text-sm font-semibold text-white shadow-xs"
            >
              <a href={REGISTER_URL}>
                Register Your Organization
                <ArrowRight className="size-4 ml-1.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ───────── 6. Features (Six Animated Feature Cards) ───────── */}
      <section
        id="features"
        className="scroll-mt-16 bg-gradient-to-b from-white via-violet-50/40 to-white px-6 py-20 sm:py-28"
      >
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

      {/* ───────── 7. Functional Book a Demo Section (Requirement 3) ───────── */}
      <section
        id="book-a-demo"
        className="scroll-mt-16 border-t border-violet-100/70 bg-white px-6 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100/80 px-3.5 py-1 text-xs font-semibold text-violet-700">
              <span>Personalized Walkthrough</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Book a Linq Demo
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              See firsthand how Linq manages organization onboarding, event links, digital attendee cards, and attendance tracking.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: What to Expect (3 Steps Journey) */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                What to expect during your 15-minute walkthrough:
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-violet-100 bg-violet-50/40 p-4">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-600 text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      Discovery & Tailored Setup
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      We assess your event volume, organization structure, and attendee flow to tailor Linq to your specific requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-violet-100 bg-violet-50/40 p-4">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-600 text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      Live Platform Walkthrough
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      See how fast you can create an event, generate your single registration link, and scan digital attendee passes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-violet-100 bg-violet-50/40 p-4">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-600 text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      Direct Access & Staging
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Get immediate access to test your first event registration link with your team on the live platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct email quick action */}
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm text-slate-600">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-slate-800">Direct Demo Contact:</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 font-semibold text-violet-700 hover:text-violet-900 transition-colors"
                  >
                    {demoCopied ? (
                      <>
                        <Check className="size-4 text-emerald-600" />
                        <span className="text-emerald-600">Copied demo@avtive.app!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        <span>demo@avtive.app</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Functional Demo Request Card */}
            <div className="lg:col-span-6 rounded-3xl border border-violet-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-violet-950/5">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Request a Live Demo
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Send your details directly to our team. We respond with a calendar invite within 2 business hours.
              </p>

              <form onSubmit={handleMailtoDemo} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="demo-org" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Organization Name
                  </label>
                  <input
                    id="demo-org"
                    type="text"
                    required
                    placeholder="e.g. Acme Tech Summit"
                    value={demoOrg}
                    onChange={(e) => setDemoOrg(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-hidden focus:ring-2 focus:ring-violet-200"
                  />
                </div>

                <div>
                  <label htmlFor="demo-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Work Email
                  </label>
                  <input
                    id="demo-email"
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-hidden focus:ring-2 focus:ring-violet-200"
                  />
                </div>

                <div>
                  <label htmlFor="demo-size" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Estimated Event Attendees
                  </label>
                  <select
                    id="demo-size"
                    value={demoSize}
                    onChange={(e) => setDemoSize(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:outline-hidden focus:ring-2 focus:ring-violet-200 bg-white"
                  >
                    <option value="Under 100 attendees">Under 100 attendees</option>
                    <option value="100-500 attendees">100 - 500 attendees</option>
                    <option value="500-2,000 attendees">500 - 2,000 attendees</option>
                    <option value="2,000+ attendees">2,000+ attendees</option>
                  </select>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="h-11 w-full rounded-xl bg-[#7546C8] hover:bg-[#6439B3] text-sm font-semibold text-white shadow-sm shadow-violet-600/20"
                  >
                    <Mail className="size-4 mr-2" />
                    Request Demo via Email
                  </Button>
                </div>
              </form>

              <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                <span className="text-xs text-slate-500">Want to start right away?</span>
                <div className="mt-2">
                  <a
                    href={REGISTER_URL}
                    className="text-xs font-semibold text-violet-700 hover:text-violet-900 hover:underline"
                  >
                    Register your organization directly on the live platform →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 8. Footer (Minimal String Tie Envelope Footer) ───────── */}
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
              { label: "Event process", href: "#event-process" },
              { label: "Features", href: "#features" },
              { label: "Book a demo", href: "#book-a-demo" },
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