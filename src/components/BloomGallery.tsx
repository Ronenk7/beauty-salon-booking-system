"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

type BloomCategory = "all" | "facial" | "brows" | "makeup" | "nails" | "beauty";

type BloomItem = {
  id: string;
  title: string;
  description: string;
  category: Exclude<BloomCategory, "all">;
  categoryLabel: string;
  imageUrl: string;
};

const categories: { id: BloomCategory; label: string }[] = [
  { id: "all", label: "הכל" },
  { id: "facial", label: "טיפולי פנים" },
  { id: "brows", label: "גבות וריסים" },
  { id: "makeup", label: "איפור" },
  { id: "nails", label: "ציפורניים" },
  { id: "beauty", label: "טיפוח כללי" },
];

const bloomItems: BloomItem[] = [
  {
    id: "natural-glow",
    title: "זוהר טבעי לפנים",
    description: "מראה עור נקי, רגוע ומואר שמרגיש טבעי ולא מתאמץ.",
    category: "facial",
    categoryLabel: "טיפולי פנים",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "precise-brows",
    title: "גבות מדויקות",
    description: "מסגרת פנים נקייה, אלגנטית ומחמיאה עם גימור עדין.",
    category: "brows",
    categoryLabel: "גבות וריסים",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "evening-look",
    title: "מראה ערב אלגנטי",
    description: "איפור זוהר, יוקרתי ומאוזן שמתאים לאירועים ולצילומים.",
    category: "makeup",
    categoryLabel: "איפור",
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "luxury-nails",
    title: "ציפורניים בגימור יוקרתי",
    description: "ידיים מטופחות, נקיות ונשיות עם גימור שמרגיש פרימיום.",
    category: "nails",
    categoryLabel: "ציפורניים",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "calm-facial",
    title: "טיפול פנים מרגיע",
    description: "חוויה שקטה ורכה שמחזירה לעור תחושת רעננות וניקיון.",
    category: "facial",
    categoryLabel: "טיפולי פנים",
    imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "open-lashes",
    title: "ריסים במראה פתוח",
    description: "מראה עיניים פתוח, נקי ומחמיא בלי להרגיש מוגזם.",
    category: "brows",
    categoryLabel: "גבות וריסים",
    imageUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "soft-glam",
    title: "סופט גלאם נשי",
    description: "שילוב של רכות, זוהר ונוכחות אלגנטית לערב מיוחד.",
    category: "makeup",
    categoryLabel: "איפור",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "beauty-ritual",
    title: "רגע טיפוח אישי",
    description: "תחושת ספא פרטית עם אסתטיקה נקייה, רכה ומוקפדת.",
    category: "beauty",
    categoryLabel: "טיפוח כללי",
    imageUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=85",
  },
];

const desktopPositions = [
  "lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:row-span-2",
  "lg:col-start-5 lg:col-span-3 lg:row-start-1",
  "lg:col-start-8 lg:col-span-4 lg:row-start-1 lg:row-span-2",
  "lg:col-start-5 lg:col-span-3 lg:row-start-2",
  "lg:col-start-1 lg:col-span-3 lg:row-start-3",
  "lg:col-start-4 lg:col-span-4 lg:row-start-3",
  "lg:col-start-8 lg:col-span-4 lg:row-start-3",
  "lg:col-start-3 lg:col-span-8 lg:row-start-4",
];

