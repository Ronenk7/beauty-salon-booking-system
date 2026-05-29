"use client";

import { useState } from "react";

const faqs = [
  {
    question: "איך קובעים תור?",
    answer: "אפשר לקבוע תור דרך עמוד קביעת התור באתר או לשלוח הודעה בוואטסאפ. לאחר השליחה נחזור אלייך לאישור סופי.",
  },
  {
    question: "האם צריך לשלם מראש?",
    answer: "לא. בגרסה הנוכחית אין תשלום באתר. התשלום מתבצע בנפרד מול העסק.",
  },
  {
    question: "איך אדע איזה טיפול מתאים לי?",
    answer: "אפשר להתחיל בייעוץ קצר. נבין יחד את מצב העור, הצורך שלך והמטרה, ואז נבחר טיפול מתאים.",
  },
  {
    question: "האם אפשר לשנות או לבטל תור?",
    answer: "כן. ניתן ליצור קשר בוואטסאפ ונשמח לעזור בשינוי מועד או עדכון התור.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={faq.question} className="overflow-hidden rounded-[1.6rem] bg-white/80 shadow-sm ring-1 ring-white/80">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-5 px-6 py-5 text-right text-lg font-black text-espresso"
            >
              <span>{faq.question}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-700">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && <p className="px-6 pb-6 leading-8 text-espresso/65">{faq.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
