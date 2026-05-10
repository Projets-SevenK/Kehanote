import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSubjects() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('subjects')
      .select('*, flashcards(count), chapters(count), sessions(mode, cards_done), challenge_scores(score)')
      .order('created_at')
      .then(({ data, error }) => {
        if (error) {
          setError(error)
        } else {
          const formatted = (data ?? []).map(s => {
            const cards_count    = s.flashcards?.[0]?.count ?? 0
            const chapters_count = s.chapters?.[0]?.count  ?? 0
            const sessions       = s.sessions ?? []
            const scores         = s.challenge_scores ?? []

            // ── Progression pédagogique ────────────────────────────────────
            // 25% concentré lu | 25% flashcards faites | 50% meilleur score QCM
            const hasConcetre = sessions.some(x => x.mode === 'concentre')
            const hasSwipe    = sessions.some(x => x.mode === 'swipe')
            const bestQCM     = Math.max(0, ...scores.map(x => x.score ?? 0))

            const progress = (hasConcetre ? 0.25 : 0)
                           + (hasSwipe    ? 0.25 : 0)
                           + Math.min(1, bestQCM / 20) * 0.50

            return {
              ...s,
              cards_count,
              chapters_count,
              progress,
            }
          })
          setData(formatted)
        }
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
