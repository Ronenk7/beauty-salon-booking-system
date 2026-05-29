import Link from "next/link";

export function MobileBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/70 bg-pearl/90 p-3 shadow-soft backdrop-blur-xl md:hidden">
      <Link
        href="/booking"
        className="flex w-full items-center justify-center rounded-full bg-espresso px-6 py-4 text-sm font-black text-white shadow-soft transition active:scale-95"
      >
        קבעי תור עכשיו
      </Link>
    </div>
  );
}
