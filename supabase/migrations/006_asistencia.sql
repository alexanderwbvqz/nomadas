create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  fecha date not null,
  estado text not null default 'activo',
  created_at timestamp with time zone default now()
);

create table if not exists asistencias (
  id uuid primary key default gen_random_uuid(),
  evento_id uuid not null references eventos(id) on delete cascade,
  perfil_id uuid not null references perfiles_datos(id) on delete cascade,
  asistio boolean not null default false,
  created_at timestamp with time zone default now(),
  unique(evento_id, perfil_id)
);

alter table eventos disable row level security;
alter table asistencias disable row level security;
