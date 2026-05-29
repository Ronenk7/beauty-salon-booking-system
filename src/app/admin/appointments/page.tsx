import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { services } from "@/data/services";
import type { Appointment } from "@/types/appointment";

function getServiceName(serviceId: string) {
  const service = services.find((item) => item.id === serviceId);
  return service?.name ?? serviceId;
}

function getStatusLabel(status?: string) {
  if (status === "confirmed") {
    return "מאושר";
  }

  if (status === "cancelled") {
    return "בוטל";
  }

  return "ממתין לאישור";
}

export default async function AdminAppointmentsPage() {
  let appointments: Appointment[] = [];
  let hasError = false;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    appointments = (data ?? []) as Appointment[];
    hasError = Boolean(error);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-10 rounded-[3rem] bg-white/75 p-8 shadow-soft md:p-12">
        <p className="text-sm font-black text-blush-700">ניהול</p>
        <h1 className="mt-4 text-5xl font-black text-espresso">תורים שהתקבלו</h1>
        <p className="mt-5 max-w-3xl text-lg leading-9 text-espresso/65">
          עמוד ניהול פשוט לגרסה הראשונה של יולי קוסמטיקס. בהמשך ניתן להוסיף התחברות, שינוי סטטוס וניהול זמינות.
        </p>
      </div>

      {!isSupabaseConfigured && (
        <div className="rounded-[2rem] border border-gold-300/50 bg-gold-100/60 p-6 text-sm font-bold leading-8 text-gold-700 shadow-sm">
          Supabase עדיין לא הוגדר. כדי לראות תורים אמיתיים יש להוסיף את משתני הסביבה בקובץ .env.local ולהריץ את סכמת ה-SQL.
        </div>
      )}

      {hasError && (
        <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-sm font-bold text-red-700 shadow-sm">
          לא הצלחנו לטעון את התורים. נא לבדוק את הגדרת Supabase ואת טבלת appointments.
        </div>
      )}

      {isSupabaseConfigured && !hasError && appointments.length === 0 && (
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 text-espresso/65 shadow-soft">
          עדיין אין תורים במערכת.
        </div>
      )}

      {isSupabaseConfigured && !hasError && appointments.length > 0 && (
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-right text-sm">
              <thead className="bg-blush-100/70 text-espresso">
                <tr>
                  <th className="px-5 py-4 font-black">לקוחה</th>
                  <th className="px-5 py-4 font-black">טלפון</th>
                  <th className="px-5 py-4 font-black">טיפול</th>
                  <th className="px-5 py-4 font-black">תאריך</th>
                  <th className="px-5 py-4 font-black">שעה</th>
                  <th className="px-5 py-4 font-black">סטטוס</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige/60">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="text-espresso/75 transition hover:bg-cream">
                    <td className="px-5 py-4 font-bold text-espresso">{appointment.customer_name}</td>
                    <td className="px-5 py-4">{appointment.customer_phone}</td>
                    <td className="px-5 py-4">{getServiceName(appointment.service_id)}</td>
                    <td className="px-5 py-4">{appointment.appointment_date}</td>
                    <td className="px-5 py-4">{appointment.appointment_time}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-gold-100 px-4 py-2 text-xs font-black text-gold-700">
                        {getStatusLabel(appointment.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
