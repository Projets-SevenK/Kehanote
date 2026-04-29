# Kehanote — Plan de développement

## Étape 1 — Setup projet ✅

- [x] `package.json` (React 18, Vite 5, vite-plugin-pwa, @supabase/supabase-js)
- [x] `vite.config.js` avec plugin React + PWA
- [x] `index.html` (fonts Google, viewport PWA)
- [x] `src/index.css` — toutes les variables CSS, keyframes, classes utilitaires du prototype
- [x] `src/main.jsx` + `src/App.jsx` (routeur par état `go()`)
- [x] `src/lib/supabase.js`
- [x] 6 hooks : useSubjects, useFlashcards, useQCM, useConcentre, usePanic, useProgress
- [x] 6 composants : Mascot, Sparkle, Heart, ProgressRing, SubjectIcon, Nav
- [x] 10 écrans : Onboarding, Home, SubjectHub, Concentre, Flashcards, Challenge, Panic, Reward, Profile, AllCards
- [x] `.gitignore` + `.env.example`
- [x] `npm run dev` → 200 OK ✅

---

## Étape 2 — Connexion Supabase + données réelles ✅

- [x] Créer le projet Supabase
- [x] Ajouter les vraies clés dans `.env` (URL corrigée : sans `/rest/v1/`)
- [x] Schéma SQL créé (7 tables vérifiées : subjects, flashcards, qcm_questions, concentre, panic_items, challenge_scores, sessions)
- [x] Connexion vérifiée : toutes les tables répondent ✅

---

## Étape 3 — Écran Home pixel-perfect ✅

- [x] Header : date en uppercase, "Bonjour Kehane" en Fraunces italic, phrase d'encouragement rotative, bouton Mochi
- [x] Streak card : grille 7 jours (L M M J V S D) avec cœurs remplis, compteur dynamique
- [x] Mode Panique : bouton dark gradient avec sparkle
- [x] Cards matières : fond dégradé par couleur, ProgressRing, animation staggerée screen-in
- [x] Nav 3 onglets : Accueil / Cartes / Profil avec icônes SVG du prototype
- [x] Mochi SVG complet (7 humeurs), Sparkle, Heart, SubjectIcon mis à jour pixel-perfect

---

## Étapes 4–10 — Tous les écrans ✅

- [x] **SubjectHub** — back rond, chip prof, titre display, ProgressRing, Mochi wink, 3 mode cards gradient staggerées, bouton Panique dashed
- [x] **Concentré** — top bar avec horloge + lecture time, sections bullets typées (key/def/tip), Mochi footer heart
- [x] **Flashcards** — drag swipe (souris + touch), flip 3D, badges JE CONNAIS / À REVOIR, FloatingHearts, 3 boutons, score readout, → Reward
- [x] **Challenge** — DifficultyPicker (3 niveaux, best score localStorage, scoring legend), Quiz (progress dots colorés, feedback Mochi, passer −0,25), → Reward + persist Supabase
- [x] **Panic** — thème sombre, countdown 5 min, picker multi-matières, items numérotés, Mochi sleepy calming
- [x] **Reward** — confettis 32 pièces, ProgressRing score, badge niveau, breakdown bonnes/mauvaises/passées, best record, note personnelle Nini
- [x] **Profile** — avatar Mochi ring gradient, 3 stats, bar chart semaine dynamique, 6 badges (dont 2 locked)

---

## Étape 11 — PWA ✅

- [x] Icons 192 + 512
- [x] Manifest complet
- [x] Service worker (cache offline)

---

## Étape 12 — Déploiement Vercel

- [ ] Variables d'env Vercel
- [ ] Build production vérifié
- [ ] URL publique
