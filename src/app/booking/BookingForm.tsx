"use client";

import { FormEvent, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { services } from "@/data/services";

const initialForm = {
  customer_name: "",
  customer_phone: "",
  service_id: services[0]?.id ?? "",
  appointment_date: "",
  appointment_time: "",
  notes: "",
};

export function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedService = useMemo(() => {
    return services.find((service) => service.id === form.service_id);
  }, [form.service_id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (!form.customer_name.trim()) {
      setErrorMessage("נא להזין שם מלא.");
      return;
    }

    if (!form.customer_phone.trim() || form.customer_phone.trim().length < 9) {
      setErrorMessage("נא להזין מספר טלפון תקין.");
      return;
    }

    if (!form.appointment_date || !form.appointment_time) {
      setErrorMessage("נא לבחור תאריך ושעה לתור.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage("האתר עובד, אך Supabase עדיין לא הוגדר. יש להוסיף משתני סביבה בקובץ .env.local.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("appointments").insert({
      customer_name: form.customer_name,
      customer_phone: form.customer_phone,
      service_id: form.service_id,
      appointment_date: form.appointment_date,
      appointment_time: form.appointment_time,
      notes: form.notes,
      status: "pending",
    });

    if (error) {
      setErrorMessage("לא הצלחנו לשמור את התור. נא לבדוק את הגדרת טבלת Supabase ולנסות שוב.");
      setIsSubmitting(false);
      return;
    }

    setForm(initialForm);
    setMessage("בקשת התור נשלחה בהצלחה. נחזור אלייך לאישור סופי.");
    setIsSubmitting(false);
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-soft backdrop-blur md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold text-espresso">שם מלא</span>
            <input
              required
              value={form.customer_name}
              onChange={(event) => updateField("customer_name", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-3 text-sm text-espresso transition focus:border-blush-500 focus:bg-white"
              placeholder="השם שלך"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-espresso">טלפון</span>
            <input
              required
              inputMode="tel"
              value={form.customer_phone}
              onChange={(event) => updateField("customer_phone", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-3 text-sm text-espresso transition focus:border-blush-500 focus:bg-white"
              placeholder="050-0000000"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-bold text-espresso">בחירת טיפול</span>
            <select
              required
              value={form.service_id}
              onChange={(event) => updateField("service_id", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-3 text-sm text-espresso transition focus:border-blush-500 focus:bg-white"
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ₪{service.price}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-espresso">תאריך</span>
            <input
              required
              type="date"
              value={form.appointment_date}
              onChange={(event) => updateField("appointment_date", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-3 text-sm text-espresso transition focus:border-blush-500 focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-espresso">שעה מועדפת</span>
            <input
              required
              type="time"
              value={form.appointment_time}
              onChange={(event) => updateField("appointment_time", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-3 text-sm text-espresso transition focus:border-blush-500 focus:bg-white"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-bold text-espresso">הערות נוספות</span>
            <textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-3 text-sm text-espresso transition focus:border-blush-500 focus:bg-white"
              placeholder="רגישות, בקשה מיוחדת, או כל פרט שחשוב שנדע"
              rows={4}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-7 w-full rounded-full bg-espresso px-8 py-4 text-base font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-blush-700 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
        >
          {isSubmitting ? "שולחת בקשה..." : "שליחת בקשת תור"}
        </button>

        {message && <p className="mt-5 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">{message}</p>}
        {errorMessage && <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{errorMessage}</p>}
      </form>

      <aside className="rounded-[2rem] border border-gold-300/40 bg-gold-100/45 p-7 shadow-soft">
        <p className="text-sm font-black text-gold-700">סיכום בחירה</p>
        <h2 className="mt-3 text-3xl font-black text-espresso">{selectedService?.name ?? "בחרי טיפול"}</h2>
        <p className="mt-4 leading-8 text-espresso/65">{selectedService?.description ?? "לאחר בחירת טיפול יוצג כאן סיכום קצר."}</p>
        <div className="mt-7 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/70 p-4">
            <div className="text-xs font-bold text-espresso/55">משך טיפול</div>
            <div className="mt-1 text-xl font-black text-espresso">{selectedService?.durationMinutes ?? "-"} דקות</div>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <div className="text-xs font-bold text-espresso/55">מחיר</div>
            <div className="mt-1 text-xl font-black text-espresso">₪{selectedService?.price ?? "-"}</div>
          </div>
        </div>
        <p className="mt-6 text-sm leading-7 text-espresso/60">
          שליחת הטופס אינה מהווה אישור סופי. צוות יולי קוסמטיקס יחזור אלייך לאישור התור.
        </p>
      </aside>
    </div>
  );
}
