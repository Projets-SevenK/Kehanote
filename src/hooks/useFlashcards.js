import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useFlashcards(chapterId) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!chapterId) return
    supabase
      .from('flashcards')
      .select('*')
      .eq('chapter_id', chapterId)
      .order('created_at')
      .then(({ data, error }) => {
        if (error) setError(error)
        else setData(data ?? [])
        setLoading(false)
      })
  }, [chapterId])

  return { data, loading, error }
}
