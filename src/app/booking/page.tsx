import { BookingForm } from "./BookingForm";

export default function BookingPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Booking</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">Book an appointment</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          Fill in the appointment details. In version 1, every new booking is saved with pending status.
        </p>
      </div>

      <BookingForm />
    </section>
  );
}
