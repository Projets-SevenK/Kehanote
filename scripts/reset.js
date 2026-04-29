import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../.env')
const envFile = fs.readFileSync(envPath, 'utf-8')
const env = {}
envFile.split('\n').forEach(line => {
  const [key, ...val] = line.split('=')
  if (key && val) env[key.trim()] = val.join('=').trim()
})

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)

async function run() {
  console.log("Suppression de toutes les données liées aux matières...")
  
  // To be safe against lack of cascading delete, we delete from child tables first.
  await supabase.from('sessions').delete().neq('id', 0)
  await supabase.from('challenge_scores').delete().neq('id', 0)
  await supabase.from('flashcards').delete().neq('id', 0)
  await supabase.from('qcm_questions').delete().neq('id', 0)
  await supabase.from('panic_items').delete().neq('id', 0)
  await supabase.from('concentre').delete().neq('id', 0)
  
  // Now delete the subjects
  const { error } = await supabase.from('subjects').delete().neq('id', '00000000-0000-0000-0000-000000000000') // Deletes all UUIDs
  
  if (error) {
    console.error("Erreur :", error)
  } else {
    console.log("✅ Toutes les données ont été réinitialisées avec succès !")
  }
}

run().catch(console.error)
