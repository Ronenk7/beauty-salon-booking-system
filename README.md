# יולי קוסמטיקס - Beauty Salon Booking System

אתר הזמנות מקצועי בעברית עבור קליניקת קוסמטיקה וטיפוח בשם **יולי קוסמטיקס**.

## Tech stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase

## Current features

- אתר מלא בעברית
- RTL מלא
- דף בית מודרני ויוקרתי בסגנון מותג ביוטי
- Hero גדול עם תמונות, גרדיאנטים ואפקטים עדינים
- ניווט דביק עם תפריט מובייל
- כפתור וואטסאפ צף
- גלריית תמונות אינטראקטיבית עם Lightbox
- קרוסלת המלצות
- FAQ Accordion
- דף טיפולים עם סינון לפי קטגוריות
- כרטיסי שירותים עם תמונות, מחיר, משך ותיאור
- תהליך קביעת תור בשלבים
- מצב הצלחה לאחר שליחת בקשה
- עמוד ניהול תורים בסיסי עם כרטיסי סטטיסטיקה
- ללא תשלומים וללא התחברות בשלב זה

## Project structure

```txt
src/
  app/
    page.tsx
    services/page.tsx
    booking/page.tsx
    booking/BookingForm.tsx
    admin/appointments/page.tsx
    globals.css
    layout.tsx
  components/
    FaqAccordion.tsx
    FloatingWhatsApp.tsx
    Footer.tsx
    Header.tsx
    ImageGallery.tsx
    ServiceCard.tsx
    ServiceFilter.tsx
    TestimonialsCarousel.tsx
  data/
    services.ts
  lib/
    supabase/client.ts
  types/
    appointment.ts
supabase/
  schema.sql
```

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env.local
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env.local
```

3. Add your Supabase values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Create the Supabase table:

Open your Supabase project, go to the SQL Editor, and run the SQL from:

```txt
supabase/schema.sql
```

5. Start the development server:

```bash
npm run dev
```

6. Open the app in your browser:

```txt
http://localhost:3000
```

## Main pages

- `/` - דף הבית
- `/services` - דף טיפולים עם סינון קטגוריות
- `/booking` - תהליך קביעת תור בשלבים
- `/admin/appointments` - עמוד ניהול תורים בסיסי

## Notes

This is still version 1. The admin page is intentionally simple and does not include login yet. Before production, add authentication, protected admin access, appointment availability checks, better validation, and real business contact details.

The website can run locally even before Supabase is configured, but booking submission and admin data require Supabase environment variables and the `appointments` table.
