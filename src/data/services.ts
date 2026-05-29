export type ServiceCategory = "facial" | "brows" | "makeup" | "nails" | "beauty";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  description: string;
  durationMinutes: number;
  price: number;
  imageUrl: string;
  isPopular?: boolean;
};

export const serviceCategories: { id: "all" | ServiceCategory; label: string }[] = [
  { id: "all", label: "הכל" },
  { id: "facial", label: "טיפולי פנים" },
  { id: "brows", label: "גבות וריסים" },
  { id: "makeup", label: "איפור" },
  { id: "nails", label: "ציפורניים" },
  { id: "beauty", label: "טיפולי יופי" },
];

export const services: Service[] = [
  {
    id: "facial-glow",
    name: "טיפול פנים זוהר",
    category: "facial",
    categoryLabel: "טיפולי פנים",
    description: "טיפול פנים מפנק לניקוי, רענון והענקת מראה קורן, נקי ובריא לעור.",
    durationMinutes: 75,
    price: 280,
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
    isPopular: true,
  },
  {
    id: "deep-cleansing",
    name: "ניקוי עמוק לעור הפנים",
    category: "facial",
    categoryLabel: "טיפולי פנים",
    description: "ניקוי יסודי ועדין לעור עייף או עמוס, עם תחושה נקייה ורעננה כבר בסיום הטיפול.",
    durationMinutes: 90,
    price: 340,
    imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "eyebrow-design",
    name: "עיצוב גבות",
    category: "brows",
    categoryLabel: "גבות וריסים",
    description: "עיצוב מדויק ועדין של הגבות בהתאמה למבנה הפנים ולמראה טבעי ומחמיא.",
    durationMinutes: 30,
    price: 90,
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
    isPopular: true,
  },
  {
    id: "brow-lamination",
    name: "הרמת גבות",
    category: "brows",
    categoryLabel: "גבות וריסים",
    description: "טיפול למראה גבות מלא, מסודר ומורם עם תוצאה טבעית ואלגנטית.",
    durationMinutes: 45,
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "evening-makeup",
    name: "איפור ערב ואירועים",
    category: "makeup",
    categoryLabel: "איפור",
    description: "איפור עדין, יוקרתי ועמיד לאירועים, צילומים וערבים מיוחדים.",
    durationMinutes: 60,
    price: 260,
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85",
    isPopular: true,
  },
  {
    id: "soft-glam",
    name: "איפור סופט גלאם",
    category: "makeup",
    categoryLabel: "איפור",
    description: "מראה נקי, זוהר ומודרני שמתאים לצילומים, אירועים קטנים ומראה ערב אלגנטי.",
    durationMinutes: 50,
    price: 230,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "gel-manicure",
    name: "מניקור לק ג׳ל",
    category: "nails",
    categoryLabel: "ציפורניים",
    description: "טיפול ידיים אלגנטי הכולל ניקוי, עיצוב ומריחת לק ג׳ל בגימור מוקפד.",
    durationMinutes: 60,
    price: 160,
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "spa-manicure",
    name: "מניקור ספא מפנק",
    category: "nails",
    categoryLabel: "ציפורניים",
    description: "טיפול ידיים רך ומרגיע עם טיפוח, לחות וגימור נקי למראה מוקפד.",
    durationMinutes: 70,
    price: 190,
    imageUrl: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "beauty-consultation",
    name: "ייעוץ טיפולי אסתטיקה",
    category: "beauty",
    categoryLabel: "טיפולי יופי",
    description: "פגישת התאמה אישית לבניית תכנית טיפוח מקצועית ונכונה עבורך.",
    durationMinutes: 30,
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=85",
  },
];
