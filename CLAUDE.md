# CLAUDE.md — Kehanote v2

Lis ce fichier entièrement avant de commencer quoi que ce soit.

---

## Contexte du projet

**Kehanote** est une Progressive Web App (PWA) de révision personnelle, conçue pour une étudiante en Communication / Journalisme (L3). L'app est structurée par **matière > chapitre**. Pour chaque chapitre, l'utilisatrice peut accéder à un résumé (Le Concentré), des flashcards swipables (Swipe & Retiens), un QCM noté par niveau (Challenge), et — pour les matières à examen ouvert — un entraînement aux questions à réponse courte (QRC). En fin de matière, un Examen Blanc de 30 questions difficiles simule les conditions du partiel. L'app inclut aussi un Mode Panique (condensé ultra-rapide par chapitre) et un écran de récompense avec confettis.

Le design de référence est dans `prototype/Kehanote.html` — pixel perfect, ne pas dévier.

---

## Stack technique

| Couche          | Outil                                                                             |
| --------------- | --------------------------------------------------------------------------------- |
| Framework UI    | React 18 + Vite 5                                                                 |
| Styles          | CSS custom properties (pas de Tailwind) — variables définies dans `src/index.css` |
| Base de données | Supabase (PostgreSQL)                                                             |
| Auth            | Supabase Auth (email + password)                                                  |
| PWA             | vite-plugin-pwa                                                                   |
| Déploiement     | Vercel                                                                            |
| Polices         | Fraunces (display) + Nunito (body) via Google Fonts                               |

Pas de Redux. Pas de React Query. Pas de bibliothèque de composants externes.
État local = `useState` / `useReducer`. Données distantes = hooks custom dans `src/hooks/`.

---

## Structure du projet

```
kehanote/
├── CLAUDE.md                  <- ce fichier
├── tâches/
│   ├── a-faire.md             <- plan + progression (à maintenir)
│   └── leçons.md              <- erreurs passées + ce qu'on a appris
├── prototype/
│   └── Kehanote.html          <- design de référence, NE PAS MODIFIER
├── public/
│   └── icons/                 <- icon-192.png, icon-512.png
├── src/
│   ├── main.jsx
│   ├── App.jsx                <- routing principal
│   ├── index.css              <- variables CSS globales + keyframes
│   ├── lib/
│   │   └── supabase.js        <- client Supabase (createClient)
│   ├── hooks/
│   │   ├── useSubjects.js     <- fetch matières
│   │   ├── useChapters.js     <- fetch chapitres par matière (NOUVEAU)
│   │   ├── useFlashcards.js   <- fetch flashcards par chapitre
│   │   ├── useQCM.js          <- fetch QCM par chapitre ou examen blanc
│   │   ├── useConcentre.js    <- fetch résumé par chapitre
│   │   ├── useQRC.js          <- fetch questions QRC par chapitre (NOUVEAU)
│   │   ├── usePanic.js        <- fetch items panique par matière (chapitres condensés)
│   │   └── useProgress.js     <- scores, streak, badges
│   ├── components/
│   │   ├── Mascot.jsx         <- Mochi SVG, 7 humeurs
│   │   ├── Sparkle.jsx
│   │   ├── Heart.jsx
│   │   ├── ProgressRing.jsx
│   │   ├── SubjectIcon.jsx
│   │   └── Nav.jsx            <- barre de navigation du bas
│   └── screens/
│       ├── Onboarding.jsx
│       ├── Home.jsx
│       ├── SubjectHub.jsx     <- vue matière : liste des chapitres + bouton Examen Blanc
│       ├── ChapterHub.jsx     <- vue chapitre : 3 modes + QRC si applicable (NOUVEAU)
│       ├── Concentre.jsx      <- résumé d'un chapitre
│       ├── Flashcards.jsx     <- flashcards d'un chapitre
│       ├── Challenge.jsx      <- QCM d'un chapitre (facile / moyen / difficile)
│       ├── QRCPractice.jsx    <- entraînement QRC d'un chapitre (NOUVEAU)
│       ├── ExamenBlanc.jsx    <- 30 questions difficiles sur toute la matière (NOUVEAU)
│       ├── Panic.jsx          <- mode panique : condensé ultra-rapide par chapitre
│       ├── Reward.jsx
│       ├── Profile.jsx
│       └── AllCards.jsx
├── scripts/
│   └── import.js              <- script Node pour injecter du contenu JSON dans Supabase
├── index.html
├── vite.config.js
└── package.json
```

---

## Schéma Supabase

### Tables

