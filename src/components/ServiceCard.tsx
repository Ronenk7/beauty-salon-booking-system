import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div
        className="h-52 bg-cover bg-center transition duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${service.imageUrl})` }}
        aria-label={service.name}
      />
      <div className="p-6">
        <div className="mb-3 inline-flex rounded-full bg-blush-100 px-4 py-1 text-xs font-bold text-blush-700">
          טיפול מומלץ
        </div>
        <h3 className="text-2xl font-black text-espresso">{service.name}</h3>
        <p className="mt-3 min-h-20 text-sm leading-7 text-espresso/65">{service.description}</p>
        <div className="mt-6 flex items-center justify-between border-t border-beige/60 pt-5 text-sm font-bold text-espresso">
          <span>{service.durationMinutes} דקות</span>
          <span className="rounded-full bg-gold-100 px-4 py-2 text-gold-700">₪{service.price}</span>
        </div>
      </div>
    </article>
  );
}
