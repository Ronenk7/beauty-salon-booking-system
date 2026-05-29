export type Service = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  imageUrl: string;
};

export const services: Service[] = [
  {
    id: "facial-treatment",
    name: "טיפול פנים זוהר",
    description: "טיפול פנים מפנק לניקוי, רענון והענקת מראה קורן, נקי ובריא לעור.",
    durationMinutes: 75,
    price: 280,
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "eyebrow-design",
    name: "עיצוב גבות",
    description: "עיצוב מדויק ועדין של הגבות בהתאמה למבנה הפנים ולמראה טבעי ומחמיא.",
    durationMinutes: 30,
    price: 90,
    imageUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "manicure",
    name: "מניקור לק ג׳ל",
    description: "טיפול ידיים אלגנטי הכולל ניקוי, עיצוב ומריחת לק ג׳ל בגימור מוקפד.",
    durationMinutes: 60,
    price: 160,
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "makeup",
    name: "איפור ערב ואירועים",
    description: "איפור עדין, יוקרתי ועמיד לאירועים, צילומים וערבים מיוחדים.",
    durationMinutes: 60,
    price: 260,
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "laser-consultation",
    name: "ייעוץ טיפולי אסתטיקה",
    description: "פגישת התאמה אישית לבניית תכנית טיפוח מקצועית ונכונה עבורך.",
    durationMinutes: 30,
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "brow-lamination",
    name: "הרמת גבות",
    description: "טיפול למראה גבות מלא, מסודר ומורם עם תוצאה טבעית ואלגנטית.",
    durationMinutes: 45,
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  },
];
