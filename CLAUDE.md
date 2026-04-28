# CLAUDE.md — Kehanote

Lis ce fichier entièrement avant de commencer quoi que ce soit.

---

## Contexte du projet

**Kehanote** est une Progressive Web App (PWA) de révision personnelle, conçue pour une étudiante en Communication / Journalisme (L3). L'app permet de réviser via trois modes : résumés (Le Concentré), flashcards swipables (Swipe & Retiens), et QCM noté (Challenge). Elle inclut aussi un Mode Panique (résumé ultra-condensé), un écran de récompense avec confettis, et un profil de progression.

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
├── CLAUDE.md                  ← ce fichier
├── tâches/
│   ├── a-faire.md             ← plan + progression (à maintenir)
│   └── leçons.md              ← erreurs passées + ce qu'on a appris
├── prototype/
│   └── Kehanote.html          ← design de référence, NE PAS MODIFIER
├── public/
│   └── icons/                 ← icon-192.png, icon-512.png
├── src/
│   ├── main.jsx
│   ├── App.jsx                ← routing principal
│   ├── index.css              ← variables CSS globales + keyframes
│   ├── lib/
│   │   └── supabase.js        ← client Supabase (createClient)
│   ├── hooks/
│   │   ├── useSubjects.js     ← fetch matières
│   │   ├── useFlashcards.js   ← fetch flashcards par matière
│   │   ├── useQCM.js          ← fetch QCM par matière
│   │   ├── useConcentre.js    ← fetch résumés par matière
│   │   ├── usePanic.js        ← fetch mode panique
│   │   └── useProgress.js     ← scores, streak, badges
│   ├── components/
│   │   ├── Mascot.jsx         ← Mochi SVG, 7 humeurs
│   │   ├── Sparkle.jsx
│   │   ├── Heart.jsx
│   │   ├── ProgressRing.jsx
│   │   ├── SubjectIcon.jsx
│   │   └── Nav.jsx            ← barre de navigation du bas
│   └── screens/
│       ├── Onboarding.jsx
│       ├── Home.jsx
│       ├── SubjectHub.jsx
│       ├── Concentre.jsx
│       ├── Flashcards.jsx
│       ├── Challenge.jsx
│       ├── Panic.jsx
│       ├── Reward.jsx
│       ├── Profile.jsx
│       └── AllCards.jsx
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
  chapters    int  not null default 1,
  next_exam   text,
  created_at  timestamptz default now()
);

-- Flashcards
create table flashcards (
  id          uuid primary key default gen_random_uuid(),
  subject_id  uuid references subjects(id) on delete cascade,
  question    text not null,
  answer      text not null,
  created_at  timestamptz default now()
);

-- QCM
create table qcm_questions (
  id            uuid primary key default gen_random_uuid(),
  subject_id    uuid references subjects(id) on delete cascade,
  level         text not null,  -- 'easy' | 'medium' | 'hard'
  question      text not null,
  choices       jsonb not null, -- tableau de strings ["choix A", "choix B", ...]
  correct_index int  not null,
  explanation   text,
  created_at    timestamptz default now()
);

-- Résumés (Le Concentré)
create table concentre (
  id            uuid primary key default gen_random_uuid(),
  subject_id    uuid references subjects(id) on delete cascade,
  chapter_title text not null,
  reading_time  text not null default '3 min',
  sections      jsonb not null, -- [{title, kind, bullets: []}]
  created_at    timestamptz default now()
);

-- Mode Panique
create table panic_items (
  id          uuid primary key default gen_random_uuid(),
  subject_id  uuid references subjects(id) on delete cascade,
  content     text not null,
  sort_order  int  not null default 0,
  created_at  timestamptz default now()
);

-- Scores Challenge (persistance best score)
create table challenge_scores (
  id          uuid primary key default gen_random_uuid(),
  subject_id  uuid references subjects(id) on delete cascade,
  level       text not null,
  score       numeric not null,
  played_at   date default current_date
);

