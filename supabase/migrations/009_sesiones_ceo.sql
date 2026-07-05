create table if not exists sesiones_ceo (
  id              uuid primary key default gen_random_uuid(),
  dinamica_id     uuid not null references dinamicas(id) on delete cascade,
  evento_id       uuid not null references eventos(id) on delete cascade,
  estado          text not null default 'espera' check (estado in ('espera', 'en_curso', 'finalizando', 'finalizado')),
  pregunta_actual int  not null default 0,
  created_at      timestamptz default now()
);

create table if not exists jugadores_ceo (
  id          uuid primary key default gen_random_uuid(),
  sesion_id   uuid not null references sesiones_ceo(id) on delete cascade,
  perfil_id   uuid not null references perfiles_datos(id) on delete cascade,
  created_at  timestamptz default now(),
  unique(sesion_id, perfil_id)
);

create table if not exists respuestas_ceo (
  id          uuid primary key default gen_random_uuid(),
  sesion_id   uuid not null references sesiones_ceo(id) on delete cascade,
  perfil_id   uuid not null references perfiles_datos(id) on delete cascade,
  pregunta_id uuid not null references preguntas_dinamica(id) on delete cascade,
  opcion_id   uuid not null references opciones_pregunta(id) on delete cascade,
  peso        numeric(3,1) not null,
  created_at  timestamptz default now(),
  unique(sesion_id, perfil_id, pregunta_id)
);

alter table sesiones_ceo  enable  row level security;
alter table jugadores_ceo enable  row level security;
alter table respuestas_ceo enable  row level security;

alter table sesiones_ceo  disable row level security;
alter table jugadores_ceo disable row level security;
alter table respuestas_ceo disable row level security;
