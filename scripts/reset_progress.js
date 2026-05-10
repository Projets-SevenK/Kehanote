// scripts/reset_progress.js
// Efface tout l'avancement (sessions + scores) sans toucher au contenu des cours.
// Usage : node scripts/reset_progress.js
//         node scripts/reset_progress.js --subject "Sociologie de la Culture"

import { createClient } from '@supabase/supabase-js'
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../.env')
const env = {}
fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
  const [key, ...val] = line.split('=')
  if (key && val.length) env[key.trim()] = val.join('=').trim()
})

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)

// Optionnel : filtrer par matière
const subjectFilter = process.argv.includes('--subject')
  ? process.argv[process.argv.indexOf('--subject') + 1]
  : null

let subjectIds = null
if (subjectFilter) {
  const { data } = await supabase.from('subjects').select('id, title').ilike('title', `%${subjectFilter}%`)
  subjectIds = data?.map(s => s.id) ?? []
  if (!subjectIds.length) { console.error(`❌ Aucune matière trouvée : "${subjectFilter}"`); process.exit(1) }
  console.log(`🎯 Filtré sur : ${data.map(s => s.title).join(', ')}`)
}

async function deleteFrom(table) {
  let q = supabase.from(table).delete()
  if (subjectIds) q = q.in('subject_id', subjectIds)
  else q = q.neq('id', '00000000-0000-0000-0000-000000000000') // supprime tout
  const { error, count } = await q
  if (error) console.error(`  ❌ ${table} :`, error.message)
  else       console.log(`  ✅ ${table} vidé`)
}

console.log('\n🗑️  Réinitialisation de la progression...\n')
await deleteFrom('sessions')
await deleteFrom('challenge_scores')
console.log('\n✅ Progression effacée. Le contenu des cours est intact.\n')
console.log('   ↳ Tables préservées : subjects, chapters, flashcards,')
console.log('     qcm_questions, qrc_items, panic_items, concentre_sections, final_exam_questions\n')
