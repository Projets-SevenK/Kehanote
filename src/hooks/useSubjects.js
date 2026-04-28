import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSubjects() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('subjects')
      .select('*, flashcards(count), sessions(count)')
      .order('created_at')
      .then(({ data, error }) => {
        if (error) {
          setError(error)
        } else {
          const formatted = (data ?? []).map(s => ({
            ...s,
            cards_count: s.flashcards?.[0]?.count ?? 0,
            progress: Math.min(1, (s.sessions?.[0]?.count ?? 0) / 10)
          }))
          setData(formatted)
        }
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
