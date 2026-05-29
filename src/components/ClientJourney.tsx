"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "בחירת טיפול",
    text: "בוחרים טיפול מתוך רשימת שירותים ברורה, מסודרת ומותאמת לפי קטגוריות.",
  },
  {
    number: "02",
    title: "ייעוץ והתאמה",
    text: "אפשר להיעזר ביועצת הדיגיטלית או לבחור טיפול ישירות לפי צורך, סגנון וזמן.",
  },
  {
    number: "03",
    title: "קביעת תור",
    text: "תהליך הזמנה קצר בשלבים עם סיכום טיפול, תאריך, שעה ופרטים אישיים.",
  },
  {
    number: "04",
    title: "חוויה בקליניקה",
    text: "מגיעים לטיפול באווירה רגועה, יוקרתית ומדויקת — עם יחס אישי מתחילתו ועד סופו.",
  },
];

export function ClientJourney() {
  return (
    <div className="grid gap-5 md:grid-cols-4">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: index * 0.12 }}
          whileHover={{ y: -8 }}
          className="relative rounded-[2rem] bg-white/80 p-6 shadow-soft"
        >
          <div className="mb-5 text-4xl font-black text-blush-200">{step.number}</div>
          <h3 className="text-2xl font-black text-espresso">{step.title}</h3>
          <p className="mt-4 leading-8 text-espresso/65">{step.text}</p>
          {index < steps.length - 1 && (
            <div className="absolute -left-3 top-12 hidden h-1 w-6 rounded-full bg-gold-300 md:block" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
