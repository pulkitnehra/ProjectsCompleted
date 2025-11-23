-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS / STAFF (Extends Supabase Auth or standalone table)
-- We will use a separate table for staff details linked to Supabase Auth users if needed, 
-- but for simplicity in this migration, we'll create a staff table.
create table public.staff (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  role text not null check (role in ('admin', 'receptionist', 'manager', 'housekeeping')),
  email text unique,
  phone text,
  is_active boolean default true
);

-- 2. ROOMS
create table public.rooms (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  room_number text not null unique,
  type text not null, -- e.g., 'Single', 'Double', 'Suite'
  price_per_night decimal(10, 2) not null,
  status text not null default 'available' check (status in ('available', 'occupied', 'dirty', 'maintenance')),
  description text
);

-- 3. GUESTS
create table public.guests (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text,
  phone text,
  id_proof_type text, -- e.g., 'Passport', 'Driving License'
  id_proof_number text,
  address text,
  notes text
);

-- 4. BOOKINGS
create table public.bookings (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  guest_id uuid references public.guests(id) not null,
  room_id uuid references public.rooms(id) not null,
  check_in_date timestamp with time zone not null,
  check_out_date timestamp with time zone not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'checked_in', 'checked_out', 'cancelled')),
  total_amount decimal(10, 2),
  paid_amount decimal(10, 2) default 0,
  checked_in_at timestamp with time zone,
  checked_out_at timestamp with time zone
);

-- 5. INVOICES / PAYMENTS (Optional for now, but good to have structure)
create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  booking_id uuid references public.bookings(id) not null,
  amount decimal(10, 2) not null,
  payment_method text not null, -- 'cash', 'card', 'upi'
  transaction_id text
);

-- Row Level Security (RLS) - Enable for all tables
alter table public.staff enable row level security;
alter table public.rooms enable row level security;
alter table public.guests enable row level security;
alter table public.bookings enable row level security;
alter table public.payments enable row level security;

-- Policies (For development, allow all access. In production, restrict based on auth)
create policy "Enable all access for all users" on public.staff for all using (true);
create policy "Enable all access for all users" on public.rooms for all using (true);
create policy "Enable all access for all users" on public.guests for all using (true);
create policy "Enable all access for all users" on public.bookings for all using (true);
create policy "Enable all access for all users" on public.payments for all using (true);

-- Insert some dummy data for Rooms
insert into public.rooms (room_number, type, price_per_night, status) values
('101', 'Single', 50.00, 'available'),
('102', 'Single', 50.00, 'dirty'),
('103', 'Double', 80.00, 'occupied'),
('201', 'Suite', 150.00, 'available');
