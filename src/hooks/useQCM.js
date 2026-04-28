import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useQCM(subjectId, level) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!subjectId) return
    let query = supabase.from('qcm_questions').select('*').eq('subject_id', subjectId)
    if (level) query = query.eq('level', level)
    query.order('created_at').then(({ data, error }) => {
      if (error) setError(error)
      else setData(data ?? [])
      setLoading(false)
    })
  }, [subjectId, level])

  return { data, loading, error }
}
