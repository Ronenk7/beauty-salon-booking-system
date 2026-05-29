import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Services</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">Choose your beauty treatment</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          This page lists the first version of salon services. Later, these services can come from Supabase instead of a local file.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
