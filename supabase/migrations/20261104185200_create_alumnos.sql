create table public.alumnos (
  id bigint generated always as identity primary key,
  matricula text not null unique,
  nombre text not null,
  created_at timestamptz not null default now()
);

alter table public.alumnos enable row level security;

insert into public.alumnos (matricula, nombre) values
  ('A001', 'Ana García'),
  ('A002', 'Luis Hernández'),
  ('A003', 'María López'),
  ('A004', 'Carlos Martínez'),
  ('A005', 'Sofía Ramírez'),
  ('A006', 'Jorge Torres'),
  ('A007', 'Valeria Flores'),
  ('A008', 'Diego Morales'),
  ('A009', 'Paola Cruz'),
  ('A010', 'Andrés Ortega');