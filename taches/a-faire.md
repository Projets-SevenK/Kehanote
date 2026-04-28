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

## Étape 2 — Connexion Supabase + données réelles

- [ ] Créer le projet Supabase
- [ ] Ajouter les vraies clés dans `.env`
- [ ] Créer le schéma SQL (tables du CLAUDE.md)
- [ ] Vérifier que les hooks chargent les données

---

## Étape 3 — Écran Home pixel-perfect

- [ ] Header avec streak + mascotte humeur dynamique
- [ ] Cards matières avec couleur/icône
- [ ] Barre de navigation bottom

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
