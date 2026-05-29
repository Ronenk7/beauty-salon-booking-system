"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState, type PointerEvent } from "react";

type BloomCategory = "all" | "bridal" | "evening" | "facial" | "brows" | "nails" | "hair";

type BloomItem = {
  id: string;
  title: string;
  category: Exclude<BloomCategory, "all">;
  categoryLabel: string;
  description: string;
  imageUrl: string;
  alt: string;
};

const categories: { id: BloomCategory; label: string }[] = [
  { id: "all", label: "הכל" },
  { id: "bridal", label: "סלון כלות" },
  { id: "evening", label: "איפור ערב" },
  { id: "facial", label: "טיפולי פנים" },
  { id: "brows", label: "גבות וריסים" },
  { id: "nails", label: "ציפורניים" },
  { id: "hair", label: "טיפוח ושיער" },
];

const galleryItems: BloomItem[] = [
  {
    id: "bridal-soft-makeup",
    title: "כלה בזוהר רך",
    category: "bridal",
    categoryLabel: "סלון כלות",
    description: "מראה כלה נקי, רך ומואר שמרגיש טבעי אבל בלתי נשכח.",
    imageUrl: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "איפור כלה רך ויוקרתי",
  },
  {
    id: "bridal-hair",
    title: "שיער כלה אלגנטי",
    category: "bridal",
    categoryLabel: "סלון כלות",
    description: "עיצוב שיער מוקפד לכלה עם תחושה רומנטית, נקייה ויוקרתית.",
    imageUrl: "https://images.pexels.com/photos/1024981/pexels-photo-1024981.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "עיצוב שיער כלה",
  },
  {
    id: "bridal-preparation",
    title: "רגע לפני החופה",
    category: "bridal",
    categoryLabel: "סלון כלות",
    description: "הכנה רגועה, נשית ומדויקת ליום החשוב ביותר.",
    imageUrl: "https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "כלה מתכוננת באווירה יוקרתית",
  },
  {
    id: "bridal-luxury-beauty",
    title: "יופי כלות יוקרתי",
    category: "bridal",
    categoryLabel: "סלון כלות",
    description: "שילוב של עור זוהר, גימור עדין ונוכחות אלגנטית לצילומים.",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85",
    alt: "מראה כלה יוקרתי",
  },
  {
    id: "evening-glam",
    title: "גלאם ערב נקי",
    category: "evening",
    categoryLabel: "איפור ערב",
    description: "איפור ערב זוהר ומאוזן שמדגיש את הפנים בלי להעמיס.",
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=85",
    alt: "איפור ערב גלאם",
  },
  {
    id: "evening-elegant",
    title: "מראה ערב אלגנטי",
    category: "evening",
    categoryLabel: "איפור ערב",
    description: "לוק נשי, נקי ומרשים שמתאים לאירועים, צילומים וערבים מיוחדים.",
    imageUrl: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "איפור ערב אלגנטי",
  },
  {
    id: "evening-luxury-look",
    title: "איפור יוקרתי מודגש",
    category: "evening",
    categoryLabel: "איפור ערב",
    description: "מראה עם נוכחות, ברק עדין וגימור מקצועי לערב בלתי נשכח.",
    imageUrl: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "איפור יוקרתי מודגש",
  },
  {
    id: "evening-beauty-portrait",
    title: "פורטרט יופי זוהר",
    category: "evening",
    categoryLabel: "איפור ערב",
    description: "השראה למראה יוקרתי עם עור מואר, עיניים מודגשות ושפתיים נקיות.",
    imageUrl: "https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "פורטרט איפור ערב",
  },
  {
    id: "facial-glow-treatment",
    title: "טיפול פנים זוהר",
    category: "facial",
    categoryLabel: "טיפולי פנים",
    description: "טיפול שמחזיר לעור רעננות, ניקיון וזוהר טבעי.",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85",
    alt: "טיפול פנים זוהר",
  },
  {
    id: "facial-spa",
    title: "ספא פנים מרגיע",
    category: "facial",
    categoryLabel: "טיפולי פנים",
    description: "חוויה שקטה ומפנקת שמרגיעה את העור ואת הגוף.",
    imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=85",
    alt: "ספא פנים מרגיע",
  },
  {
    id: "facial-skincare",
    title: "אבחון וטיפוח עור",
    category: "facial",
    categoryLabel: "טיפולי פנים",
    description: "רגע טיפולי מקצועי שמותאם למצב העור ולמטרה האישית שלך.",
    imageUrl: "https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "אבחון וטיפוח עור הפנים",
  },
  {
    id: "facial-clinic",
    title: "קליניקת עור נקייה",
    category: "facial",
    categoryLabel: "טיפולי פנים",
    description: "אווירת טיפול נקייה, מקצועית ומתקדמת עם תחושת פרימיום.",
    imageUrl: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "קליניקת טיפולי פנים",
  },
  {
    id: "brows-precise",
    title: "גבות מדויקות",
    category: "brows",
    categoryLabel: "גבות וריסים",
    description: "מסגרת פנים מחמיאה עם עיצוב נקי, רך ומדויק.",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=85",
    alt: "עיצוב גבות מדויק",
  },
  {
    id: "brows-lashes-open",
    title: "ריסים במראה פתוח",
    category: "brows",
    categoryLabel: "גבות וריסים",
    description: "מראה עיניים פתוח, נשי ומואר בלי תחושה כבדה.",
    imageUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1400&q=85",
    alt: "ריסים במראה פתוח",
  },
  {
    id: "brows-lash-lift",
    title: "הרמת ריסים טבעית",
    category: "brows",
    categoryLabel: "גבות וריסים",
    description: "טיפול שמדגיש את העיניים ונותן מראה נקי, מסודר ומחמיא.",
    imageUrl: "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "הרמת ריסים טבעית",
  },
  {
    id: "brows-eye-beauty",
    title: "יופי סביב העיניים",
    category: "brows",
    categoryLabel: "גבות וריסים",
    description: "הדגשה עדינה של אזור העיניים עם תחושת יוקרה וניקיון.",
    imageUrl: "https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "יופי סביב העיניים",
  },
  {
    id: "nails-gel",
    title: "מניקור לק ג׳ל",
    category: "nails",
    categoryLabel: "ציפורניים",
    description: "גימור נקי, נשי ומבריק לידיים מטופחות בכל יום.",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85",
    alt: "מניקור לק ג׳ל",
  },
  {
    id: "nails-luxury",
    title: "ציפורניים בגימור יוקרתי",
    category: "nails",
    categoryLabel: "ציפורניים",
    description: "מראה מוקפד ומעודן עם תחושת פרימיום ודיוק.",
    imageUrl: "https://images.pexels.com/photos/3997382/pexels-photo-3997382.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "ציפורניים בגימור יוקרתי",
  },
  {
    id: "nails-art",
    title: "נייל ארט עדין",
    category: "nails",
    categoryLabel: "ציפורניים",
    description: "פרטים קטנים שמוסיפים אופי, אלגנטיות וברק רך.",
    imageUrl: "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "נייל ארט עדין",
  },
  {
    id: "nails-hands",
    title: "ידיים אלגנטיות",
    category: "nails",
    categoryLabel: "ציפורניים",
    description: "טיפוח ידיים נקי שמרגיש נשי, מסודר ומקצועי.",
    imageUrl: "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "ידיים אלגנטיות מטופחות",
  },
  {
    id: "hair-styling-soft",
    title: "עיצוב שיער רך",
    category: "hair",
    categoryLabel: "טיפוח ושיער",
    description: "שיער מסודר, זוהר ורך עם תנועה טבעית ומראה יוקרתי.",
    imageUrl: "https://images.pexels.com/photos/3993468/pexels-photo-3993468.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "עיצוב שיער רך",
  },
  {
    id: "hair-salon-care",
    title: "טיפול סלון מפנק",
    category: "hair",
    categoryLabel: "טיפוח ושיער",
    description: "חוויה רגועה של טיפוח, ברק ותנועה עם תחושת סלון יוקרתי.",
    imageUrl: "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "טיפול שיער בסלון",
  },
  {
    id: "hair-spa-atmosphere",
    title: "אווירת ספא יוקרתית",
    category: "hair",
    categoryLabel: "טיפוח ושיער",
    description: "רגע של שקט, טיפוח ורכות שמרגיש כמו הפסקה מהיום.",
    imageUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1400&q=85",
    alt: "אווירת ספא יוקרתית",
  },
  {
    id: "hair-beauty-care",
    title: "טקס טיפוח אישי",
    category: "hair",
    categoryLabel: "טיפוח ושיער",
    description: "שילוב של טיפוח, אסתטיקה ותחושת רעננות לכל מראה.",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85",
    alt: "טקס טיפוח אישי",
  },
];

