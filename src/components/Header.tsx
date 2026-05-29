import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Book Appointment" },
  { href: "/admin/appointments", label: "Admin" },
];

export function Header() {
  return (
    <header className="border-b border-orange-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-brand-900">
          Glow Beauty Salon
        </Link>

        <nav className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-600">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
