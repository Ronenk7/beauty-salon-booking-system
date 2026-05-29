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
    title: "התאמה אישית",
    text: "נעזרים ביועצת היופי הדיגיטלית או בוחרים טיפול ישירות לפי צורך, סגנון וזמן.",
  },
  {
    number: "03",
    title: "קביעת תור",
    text: "תהליך הזמנה קצר בשלבים עם סיכום טיפול, תאריך, שעה ופרטים אישיים.",
  },
  {
    number: "04",
    title: "הגעה לטיפול",
    text: "מגיעים לקליניקה באווירה רגועה, נקייה ויוקרתית עם יחס אישי ומדויק.",
  },
  {
    number: "05",
    title: "תוצאה זוהרת",
    text: "יוצאים עם תחושת ביטחון, רעננות ומראה מוקפד שמתאים בדיוק לך.",
  },
];

export function ClientJourney() {
  return (
    <div className="grid gap-5 md:grid-cols-5">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={false}
          whileHover={{ y: -8, scale: 1.01 }}
          className="relative rounded-[2rem] bg-white/85 p-6 shadow-soft ring-1 ring-white/80"
        >
          <div className="mb-5 text-4xl font-black text-blush-200">{step.number}</div>
          <h3 className="text-2xl font-black text-espresso">{step.title}</h3>
          <p className="mt-4 leading-8 text-espresso/68">{step.text}</p>
          {index < steps.length - 1 && (
            <div className="absolute -left-3 top-12 hidden h-1 w-6 rounded-full bg-gold-300 md:block" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
