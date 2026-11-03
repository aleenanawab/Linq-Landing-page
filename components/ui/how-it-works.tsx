"use client";

import React from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { Building2, Link2, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  step: string;
  tagline?: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StepPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotation?: number;
}

export interface HowItWorksProps {
  features?: StepItem[];
  steps?: StepItem[];
  className?: string;
  stepPositions?: StepPosition[];
}

export const defaultLinqSteps: StepItem[] = [
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

const defaultDesktopPositions: StepPosition[] = [
  { top: "0%", left: "4%", rotation: -1.2 },
  { top: "28%", right: "4%", rotation: 1.5 },
  { top: "58%", left: "14%", rotation: -0.8 },
];

export function HowItWorks({
  features,
  steps,
  className,
  stepPositions = defaultDesktopPositions,
}: HowItWorksProps) {
  const items = features || steps || defaultLinqSteps;
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("relative mx-auto w-full max-w-5xl", className)}>
        {/* ── Desktop Connected Zigzag Timeline (>= md) ── */}
        <div className="hidden md:block relative w-full min-h-[560px] lg:min-h-[580px]">
          {/* Subtle curved dashed SVG connector line */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full -z-0 overflow-visible"
            viewBox="0 0 1000 580"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Background static dashed guide */}
            <path
              d="M 320 100 C 560 100, 580 230, 670 230 C 740 230, 710 350, 580 380 C 490 400, 440 400, 410 420"
              stroke="#E9E0FA"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Animated dashed line overlay */}
            <m.path
              d="M 320 100 C 560 100, 580 230, 670 230 C 740 230, 710 350, 580 380 C 490 400, 440 400, 410 420"
              stroke="#C4B5FD"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 0 }}
              animate={
                shouldReduceMotion
                  ? { strokeDashoffset: 0 }
                  : { strokeDashoffset: -28 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { repeat: Infinity, duration: 2.8, ease: "linear" }
              }
            />
          </svg>

          {/* Connected Floating Cards in Zigzag Pattern */}
          {items.slice(0, 3).map((item, index) => {
            const pos = stepPositions[index] || defaultDesktopPositions[index];
            const Icon = item.icon;

            return (
              <m.div
                key={item.step}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.65,
                  delay: shouldReduceMotion ? 0 : index * 0.16,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -6,
                        scale: 1.015,
                        transition: { duration: 0.2 },
                      }
                }
                style={{
                  top: pos?.top,
                  left: pos?.left,
                  right: pos?.right,
                  bottom: pos?.bottom,
                  rotate: shouldReduceMotion ? 0 : `${pos?.rotation ?? 0}deg`,
                }}
                className="group absolute z-10 w-[290px] lg:w-[320px] rounded-2xl border border-[#E9E0FA] bg-white p-2.5 shadow-[0_8px_30px_-6px_rgba(124,58,237,0.06)] transition-all duration-300 hover:border-[#D4C5F9] hover:shadow-[0_14px_36px_-6px_rgba(124,58,237,0.12)]"
              >
                <div className="rounded-xl bg-[#F7F3FF] p-5 lg:p-6 transition-colors duration-200">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-bold tracking-widest text-[#7546C8] uppercase">
                      Step {item.step}
                    </span>
                    <div className="grid size-10 place-items-center rounded-xl bg-white text-[#7546C8] shadow-sm ring-1 ring-[#E9E0FA] transition-transform duration-200 group-hover:scale-105">
                      <Icon className="size-5" aria-hidden />
                    </div>
                  </div>

                  {item.tagline && (
                    <p className="text-[11px] font-medium tracking-wide text-violet-600/90 mb-1">
                      {item.tagline}
                    </p>
                  )}

                  <h3 className="text-base font-semibold text-[#27213A] tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#746D80]">
                    {item.description}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* ── Mobile Stacked Timeline (< md) ── */}
        <div className="block md:hidden relative w-full max-w-md mx-auto pt-4 pb-2">
          {/* Vertical dashed line guide connecting the steps */}
          <div
            className="pointer-events-none absolute left-7 top-10 bottom-10 w-0.5 border-l-2 border-dashed border-[#E9E0FA] -z-0"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-5">
            {items.slice(0, 3).map((item, index) => {
              const Icon = item.icon;

              return (
                <m.div
                  key={item.step}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.5,
                    delay: shouldReduceMotion ? 0 : index * 0.12,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="relative z-10 w-full rounded-2xl border border-[#E9E0FA] bg-white p-2.5 shadow-[0_6px_24px_-6px_rgba(124,58,237,0.06)]"
                >
                  <div className="rounded-xl bg-[#F7F3FF] p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="inline-flex items-center gap-2">
                        <span className="grid size-6 place-items-center rounded-full bg-[#7546C8] text-[11px] font-bold text-white shadow-sm">
                          {index + 1}
                        </span>
                        <span className="text-xs font-bold tracking-widest text-[#7546C8] uppercase">
                          Step {item.step}
                        </span>
                      </div>
                      <div className="grid size-9 place-items-center rounded-xl bg-white text-[#7546C8] shadow-sm ring-1 ring-[#E9E0FA]">
                        <Icon className="size-4.5" aria-hidden />
                      </div>
                    </div>

                    {item.tagline && (
                      <p className="text-[11px] font-medium tracking-wide text-violet-600/90 mb-1">
                        {item.tagline}
                      </p>
                    )}

                    <h3 className="text-base font-semibold text-[#27213A] tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#746D80]">
                      {item.description}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

export default HowItWorks;
