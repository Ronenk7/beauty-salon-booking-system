create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  service_id text not null,
  appointment_date date not null,
  appointment_time time not null,
  notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table appointments enable row level security;

create policy "Allow public appointment creation"
  on appointments
  for insert
  to anon
  with check (true);

create policy "Allow public appointment reading for version 1"
  on appointments
  for select
  to anon
  using (true);
