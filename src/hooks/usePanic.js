import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Returns [{ chapter: { id, number, title }, items: [...] }, ...]
// sorted by chapter number. Items without a chapter land in a fallback group.
export function usePanic(subjectId) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!subjectId) return
    supabase
      .from('panic_items')
      .select('*, chapters(id, number, title)')
      .eq('subject_id', subjectId)
      .order('sort_order')
      .then(({ data: rows, error }) => {
        if (error) { setError(error); setLoading(false); return }

        const map = new Map()
        for (const row of rows ?? []) {
          const ch = row.chapters ?? { id: null, number: 0, title: 'Général' }
          const key = ch.id ?? '__none__'
          if (!map.has(key)) map.set(key, { chapter: ch, items: [] })
          map.get(key).items.push(row)
        }

        const grouped = [...map.values()].sort((a, b) => a.chapter.number - b.chapter.number)
        setData(grouped)
        setLoading(false)
      })
  }, [subjectId])

  return { data, loading, error }
}
