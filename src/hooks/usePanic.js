import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function usePanic(subjectId) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!subjectId) return
    supabase
      .from('panic_items')
      .select('*')
      .eq('subject_id', subjectId)
      .order('sort_order')
      .then(({ data, error }) => {
        if (error) setError(error)
        else setData(data ?? [])
        setLoading(false)
      })
  }, [subjectId])

  return { data, loading, error }
}
