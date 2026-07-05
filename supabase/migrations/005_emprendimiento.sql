alter table perfil_suenos
  add column if not exists tiene_emprendimiento text,
  add column if not exists detalle_emprendimiento text;
