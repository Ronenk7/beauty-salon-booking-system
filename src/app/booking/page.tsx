import { BookingForm } from "./BookingForm";

type BookingPageProps = {
  searchParams?: {
    service?: string;
  };
};

export default function BookingPage({ searchParams }: BookingPageProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-10 overflow-hidden rounded-[3rem] bg-white/70 p-8 shadow-soft md:p-12">
        <p className="text-sm font-black text-blush-700">קביעת תור</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight text-espresso">
          בחרי טיפול, תאריך ושעה — ואנחנו נדאג לשאר.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-9 text-espresso/65">
          מלאי את הפרטים ונחזור אלייך לאישור סופי. בגרסה הנוכחית אין תשלום באתר — רק שליחת בקשת תור.
        </p>
      </div>

      <BookingForm initialServiceId={searchParams?.service} />
    </section>
  );
}
