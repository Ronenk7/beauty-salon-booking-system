"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const reasons = [
  {
    value: 96,
    suffix: "%",
    title: "חוויה אישית",
    text: "לקוחות חוזרות כי הן מרגישות שרואים אותן, מקשיבים להן ומתאימים את הטיפול בדיוק אליהן.",
  },
  {
    value: 4,
    suffix: " שלבים",
    title: "תהליך ברור",
    text: "בחירה, התאמה, הזמנה ואישור — תהליך נעים שמרגיש מסודר ולא מלחיץ.",
  },
  {
    value: 9,
    suffix: "+",
    title: "אפשרויות טיפוח",
    text: "מגוון טיפולים בתחומי פנים, גבות, איפור, ציפורניים וטיפוח כללי.",
  },
];

export function ReturnReasons() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {reasons.map((reason, index) => (
        <motion.div
          key={reason.title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: index * 0.12 }}
          whileHover={{ y: -8, scale: 1.01 }}
          className="glass-card rounded-[2rem] p-7"
        >
          <div className="text-4xl font-black text-espresso">
            <AnimatedCounter value={reason.value} suffix={reason.suffix} />
          </div>
          <h3 className="mt-4 text-2xl font-black text-espresso">{reason.title}</h3>
          <p className="mt-4 leading-8 text-espresso/65">{reason.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
