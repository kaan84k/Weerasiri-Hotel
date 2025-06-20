-- Supabase database setup for Weerasiri Hotel
-- This file creates a staff_profiles table linked to Supabase Auth.

create extension if not exists "uuid-ossp";

create table if not exists staff_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  role text default 'staff'
);

alter table staff_profiles enable row level security;

-- Policy: allow each user to view and modify their own profile
create policy "Staff can manage own profile" on staff_profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);
