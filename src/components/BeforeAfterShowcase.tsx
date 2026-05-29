"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  {
    title: "עור זוהר ורענן",
    before: "לפני: מראה עייף וחסר אחידות",
    after: "אחרי: עור רגוע, נקי ומואר",
    imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "מסגרת פנים מדויקת",
    before: "לפני: גבות לא מסודרות",
    after: "אחרי: מראה נקי וטבעי",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "זוהר לאירוע",
    before: "לפני: מראה יומיומי",
    after: "אחרי: גלאם יוקרתי ועדין",
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85",
  },
];

export function BeforeAfterShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <motion.article
          key={item.title}
          initial={false}
          whileHover={{ y: -10, scale: 1.01 }}
          className="group overflow-hidden rounded-[2rem] bg-white/85 shadow-soft ring-1 ring-white/80"
        >
          <div className="relative h-72 overflow-hidden">
            <Image src={item.imageUrl} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/15 to-transparent" />
            <h3 className="absolute bottom-5 right-5 text-2xl font-black text-white drop-shadow-sm">{item.title}</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 p-5 text-sm font-bold leading-7 text-espresso/75">
            <div className="rounded-2xl bg-cream p-4">{item.before}</div>
            <div className="rounded-2xl bg-blush-100 p-4 text-blush-700">{item.after}</div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