```sql
-- Matières
create table subjects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  teacher     text,
  color       text not null default 'rose',  -- 'rose' | 'lav' | 'peach' | 'sage'
  icon        text not null default 'book',  -- 'book' | 'people' | 'pen' | 'scale'
  exam_type   text not null default 'qcm',   -- 'qcm' | 'qrc' (détermine si le mode QRC est affiché)
  next_exam   text,
  created_at  timestamptz default now()
);

-- Chapitres
create table chapters (
  id           uuid primary key default gen_random_uuid(),
  subject_id   uuid references subjects(id) on delete cascade,
  number       int  not null,               -- ordre d'affichage (1, 2, 3...)
  title        text not null,
  created_at   timestamptz default now(),
  unique(subject_id, number)
);

-- Flashcards (rattachées à un chapitre)
create table flashcards (
  id          uuid primary key default gen_random_uuid(),
  subject_id  uuid references subjects(id) on delete cascade,
  chapter_id  uuid references chapters(id) on delete cascade,
  question    text not null,
  answer      text not null,
  created_at  timestamptz default now()
);

-- QCM (rattachées à un chapitre OU à l'examen blanc)
create table qcm_questions (
  id              uuid primary key default gen_random_uuid(),
  subject_id      uuid references subjects(id) on delete cascade,
  chapter_id      uuid references chapters(id) on delete cascade, -- null si examen blanc
  level           text not null,    -- 'easy' | 'medium' | 'hard'
  is_final_exam   boolean not null default false, -- true = fait partie de l'examen blanc
  question        text not null,
  choices         jsonb not null,   -- ["choix A", "choix B", ...]
  correct_index   int  not null,
  explanation     text,
  created_at      timestamptz default now()
);

-- Résumés par chapitre (Le Concentré)
create table concentre (
  id            uuid primary key default gen_random_uuid(),
  subject_id    uuid references subjects(id) on delete cascade,
  chapter_id    uuid references chapters(id) on delete cascade,
  chapter_title text not null,
  reading_time  int  not null default 3,  -- en minutes
  sections      jsonb not null,           -- [{ type: 'key'|'def'|'tip', title, bullets[] }]
  created_at    timestamptz default now()
);

-- Questions QRC par chapitre (matières exam_type = 'qrc')
create table qrc_questions (
  id             uuid primary key default gen_random_uuid(),
  subject_id     uuid references subjects(id) on delete cascade,
  chapter_id     uuid references chapters(id) on delete cascade,
  question       text not null,         -- la question d'examen probable
  plan_type      text not null,         -- trame de réponse (I. / II. / III.)
  model_answer   text not null,         -- corrigé indicatif complet
  key_concepts   jsonb,                 -- ["concept1", "concept2"] — mots-clés attendus
  created_at     timestamptz default now()
);

-- Mode Panique (points essentiels condensés par chapitre)
create table panic_items (
  id          uuid primary key default gen_random_uuid(),
  subject_id  uuid references subjects(id) on delete cascade,
  chapter_id  uuid references chapters(id) on delete cascade,
  content     text not null,
  sort_order  int  not null default 0,
  created_at  timestamptz default now()
);

-- Scores des challenges
create table challenge_scores (
  id          uuid primary key default gen_random_uuid(),
  subject_id  uuid references subjects(id) on delete cascade,
  chapter_id  uuid references chapters(id) on delete cascade, -- null si examen blanc
  level       text,                  -- 'easy' | 'medium' | 'hard' | 'final'
  score       numeric not null,
  total       int     not null,
  played_at   timestamptz default now()
);

-- Sessions (streak)
create table sessions (
  id         uuid primary key default gen_random_uuid(),
  played_at  date not null default current_date,
  unique(played_at)
);
```

---

## Spec de contenu par chapitre

Chaque chapitre d'une matière doit contenir exactement :

| Élément       | Quantité                                                      |
| ------------- | ------------------------------------------------------------- |
| Concentré     | 5 à 7 points essentiels, structurés en sections (key/def/tip) |
| Flashcards    | 10 à 15 cartes question / réponse                             |
| QCM Facile    | 10 questions (bases, définitions directes)                    |
| QCM Moyen     | 10 questions (application, mise en contexte)                  |
| QCM Difficile | 10 questions (nuance, cas tordus, auteurs)                    |
| Mode Panique  | 5 à 8 phrases ultra-condensées (< 15 mots chacune)            |
| QRC (si qrc)  | 3 à 5 questions probables avec plan type + corrigé indicatif  |

En fin de matière, l'**Examen Blanc** comporte 30 questions de niveau difficile marquées `is_final_exam = true`, couvrant tous les chapitres de façon équilibrée.

---

## Navigation dans l'app

```
Home
  └── SubjectHub (matière)
        ├── ChapterHub (chapitre N)
        │     ├── Concentré
        │     ├── Flashcards
        │     ├── Challenge (facile / moyen / difficile)
        │     └── QRCPractice  [affiché seulement si exam_type = 'qrc']
        ├── ChapterHub (chapitre N+1)
        │     └── ...
        └── Examen Blanc  [bouton en bas de SubjectHub, débloqué quand tous les chapitres vus]
              └── 30 questions difficiles → Reward
```

---

## Mode QRC — comportement attendu

L'écran `QRCPractice` fonctionne comme un entraînement à la réponse ouverte :

1. On affiche une question probable d'examen.
2. L'utilisatrice lit, réfléchit, prépare mentalement sa réponse (ou la rédige sur papier).
3. Elle appuie sur "Voir le corrigé" — on révèle le plan type et le corrigé indicatif.
4. Elle s'auto-évalue : "Je maîtrise" / "À retravailler".
5. Les questions "À retravailler" reviennent à la fin du cycle.

