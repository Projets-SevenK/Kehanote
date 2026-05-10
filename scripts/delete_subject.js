// scripts/delete_subject.js
// Supprime une matière ET tout son contenu (cascade).
// Usage : node scripts/delete_subject.js "Sociologie de la Culture"

import { createClient } from '@supabase/supabase-js'
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const env = {}
fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf-8').split('\n').forEach(line => {
  const [key, ...val] = line.split('=')
  if (key && val.length) env[key.trim()] = val.join('=').trim()
})

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)
const name = process.argv[2]
if (!name) { console.error('Usage : node scripts/delete_subject.js "Nom de la matière"'); process.exit(1) }

const { data, error } = await supabase.from('subjects').select('id, title').ilike('title', `%${name}%`)
if (error || !data?.length) { console.error(`❌ Matière non trouvée : "${name}"`); process.exit(1) }

for (const s of data) {
  console.log(`🗑️  Suppression : ${s.title} (${s.id})`)
  const { error: e } = await supabase.from('subjects').delete().eq('id', s.id)
  if (e) console.error('  ❌', e.message)
  else   console.log('  ✅ Supprimée (cascade sur chapitres, flashcards, QCM…)')
}
