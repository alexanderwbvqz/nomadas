alter table dinamicas
  add column if not exists tiempo_respuesta  int  not null default 30,
  add column if not exists tiempo_pausa      int  not null default 5;