-- Sessions de révision (streak + stats)
create table sessions (
  id          uuid primary key default gen_random_uuid(),
  subject_id  uuid references subjects(id) on delete cascade,
  mode        text not null,  -- 'swipe' | 'qcm' | 'concentre' | 'panic'
  cards_done  int default 0,
  played_at   date default current_date
);
```

### Row Level Security

Pour l'instant (usage perso, une seule utilisatrice) : **RLS désactivé** sur toutes les tables.
À activer si l'app est un jour partagée avec plusieurs utilisateurs.

---

## Conventions de code

### Nommage

- Composants React : `PascalCase` (`SubjectHub.jsx`)
- Hooks : `camelCase` préfixé `use` (`useFlashcards.js`)
- Variables CSS : `--kebab-case` (`--rose-500`)
- Fonctions utilitaires : `camelCase`

### Styles

- Toujours utiliser les variables CSS de `index.css` — jamais de couleurs hex hardcodées dans les composants
- Les styles sont en `style={{ }}` inline comme dans le prototype (pas de fichiers CSS par composant)
- Les classes utilitaires globales (`.kn-card`, `.btn-primary`, `.chip`, etc.) sont dans `index.css`

### Données

- Les hooks retournent toujours `{ data, loading, error }`
- Jamais d'appel Supabase direct dans un composant — toujours passer par un hook
- Les données de fallback (état vide, loading) sont gérées dans le composant, pas dans le hook

### Routing

- Pas de React Router — navigation par état (`route` object) comme dans le prototype
- `go({ name: 'screen', ...params })` pour naviguer
- L'état de route vit dans `App.jsx` uniquement

---

## Design — règles absolues

- Le prototype (`prototype/Kehanote.html`) est la référence visuelle. Chaque écran doit lui correspondre pixel pour pixel.
- La mascotte **Mochi** (lapin kawaii SVG) est définie dans `Mascot.jsx` avec ses 7 humeurs : `happy`, `wink`, `sleepy`, `hooray`, `focus`, `blush`, `sad`
- Le frame iPhone (Dynamic Island, status bar, home indicator) est dans le prototype — en production mobile/PWA, on l'enlève et l'app prend tout l'écran
- Animations : `screen-in`, `float-y`, `sparkle`, `heart-pop`, `confetti-fall`, `panic-pulse` — toutes définies dans `index.css`

---

## Orchestration du workflow

### 1. Mode Plan par défaut

- Passer en mode plan pour TOUTE tâche non triviale (3+ étapes ou décisions architecturales)
- Si quelque chose dévie du plan, ARRÊTER et replanifier immédiatement
- Écrire les spécifications détaillées en amont pour réduire l'ambiguïté

### 2. Stratégie des sous-agents

- Utiliser les sous-agents de manière intensive pour garder le contexte principal propre
- Déléguer la recherche, l'exploration et les analyses parallèles aux sous-agents
- Une tâche par sous-agent pour une exécution ciblée

### 3. Boucle d'auto-amélioration

- Après TOUTE correction : mettre à jour `tâches/leçons.md` avec ce qui a été appris
- Écrire des règles pour soi-même qui empêchent de refaire la même erreur
- Relire les leçons au début de chaque session

### 4. Vérifier avant de considérer comme terminé

- Ne jamais marquer une tâche comme terminée sans prouver que ça fonctionne
- Se demander : « Un développeur senior validerait-il cela ? »
- Exécuter les tests, vérifier les logs, démontrer que c'est correct

### 5. Exiger de l'élégance

- Pour les changements non triviaux : « Y a-t-il une solution plus élégante ? »
- Passer ce temps pour des corrections simples et évidentes — ne pas sur-ingénier
- Défier son propre travail avant de le présenter

### 6. Correction autonome des bugs

- Lorsqu'un bug est signalé : le corriger, ne pas demander à l'utilisatrice de le faire
- Pointer vers les logs, erreurs et tests échoués — puis les résoudre
- Aller corriger les tests CI échoués sans qu'on te dise comment

---

## Gestion des tâches

1. **Plan d'abord** : écrire le plan dans `tâches/a-faire.md` avec des éléments vérifiables
2. **Vérifier le plan** : valider avant de commencer l'implémentation
3. **Suivre la progression** : marquer les éléments comme terminés au fur et à mesure
4. **Expliquer les changements** : résumé de haut niveau à chaque étape
5. **Documenter les résultats** : ajouter une section de revue dans `tâches/a-faire.md`
6. **Capturer les leçons** : mettre à jour `tâches/leçons.md` après les corrections

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
✅ Étape terminée — voici ton commit :

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

Exemples :

- `chore(setup): initialise projet Vite + Supabase + PWA`
- `feat(flashcards): implémente swipe drag avec animation`
- `fix(challenge): corrige calcul score négatif`
- `data(theo-info): ajoute flashcards chapitre 3 Shannon`

### Règles

- Un commit par étape fonctionnelle — jamais de commit "WIP" ou "fix fix fix"
- Le message doit être compréhensible sans contexte six mois plus tard
- Ne jamais inclure de secrets, clés API ou fichier `.env` dans un commit — vérifier que `.gitignore` les exclut avant chaque commit

---

## Ce que cette app N'est PAS

- Pas une app multi-utilisateurs (pour l'instant) — une seule utilisatrice
- Pas une app de création de contenu — le contenu (flashcards, QCM, résumés) est généré à l'extérieur et importé via Supabase
- Pas une app de chat ou d'IA temps réel — pas d'appel API IA dans le code
