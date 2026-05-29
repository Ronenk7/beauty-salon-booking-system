"use client";

import { useMemo, useState } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { serviceCategories, services, type ServiceCategory } from "@/data/services";

export function ServiceFilter() {
  const [activeCategory, setActiveCategory] = useState<"all" | ServiceCategory>("all");

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") {
      return services;
    }

    return services.filter((service) => service.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
        {serviceCategories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition ${
                isActive
                  ? "bg-espresso text-white shadow-soft"
                  : "border border-beige/70 bg-white/75 text-espresso hover:-translate-y-0.5 hover:border-gold-300"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {filteredServices.length === 0 ? (
        <div className="rounded-[2rem] bg-white/80 p-8 text-center text-espresso/65 shadow-soft">
          אין טיפולים בקטגוריה הזו כרגע.
        </div>
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
