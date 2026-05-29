import Image from "next/image";
import Link from "next/link";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { BeautyAdvisorQuiz } from "@/components/BeautyAdvisorQuiz";
import { BeforeAfterShowcase } from "@/components/BeforeAfterShowcase";
import { ClientJourney } from "@/components/ClientJourney";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ImageGallery } from "@/components/ImageGallery";
import { MotionSection } from "@/components/MotionSection";
import { ReturnReasons } from "@/components/ReturnReasons";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { services } from "@/data/services";

const benefits = [
  {
    icon: "✦",
    title: "אבחון אישי לפני כל טיפול",
    text: "הטיפול מתחיל בהבנת העור, הסגנון והמטרה שלך, כדי ליצור תוצאה מדויקת ולא גנרית.",
  },
  {
    icon: "♡",
    title: "חוויה רגועה ברמת פרימיום",
    text: "שילוב של עיצוב נקי, ריחות עדינים, מוזיקה רגועה ותחושת בוטיק כבר מהרגע הראשון.",
  },
  {
    icon: "◌",
    title: "טכנולוגיה, ניקיון ודיוק",
    text: "עבודה מסודרת, סטרילית ומקצועית עם דגש על גימור טבעי, אלגנטי ועמיד.",
  },
];

export default function HomePage() {
  const featuredServices = services.filter((service) => service.isPopular).slice(0, 3);

  return (
    <div className="overflow-hidden">
      <section id="home" className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=90"
          alt="קליניקת יופי יוקרתית"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-cream/95 via-cream/78 to-espresso/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(230,201,119,0.35),transparent_25rem)]" />
        <div className="absolute left-10 top-28 h-28 w-28 rounded-full bg-gold-100/60 blur-2xl" />
        <div className="absolute right-10 bottom-24 h-36 w-36 rounded-full bg-blush-200/60 blur-3xl" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="reveal max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-300/80 bg-white/70 px-5 py-2 text-sm font-black text-gold-700 shadow-sm backdrop-blur">
              <span className="luxury-shimmer bg-gradient-to-l from-gold-700 via-blush-700 to-gold-500 bg-clip-text text-transparent">✦</span>
              <span>יולי קוסמטיקס — חוויית Beauty-Tech יוקרתית</span>
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-espresso sm:text-6xl lg:text-7xl">
              טיפוח שמרגיש חכם, יוקרתי ומותאם אישית מהרגע הראשון.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-9 text-espresso/72 sm:text-xl">
              ברוכה הבאה אל יולי קוסמטיקס — קליניקת טיפוח וקוסמטיקה באווירה נשית, נקייה ומתקדמת, עם חוויית הזמנה מודרנית ויועצת יופי דיגיטלית שמכוונת אותך לטיפול הנכון.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/booking" className="pulse-glow rounded-full bg-espresso px-9 py-4 text-center text-base font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-blush-700">
                קבעי תור עכשיו
              </Link>
              <a href="https://wa.me/972500000000" target="_blank" rel="noreferrer" className="rounded-full border border-gold-300 bg-white/75 px-9 py-4 text-center text-base font-black text-espresso shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-soft">
                התייעצות בוואטסאפ
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 text-center sm:gap-5">
              <div className="glass-card rounded-[1.5rem] p-4">
                <div className="text-2xl font-black text-espresso"><AnimatedCounter value={9} suffix="+" /></div>
                <div className="mt-1 text-xs font-bold text-espresso/55">טיפולים</div>
              </div>
              <div className="glass-card rounded-[1.5rem] p-4">
                <div className="text-2xl font-black text-espresso"><AnimatedCounter value={4} suffix=" שלבים" /></div>
                <div className="mt-1 text-xs font-bold text-espresso/55">הזמנה חכמה</div>
              </div>
              <div className="glass-card rounded-[1.5rem] p-4">
                <div className="text-2xl font-black text-espresso"><AnimatedCounter value={96} suffix="%" /></div>
                <div className="mt-1 text-xs font-bold text-espresso/55">חוויה אישית</div>
              </div>
            </div>
          </div>

          <div className="relative hidden min-h-[620px] lg:block">
            <div className="float-soft absolute left-0 top-12 h-72 w-56 overflow-hidden rounded-[3rem] border-8 border-white shadow-soft">
              <Image src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=85" alt="איפור מקצועי" fill sizes="260px" className="object-cover" />
            </div>
            <div className="absolute right-8 top-0 h-[480px] w-80 overflow-hidden rounded-[4rem] border-8 border-white shadow-glow transition duration-700 hover:scale-[1.02]">
              <Image src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85" alt="טיפול פנים" fill sizes="320px" className="object-cover" />
            </div>
            <div className="float-soft absolute bottom-10 right-0 h-60 w-72 overflow-hidden rounded-[3rem] border-8 border-white shadow-soft">
              <Image src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85" alt="מוצרי טיפוח" fill sizes="300px" className="object-cover" />
            </div>
            <div className="absolute bottom-28 left-8 rounded-[2rem] bg-white/85 p-6 shadow-soft backdrop-blur">
              <p className="text-sm font-black text-blush-700">התחושה אחרי טיפול</p>
              <p className="mt-2 text-3xl font-black text-espresso">זוהרת. רגועה. בטוחה.</p>
            </div>
          </div>
        </div>
      </section>

      <MotionSection id="why" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-black text-blush-700">למה לבחור ביולי קוסמטיקס</p>
          <h2 className="mt-3 text-4xl font-black text-espresso md:text-5xl">לא עוד תור רגיל — חוויית בוטיק חכמה</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card rounded-[2rem] p-7 transition hover:-translate-y-2 hover:shadow-glow">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blush-100 to-gold-100 text-2xl text-blush-700">{benefit.icon}</div>
              <h3 className="text-2xl font-black text-espresso">{benefit.title}</h3>
              <p className="mt-4 leading-8 text-espresso/65">{benefit.text}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <BeautyAdvisorQuiz />
      </MotionSection>

      <MotionSection id="services" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black text-blush-700">טיפולים פופולריים</p>
            <h2 className="mt-3 text-4xl font-black text-espresso md:text-5xl">הטיפולים שהלקוחות הכי אוהבות</h2>
          </div>
          <Link href="/services" className="rounded-full border border-gold-300 bg-white/80 px-6 py-3 font-black text-espresso transition hover:-translate-y-1 hover:shadow-soft">
            לכל הטיפולים ←
          </Link>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="bg-white/55 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-black text-blush-700">לפני ואחרי</p>
            <h2 className="mt-3 text-4xl font-black text-espresso md:text-5xl">שינוי שמרגיש טבעי, נקי ומדויק</h2>
          </div>
          <BeforeAfterShowcase />
        </div>
      </MotionSection>

      <MotionSection id="gallery" className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black text-blush-700">גלריית השראה</p>
              <h2 className="mt-3 text-4xl font-black text-espresso md:text-5xl">תמונות שמספרות חוויה</h2>
            </div>
            <p className="leading-9 text-espresso/65">
              גלריה אינטראקטיבית עם Lightbox, זום עדין, שכבות צבע וטקסט שמרגישים כמו אתר מותג יופי מודרני.
            </p>
          </div>
          <ImageGallery />
        </div>
      </MotionSection>

      <MotionSection id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="relative min-h-[500px] overflow-hidden rounded-[3rem] shadow-soft">
          <Image src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1400&q=85" alt="יולי קוסמטיקס" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/45 to-transparent" />
          <div className="absolute bottom-6 right-6 rounded-[2rem] bg-white/85 p-5 shadow-soft backdrop-blur">
            <p className="text-sm font-black text-blush-700">יופי טבעי. גימור יוקרתי.</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-black text-blush-700">על הקליניקה</p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-espresso md:text-5xl">יולי קוסמטיקס מחברת בין רוגע, דיוק וטכנולוגיית טיפוח מודרנית.</h2>
          <p className="mt-6 text-lg leading-9 text-espresso/65">
            הקליניקה נבנתה כדי לתת תחושה של מותג יופי מתקדם: עיצוב נקי, חוויה נעימה, שירות אישי ותוצאה שמרגישה טבעית, נשית ומוקפדת.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-white/80 p-6 shadow-sm transition hover:-translate-y-1">
              <p className="text-3xl font-black text-espresso">01</p>
              <p className="mt-2 font-bold text-espresso/70">אבחון והתאמה</p>
            </div>
            <div className="rounded-[2rem] bg-white/80 p-6 shadow-sm transition hover:-translate-y-1">
              <p className="text-3xl font-black text-espresso">02</p>
              <p className="mt-2 font-bold text-espresso/70">טיפול מדויק וחוויה מרגיעה</p>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-black text-blush-700">מסע הלקוחה</p>
          <h2 className="mt-3 text-4xl font-black text-espresso md:text-5xl">מהרצון להתפנק ועד התור בקליניקה</h2>
        </div>
        <ClientJourney />
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-black text-blush-700">למה לקוחות חוזרות אלינו</p>
          <h2 className="mt-3 text-4xl font-black text-espresso md:text-5xl">כי החוויה מרגישה אישית, נקייה ומדויקת</h2>
        </div>
        <ReturnReasons />
      </MotionSection>

      <MotionSection id="testimonials" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <TestimonialsCarousel />
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-l from-espresso via-blush-700 to-gold-700 p-8 text-white shadow-soft md:p-14">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-center">
            <div>
              <p className="text-sm font-black text-gold-100">הגיע הזמן לתאם</p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">הטיפול הבא שלך מתחיל בלחיצה אחת.</h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/75">
                בחרי טיפול, תאריך ושעה מועדפת. אנחנו נחזור אלייך לאישור ונבנה לך חוויית טיפוח נעימה ומדויקת.
              </p>
            </div>
            <Link href="/booking" className="rounded-full bg-white px-9 py-4 text-center text-lg font-black text-espresso shadow-soft transition hover:-translate-y-1">
              התחילי הזמנה
            </Link>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="faq" className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
        <div>
          <p className="text-sm font-black text-blush-700">שאלות נפוצות</p>
          <h2 className="mt-3 text-4xl font-black text-espresso">כל מה שחשוב לדעת לפני שקובעים</h2>
        </div>
        <FaqAccordion />
      </MotionSection>

      <MotionSection id="contact" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid overflow-hidden rounded-[3rem] bg-white/80 shadow-soft lg:grid-cols-2">
          <div className="p-8 md:p-12">
            <p className="text-sm font-black text-blush-700">יצירת קשר ושעות פעילות</p>
            <h2 className="mt-3 text-4xl font-black text-espresso">נשמח לראות אותך ביולי קוסמטיקס</h2>
            <div className="mt-8 space-y-4 text-lg font-bold text-espresso/70">
              <p>ראשון - חמישי: 09:00-19:00</p>
              <p>שישי: 09:00-13:00</p>
              <p>טלפון: 050-0000000</p>
              <p>כתובת: ישראל</p>
            </div>
          </div>
          <div className="relative min-h-[380px]">
            <Image src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85" alt="סלון יופי" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
