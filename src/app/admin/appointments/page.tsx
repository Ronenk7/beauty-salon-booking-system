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

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function getPopularService(appointments: Appointment[]) {
  const serviceCount: Record<string, number> = {};

  appointments.forEach((appointment) => {
    serviceCount[appointment.service_id] = (serviceCount[appointment.service_id] ?? 0) + 1;
  });

  const popularServiceId = Object.entries(serviceCount).sort((a, b) => b[1] - a[1])[0]?.[0];
  return popularServiceId ? getServiceName(popularServiceId) : "אין נתונים";
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

  const today = getTodayDate();
  const todayAppointments = appointments.filter((appointment) => appointment.appointment_date === today).length;
  const newCustomers = new Set(appointments.map((appointment) => appointment.customer_phone)).size;
  const dashboardCards = [
    { title: "תורים היום", value: todayAppointments.toString(), note: "לפי תאריך היום" },
    { title: "תורים השבוע", value: appointments.length.toString(), note: "גרסה פשוטה: כל התורים שנטענו" },
    { title: "שירותים פופולריים", value: getPopularService(appointments), note: "לפי מספר בקשות" },
    { title: "לקוחות חדשים", value: newCustomers.toString(), note: "לפי מספרי טלפון ייחודיים" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-8 rounded-[3rem] bg-white/75 p-8 shadow-soft md:p-12">
        <p className="text-sm font-black text-blush-700">ניהול</p>
        <h1 className="mt-4 text-5xl font-black text-espresso">לוח תורים</h1>
        <p className="mt-5 max-w-3xl text-lg leading-9 text-espresso/65">
          אזור ניהול בסיסי ונקי עבור יולי קוסמטיקס. בשלב הבא ניתן להוסיף התחברות, שינוי סטטוס וניהול זמינות.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <div key={card.title} className="glass-card rounded-[2rem] p-6">
            <p className="text-sm font-black text-blush-700">{card.title}</p>
            <p className="mt-3 text-3xl font-black text-espresso">{card.value}</p>
            <p className="mt-2 text-xs font-bold leading-6 text-espresso/50">{card.note}</p>
          </div>
        ))}
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
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-10 text-center text-espresso/65 shadow-soft">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blush-100 text-2xl">♡</div>
          עדיין אין תורים במערכת.
        </div>
      )}

      {isSupabaseConfigured && !hasError && appointments.length > 0 && (
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 shadow-soft">
          <div className="border-b border-beige/60 px-6 py-5">
            <h2 className="text-2xl font-black text-espresso">רשימת תורים</h2>
          </div>
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