const bouquetSlots = [
  { className: "left-[35%] top-[18%] h-[420px] w-[340px] rotate-0", focusClassName: "h-[460px] w-[370px]", zIndex: 40, x: 0, y: 0 },
  { className: "left-[9%] top-[9%] h-[260px] w-[220px] -rotate-[13deg]", focusClassName: "h-[330px] w-[265px]", zIndex: 24, x: -18, y: -10 },
  { className: "left-[66%] top-[8%] h-[285px] w-[230px] rotate-[12deg]", focusClassName: "h-[340px] w-[275px]", zIndex: 24, x: 16, y: -12 },
  { className: "left-[15%] top-[47%] h-[280px] w-[235px] rotate-[9deg]", focusClassName: "h-[340px] w-[275px]", zIndex: 22, x: -15, y: 14 },
  { className: "left-[62%] top-[48%] h-[300px] w-[245px] -rotate-[10deg]", focusClassName: "h-[350px] w-[285px]", zIndex: 22, x: 15, y: 16 },
  { className: "left-[3%] top-[34%] h-[230px] w-[200px] rotate-[18deg]", focusClassName: "h-[300px] w-[240px]", zIndex: 16, x: -22, y: 8 },
  { className: "left-[78%] top-[35%] h-[235px] w-[205px] -rotate-[18deg]", focusClassName: "h-[300px] w-[240px]", zIndex: 16, x: 22, y: 8 },
  { className: "left-[41%] top-[62%] h-[245px] w-[220px] rotate-[4deg]", focusClassName: "h-[315px] w-[260px]", zIndex: 18, x: 0, y: 22 },
];