Les `key_concepts` servent d'aide visuelle après révélation : des chips colorées montrant les notions incontournables à avoir mentionnées.

---

## Mode Panique — comportement adapté v2

Le Mode Panique est maintenant **organisé par chapitre** au sein d'une matière :

- L'utilisatrice choisit une matière.
- L'app affiche les chapitres un par un, avec leurs 5 à 8 points condensés.
- Le countdown est maintenu (5 minutes globales).
- La navigation entre chapitres se fait par swipe ou boutons discrets.

---

## Design system

- Le design de référence est dans `prototype/Kehanote.html`. Chaque écran doit lui correspondre pixel pour pixel.
- La mascotte **Mochi** (lapin kawaii SVG) est définie dans `Mascot.jsx` avec ses 7 humeurs : `happy`, `wink`, `sleepy`, `hooray`, `focus`, `blush`, `sad`
- Le frame iPhone (Dynamic Island, status bar, home indicator) est dans le prototype — en production mobile/PWA, on l'enlève et l'app prend tout l'écran.
- Animations : `screen-in`, `float-y`, `sparkle`, `heart-pop`, `confetti-fall`, `panic-pulse` — toutes définies dans `index.css`.
- Pas de tirets cadratin dans aucun texte visible de l'app.

---

## Orchestration du workflow

### 1. Mode Plan par défaut

- Passer en mode plan pour TOUTE tâche non triviale (3+ étapes ou décisions architecturales).
- Si quelque chose dévie du plan, ARRÊTER et replanifier immédiatement.
- Écrire les spécifications détaillées en amont pour réduire l'ambiguïté.

### 2. Stratégie des sous-agents

- Utiliser les sous-agents de manière intensive pour garder le contexte principal propre.
- Déléguer la recherche, l'exploration et les analyses parallèles aux sous-agents.
- Une tâche par sous-agent pour une exécution ciblée.

### 3. Boucle d'auto-amélioration

- Après TOUTE correction : mettre à jour `tâches/leçons.md` avec ce qui a été appris.
- Écrire des règles pour soi-même qui empêchent de refaire la même erreur.
- Relire les leçons au début de chaque session.

### 4. Vérifier avant de considérer comme terminé

- Ne jamais marquer une tâche comme terminée sans prouver que ça fonctionne.
- Se demander : « Un développeur senior validerait-il cela ? »
- Exécuter les tests, vérifier les logs, démontrer que c'est correct.

### 5. Exiger de l'élégance

- Pour les changements non triviaux : « Y a-t-il une solution plus élégante ? »
- Défier son propre travail avant de le présenter.

### 6. Correction autonome des bugs

- Lorsqu'un bug est signalé : le corriger, ne pas demander à l'utilisatrice de le faire.
- Pointer vers les logs, erreurs et tests échoués — puis les résoudre.

---

## Gestion des tâches

1. **Plan d'abord** : écrire le plan dans `tâches/a-faire.md` avec des éléments vérifiables.
2. **Vérifier le plan** : valider avant de commencer l'implémentation.
3. **Suivre la progression** : marquer les éléments comme terminés au fur et à mesure.
4. **Expliquer les changements** : résumé de haut niveau à chaque étape.
5. **Documenter les résultats** : ajouter une section de revue dans `tâches/a-faire.md`.
6. **Capturer les leçons** : mettre à jour `tâches/leçons.md` après les corrections.

---

## Principes fondamentaux

- **Simplicité d'abord** : rendre chaque changement aussi simple que possible. Impact minimal sur le code.
- **Aucune paresse** : trouver les causes profondes. Pas de correctifs temporaires. Standards de développeuse senior.
- **Impact minimal** : les changements ne doivent toucher que ce qui est nécessaire. Éviter d'introduire des bugs.

---

## Git workflow

Claude Code prépare les commits mais **ne push jamais tout seul**. C'est l'utilisatrice qui valide et push.

### À la fin de chaque étape terminée et vérifiée, fournir exactement ceci :

```
Étape terminée — voici ton commit :

git add .
git commit -m "type(scope): description courte"
git push
```

### Convention des messages de commit (Conventional Commits)

| Préfixe    | Quand                                                    |
| ---------- | -------------------------------------------------------- |
| `feat`     | nouvelle fonctionnalité                                  |
| `fix`      | correction de bug                                        |
| `style`    | changement visuel sans logique                           |
| `refactor` | restructuration sans changement de comportement          |
| `chore`    | config, dépendances, setup                               |
| `data`     | ajout ou modification de contenu (flashcards, QCM, etc.) |

---

## Ce que cette app N'est PAS

- Pas une app multi-utilisateurs (pour l'instant) — une seule utilisatrice.
- Pas une app de création de contenu — le contenu est généré à l'extérieur et importé via Supabase ou le script `scripts/import.js`.
- Pas une app de chat ou d'IA temps réel — pas d'appel API IA dans le code.
