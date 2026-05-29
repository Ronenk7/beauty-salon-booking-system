export type Service = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
};

export const services: Service[] = [
  {
    id: "hair-styling",
    name: "Hair Styling",
    description: "Professional styling for everyday looks and special events.",
    durationMinutes: 60,
    price: 180,
  },
  {
    id: "manicure",
    name: "Manicure",
    description: "Classic manicure with clean shaping and polish.",
    durationMinutes: 45,
    price: 120,
  },
  {
    id: "facial-treatment",
    name: "Facial Treatment",
    description: "Refreshing facial treatment for healthy-looking skin.",
    durationMinutes: 75,
    price: 250,
  },
  {
    id: "makeup",
    name: "Makeup",
    description: "Elegant makeup for events, meetings, and celebrations.",
    durationMinutes: 60,
    price: 220,
  },
];
