import Link from "next/link";
import { ServiceFilter } from "@/components/ServiceFilter";

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="relative overflow-hidden rounded-[3rem] bg-white/70 p-8 shadow-soft md:p-12">
        <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-gold-100 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-blush-200/70 blur-3xl" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-sm font-black text-blush-700">טיפולי יולי קוסמטיקס</p>
            <h1 className="mt-4 text-5xl font-black leading-tight text-espresso md:text-6xl">בחרי את הטיפול שמתאים בדיוק לרגע שלך</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-espresso/65">
              סינון לפי קטגוריות, כרטיסי טיפול יוקרתיים ותהליך הזמנה ברור. כל טיפול מוצג עם תמונה, מחיר, משך ותיאור קצר.
            </p>
          </div>
          <div className="rounded-[2rem] bg-blush-100/70 p-6 text-espresso shadow-sm backdrop-blur">
            <p className="text-sm font-black text-blush-700">לא בטוחה מה לבחור?</p>
            <p className="mt-3 leading-8">
              אפשר להתחיל בייעוץ קצר ולבנות יחד תכנית טיפוח שמתאימה לעור, לאירוע ולסגנון שלך.
            </p>
            <Link href="/booking?service=beauty-consultation" className="mt-5 inline-flex rounded-full bg-espresso px-6 py-3 font-black text-white transition hover:-translate-y-1 hover:bg-blush-700">
              קבעי ייעוץ
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ServiceFilter />
      </div>
    </section>
  );
}
