import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qaghgsrfpknwbmpupauh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZ2hnc3JmcGtud2JtcHVwYXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDY4NDUsImV4cCI6MjA5Mjk4Mjg0NX0.K-DnB4ijVyT0FEnDFkI3MpT3rdStA3HT3ai2ywhPmJo'
)

async function run() {
  // ── 1. Sujet ──────────────────────────────────────────────────
  console.log('Insertion du sujet…')
  const { data: subject, error: subErr } = await supabase
    .from('subjects')
    .insert({
      title:     "Théories de l'information",
      teacher:   'M. Lefèvre',
      color:     'rose',
      icon:      'book',
      chapters:  8,
      next_exam: 'Mardi 14:00',
    })
    .select()
    .single()

  if (subErr) { console.error('❌ subject:', subErr.message); process.exit(1) }
  const sid = subject.id
  console.log(`✅ Sujet créé : ${subject.title} (${sid})`)

  // ── 2. Flashcards ─────────────────────────────────────────────
  console.log('Insertion des flashcards…')
  const { error: fcErr } = await supabase.from('flashcards').insert([
    { subject_id: sid, question: "Qui a formalisé le modèle mathématique de la communication en 1948 ?",  answer: "Claude Shannon (avec Warren Weaver)." },
    { subject_id: sid, question: "Que mesure-t-on en bits dans la théorie de Shannon ?",                   answer: "L'information, définie comme la réduction de l'incertitude." },
    { subject_id: sid, question: "Quels sont les six éléments du modèle de Shannon ?",                     answer: "Source, encodeur, canal, décodeur, destinataire, bruit." },
    { subject_id: sid, question: "Que signifie « bruit » dans ce modèle ?",                               answer: "Toute perturbation qui altère la transmission du message." },
    { subject_id: sid, question: "Quelle est la principale critique adressée au modèle de Shannon ?",      answer: "Il est linéaire et ignore le contexte humain et le sens." },
    { subject_id: sid, question: "À quoi sert la redondance ?",                                           answer: "À assurer la bonne transmission malgré le bruit." },
  ])
  if (fcErr) { console.error('❌ flashcards:', fcErr.message); process.exit(1) }
  console.log('✅ 6 flashcards insérées')

  // ── 3. QCM ────────────────────────────────────────────────────
  console.log('Insertion des questions QCM…')
  const { error: qcmErr } = await supabase.from('qcm_questions').insert([
    {
      subject_id: sid, level: 'easy',
      question: "Le modèle de Shannon date de…",
      choices: ["1928", "1948", "1968", "1988"], correct_index: 1,
      explanation: "Publié dans A Mathematical Theory of Communication en 1948.",
    },
    {
      subject_id: sid, level: 'easy',
      question: "L'information se mesure en…",
      choices: ["Octets", "Hertz", "Bits", "Décibels"], correct_index: 2,
      explanation: "L'unité fondamentale, introduite par Shannon, est le bit.",
    },
    {
      subject_id: sid, level: 'medium',
      question: "Dans le modèle, le « bruit » désigne…",
      choices: ["Le sens du message", "Toute perturbation altérant la transmission", "Le récepteur", "Le canal de communication"],
      correct_index: 1,
      explanation: "Le bruit regroupe toutes les interférences possibles.",
    },
    {
      subject_id: sid, level: 'medium',
      question: "Qui complète Shannon avec « qui dit quoi à qui » ?",
      choices: ["Lazarsfeld", "Lasswell", "McLuhan", "Habermas"], correct_index: 1,
      explanation: "Harold Lasswell, dès 1948 également.",
    },
    {
      subject_id: sid, level: 'hard',
      question: "Quelle est la principale limite épistémologique du modèle ?",
      choices: ["Il est trop complexe à formaliser", "Il ignore le contexte humain et le sens", "Il ne s'applique qu'à la radio", "Il confond émetteur et canal"],
      correct_index: 1,
      explanation: "C'est un modèle technique, pas sémantique — d'où les critiques de l'école de Palo Alto.",
    },
    {
      subject_id: sid, level: 'hard',
      question: "La redondance, chez Shannon, sert à…",
      choices: ["Réduire la quantité d'information", "Compenser le bruit du canal", "Augmenter la rapidité de transmission", "Coder le message en binaire"],
      correct_index: 1,
      explanation: "Plus de redondance = plus de chances que le message arrive intact malgré le bruit.",
    },
  ])
  if (qcmErr) { console.error('❌ qcm_questions:', qcmErr.message); process.exit(1) }
  console.log('✅ 6 questions QCM insérées (2 easy, 2 medium, 2 hard)')

  // ── 4. Le Concentré ───────────────────────────────────────────
  console.log('Insertion du concentré…')
  const { error: concErr } = await supabase.from('concentre').insert({
    subject_id:    sid,
    chapter_title: "Chapitre 3 — Le modèle de Shannon",
    reading_time:  "4 min",
    sections: [
      {
        title: "L'essentiel", kind: 'key',
        bullets: [
          "Modèle mathématique (1948) qui décrit la transmission d'un message",
          "Six éléments : source, encodeur, canal, décodeur, destinataire, bruit",
          "Vise à mesurer, pas à interpréter le sens",
        ],
      },
      {
        title: "À retenir", kind: 'def',
        bullets: [
          "Information = ce qui réduit l'incertitude (mesuré en bits)",
          "Le bruit = toute perturbation qui altère le message",
          "Redondance = répétition pour assurer la transmission",
        ],
      },
      {
        title: "Pour l'oral", kind: 'tip',
        bullets: [
          "Critique : modèle linéaire, ignore le contexte humain",
          "Lasswell complète avec « qui dit quoi à qui ? »",
          "Reste la base de toute théorie de la communication",
        ],
      },
    ],
  })
  if (concErr) { console.error('❌ concentre:', concErr.message); process.exit(1) }
  console.log('✅ Concentré inséré (3 sections)')

  // ── 5. Mode Panique ───────────────────────────────────────────
  console.log('Insertion du mode panique…')
  const panicItems = [
    "Shannon (1948) — modèle mathématique en 6 éléments.",
    "Bruit = perturbation. Redondance = sécurité.",
    "Information mesurée en bits = réduction d'incertitude.",
    "Critique : linéaire, sans contexte. Lasswell complète.",
    "Base de toute théorie de la com.",
  ]
  const { error: panicErr } = await supabase.from('panic_items').insert(
    panicItems.map((content, sort_order) => ({ subject_id: sid, content, sort_order }))
  )
  if (panicErr) { console.error('❌ panic_items:', panicErr.message); process.exit(1) }
  console.log('✅ 5 items panique insérés')

  console.log('\n🎉 Seed terminé avec succès.')
}

run()
