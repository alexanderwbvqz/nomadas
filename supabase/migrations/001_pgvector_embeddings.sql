-- Activar pgvector
create extension if not exists vector;

-- Columna de embedding en perfiles_datos
alter table perfiles_datos
  add column if not exists embedding vector(384);

-- Índice para búsqueda rápida por similitud
create index if not exists perfiles_datos_embedding_idx
  on perfiles_datos
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Función de búsqueda por similitud
create or replace function match_perfiles(
  owner_id uuid,
  candidate_count int default 50
)
returns table (
  id        uuid,
  similarity float
)
language sql stable
as $$
  select
    p.id,
    1 - (p.embedding <=> owner.embedding) as similarity
  from perfiles_datos p
  cross join (
    select embedding from perfiles_datos where id = owner_id
  ) owner
  where p.aprobado = true
    and p.id != owner_id
    and p.embedding is not null
    and owner.embedding is not null
  order by p.embedding <=> owner.embedding
  limit candidate_count;
$$;
