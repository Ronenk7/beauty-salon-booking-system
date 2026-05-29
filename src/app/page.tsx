import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

const benefits = [
  { icon: "✦", title: "יחס אישי ומדויק", text: "כל טיפול מתחיל בהקשבה לצרכים שלך ובבניית חוויה שמתאימה בדיוק לעור, לסגנון ולמטרה שלך." },
  { icon: "♡", title: "אווירה רגועה ויוקרתית", text: "חלל נעים, נקי ומעוצב שמאפשר לך לעצור רגע, לנשום ולהתפנק באמת." },
  { icon: "★", title: "תוצאה טבעית ומוקפדת", text: "הדגש הוא על יופי נקי, נשי ומחמיא, עם גימור מקצועי ותחושה בטוחה." },
];

const testimonials = [
  { name: "דנה", text: "הגעתי לטיפול פנים ויצאתי עם עור זוהר ותחושה מושלמת. יולי מקצועית, עדינה ומדויקת." },
  { name: "מיכל", text: "המקום מהמם, נקי ומרגיע. השירות אישי מאוד והתוצאה נראית טבעית ואלגנטית." },
  { name: "שירה", text: "קבעתי תור לאיפור ערב וקיבלתי בדיוק את המראה שרציתי — יוקרתי אבל לא מוגזם." },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
];

const faqs = [
  { question: "איך קובעים תור?", answer: "אפשר לקבוע תור דרך עמוד קביעת התור באתר או לשלוח הודעה בוואטסאפ." },
  { question: "האם צריך לשלם מראש?", answer: "בגרסה הנוכחית אין תשלום באתר. קביעת התור נשלחת לאישור בלבד." },
  { question: "האם הטיפולים מותאמים אישית?", answer: "כן. כל טיפול מותאם לסוג העור, למטרה ולסגנון האישי שלך." },
  { question: "האם אפשר לשנות תור?", answer: "כן, ניתן ליצור קשר בוואטסאפ ונשמח לעזור בשינוי או עדכון התור." },
];

