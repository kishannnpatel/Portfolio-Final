-- ============================================================
-- Portfolio stats widget — Supabase setup
-- Colle ce script entier dans Supabase > SQL Editor > Run
-- ============================================================

-- Table à une seule ligne (id=1) qui stocke les 3 compteurs
create table if not exists pf_stats (
  id int primary key default 1,
  visits bigint not null default 0,
  likes bigint not null default 0,
  dislikes bigint not null default 0,
  constraint single_row check (id = 1)
);

insert into pf_stats (id, visits, likes, dislikes)
values (1, 0, 0, 0)
on conflict (id) do nothing;

-- Active la sécurité au niveau des lignes (RLS)
alter table pf_stats enable row level security;

-- Tout le monde peut LIRE les compteurs (pour les afficher sur le site)
drop policy if exists "public read stats" on pf_stats;
create policy "public read stats" on pf_stats
  for select using (true);

-- Personne (à part ces fonctions) ne peut modifier la table directement,
-- donc impossible pour un visiteur malveillant de mettre le compteur à 999999999.

-- Fonctions d'incrémentation atomique (+1), appelables publiquement,
-- mais qui ne font QUE +1 sur une seule colonne à la fois.
create or replace function increment_visits()
returns bigint
language sql
security definer
set search_path = public
as $$
  update pf_stats set visits = visits + 1 where id = 1 returning visits;
$$;

create or replace function increment_likes()
returns bigint
language sql
security definer
set search_path = public
as $$
  update pf_stats set likes = likes + 1 where id = 1 returning likes;
$$;

create or replace function increment_dislikes()
returns bigint
language sql
security definer
set search_path = public
as $$
  update pf_stats set dislikes = dislikes + 1 where id = 1 returning dislikes;
$$;

grant execute on function increment_visits()   to anon;
grant execute on function increment_likes()    to anon;
grant execute on function increment_dislikes() to anon;
