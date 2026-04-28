import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSubjects() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('subjects')
      .select('*')
      .order('created_at')
      .then(({ data, error }) => {
        if (error) setError(error)
        else setData(data ?? [])
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
