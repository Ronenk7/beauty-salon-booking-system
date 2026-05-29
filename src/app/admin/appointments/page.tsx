import { supabase } from "@/lib/supabase/client";
import { services } from "@/data/services";
import type { Appointment } from "@/types/appointment";

function getServiceName(serviceId: string) {
  const service = services.find((item) => item.id === serviceId);
  return service?.name ?? serviceId;
}

export default async function AdminAppointmentsPage() {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  const appointments = (data ?? []) as Appointment[];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Admin</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">Appointments</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          Simple version 1 admin page for viewing booking requests.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Could not load appointments. Please check your Supabase environment variables and table setup.
        </div>
      )}

      {!error && appointments.length === 0 && (
        <div className="rounded-2xl border border-orange-100 bg-white p-6 text-gray-600 shadow-sm">
          No appointments yet.
        </div>
      )}

      {!error && appointments.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-orange-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="text-gray-700">
                  <td className="px-4 py-3">{appointment.customer_name}</td>
                  <td className="px-4 py-3">{appointment.customer_phone}</td>
                  <td className="px-4 py-3">{getServiceName(appointment.service_id)}</td>
                  <td className="px-4 py-3">{appointment.appointment_date}</td>
                  <td className="px-4 py-3">{appointment.appointment_time}</td>
                  <td className="px-4 py-3 capitalize">{appointment.status ?? "pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
