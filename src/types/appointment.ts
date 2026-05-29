export type Appointment = {
  id?: string;
  customer_name: string;
  customer_phone: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  status?: "pending" | "confirmed" | "cancelled";
  created_at?: string;
};
