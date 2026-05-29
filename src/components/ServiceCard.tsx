import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
      <p className="mt-3 text-sm leading-6 text-gray-600">{service.description}</p>
      <div className="mt-5 flex items-center justify-between text-sm font-medium text-gray-700">
        <span>{service.durationMinutes} minutes</span>
        <span>₪{service.price}</span>
      </div>
    </article>
  );
}
