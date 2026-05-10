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
  const { data: subjects, error } = await supabase.from('subjects').select('id, title').order('created_at', { ascending: false })
  if (error) {
    console.error(error)
    return
  }
  
  // Find duplicates
  const seen = new Set()
  for (const subject of subjects) {
    if (seen.has(subject.title)) {
      console.log(`Deleting duplicate: ${subject.title}`)
      await supabase.from('sessions').delete().eq('subject_id', subject.id)
      await supabase.from('challenge_scores').delete().eq('subject_id', subject.id)
      await supabase.from('flashcards').delete().eq('subject_id', subject.id)
      await supabase.from('qcm_questions').delete().eq('subject_id', subject.id)
      await supabase.from('panic_items').delete().eq('subject_id', subject.id)
      await supabase.from('concentre').delete().eq('subject_id', subject.id)
      await supabase.from('subjects').delete().eq('id', subject.id)
    } else {
      seen.add(subject.title)
    }
  }
  console.log('Doublons supprimés')
}

run()
