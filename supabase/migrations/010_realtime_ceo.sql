-- Habilitar replica identity full para que los filtros de Realtime funcionen
alter table sesiones_ceo   replica identity full;
alter table jugadores_ceo  replica identity full;
alter table respuestas_ceo replica identity full;

-- Agregar las tablas a la publicación de Supabase Realtime
alter publication supabase_realtime add table sesiones_ceo;
alter publication supabase_realtime add table jugadores_ceo;
alter publication supabase_realtime add table respuestas_ceo;
