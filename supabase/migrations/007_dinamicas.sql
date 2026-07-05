create table if not exists dinamicas (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  created_at timestamptz default now()
);

create table if not exists preguntas_dinamica (
  id          uuid primary key default gen_random_uuid(),
  dinamica_id uuid not null references dinamicas(id) on delete cascade,
  texto       text not null,
  orden       int  not null default 0,
  created_at  timestamptz default now()
);

create table if not exists opciones_pregunta (
  id          uuid primary key default gen_random_uuid(),
  pregunta_id uuid not null references preguntas_dinamica(id) on delete cascade,
  texto       text not null,
  peso        numeric(3,1) not null check (peso in (2.0, 1.5, 1.0, 0.5)),
  created_at  timestamptz default now()
);

alter table dinamicas          enable  row level security;
alter table preguntas_dinamica enable  row level security;
alter table opciones_pregunta  enable  row level security;

alter table dinamicas          disable row level security;
alter table preguntas_dinamica disable row level security;
alter table opciones_pregunta  disable row level security;
