"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "דנה",
    text: "הגעתי לטיפול פנים ויצאתי עם עור זוהר ותחושה מושלמת. יולי מקצועית, עדינה ומדויקת.",
    treatment: "טיפול פנים זוהר",
  },
  {
    name: "מיכל",
    text: "המקום נראה כמו קליניקה בחו״ל. נקי, רגוע ויוקרתי. השירות אישי והתוצאה טבעית מאוד.",
    treatment: "עיצוב גבות",
  },
  {
    name: "שירה",
    text: "קבעתי איפור לאירוע וקיבלתי בדיוק את המראה שרציתי — עדין, יוקרתי ועמיד כל הערב.",
    treatment: "איפור ערב",
  },
];

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];

  function goNext() {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }

  function goPrevious() {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <div className="glass-card rounded-[3rem] p-8 md:p-12">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div>
          <p className="text-sm font-black text-blush-700">לקוחות מספרות</p>
          <h2 className="mt-3 text-4xl font-black text-espresso">חוויה שמרגישים גם אחרי הטיפול</h2>
          <div className="mt-8 flex gap-3">
            <button type="button" onClick={goPrevious} className="rounded-full border border-beige bg-white px-5 py-3 font-black text-espresso transition hover:-translate-y-1">
              הקודם
            </button>
            <button type="button" onClick={goNext} className="rounded-full bg-espresso px-5 py-3 font-black text-white transition hover:-translate-y-1 hover:bg-blush-700">
              הבא
            </button>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-white/80 p-8 shadow-soft">
          <div className="text-2xl text-gold-500">★★★★★</div>
          <p className="mt-6 text-2xl font-bold leading-10 text-espresso">״{activeTestimonial.text}״</p>
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-beige/60 pt-6">
            <div>
              <p className="text-lg font-black text-espresso">{activeTestimonial.name}</p>
              <p className="mt-1 text-sm font-bold text-blush-700">{activeTestimonial.treatment}</p>
            </div>
            <div className="flex gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-3 rounded-full transition ${index === activeIndex ? "bg-espresso" : "bg-beige"}`}
                  aria-label={`מעבר להמלצה ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
