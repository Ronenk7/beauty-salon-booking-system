import Link from "next/link";
import { BloomGallery } from "@/components/BloomGallery";

export default function GalleryPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-white/75 p-8 shadow-soft md:p-12">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold-100/70 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blush-200/60 blur-3xl" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="text-sm font-black text-blush-700">גלריית Bloom</p>
              <h1 className="mt-4 text-5xl font-black leading-tight text-espresso md:text-6xl">
                גלריית יופי אינטראקטיבית שנפתחת כמו זר פרחים.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-espresso/70">
                חוויית תמונות יוקרתית של יולי קוסמטיקס: טיפולי פנים, איפור, גבות, ריסים, ציפורניים ורגעי טיפוח רכים.
              </p>
            </div>
            <div className="rounded-[2rem] bg-cream/80 p-6 shadow-sm ring-1 ring-white/80">
              <p className="text-sm font-black text-gold-700">רוצה להפוך השראה לתור?</p>
              <p className="mt-3 leading-8 text-espresso/70">
                פתחי תמונה שמדברת אלייך, קבלי השראה, ואז קבעי טיפול שמתאים למראה שאת רוצה.
              </p>
              <Link href="/booking" className="mt-5 inline-flex rounded-full bg-espresso px-6 py-3 font-black text-white transition hover:-translate-y-1 hover:bg-blush-700">
                קבעי תור
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BloomGallery />
    </div>
  );
}
