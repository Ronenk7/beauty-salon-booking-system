import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function HomePage() {
  const featuredServices = services.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Professional beauty salon
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
            Simple online booking for beauty services.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Book hair styling, manicure, facial treatments, and makeup appointments in a clean and easy way.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-500"
            >
              Book appointment
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:border-brand-500"
            >
              View services
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-orange-100">
          <h2 className="text-2xl font-semibold text-gray-900">Why customers love us</h2>
          <ul className="mt-6 space-y-4 text-gray-600">
            <li>• Easy appointment booking</li>
            <li>• Clear service list and prices</li>
            <li>• Professional and friendly salon experience</li>
            <li>• Simple admin view for appointment tracking</li>
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Popular services</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-950">Start with our main treatments</h2>
          </div>
          <Link href="/services" className="text-sm font-semibold text-brand-600 hover:text-brand-900">
            See all services
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
