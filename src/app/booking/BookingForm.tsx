"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { services } from "@/data/services";

const steps = ["בחירת טיפול", "תאריך ושעה", "פרטים אישיים", "אישור"];

type BookingFormProps = {
  initialServiceId?: string;
};

function getInitialForm(initialServiceId?: string) {
  const serviceExists = services.some((service) => service.id === initialServiceId);

  return {
    customer_name: "",
    customer_phone: "",
    service_id: serviceExists ? (initialServiceId as string) : services[0]?.id ?? "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
  };
}

export function BookingForm({ initialServiceId }: BookingFormProps) {
  const [form, setForm] = useState(() => getInitialForm(initialServiceId));
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedService = useMemo(() => {
    return services.find((service) => service.id === form.service_id);
  }, [form.service_id]);

  function updateField(field: keyof typeof form, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  function validateStep(step: number) {
    setErrorMessage("");

    if (step === 0 && !form.service_id) {
      setErrorMessage("נא לבחור טיפול.");
      return false;
    }

    if (step === 1 && (!form.appointment_date || !form.appointment_time)) {
      setErrorMessage("נא לבחור תאריך ושעה מועדפת.");
      return false;
    }

    if (step === 2) {
      if (!form.customer_name.trim()) {
        setErrorMessage("נא להזין שם מלא.");
        return false;
      }

      if (!form.customer_phone.trim() || form.customer_phone.trim().length < 9) {
        setErrorMessage("נא להזין מספר טלפון תקין.");
        return false;
      }
    }

    return true;
  }

  function goNext() {
    if (validateStep(currentStep)) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
    }
  }

  function goBack() {
    setErrorMessage("");
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateStep(2)) {
      setCurrentStep(2);
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

    setForm(getInitialForm(initialServiceId));
    setCurrentStep(0);
    setSuccessMessage("בקשת התור נשלחה בהצלחה. נחזור אלייך לאישור סופי.");
    setIsSubmitting(false);
  }

  if (successMessage) {
    return (
      <div className="mx-auto max-w-3xl rounded-[3rem] bg-white/85 p-10 text-center shadow-soft">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl text-green-600">✓</div>
        <h2 className="mt-6 text-4xl font-black text-espresso">הבקשה התקבלה</h2>
        <p className="mt-4 text-lg leading-8 text-espresso/65">{successMessage}</p>
        <button type="button" onClick={() => setSuccessMessage("")} className="mt-8 rounded-full bg-espresso px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-blush-700">
          קביעת תור נוסף
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
      <form onSubmit={handleSubmit} className="glass-card rounded-[3rem] p-6 md:p-8">
        <div className="mb-8 grid gap-3 sm:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className={`rounded-2xl px-4 py-3 text-center text-sm font-black transition ${index <= currentStep ? "bg-espresso text-white" : "bg-white/70 text-espresso/55"}`}>
              <span className="mb-1 block text-xs opacity-70">שלב {index + 1}</span>
              {step}
            </div>
          ))}
        </div>

        {currentStep === 0 && (
          <div className="reveal">
            <h2 className="text-3xl font-black text-espresso">איזה טיפול תרצי?</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {services.map((service) => {
                const isSelected = form.service_id === service.id;

                return (
                  <button key={service.id} type="button" onClick={() => updateField("service_id", service.id)} className={`overflow-hidden rounded-[2rem] text-right shadow-sm ring-2 transition hover:-translate-y-1 ${isSelected ? "ring-espresso" : "ring-transparent"}`}>
                    <div className="relative h-36">
                      <Image src={service.imageUrl} alt={service.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                    </div>
                    <div className="bg-white/90 p-4">
                      <p className="text-xs font-black text-blush-700">{service.categoryLabel}</p>
                      <h3 className="mt-1 text-lg font-black text-espresso">{service.name}</h3>
                      <p className="mt-2 text-sm text-espresso/60">{service.durationMinutes} דקות • ₪{service.price}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="reveal">
            <h2 className="text-3xl font-black text-espresso">מתי נוח לך להגיע?</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-espresso">תאריך</span>
                <input required type="date" value={form.appointment_date} onChange={(event) => updateField("appointment_date", event.target.value)} className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-4 text-sm text-espresso transition focus:border-blush-500 focus:bg-white" />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-espresso">שעה מועדפת</span>
                <input required type="time" value={form.appointment_time} onChange={(event) => updateField("appointment_time", event.target.value)} className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-4 text-sm text-espresso transition focus:border-blush-500 focus:bg-white" />
              </label>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="reveal">
            <h2 className="text-3xl font-black text-espresso">נעים להכיר</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-espresso">שם מלא</span>
                <input required value={form.customer_name} onChange={(event) => updateField("customer_name", event.target.value)} className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-4 text-sm text-espresso transition focus:border-blush-500 focus:bg-white" placeholder="השם שלך" />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-espresso">טלפון</span>
                <input required inputMode="tel" value={form.customer_phone} onChange={(event) => updateField("customer_phone", event.target.value)} className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-4 text-sm text-espresso transition focus:border-blush-500 focus:bg-white" placeholder="050-0000000" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-bold text-espresso">הערות נוספות</span>
                <textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value)} className="mt-2 w-full rounded-2xl border border-beige/70 bg-pearl px-4 py-4 text-sm text-espresso transition focus:border-blush-500 focus:bg-white" placeholder="רגישות, בקשה מיוחדת או כל פרט שחשוב שנדע" rows={4} />
              </label>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="reveal rounded-[2rem] bg-white/75 p-6">
            <h2 className="text-3xl font-black text-espresso">אישור פרטי התור</h2>
            <div className="mt-6 grid gap-4 text-espresso/75 sm:grid-cols-2">
              <p><strong>טיפול:</strong> {selectedService?.name}</p>
              <p><strong>מחיר:</strong> ₪{selectedService?.price}</p>
              <p><strong>תאריך:</strong> {form.appointment_date}</p>
              <p><strong>שעה:</strong> {form.appointment_time}</p>
              <p><strong>שם:</strong> {form.customer_name}</p>
              <p><strong>טלפון:</strong> {form.customer_phone}</p>
            </div>
          </div>
        )}

        {errorMessage && <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{errorMessage}</p>}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button type="button" onClick={goBack} disabled={currentStep === 0} className="rounded-full border border-beige bg-white/80 px-7 py-3 font-black text-espresso transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-40">
            חזרה
          </button>
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={goNext} className="rounded-full bg-espresso px-8 py-3 font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-blush-700">
              המשך
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="rounded-full bg-espresso px-8 py-3 font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-blush-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "שולחת בקשה..." : "אישור ושליחת בקשה"}
            </button>
          )}
        </div>
      </form>

      <aside className="sticky top-28 h-fit rounded-[3rem] border border-gold-300/40 bg-gold-100/45 p-7 shadow-soft backdrop-blur">
        <p className="text-sm font-black text-gold-700">סיכום הזמנה</p>
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
