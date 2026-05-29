"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase/client";
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

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
      setMessage("Could not create appointment. Please check Supabase setup.");
      setIsSubmitting(false);
      return;
    }

    setForm(initialForm);
    setMessage("Appointment request created successfully.");
    setIsSubmitting(false);
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Full name</span>
          <input
            required
            value={form.customer_name}
            onChange={(event) => updateField("customer_name", event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500"
            placeholder="Customer name"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Phone</span>
          <input
            required
            value={form.customer_phone}
            onChange={(event) => updateField("customer_phone", event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500"
            placeholder="Phone number"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Service</span>
          <select
            required
            value={form.service_id}
            onChange={(event) => updateField("service_id", event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500"
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Date</span>
          <input
            required
            type="date"
            value={form.appointment_date}
            onChange={(event) => updateField("appointment_date", event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Time</span>
          <input
            required
            type="time"
            value={form.appointment_time}
            onChange={(event) => updateField("appointment_time", event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-gray-700">Notes</span>
          <textarea
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500"
            placeholder="Optional notes"
            rows={4}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Create booking request"}
      </button>

      {message && <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>}
    </form>
  );
}