export function BloomGallery() {
  const [activeCategory, setActiveCategory] = useState<BloomCategory>("all");
  const [focusedId, setFocusedId] = useState(bloomItems[0].id);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return bloomItems;
    }

    return bloomItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const selectedItem = selectedIndex === null ? null : filteredItems[selectedIndex];

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setPointerPosition({ x, y });
  }

  function openItem(index: number) {
    setSelectedIndex(index);
  }

  function closeModal() {
    setSelectedIndex(null);
  }

  function goToNext() {
    setSelectedIndex((current) => {
      if (current === null) {
        return 0;
      }

      return (current + 1) % filteredItems.length;
    });
  }

  function goToPrevious() {
    setSelectedIndex((current) => {
      if (current === null) {
        return 0;
      }

      return (current - 1 + filteredItems.length) % filteredItems.length;
    });
  }

  return (
    <section id="bloom-gallery" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(248,212,219,0.55),transparent_28rem),radial-gradient(circle_at_10%_65%,rgba(230,201,119,0.28),transparent_24rem)]" />
      <div className="absolute left-8 top-16 h-36 w-36 rounded-full bg-blush-200/50 blur-3xl" />
      <div className="absolute bottom-16 right-10 h-44 w-44 rounded-full bg-gold-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-black text-blush-700">גלריית Bloom</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-espresso md:text-6xl">
              רגעים של יופי שנפתחים כמו זר פרחים יוקרתי.
            </h2>
          </div>
          <p className="max-w-3xl rounded-[2rem] bg-white/70 p-6 leading-9 text-espresso/70 shadow-sm ring-1 ring-white/80 backdrop-blur">
            רגעים של יופי, זוהר וטיפוח — מוצגים בחוויה אינטראקטיבית שמרגישה חיה, נשית ומודרנית.
          </p>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <motion.button
                key={category.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveCategory(category.id);
                  setFocusedId(bloomItems[0].id);
                  setSelectedIndex(null);
                }}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition ${
                  isActive
                    ? "bg-gradient-to-l from-espresso to-blush-700 text-white shadow-soft"
                    : "border border-beige/70 bg-white/75 text-espresso hover:border-gold-300 hover:bg-white"
                }`}
              >
                {category.label}
              </motion.button>
            );
          })}
        </div>

        <div
          onPointerMove={handlePointerMove}
          className="hidden min-h-[720px] grid-cols-11 grid-rows-4 gap-5 rounded-[3rem] border border-white/70 bg-white/45 p-5 shadow-soft backdrop-blur-xl lg:grid"
        >
          {filteredItems.map((item, index) => {
            const isFocused = focusedId === item.id;
            const position = desktopPositions[index % desktopPositions.length];
            const x = pointerPosition.x * (index % 2 === 0 ? 18 : -14);
            const y = pointerPosition.y * (index % 3 === 0 ? 16 : -12);

            return (
              <motion.button
                key={item.id}
                type="button"
                initial={false}
                animate={{ x, y, scale: isFocused ? 1.03 : 0.96 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                onMouseEnter={() => setFocusedId(item.id)}
                onFocus={() => setFocusedId(item.id)}
                onClick={() => openItem(index)}
                className={`group relative overflow-hidden rounded-[2.2rem] text-right shadow-soft transition ${position} ${
                  isFocused ? "z-20 ring-2 ring-gold-300" : "z-10 opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className={`object-cover transition duration-700 ${isFocused ? "scale-110 brightness-105" : "scale-100 brightness-75 blur-[1px] group-hover:blur-0"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/78 via-espresso/15 to-transparent" />
                <div className="absolute bottom-5 right-5 left-5">
                  <div className="mb-3 inline-flex rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-black text-cream backdrop-blur">
                    {item.categoryLabel}
                  </div>
                  <h3 className="text-2xl font-black text-white drop-shadow-sm">{item.title}</h3>
                  {isFocused && <p className="mt-2 max-w-md leading-7 text-white/82">{item.description}</p>}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar lg:hidden">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openItem(index)}
              className="group relative h-[430px] min-w-[82%] overflow-hidden rounded-[2rem] bg-white shadow-soft"
            >
              <Image src={item.imageUrl} alt={item.title} fill sizes="85vw" className="object-cover transition duration-700 group-active:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/78 via-espresso/10 to-transparent" />
              <div className="absolute bottom-5 right-5 left-5 text-right">
                <div className="mb-3 inline-flex rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-black text-cream backdrop-blur">
                  {item.categoryLabel}
                </div>
                <h3 className="text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-2 leading-7 text-white/82">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-espresso/82 p-4 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.96, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 18 }}
              transition={{ duration: 0.25 }}
              className="relative grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2.5rem] bg-pearl shadow-soft lg:grid-cols-[1.25fr_0.75fr]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative min-h-[55vh] lg:min-h-[78vh]">
                <Image src={selectedItem.imageUrl} alt={selectedItem.title} fill sizes="90vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 to-transparent lg:hidden" />
              </div>

              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="mb-4 inline-flex rounded-full bg-gold-100 px-4 py-2 text-xs font-black text-gold-700">
                    {selectedItem.categoryLabel}
                  </div>
                  <h3 className="text-4xl font-black leading-tight text-espresso">{selectedItem.title}</h3>
                  <p className="mt-5 text-lg leading-9 text-espresso/70">{selectedItem.description}</p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={goPrevious} className="rounded-full border border-beige bg-white px-6 py-3 font-black text-espresso transition hover:-translate-y-1">
                    הקודם
                  </button>
                  <button type="button" onClick={goToNext} className="rounded-full border border-beige bg-white px-6 py-3 font-black text-espresso transition hover:-translate-y-1">
                    הבא
                  </button>
                  <button type="button" onClick={closeModal} className="rounded-full bg-espresso px-6 py-3 font-black text-white transition hover:-translate-y-1 hover:bg-blush-700">
                    סגירה
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
