"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface DoodleCrewFooterProps {
  wordmark?: string;
  tagline?: string;
  brandDescription?: string;
  logo?: React.ReactNode;
  columns?: FooterColumn[];
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
  };
  copyright?: string;
  attribution?: React.ReactNode;
  className?: string;
}

interface PupilOffset {
  x: number;
  y: number;
}

const defaultColumns: FooterColumn[] = [
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
      { label: "Avtive", href: "https://www.avtive.app", external: true },
    ],
  },
];

export function DoodleCrewFooter({
  wordmark = "LINQ",
  tagline = "Every connection creates opportunity.",
  brandDescription = "A product of Avtive. Bringing organizations, events and people together through one simple link.",
  logo,
  columns = defaultColumns,
  primaryCta = {
    label: "Register your organization",
    href: "https://linq.avtive.app/organization/register",
  },
  secondaryCta = {
    label: "Log in",
    href: "https://linq.avtive.app/login",
  },
  socialLinks = {
    linkedin: "https://www.linkedin.com/company/linqavtive/posts/?viewAsMember=true",
    instagram: "https://www.instagram.com/linq.me/?utm_source=ig_web_button_share_sheet",
  },
  copyright = `© ${new Date().getFullYear()} Avtive. All rights reserved.`,
  attribution,
  className,
}: DoodleCrewFooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupils, setPupils] = useState<PupilOffset[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState<{
    index: number;
    text: string;
  } | null>(null);

  // Character speech lines (Linq brand-relevant)
  const characterMessages = [
    "Let's connect!",
    "Good to meet you!",
    "One link. More connections.",
  ];

  // Eye tracking based on cursor relative to container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Center coordinates for character eyes in SVG viewBox (0 0 900 240)
    const eyeCenters = [
      { x: 155, y: 110 }, // Leaning on 'L'
      { x: 508, y: 50 },  // Sitting on 'N'
      { x: 745, y: 130 }, // Peeking behind 'Q'
    ];

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Project mouse into SVG viewBox coordinates (900 x 240)
      const svgX = (mouseX / rect.width) * 900;
      const svgY = (mouseY / rect.height) * 240;

      const newPupils = eyeCenters.map((center) => {
        const dx = svgX - center.x;
        const dy = svgY - center.y;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(3.2, Math.hypot(dx, dy) * 0.035);
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
        };
      });

      setPupils(newPupils);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Natural blinking interval every 3.8s
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 170);
    }, 3800);
    return () => clearInterval(blinkTimer);
  }, []);

  // Auto-dismiss speech bubble
  useEffect(() => {
    if (!activeSpeech) return;
    const timer = setTimeout(() => {
      setActiveSpeech(null);
    }, 3400);
    return () => clearTimeout(timer);
  }, [activeSpeech]);

  const handleCharacterClick = (index: number) => {
    if (activeSpeech?.index === index) {
      setActiveSpeech(null);
    } else {
      setActiveSpeech({
        index,
        text: characterMessages[index] || "Let's connect!",
      });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={cn(
        "relative overflow-hidden border-t border-[#E9E0FA] bg-[#FBFAFF] text-slate-800",
        className
      )}
    >
      {/* ── 1. Top Section: Brand Info & Navigation Columns ── */}
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info Column */}
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
            {logo ? (
              logo
            ) : (
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-violet-600 font-extrabold text-white shadow-md shadow-violet-600/30">
                  L
                </span>
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Linq
                </span>
              </div>
            )}
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#746D80]">
              {brandDescription}
            </p>
          </div>

          {/* Navigation Columns */}
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group relative inline-block text-[#746D80] transition-colors duration-200 hover:text-[#7546C8]"
                    >
                      <span>{link.label}</span>
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-[#7546C8] transition-all duration-200 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Quick Access Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Access
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={primaryCta.href}
                  className="group relative inline-block text-[#746D80] transition-colors duration-200 hover:text-[#7546C8]"
                >
                  <span>{primaryCta.label}</span>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-[#7546C8] transition-all duration-200 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a
                  href={secondaryCta.href}
                  className="group relative inline-block text-[#746D80] transition-colors duration-200 hover:text-[#7546C8]"
                >
                  <span>{secondaryCta.label}</span>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-[#7546C8] transition-all duration-200 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── 2. Middle Section: Giant LINQ Wordmark + Interactive Doodle Crew ── */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:py-12"
      >
        {/* Floating Doodles (Violet & Lavender Palette) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        >
          {/* Star 1 */}
          <svg
            className="absolute left-[8%] top-[12%] size-5 animate-pulse text-[#7546C8] opacity-80"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
          {/* Sparkle 2 */}
          <svg
            className="absolute left-[28%] top-[6%] size-4 text-[#8B5CF6] opacity-75"
            style={{ animation: "bounce 4s infinite ease-in-out" }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2Z" />
          </svg>
          {/* Heart 3 */}
          <svg
            className="absolute left-[44%] top-[14%] size-4 text-[#A78BFA] opacity-70"
            style={{ animation: "pulse 3.2s infinite ease-in-out" }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {/* Sparkle 4 */}
          <svg
            className="absolute right-[30%] top-[8%] size-4.5 text-[#7546C8] opacity-75"
            style={{ animation: "bounce 3.5s infinite ease-in-out" }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
          {/* Star 5 */}
          <svg
            className="absolute right-[10%] top-[14%] size-5 text-[#C4B5FD] opacity-80"
            style={{ animation: "pulse 2.8s infinite ease-in-out" }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2Z" />
          </svg>
          {/* Diamond 6 */}
          <svg
            className="absolute right-[6%] bottom-[22%] size-3.5 text-[#8B5CF6] opacity-65"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect
              x="6"
              y="6"
              width="12"
              height="12"
              transform="rotate(45 12 12)"
            />
          </svg>
          {/* Ring 7 */}
          <svg
            className="absolute left-[6%] bottom-[26%] size-4 text-[#DDD6FE] opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <circle cx="12" cy="12" r="8" />
          </svg>
        </div>

        {/* SVG Wordmark & Crew */}
        <div className="relative mx-auto flex w-full justify-center">
          <svg
            viewBox="0 0 900 240"
            className="h-auto w-full max-w-4xl select-none overflow-visible"
            aria-label={`${wordmark} brand wordmark with animated doodle crew`}
          >
            <defs>
              <filter id="roughInk" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.04"
                  numOctaves="2"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="1.8"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>

            {/* Hand-drawn ground line */}
            <path
              d="M 60 196 Q 450 202 840 196"
              fill="none"
              stroke="#E9E0FA"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
            />

            {/* Giant LINQ Wordmark in Dark Violet Ink (#302544) */}
            <g filter="url(#roughInk)">
              {/* L */}
              <text
                x="180"
                y="180"
                textAnchor="middle"
                fill="#302544"
                className="font-black text-[160px] tracking-tight"
                style={{
                  fontFamily:
                    "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
                }}
              >
                L
              </text>
              {/* I */}
              <text
                x="340"
                y="180"
                textAnchor="middle"
                fill="#302544"
                className="font-black text-[160px] tracking-tight"
                style={{
                  fontFamily:
                    "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
                }}
              >
                I
              </text>
              {/* N */}
              <text
                x="520"
                y="180"
                textAnchor="middle"
                fill="#302544"
                className="font-black text-[160px] tracking-tight"
                style={{
                  fontFamily:
                    "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
                }}
              >
                N
              </text>
              {/* Q */}
              <text
                x="710"
                y="180"
                textAnchor="middle"
                fill="#302544"
                className="font-black text-[160px] tracking-tight"
                style={{
                  fontFamily:
                    "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
                }}
              >
                Q
              </text>
            </g>

            {/* ── Character 1: Leaning against 'L' (Index 0) ── */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => handleCharacterClick(0)}
              role="button"
              tabIndex={0}
              aria-label="Interactive character leaning on L"
            >
              {/* Body */}
              <ellipse
                cx="130"
                cy="140"
                rx="20"
                ry="28"
                fill="#F3EDFF"
                stroke="#302544"
                strokeWidth="2.5"
                transform="rotate(-12 130 140)"
              />
              {/* Arm leaning on L */}
              <path
                d="M 142 130 Q 158 126 162 134"
                fill="none"
                stroke="#302544"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Feet */}
              <ellipse cx="118" cy="172" rx="7" ry="4" fill="#302544" />
              <ellipse cx="134" cy="172" rx="7" ry="4" fill="#302544" />
              {/* Eyes */}
              <g
                style={{
                  transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
                  transformOrigin: "130px 124px",
                  transition: "transform 0.1s ease-out",
                }}
              >
                {/* Left eye */}
                <circle cx="124" cy="124" r="5" fill="#FFFFFF" stroke="#302544" strokeWidth="1.8" />
                <circle cx={124 + pupils[0].x} cy={124 + pupils[0].y} r="2.2" fill="#7546C8" />
                {/* Right eye */}
                <circle cx="136" cy="124" r="5" fill="#FFFFFF" stroke="#302544" strokeWidth="1.8" />
                <circle cx={136 + pupils[0].x} cy={124 + pupils[0].y} r="2.2" fill="#7546C8" />
              </g>
              {/* Smile */}
              <path
                d="M 126 136 Q 130 142 135 136"
                fill="none"
                stroke="#302544"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>

            {/* ── Character 2: Sitting on 'N' (Index 2) ── */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => handleCharacterClick(1)}
              role="button"
              tabIndex={0}
              aria-label="Interactive character sitting on N"
            >
              {/* Antenna */}
              <path
                d="M 508 26 Q 508 16 513 14"
                fill="none"
                stroke="#7546C8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="514" cy="13" r="3" fill="#8B5CF6" />
              {/* Body */}
              <ellipse
                cx="508"
                cy="44"
                rx="18"
                ry="20"
                fill="#FFFFFF"
                stroke="#302544"
                strokeWidth="2.5"
              />
              {/* Dangling legs over 'N' */}
              <path
                d="M 500 58 Q 500 68 497 72"
                fill="none"
                stroke="#302544"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 515 58 Q 515 68 518 72"
                fill="none"
                stroke="#302544"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Eyes */}
              <g
                style={{
                  transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
                  transformOrigin: "508px 40px",
                  transition: "transform 0.1s ease-out",
                }}
              >
                <circle cx="503" cy="40" r="4.5" fill="#FFFFFF" stroke="#302544" strokeWidth="1.8" />
                <circle cx={503 + pupils[1].x} cy={40 + pupils[1].y} r="2" fill="#7546C8" />
                <circle cx="513" cy="40" r="4.5" fill="#FFFFFF" stroke="#302544" strokeWidth="1.8" />
                <circle cx={513 + pupils[1].x} cy={40 + pupils[1].y} r="2" fill="#7546C8" />
              </g>
              {/* Smile */}
              <path
                d="M 505 48 Q 508 52 511 48"
                fill="none"
                stroke="#302544"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>

            {/* ── Character 3: Peeking from behind 'Q' (Index 3) ── */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => handleCharacterClick(2)}
              role="button"
              tabIndex={0}
              aria-label="Interactive character peeking behind Q"
            >
              {/* Head peeking */}
              <ellipse
                cx="772"
                cy="126"
                rx="18"
                ry="22"
                fill="#F3EDFF"
                stroke="#302544"
                strokeWidth="2.5"
                transform="rotate(18 772 126)"
              />
              {/* Little hands holding onto the curve of Q */}
              <ellipse cx="754" cy="120" rx="4" ry="6" fill="#FFFFFF" stroke="#302544" strokeWidth="2" />
              <ellipse cx="758" cy="136" rx="4" ry="6" fill="#FFFFFF" stroke="#302544" strokeWidth="2" />
              {/* Eyes */}
              <g
                style={{
                  transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
                  transformOrigin: "772px 122px",
                  transition: "transform 0.1s ease-out",
                }}
              >
                <circle cx="768" cy="120" r="4.5" fill="#FFFFFF" stroke="#302544" strokeWidth="1.8" />
                <circle cx={768 + pupils[2].x} cy={120 + pupils[2].y} r="2" fill="#7546C8" />
                <circle cx="778" cy="124" r="4.5" fill="#FFFFFF" stroke="#302544" strokeWidth="1.8" />
                <circle cx={778 + pupils[2].x} cy={124 + pupils[2].y} r="2" fill="#7546C8" />
              </g>
              {/* Smile */}
              <path
                d="M 769 130 Q 774 135 778 132"
                fill="none"
                stroke="#302544"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>

            {/* ── Interactive Speech Bubble on Click ── */}
            {activeSpeech && (
              <g
                className="transition-all duration-300"
                style={{ animation: "fadeIn 0.2s ease-out" }}
              >
                {activeSpeech.index === 0 && (
                  <g transform="translate(70, 60)">
                    <rect
                      x="0"
                      y="0"
                      width="120"
                      height="34"
                      rx="10"
                      fill="#FFFFFF"
                      stroke="#E9E0FA"
                      strokeWidth="2"
                      className="shadow-md"
                    />
                    <polygon points="50,34 60,34 54,42" fill="#FFFFFF" stroke="#E9E0FA" strokeWidth="2" />
                    <polygon points="51,33 59,33 54,41" fill="#FFFFFF" />
                    <text
                      x="60"
                      y="21"
                      textAnchor="middle"
                      fill="#302544"
                      className="text-xs font-semibold"
                      style={{
                        fontFamily:
                          "var(--font-geist-sans), system-ui, sans-serif",
                      }}
                    >
                      {activeSpeech.text}
                    </text>
                  </g>
                )}
                {activeSpeech.index === 1 && (
                  <g transform="translate(435, -28)">
                    <rect
                      x="0"
                      y="0"
                      width="140"
                      height="34"
                      rx="10"
                      fill="#FFFFFF"
                      stroke="#E9E0FA"
                      strokeWidth="2"
                    />
                    <polygon points="70,34 80,34 75,42" fill="#FFFFFF" stroke="#E9E0FA" strokeWidth="2" />
                    <polygon points="71,33 79,33 75,41" fill="#FFFFFF" />
                    <text
                      x="70"
                      y="21"
                      textAnchor="middle"
                      fill="#302544"
                      className="text-xs font-semibold"
                      style={{
                        fontFamily:
                          "var(--font-geist-sans), system-ui, sans-serif",
                      }}
                    >
                      {activeSpeech.text}
                    </text>
                  </g>
                )}
                {activeSpeech.index === 2 && (
                  <g transform="translate(640, 50)">
                    <rect
                      x="0"
                      y="0"
                      width="180"
                      height="34"
                      rx="10"
                      fill="#FFFFFF"
                      stroke="#E9E0FA"
                      strokeWidth="2"
                    />
                    <polygon points="120,34 130,34 125,42" fill="#FFFFFF" stroke="#E9E0FA" strokeWidth="2" />
                    <polygon points="121,33 129,33 125,41" fill="#FFFFFF" />
                    <text
                      x="90"
                      y="21"
                      textAnchor="middle"
                      fill="#302544"
                      className="text-xs font-semibold"
                      style={{
                        fontFamily:
                          "var(--font-geist-sans), system-ui, sans-serif",
                      }}
                    >
                      {activeSpeech.text}
                    </text>
                  </g>
                )}
              </g>
            )}
          </svg>
        </div>

        {/* ── 3. Tagline & CTA Action Buttons beneath wordmark ── */}
        <div className="mt-4 flex flex-col items-center text-center">
          <p className="text-sm sm:text-base font-medium tracking-wide text-slate-700">
            {tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={primaryCta.href}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#7546C8] px-6 text-sm font-semibold text-white shadow-md shadow-violet-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6434b8] hover:shadow-lg hover:shadow-violet-600/35 active:translate-y-0"
            >
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className="inline-flex h-11 items-center justify-center rounded-full border border-violet-200/90 bg-white px-6 text-sm font-semibold text-[#7546C8] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50/80 active:translate-y-0"
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Bar: Copyright, Attribution, Social Links & Back-To-Top ── */}
      <div className="border-t border-[#E9E0FA] bg-white/70 px-6 py-6 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-[#746D80] sm:flex-row">
          {/* Copyright & Crowd Attribution */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span>{copyright}</span>
            {attribution ? (
              <span className="text-[11px] text-slate-400">{attribution}</span>
            ) : (
              <span className="text-[11px] text-slate-400">
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
            )}
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-5">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linq on LinkedIn"
                  className="grid size-8 place-items-center rounded-full border border-violet-200/80 bg-white text-slate-600 transition-colors duration-200 hover:border-[#7546C8] hover:bg-violet-50 hover:text-[#7546C8]"
                >
                  <svg
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 1 0 0 3.25 1.63 1.63 0 0 0 0-3.25z" />
                  </svg>
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linq on Instagram"
                  className="grid size-8 place-items-center rounded-full border border-violet-200/80 bg-white text-slate-600 transition-colors duration-200 hover:border-[#7546C8] hover:bg-violet-50 hover:text-[#7546C8]"
                >
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              )}
            </div>

            {/* Back to Top */}
            <button
              type="button"
              onClick={handleBackToTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-violet-200/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:text-[#7546C8] active:translate-y-0"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="size-3.5 text-[#7546C8]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DoodleCrewFooter;