export function BloomGallery() {
  const [activeCategory, setActiveCategory] = useState<BloomCategory>("all");
  const [focusedId, setFocusedId] = useState(galleryItems[0].id);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visibleItems = filteredItems.slice(0, 8);
  const selectedItem = selectedIndex === null ? null : filteredItems[selectedIndex];

  useEffect(() => {
    if (visibleItems.length > 0 && !visibleItems.some((item) => item.id === focusedId)) {
      setFocusedId(visibleItems[0].id);
    }
  }, [focusedId, visibleItems]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (selectedIndex === null) {
        return;
      }

      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        goToPrevious();
      }

      if (event.key === "ArrowLeft") {
        goToNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setPointerPosition({ x, y });
  }

  function changeCategory(categoryId: BloomCategory) {
    const nextItems = categoryId === "all" ? galleryItems : galleryItems.filter((item) => item.category === categoryId);
    setActiveCategory(categoryId);
    setFocusedId(nextItems[0]?.id ?? galleryItems[0].id);
    setSelectedIndex(null);
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_8%,rgba(248,212,219,0.55),transparent_28rem),radial-gradient(circle_at_8%_55%,rgba(230,201,119,0.35),transparent_26rem)]" />
      <div className="absolute left-8 top-16 h-40 w-40 rounded-full bg-blush-200/50 blur-3xl" />
      <div className="absolute bottom-16 right-10 h-52 w-52 rounded-full bg-gold-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-black text-blush-700">גלריית Bloom</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-espresso md:text-6xl">
              גלריה אינטראקטיבית שנפתחת כמו זר פרחים יוקרתי.
            </h2>
          </div>
          <p className="max-w-3xl rounded-[2rem] bg-white/75 p-6 leading-9 text-espresso/72 shadow-sm ring-1 ring-white/80 backdrop-blur">
            חוויה אינטראקטיבית של יופי, זוהר וטיפוח — תמונות שנעות בעדינות, מתמקדות במגע ונפתחות לחוויה גדולה ומרשימה.
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
                onClick={() => changeCategory(category.id)}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition ${
                  isActive
                    ? "bg-gradient-to-l from-espresso to-blush-700 text-white shadow-soft"
                    : "border border-beige/70 bg-white/80 text-espresso hover:border-gold-300 hover:bg-white"
                }`}
              >
                {category.label}
              </motion.button>
            );
          })}
        </div>

        <div
          onPointerMove={handlePointerMove}
          className="relative hidden min-h-[74vh] overflow-hidden rounded-[3.5rem] border border-white/80 bg-gradient-to-br from-pearl/80 via-cream/70 to-blush-50/70 p-6 shadow-soft backdrop-blur-xl lg:block"
        >
          <div className="absolute inset-x-20 bottom-8 h-24 rounded-full bg-gradient-to-l from-gold-100/60 via-blush-100/40 to-transparent blur-2xl" />
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => {
              const slot = bouquetSlots[index % bouquetSlots.length];
              const isFocused = focusedId === item.id;
              const parallaxX = pointerPosition.x * slot.x;
              const parallaxY = pointerPosition.y * slot.y;
              const itemIndex = filteredItems.findIndex((galleryItem) => galleryItem.id === item.id);

              return (
                <motion.button
                  key={`${activeCategory}-${item.id}`}
                  type="button"
                  layout
                  initial={false}
                  animate={{
                    x: parallaxX,
                    y: parallaxY,
                    scale: isFocused ? 1.08 : 0.94,
                    rotate: isFocused ? 0 : undefined,
                  }}
                  transition={{ type: "spring", stiffness: 130, damping: 18 }}
                  onMouseEnter={() => setFocusedId(item.id)}
                  onFocus={() => setFocusedId(item.id)}
                  onClick={() => openItem(itemIndex)}
                  className={`group absolute ${slot.className} ${isFocused ? slot.focusClassName : ""} overflow-hidden rounded-[2.4rem] text-right transition-shadow ${
                    isFocused ? "shadow-[0_28px_90px_rgba(201,166,70,0.38)] ring-2 ring-gold-300" : "shadow-soft"
                  }`}
                  style={{ zIndex: isFocused ? 70 : slot.zIndex }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className={`object-cover transition duration-700 ${isFocused ? "scale-110 saturate-125 brightness-110" : "scale-100 brightness-75 saturate-75 blur-[1px] group-hover:blur-0"}`}
                  />
                  <div className={`absolute inset-0 transition ${isFocused ? "bg-gradient-to-t from-espresso/62 via-transparent to-transparent" : "bg-espresso/22"}`} />
                  <div className="absolute bottom-5 right-5 left-5">
                    <div className="mb-3 inline-flex rounded-full border border-white/35 bg-white/20 px-4 py-2 text-xs font-black text-cream backdrop-blur">
                      {item.categoryLabel}
                    </div>
                    <h3 className="text-2xl font-black text-white drop-shadow-sm">{item.title}</h3>
                    {isFocused && <p className="mt-2 max-w-md leading-7 text-white/86">{item.description}</p>}
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar lg:hidden">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openItem(index)}
              className="group relative h-[430px] min-w-[82%] overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-white/80"
            >
              <Image src={item.imageUrl} alt={item.alt} fill sizes="85vw" className="object-cover transition duration-700 group-active:scale-105" />
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
                <Image src={selectedItem.imageUrl} alt={selectedItem.alt} fill sizes="90vw" className="object-cover" />
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
