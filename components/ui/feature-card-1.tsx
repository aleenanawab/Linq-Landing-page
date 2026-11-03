"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export interface AnimatedFeatureCardProps
  extends Omit<HTMLMotionProps<"div">, "children" | "title"> {
  index: string | number;
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  color?: "purple" | "violet";
  className?: string;
}

export const AnimatedFeatureCard = React.forwardRef<
  HTMLDivElement,
  AnimatedFeatureCardProps
>(
  (
    {
      index,
      tag,
      title,
      description,
      imageSrc,
      imageAlt,
      color = "purple",
      className,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const formattedIndex =
      typeof index === "number" ? String(index).padStart(3, "0") : index;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                y: -7,
                transition: { duration: 0.25, ease: "easeOut" },
              }
        }
        className={cn(
          "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E9E0FA] bg-gradient-to-b from-white via-[#FCFAFF] to-[#F7F3FF] p-6 shadow-[0_4px_20px_-4px_rgba(124,58,237,0.05)] transition-all duration-300 hover:border-[#D4C5F9] hover:shadow-[0_16px_36px_-6px_rgba(124,58,237,0.12)] min-h-[350px] sm:min-h-[370px]",
          className
        )}
        {...props}
      >
        {/* Subtle radial hover gradient in Linq lavender & violet */}
        <div
          className="pointer-events-none absolute -inset-px -z-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,rgba(196,181,253,0.35)_0%,transparent_70%)] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Top Header: Index number and Category tag */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <span className="font-mono text-xs font-semibold tracking-wider text-violet-600/80">
            {formattedIndex}
          </span>
          <span className="inline-flex items-center rounded-full bg-violet-100/80 px-2.5 py-1 text-[10px] font-bold tracking-wider text-violet-700 uppercase">
            {tag}
          </span>
        </div>

        {/* Central Visual Area with smooth hover scale */}
        <div className="relative z-10 my-4 flex h-36 sm:h-40 w-full items-center justify-center overflow-hidden rounded-2xl bg-white/60 p-2 ring-1 ring-violet-100/70 shadow-sm">
          <img
            src={imageSrc}
            alt={imageAlt || title}
            loading="lazy"
            className="h-full w-full rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          />
        </div>

        {/* Bottom Content Area: Semantic Title and Description */}
        <div className="relative z-10 mt-auto pt-1">
          <h3 className="text-lg font-semibold tracking-tight text-[#27213A] sm:text-xl transition-colors duration-200 group-hover:text-violet-900">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#746D80]">
            {description}
          </p>
        </div>
      </motion.div>
    );
  }
);

AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export default AnimatedFeatureCard;
