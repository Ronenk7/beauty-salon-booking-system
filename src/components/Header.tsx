"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "בית" },
  { href: "/services", label: "טיפולים" },
  { href: "/booking", label: "קביעת תור" },
  { href: "/admin/appointments", label: "ניהול" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-pearl/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blush-200 to-gold-100 text-lg shadow-glow">
            ✦
          </span>
          <span>
            <span className="block text-xl font-black tracking-tight text-espresso">יולי קוסמטיקס</span>
            <span className="block text-xs font-medium text-blush-700">קוסמטיקה • טיפוח • יופי</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-espresso/80 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-blush-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://wa.me/972500000000"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gold-300 bg-white/70 px-5 py-2.5 text-sm font-bold text-espresso transition hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-soft"
          >
            וואטסאפ
          </a>
          <Link
            href="/booking"
            className="rounded-full bg-espresso px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-blush-700"
          >
            קבעי תור
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-full border border-beige bg-white/80 px-4 py-2 text-sm font-bold text-espresso md:hidden"
          aria-label="פתיחת תפריט"
        >
          {isOpen ? "סגירה" : "תפריט"}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-beige/70 bg-pearl px-5 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 text-base font-bold text-espresso">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl bg-white/75 px-4 py-3 shadow-sm"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://wa.me/972500000000"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-blush-100 px-4 py-3 text-blush-700 shadow-sm"
            >
              שלחי הודעה בוואטסאפ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
