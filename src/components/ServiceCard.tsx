"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.article
      initial={false}
      whileHover={{ y: -10, scale: 1.01 }}
      className="group overflow-hidden rounded-[2rem] border border-white/90 bg-white/85 shadow-soft backdrop-blur transition-shadow hover:shadow-glow"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-espresso/5 to-transparent" />
        <div className="absolute right-4 top-4 rounded-full border border-white/50 bg-white/85 px-4 py-2 text-xs font-black text-espresso shadow-sm backdrop-blur">
          {service.categoryLabel}
        </div>
        {service.isPopular && (
          <div className="absolute bottom-4 right-4 rounded-full bg-gradient-to-l from-gold-100 to-cream px-4 py-2 text-xs font-black text-gold-700 shadow-sm">
            טיפול פופולרי
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black text-espresso">{service.name}</h3>
        <p className="mt-3 min-h-20 text-sm leading-7 text-espresso/70">{service.description}</p>

        <div className="mt-6 flex items-center justify-between border-t border-beige/60 pt-5 text-sm font-bold text-espresso">
          <span>{service.durationMinutes} דקות</span>
          <span className="rounded-full bg-gold-100 px-4 py-2 text-gold-700">₪{service.price}</span>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={`/booking?service=${service.id}`}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-l from-espresso to-blush-700 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:shadow-glow"
          >
            קבעי תור לטיפול
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
