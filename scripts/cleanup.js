// Script de nettoyage : supprime toutes les matières sauf "Sociologie de la Culture"
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
const KEEP = 'Sociologie de la Culture'

const { data: subjects, error } = await supabase.from('subjects').select('id, title')
if (error) { console.error(error); process.exit(1) }

const toDelete = subjects.filter(s => s.title !== KEEP)
if (!toDelete.length) { console.log('Rien à supprimer.'); process.exit(0) }

console.log(`Suppression de ${toDelete.length} matière(s) :`)
for (const s of toDelete) {
  console.log(` - ${s.title} (${s.id})`)
  const { error: e } = await supabase.from('subjects').delete().eq('id', s.id)
  if (e) console.error('  ❌ Erreur :', e.message)
  else   console.log('  ✅ Supprimée')
}
console.log('🎉 Nettoyage terminé.')
