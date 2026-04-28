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

## Étape 4 — SubjectHub

- [ ] 4 modes avec stats rapides
- [ ] Prochain examen
- [ ] Animation screen-in

---

## Étape 5 — Swipe & Retiens (Flashcards)

- [ ] Swipe drag gauche/droite
- [ ] Animation flip carte
- [ ] Compteur + indicateur progression

---

## Étape 6 — Le Concentré

- [ ] Chapitres avec sections
- [ ] Bullets structurés
- [ ] Lecture estimée

---

## Étape 7 — Challenge (QCM)

- [ ] Sélection niveau (easy/medium/hard)
- [ ] Feedback immédiat couleur
- [ ] Explication + score final → Reward

---

## Étape 8 — Mode Panique

- [ ] Liste ultra-condensée
- [ ] Animation panic-pulse
- [ ] Design rouge urgence

---

## Étape 9 — Écran Reward

- [ ] Confettis animés
- [ ] Mascotte humeur selon score
- [ ] CTA retour / réessayer

---

## Étape 10 — Profil & Progression

- [ ] Streak jours
- [ ] Badges
- [ ] ProgressRing par matière

---

## Étape 11 — PWA

- [ ] Icons 192 + 512
- [ ] Manifest complet
- [ ] Service worker (cache offline)

---

## Étape 12 — Déploiement Vercel

- [ ] Variables d'env Vercel
- [ ] Build production vérifié
- [ ] URL publique
