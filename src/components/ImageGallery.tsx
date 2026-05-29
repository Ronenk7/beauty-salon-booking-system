"use client";

import Image from "next/image";
import { useState } from "react";

const galleryItems = [
  {
    title: "אווירת קליניקה",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "טיפול פנים",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "איפור זוהר",
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "טיפוח ידיים",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "מוצרי טיפוח",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "חוויה רגועה",
    imageUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=85",
  },
];

export function ImageGallery() {
  const [activeImage, setActiveImage] = useState<(typeof galleryItems)[number] | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <button
            key={item.imageUrl}
            type="button"
            onClick={() => setActiveImage(item)}
            className={`group relative h-56 overflow-hidden rounded-[2rem] shadow-soft transition hover:-translate-y-1 hover:shadow-glow ${
              index === 0 || index === 5 ? "lg:h-72" : ""
            }`}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 to-transparent opacity-80" />
            <div className="absolute bottom-4 right-4 rounded-full bg-white/80 px-4 py-2 text-sm font-black text-espresso backdrop-blur">
              {item.title}
            </div>
          </button>
        ))}
      </div>

      {activeImage && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/75 p-5 backdrop-blur-sm" onClick={() => setActiveImage(null)}>
          <div className="relative h-[70vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-soft" onClick={(event) => event.stopPropagation()}>
            <Image src={activeImage.imageUrl} alt={activeImage.title} fill sizes="90vw" className="object-cover" />
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute left-5 top-5 rounded-full bg-white/90 px-5 py-3 text-sm font-black text-espresso shadow-soft"
            >
              סגירה
            </button>
            <div className="absolute bottom-5 right-5 rounded-full bg-white/90 px-5 py-3 text-sm font-black text-espresso shadow-soft">
              {activeImage.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
