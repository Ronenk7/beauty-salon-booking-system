"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";

type MotionSectionProps = ComponentPropsWithoutRef<"section"> & {
  delay?: number;
};

export function MotionSection({ children, className = "", delay = 0, ...props }: MotionSectionProps) {
  return (
    <motion.section
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