export default function HomePage() {
  const featuredServices = services.slice(0, 3);

  return (
    <div className="overflow-hidden">
      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pt-20">
        <div className="absolute left-8 top-16 hidden h-40 w-40 rounded-full bg-gold-100 blur-3xl lg:block" />
        <div className="absolute right-16 top-32 hidden h-52 w-52 rounded-full bg-blush-200/70 blur-3xl lg:block" />

        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-white/70 px-5 py-2 text-sm font-bold text-gold-700 shadow-sm">
            <span>✦</span>
            <span>קליניקת טיפוח וקוסמטיקה פרימיום</span>
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-espresso sm:text-6xl lg:text-7xl">
            יופי נקי, נשי ואלגנטי שמתחיל ברגע שאת נכנסת.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-espresso/70 sm:text-xl">
            ברוכה הבאה אל יולי קוסמטיקס — סטודיו טיפוח מודרני, רגוע ומקצועי לטיפולי פנים, גבות, מניקור ואיפור בגישה אישית ומוקפדת.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="rounded-full bg-espresso px-8 py-4 text-center text-base font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-blush-700"
            >
              קבעי תור עכשיו
            </Link>
            <a
              href="https://wa.me/972500000000"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold-300 bg-white/80 px-8 py-4 text-center text-base font-black text-espresso shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              שלחי הודעה בוואטסאפ
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-center">
            <div className="rounded-3xl bg-white/70 p-4 shadow-sm">
              <div className="text-2xl font-black text-espresso">6+</div>
              <div className="mt-1 text-xs font-bold text-espresso/55">טיפולים</div>
            </div>
            <div className="rounded-3xl bg-white/70 p-4 shadow-sm">
              <div className="text-2xl font-black text-espresso">100%</div>
              <div className="mt-1 text-xs font-bold text-espresso/55">יחס אישי</div>
            </div>
            <div className="rounded-3xl bg-white/70 p-4 shadow-sm">
              <div className="text-2xl font-black text-espresso">VIP</div>
              <div className="mt-1 text-xs font-bold text-espresso/55">חוויה רגועה</div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <div className="absolute left-0 top-8 h-72 w-52 overflow-hidden rounded-[3rem] border-8 border-white bg-cover bg-center shadow-soft sm:w-64" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80)" }} />
          <div className="absolute right-0 top-0 h-[430px] w-72 overflow-hidden rounded-[4rem] border-8 border-white bg-cover bg-center shadow-glow sm:w-80" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80)" }} />
          <div className="absolute bottom-0 right-16 h-56 w-64 rounded-[3rem] border-8 border-white bg-cover bg-center shadow-soft" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80)" }} />
          <div className="absolute bottom-10 left-5 rounded-[2rem] bg-white/85 p-5 shadow-soft backdrop-blur">
            <p className="text-sm font-bold text-blush-700">התחושה אחרי טיפול</p>
            <p className="mt-2 text-2xl font-black text-espresso">זוהרת. רגועה. בטוחה.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-[2rem] border border-white/80 bg-white/75 p-7 shadow-soft backdrop-blur transition hover:-translate-y-1">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blush-100 text-xl text-blush-700">{benefit.icon}</div>
              <h2 className="text-2xl font-black text-espresso">{benefit.title}</h2>
              <p className="mt-4 leading-8 text-espresso/65">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black tracking-wide text-blush-700">הטיפולים הפופולריים</p>
            <h2 className="mt-3 text-4xl font-black text-espresso">התחילי עם טיפול שמתאים לך</h2>
          </div>
          <Link href="/services" className="font-black text-gold-700 transition hover:text-blush-700">
            לכל הטיפולים ←
          </Link>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-white/55 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black text-blush-700">גלריית לפני ואחרי</p>
              <h2 className="mt-3 text-4xl font-black text-espresso">מראה טבעי, נקי ומוקפד</h2>
              <p className="mt-5 leading-9 text-espresso/65">
                הגלריה מציגה השראה לאווירה, סטייל וטיפולים. בהמשך אפשר להחליף לתמונות אמיתיות של יולי קוסמטיקס.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((imageUrl, index) => (
                <div
                  key={imageUrl}
                  className={`h-52 rounded-[2rem] bg-cover bg-center shadow-soft ${index === 1 ? "mt-8" : ""}`}
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="overflow-hidden rounded-[3rem] bg-cover bg-center shadow-soft min-h-[430px]" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80)" }} />
        <div>
          <p className="text-sm font-black text-blush-700">על יולי קוסמטיקס</p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-espresso">קליניקה שמחברת בין מקצועיות, רוגע ויופי טבעי.</h2>
          <p className="mt-6 leading-9 text-espresso/65">
            יולי קוסמטיקס נולדה מתוך אהבה לעולם הטיפוח והרצון לתת לכל לקוחה חוויה אישית, מדויקת ונעימה. כל פרט — מהאווירה ועד לתוצאה הסופית — נבחר כדי שתרגישי מטופחת, בטוחה וזוהרת.
          </p>
          <div className="mt-8 rounded-[2rem] border border-gold-300/50 bg-gold-100/45 p-6 text-espresso">
            <strong>הגישה שלנו:</strong> יופי לא צריך להרגיש מתאמץ. הוא צריך להרגיש נכון, טבעי ומחמיא.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-black text-blush-700">לקוחות מספרות</p>
          <h2 className="mt-3 text-4xl font-black text-espresso">חוויה שנשארת גם אחרי הטיפול</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-[2rem] bg-white/80 p-7 shadow-soft">
              <div className="text-xl text-gold-500">★★★★★</div>
              <p className="mt-5 leading-8 text-espresso/70">״{testimonial.text}״</p>
              <div className="mt-6 font-black text-espresso">{testimonial.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-black text-blush-700">שאלות נפוצות</p>
          <h2 className="mt-3 text-4xl font-black text-espresso">כל מה שחשוב לדעת לפני שקובעים</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-[1.5rem] border border-white/80 bg-white/80 p-6 shadow-sm">
              <summary className="cursor-pointer list-none text-lg font-black text-espresso marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-4 leading-8 text-espresso/65">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="overflow-hidden rounded-[3rem] bg-gradient-to-l from-espresso to-blush-700 p-8 text-white shadow-soft md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-black text-gold-300">יצירת קשר</p>
              <h2 className="mt-3 text-4xl font-black">מוכנה לחוויית טיפוח אישית?</h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/75">
                השאירי פרטים דרך עמוד קביעת התור או שלחי הודעה בוואטסאפ, ונחזור אלייך לתיאום הזמן המתאים.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link href="/booking" className="rounded-full bg-white px-8 py-4 text-center font-black text-espresso transition hover:-translate-y-1">
                קביעת תור
              </Link>
              <a href="https://wa.me/972500000000" target="_blank" rel="noreferrer" className="rounded-full border border-white/40 px-8 py-4 text-center font-black text-white transition hover:-translate-y-1 hover:bg-white/10">
                וואטסאפ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
