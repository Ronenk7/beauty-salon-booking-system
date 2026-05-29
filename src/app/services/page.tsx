import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="overflow-hidden rounded-[3rem] bg-white/70 p-8 shadow-soft md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-sm font-black text-blush-700">טיפולי יולי קוסמטיקס</p>
            <h1 className="mt-4 text-5xl font-black leading-tight text-espresso">בחרי את הטיפול שמתאים בדיוק לרגע שלך</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-espresso/65">
              כל טיפול נבנה מתוך שילוב של מקצועיות, עדינות ואסתטיקה נקייה. כאן תוכלי לראות משך טיפול, מחיר ותיאור קצר לפני קביעת התור.
            </p>
          </div>
          <div className="rounded-[2rem] bg-blush-100/70 p-6 text-espresso shadow-sm">
            <p className="text-sm font-black text-blush-700">המלצה</p>
            <p className="mt-3 leading-8">
              לא בטוחה איזה טיפול לבחור? אפשר להתחיל בייעוץ קצר ולבנות יחד תכנית טיפוח שמתאימה לך.
            </p>
            <Link href="/booking" className="mt-5 inline-flex rounded-full bg-espresso px-6 py-3 font-black text-white transition hover:bg-blush-700">
              קבעי ייעוץ
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
