/**
 * scripts/import.js — Kehanote v2
 *
 * Injecte un JSON de matière dans Supabase.
 * Usage : node scripts/import.js <chemin-vers-fichier.json>
 *   ou   : node scripts/import.js   (cherche data.json à la racine)
 *
 * Format JSON attendu : voir taches/a-faire.md §Étape I
 */

import { createClient } from '@supabase/supabase-js'
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Chargement des variables d'environnement ──────────────────────────────────
const envPath = path.resolve(__dirname, '../.env')
if (!fs.existsSync(envPath)) {
  console.error('❌ Fichier .env introuvable à la racine du projet.')
  process.exit(1)
}
const env = {}
fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
  const [key, ...val] = line.split('=')
  if (key && val.length) env[key.trim()] = val.join('=').trim()
})

if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
  console.error('❌ VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquant dans .env')
  process.exit(1)
}

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)

// ── Helpers ───────────────────────────────────────────────────────────────────
function ok(label, n) {
  const suffix = n != null ? ` (${n})` : ''
  console.log(`  ✅ ${label}${suffix}`)
}

async function insert(table, rows, label) {
  if (!rows.length) { console.log(`  ⏭  ${label} : aucune donnée`); return }
  const { error } = await supabase.from(table).insert(rows)
  if (error) throw new Error(`[${table}] ${error.message}`)
  ok(label, rows.length)
}

// ── Script principal ──────────────────────────────────────────────────────────
async function run() {
  // Chemin du JSON : argument CLI ou data.json par défaut
  const jsonArg  = process.argv[2]
  const jsonPath = jsonArg
    ? path.resolve(process.cwd(), jsonArg)
    : path.resolve(__dirname, '../data.json')

  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Fichier JSON introuvable : ${jsonPath}`)
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
  console.log(`\n📚 Import : "${data.subject_name}" (${(data.chapters ?? []).length} chapitres)\n`)

  // ── 1. Créer la matière ─────────────────────────────────────────────────────
  const { data: subject, error: subErr } = await supabase
    .from('subjects')
    .insert({
      title:     data.subject_name  ?? 'Nouvelle Matière',
      teacher:   data.teacher_name  ?? 'Professeur',
      color:     data.subject_color ?? 'rose',
      icon:      data.icon          ?? 'book',
      exam_type: data.exam_type     ?? 'qcm',
      next_exam: data.next_exam     ?? null,
    })
    .select()
    .single()

  if (subErr) throw new Error(`[subjects] ${subErr.message}`)
  ok('Matière créée', null)
  console.log(`     id: ${subject.id}`)

  const subjectId = subject.id

  // ── 2. Chapitres ────────────────────────────────────────────────────────────
  const chapters = data.chapters ?? []
  if (!chapters.length) {
    console.warn('⚠️  Aucun chapitre dans le JSON.')
  }

  for (const ch of chapters) {
    console.log(`\n  📖 Chapitre ${ch.number} : ${ch.title}`)

    // 2a. Créer le chapitre
    const { data: chapter, error: chErr } = await supabase
      .from('chapters')
      .insert({ subject_id: subjectId, number: ch.number, title: ch.title })
      .select()
      .single()

    if (chErr) throw new Error(`[chapters] ch${ch.number} : ${chErr.message}`)
    ok('Chapitre créé', null)

    const chapterId = chapter.id

    // 2b. Concentré
    if (ch.concentre) {
      await insert('concentre', [{
        subject_id:    subjectId,
        chapter_id:    chapterId,
        chapter_title: ch.title,
        reading_time:  ch.concentre.reading_time ?? 5,
        sections:      ch.concentre.sections     ?? [],
      }], 'Concentré')
    }

    // 2c. Flashcards
    if (ch.flashcards?.length) {
      const rows = ch.flashcards.map(f => ({
        subject_id: subjectId,
        chapter_id: chapterId,
        question:   f.question,
        answer:     f.answer,
      }))
      await insert('flashcards', rows, 'Flashcards')
    }

    // 2d. QCM par niveau
    const qcm = ch.qcm ?? {}
    const qcmRows = []
    for (const level of ['easy', 'medium', 'hard']) {
      for (const q of (qcm[level] ?? [])) {
        qcmRows.push({
          subject_id:   subjectId,
          chapter_id:   chapterId,
          level,
          is_final_exam: false,
          question:     q.question,
          choices:      q.choices,
          correct_index: q.correct_index,
          explanation:  q.explanation ?? null,
        })
      }
    }
    await insert('qcm_questions', qcmRows, 'QCM chapitre')

    // 2e. Mode Panique
    if (ch.panic?.length) {
      const rows = ch.panic.map((content, i) => ({
        subject_id: subjectId,
        chapter_id: chapterId,
        content,
        sort_order: i,
      }))
      await insert('panic_items', rows, 'Panique')
    }

    // 2f. QRC (si exam_type = 'qrc')
    if (ch.qrc?.length) {
      const rows = ch.qrc.map(q => ({
        subject_id:   subjectId,
        chapter_id:   chapterId,
        question:     q.question,
        plan_type:    q.plan_type,
        model_answer: q.model_answer,
        key_concepts: q.key_concepts ?? [],
      }))
      await insert('qrc_questions', rows, 'QRC')
    }
  }

  // ── 3. Examen Blanc ─────────────────────────────────────────────────────────
  const finalExam = data.final_exam ?? []
  if (finalExam.length) {
    console.log(`\n  🎓 Examen Blanc`)
    const rows = finalExam.map(q => ({
      subject_id:    subjectId,
      chapter_id:    null,          // pas rattaché à un chapitre
      level:         'hard',
      is_final_exam: true,
      question:      q.question,
      choices:       q.choices,
      correct_index: q.correct_index,
      explanation:   q.explanation ?? null,
    }))
    await insert('qcm_questions', rows, 'Examen Blanc')
  }

  // ── Résumé ──────────────────────────────────────────────────────────────────
  const flashTotal = chapters.reduce((s, c) => s + (c.flashcards?.length ?? 0), 0)
  const qcmTotal   = chapters.reduce((s, c) => s + Object.values(c.qcm ?? {}).flat().length, 0)
  const qrcTotal   = chapters.reduce((s, c) => s + (c.qrc?.length ?? 0), 0)
  const panicTotal = chapters.reduce((s, c) => s + (c.panic?.length ?? 0), 0)

  console.log(`
🎉 IMPORT TERMINÉ
   Matière     : ${subject.title} (${subject.id})
   Chapitres   : ${chapters.length}
   Flashcards  : ${flashTotal}
   QCM         : ${qcmTotal} (+ ${finalExam.length} examen blanc)
   QRC         : ${qrcTotal}
   Panique     : ${panicTotal} items
  `)
}

run().catch(err => {
  console.error('\n❌ Erreur fatale :', err.message)
  process.exit(1)
})
