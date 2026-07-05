create table if not exists perfil_redes (
  id         uuid primary key default gen_random_uuid(),
  perfil_id  uuid not null references perfiles_datos(id) on delete cascade,
  red        text not null,
  url        text not null,
  created_at timestamptz default now()
);

alter table perfil_redes disable row level security;
