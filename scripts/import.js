import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load .env manually since we are in node
const envPath = path.resolve(__dirname, '../.env')
const envFile = fs.readFileSync(envPath, 'utf-8')
const env = {}
envFile.split('\n').forEach(line => {
  const [key, ...val] = line.split('=')
  if (key && val) env[key.trim()] = val.join('=').trim()
})

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)

async function run() {
  console.log("Lecture du fichier data.json...")
  
  // You should put all your JSONs into a single data.json file like this:
  // { "qcm": {...}, "flashcards": [...], "panic": [...], "concentre": {...} }
  const dataPath = path.resolve(__dirname, '../data.json')
  if (!fs.existsSync(dataPath)) {
    console.error("Erreur: Le fichier data.json est introuvable à la racine.")
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  
  console.log("Création de la matière...")
  // Create subject
  const { data: subject, error: subErr } = await supabase.from('subjects').insert({
    title: 'Droit de la Communication',
    teacher: 'Licence Info-Com',
    color: 'peach',
    icon: 'scale',
    chapters: 1,
    next_exam: 'Prochainement'
  }).select().single()

  if (subErr) throw subErr
  console.log("✅ Matière créée :", subject.title)

  // Insert QCM
  if (data.qcm && data.qcm.quizData) {
    console.log(`Injection de ${data.qcm.quizData.length} questions QCM...`)
    const qcmToInsert = data.qcm.quizData.map(q => {
      const levelMap = { 'Facile': 'easy', 'Moyenne': 'medium', 'Difficile': 'hard' }
      const correctIndex = q.options.findIndex(o => o.isCorrect)
      return {
        subject_id: subject.id,
        level: levelMap[q.difficulty] || 'medium',
        question: q.question,
        choices: q.options.map(o => o.text),
        correct_index: correctIndex !== -1 ? correctIndex : 0,
        explanation: q.options[correctIndex !== -1 ? correctIndex : 0]?.rationale || q.hint
      }
    })
    const { error } = await supabase.from('qcm_questions').insert(qcmToInsert)
    if (error) throw error
    console.log("✅ QCM injecté")
  }

  // Insert Flashcards
  if (data.flashcards) {
    const fcData = Array.isArray(data.flashcards[0]) ? data.flashcards[0] : data.flashcards;
    console.log(`Injection de ${fcData.length} flashcards...`)
    const fcToInsert = fcData.map(f => ({
      subject_id: subject.id,
      question: f.question,
      answer: f.answer
    }))
    const { error } = await supabase.from('flashcards').insert(fcToInsert)
    if (error) throw error
    console.log("✅ Flashcards injectées")
  }

  // Insert Panic
  if (data.panic) {
    const panicData = Array.isArray(data.panic[0]) ? data.panic[0] : data.panic;
    console.log(`Injection de ${panicData.length} items panic mode...`)
    const panicToInsert = panicData.map((p, i) => ({
      subject_id: subject.id,
      content: p,
      sort_order: i
    }))
    const { error } = await supabase.from('panic_items').insert(panicToInsert)
    if (error) throw error
    console.log("✅ Mode Panique injecté")
  }

  // Insert Concentre
  if (data.concentre) {
    console.log("Injection du Concentré...")
    const { error } = await supabase.from('concentre').insert({
      subject_id: subject.id,
      chapter_title: data.concentre.chapter_title,
      reading_time: data.concentre.reading_time,
      sections: data.concentre.sections
    })
    if (error) throw error
    console.log("✅ Concentré injecté")
  }

  console.log("🎉 TOUT EST TERMINÉ ! La matière est prête dans Kehanote.")
}

run().catch(console.error)
