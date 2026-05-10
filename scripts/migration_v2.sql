-- ============================================================
-- Kehanote — Migration schéma v2
-- À exécuter manuellement dans Supabase Studio > SQL Editor
-- Toutes les opérations sont non destructives (nullable / default)
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. subjects — ajout de la colonne exam_type
-- ────────────────────────────────────────────────────────────
-- Valeur par défaut 'qcm' : les matières existantes ne sont pas cassées.
alter table subjects
  add column if not exists exam_type text not null default 'qcm';


-- ────────────────────────────────────────────────────────────
-- 2. Nouvelle table chapters
-- ────────────────────────────────────────────────────────────
create table if not exists chapters (
  id           uuid primary key default gen_random_uuid(),
  subject_id   uuid not null references subjects(id) on delete cascade,
  number       int  not null,
  title        text not null,
  created_at   timestamptz default now(),
  unique(subject_id, number)
);


-- ────────────────────────────────────────────────────────────
-- 3. flashcards — ajout de chapter_id (nullable)
-- ────────────────────────────────────────────────────────────
-- Nullable d'abord : les lignes existantes gardent chapter_id = NULL
-- jusqu'à ce qu'elles soient rattachées à un chapitre via import.js.
alter table flashcards
  add column if not exists chapter_id uuid references chapters(id) on delete cascade;


-- ────────────────────────────────────────────────────────────
-- 4. qcm_questions — ajout de chapter_id (nullable) + is_final_exam
-- ────────────────────────────────────────────────────────────
alter table qcm_questions
  add column if not exists chapter_id    uuid    references chapters(id) on delete cascade,
  add column if not exists is_final_exam boolean not null default false;


-- ────────────────────────────────────────────────────────────
-- 5. concentre — ajout de chapter_id (nullable)
-- ────────────────────────────────────────────────────────────
alter table concentre
  add column if not exists chapter_id uuid references chapters(id) on delete cascade;


-- ────────────────────────────────────────────────────────────
-- 6. panic_items — ajout de chapter_id (nullable)
-- ────────────────────────────────────────────────────────────
alter table panic_items
  add column if not exists chapter_id uuid references chapters(id) on delete cascade;


-- ────────────────────────────────────────────────────────────
-- 7. challenge_scores — ajout de chapter_id (nullable)
-- ────────────────────────────────────────────────────────────
-- chapter_id reste NULL pour l'examen blanc (level = 'final').
-- La colonne level est déjà de type text, donc 'final' est accepté sans
-- modifier de contrainte.
alter table challenge_scores
  add column if not exists chapter_id uuid references chapters(id) on delete set null;


-- ────────────────────────────────────────────────────────────
-- 8. Nouvelle table qrc_questions
-- ────────────────────────────────────────────────────────────
create table if not exists qrc_questions (
  id             uuid primary key default gen_random_uuid(),
  subject_id     uuid not null references subjects(id) on delete cascade,
  chapter_id     uuid          references chapters(id) on delete cascade,
  question       text not null,
  plan_type      text not null,
  model_answer   text not null,
  key_concepts   jsonb,
  created_at     timestamptz default now()
);


-- ────────────────────────────────────────────────────────────
-- 9. Index utiles pour les requêtes fréquentes
-- ────────────────────────────────────────────────────────────
create index if not exists idx_chapters_subject_id        on chapters(subject_id);
create index if not exists idx_flashcards_chapter_id      on flashcards(chapter_id);
create index if not exists idx_qcm_chapter_id             on qcm_questions(chapter_id);
create index if not exists idx_qcm_is_final_exam          on qcm_questions(is_final_exam);
create index if not exists idx_concentre_chapter_id       on concentre(chapter_id);
create index if not exists idx_panic_items_chapter_id     on panic_items(chapter_id);
create index if not exists idx_challenge_scores_chapter   on challenge_scores(chapter_id);
create index if not exists idx_qrc_questions_chapter_id   on qrc_questions(chapter_id);


-- ────────────────────────────────────────────────────────────
-- Vérification post-migration (optionnel — exécuter séparément)
-- ────────────────────────────────────────────────────────────
-- select column_name, data_type, is_nullable, column_default
--   from information_schema.columns
--  where table_name in ('subjects','chapters','flashcards','qcm_questions',
--                       'concentre','panic_items','challenge_scores','qrc_questions')
--  order by table_name, ordinal_position;
