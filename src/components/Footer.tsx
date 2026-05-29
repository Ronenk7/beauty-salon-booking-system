import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-beige/70 bg-espresso text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="text-2xl font-black">יולי קוסמטיקס</div>
          <p className="mt-4 max-w-xl leading-8 text-white/70">
            קליניקת טיפוח וקוסמטיקה באווירה יוקרתית, רגועה ומקצועית. כאן כל טיפול נבנה סביבך, עם יחס אישי, דיוק ואהבה ליופי טבעי.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gold-300">ניווט</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link href="/">בית</Link>
            <Link href="/services">טיפולים</Link>
            <Link href="/booking">קביעת תור</Link>
            <Link href="/admin/appointments">ניהול</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gold-300">יצירת קשר</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>ראשון - חמישי: 09:00-19:00</p>
            <p>טלפון: 050-0000000</p>
            <p>כתובת: ישראל</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-white/55">
        © {new Date().getFullYear()} יולי קוסמטיקס. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
