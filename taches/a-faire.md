# Kehanote v2 — Plan de développement

## Historique v1 (tout terminé)

- [x] Setup projet React 18 + Vite 5 + PWA + Supabase
- [x] Schema Supabase v1 (subjects, flashcards, qcm_questions, concentre, panic_items, challenge_scores, sessions)
- [x] Tous les hooks v1 (useSubjects, useFlashcards, useQCM, useConcentre, usePanic, useProgress)
- [x] Tous les composants (Mascot, Sparkle, Heart, ProgressRing, SubjectIcon, Nav)
- [x] Tous les écrans v1 (Onboarding, Home, SubjectHub, Concentre, Flashcards, Challenge, Panic, Reward, Profile, AllCards)
- [x] PWA (icons, manifest, service worker)

---

## Étape A — Migration schéma Supabase v2

Objectif : ajouter la table `chapters`, la colonne `chapter_id` sur les tables existantes, la colonne `exam_type` sur `subjects`, et créer la table `qrc_questions`. Faire la migration sans casser les données existantes.

- [ ] Ajouter colonne `exam_type text not null default 'qcm'` sur `subjects`
- [ ] Créer table `chapters` (id, subject_id, number, title, created_at)
- [ ] Ajouter colonne `chapter_id uuid references chapters(id)` (nullable d'abord) sur `flashcards`
- [ ] Ajouter colonne `chapter_id uuid references chapters(id)` (nullable d'abord) sur `qcm_questions`
- [ ] Ajouter colonne `is_final_exam boolean not null default false` sur `qcm_questions`
- [ ] Ajouter colonne `chapter_id uuid references chapters(id)` (nullable d'abord) sur `concentre`
- [ ] Ajouter colonne `chapter_id uuid references chapters(id)` (nullable d'abord) sur `panic_items`
- [ ] Créer table `qrc_questions` (id, subject_id, chapter_id, question, plan_type, model_answer, key_concepts jsonb, created_at)
- [ ] Mettre à jour `challenge_scores` : ajouter `chapter_id` nullable + level accepte 'final'
- [ ] Vérifier que toutes les tables répondent correctement

Commit : `chore(db): migration schema v2 — chapters + QRC + exam_type`

---

## Étape B — Nouveaux hooks ✅

- [x] `useChapters.js` — fetch tous les chapitres d'une matière, triés par `number`
- [x] Mettre à jour `useFlashcards.js` — filtre par `chapter_id` au lieu de `subject_id`
- [x] Mettre à jour `useQCM.js` — filtre par `chapter_id` + support `is_final_exam = true` pour l'examen blanc
- [x] Mettre à jour `useConcentre.js` — filtre par `chapter_id`, retourne un objet unique (`.single()`)
- [x] Mettre à jour `usePanic.js` — fetch items groupés par `chapter_id`, retourne `[{ chapter, items[] }]` trié par numéro
- [x] `useQRC.js` — fetch questions QRC par `chapter_id`

Commit : `feat(hooks): mise à jour et nouveaux hooks pour architecture chapitres`

---

## Étape C — Refonte SubjectHub ✅

Objectif : SubjectHub n'est plus l'entrée directe vers les 3 modes. Il affiche la liste des chapitres et un bouton Examen Blanc en bas.

- [x] Afficher la liste des chapitres (cartes avec numéro, titre, ProgressRing par chapitre)
- [x] Chaque chapitre navigue vers `ChapterHub`
- [x] Bouton "Examen Blanc" en bas (style distinct, débloqué visuellement si tous chapitres vus, accessible toujours)
- [x] Conserver : back rond, chip prof, titre display, Mochi wink, bouton Panique dashed
- [x] Supprimer : les 3 mode cards directes (elles passent dans ChapterHub)

Commit : `feat(subjects): SubjectHub refonte — liste chapitres + examen blanc`

---

## Étape D — Nouvel écran ChapterHub ✅

Objectif : écran intermédiaire entre SubjectHub et les modes de révision. Reprend le design des mode cards de l'ancien SubjectHub.

- [x] Header : back vers SubjectHub, chip "Chapitre N", titre du chapitre
- [x] 3 mode cards : Concentré / Flashcards / Challenge (toujours présentes)
- [x] 4e mode card : "Questions de cours" (QRCPractice) — affiché seulement si `subject.exam_type === 'qrc'`
- [x] Animation staggerée screen-in sur les cards
- [x] ProgressRing global du chapitre (basé sur challenge scores par niveau)

Commit : `feat(chapters): nouvel écran ChapterHub`

---

## Étape E — Adaptation des écrans existants ✅

- [x] `Flashcards.jsx` — reçoit `chapter_id` dans la route, fetch par chapitre
- [x] `Challenge.jsx` — reçoit `chapter_id` dans la route, fetch par chapitre, persiste `chapter_id`
- [x] `Concentre.jsx` — reçoit `chapter_id` dans la route, fetch par chapitre (`useConcentre` retourne `.single()`)
- [x] `Panic.jsx` — inchangé (déjà groupé par chapitres via `usePanic`)

Commit : `refactor(screens): adaptation écrans existants à l'architecture chapitres`

---

## Étape F — Nouvel écran QRCPractice ✅

Objectif : entraînement aux questions à réponse courte / dissertation.

- [x] Header : back vers ChapterHub, chip "QRC", titre chapitre
- [x] Carte question : affiche la question d'examen probable, Mochi focus
- [x] Bouton "Voir le corrige" : révèle plan type + corrigé indicatif en slide
- [x] Chips `key_concepts` colorées sous le corrigé
- [x] Boutons d'auto-évaluation : "Je maitrise" (vert) / "A retravailler" (rose)
- [x] Les questions "A retravailler" reviennent en fin de pile
- [x] Écran de fin : score auto-évaluation, → Reward

Commit : `feat(qrc): nouvel écran QRCPractice`

---

## Étape G — Nouvel écran ExamenBlanc

Objectif : simulation d'examen — 30 questions difficiles sur toute la matière, sans indice de niveau.

- [ ] Reprend la logique de `Challenge` (Quiz), sans le DifficultyPicker
- [ ] Fetch `qcm_questions` où `subject_id = X` et `is_final_exam = true`
- [ ] Mélange aléatoire des 30 questions
- [ ] Pas de skip possible (ou pénalité identique au mode difficile)
- [ ] Pas de feedback immédiat sur la réponse — révélation uniquement à la fin
- [ ] Écran de résultat : score /20, détail par question (bonne / mauvaise + explication), → Reward avec badge "Partiel simulé"

Commit : `feat(exam): nouvel écran ExamenBlanc`

---

## Étape H — Mise à jour App.jsx

- [ ] Ajouter `ChapterHub`, `QRCPractice`, `ExamenBlanc` dans le routeur
- [ ] Vérifier que la navigation complète fonctionne : Home → SubjectHub → ChapterHub → [Concentré / Flashcards / Challenge / QRC] → Reward → retour ChapterHub
- [ ] Vérifier : Home → SubjectHub → ExamenBlanc → Reward

Commit : `refactor(app): mise à jour routeur pour architecture v2`

---

## Étape I — Mise à jour script d'import

Objectif : `scripts/import.js` doit gérer le nouveau format JSON avec chapitres.

Format JSON attendu en entrée :

```json
{
  "subject_name": "Sociologie de la Culture",
  "teacher_name": "Nom du prof",
  "subject_color": "lav",
  "icon": "people",
  "exam_type": "qrc",
  "next_exam": "11 mai 2025",
  "chapters": [
    {
      "number": 1,
      "title": "Titre du chapitre",
      "concentre": {
        "reading_time": 4,
        "sections": [
          { "type": "key", "title": "Points clés", "bullets": ["..."] }
        ]
      },
      "flashcards": [{ "question": "...", "answer": "..." }],
      "qcm": {
        "easy": [
          {
            "question": "...",
            "choices": ["A", "B", "C", "D"],
            "correct_index": 0,
            "explanation": "..."
          }
        ],
        "medium": [],
        "hard": []
      },
      "panic": ["Point condensé 1.", "Point condensé 2."],
      "qrc": [
        {
          "question": "Question probable d'examen",
          "plan_type": "I. ... / II. ... / III. ...",
          "model_answer": "Corrigé indicatif complet.",
          "key_concepts": ["concept1", "concept2"]
        }
      ]
    }
  ],
  "final_exam": [
    {
      "question": "...",
      "choices": ["A", "B", "C", "D"],
      "correct_index": 0,
      "explanation": "..."
    }
  ]
}
```

- [ ] Mettre à jour `scripts/import.js` pour créer le sujet, les chapitres, et insérer toutes les données liées
- [ ] Tester sur un JSON minimal (1 chapitre, quelques questions)

Commit : `chore(scripts): mise à jour import.js pour format v2 avec chapitres`

---

## Étape J — Contenu Sociologie (priorité absolue)

Matière : Sociologie de la Culture (L3, exam QRC/dissertation, partiel 11 mai)
Nombre de chapitres : à déterminer selon le cours PDF

- [ ] Générer le JSON complet pour Sociologie (tous chapitres + examen blanc)
- [ ] Valider le contenu (cohérence, niveau, couverture du cours)
- [ ] Injecter via `scripts/import.js`
- [ ] Vérifier l'affichage dans l'app

Commit : `data(socio): injection Sociologie de la Culture — tous chapitres + examen blanc`

---

## Étape K — Contenu autres matières

- [ ] Droit (exam_type: 'qcm')
- [ ] UE — Union Européenne (exam_type: 'qcm')
- [ ] Internationalisation des programmes de fiction (exam_type: 'qrc')

---

## Étape L — Déploiement Vercel

- [ ] Variables d'env Vercel (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] Build production vérifié (`npm run build` sans erreur)
- [ ] URL publique fonctionnelle
- [ ] PWA installable sur mobile

Commit : `chore(deploy): déploiement Vercel production`
