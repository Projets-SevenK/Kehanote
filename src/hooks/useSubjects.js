import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSubjects() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('subjects')
      .select(`
        *,
        flashcards(count),
        chapters(id, number),
        sessions(mode, chapter_id),
        challenge_scores(score, chapter_id, level)
      `)
      .order('created_at')
      .then(({ data, error }) => {
        if (error) {
          setError(error)
        } else {
          const formatted = (data ?? []).map(s => {
            const cards_count     = s.flashcards?.[0]?.count ?? 0
            const chapters        = s.chapters ?? []
            const chapters_count  = chapters.length
            const sessions        = s.sessions ?? []
            const scores          = s.challenge_scores ?? []

            // ── Progression par chapitre ──────────────────────────────────
            // 25% concentré lu | 25% flashcards faites | 50% meilleur score QCM
            const chapterScores = chapters.map(ch => {
              const hasConcetre = sessions.some(x => x.mode === 'concentre' && x.chapter_id === ch.id)
              const hasSwipe    = sessions.some(x => x.mode === 'swipe'     && x.chapter_id === ch.id)
              const bestQCM     = Math.max(0, ...scores
                .filter(x => x.chapter_id === ch.id)
                .map(x => x.score))
              return (hasConcetre ? 0.25 : 0)
                   + (hasSwipe    ? 0.25 : 0)
                   + Math.min(1, bestQCM / 20) * 0.50
            })

            // Moyenne des chapitres (0→1)
            const progress = chapters_count > 0
              ? chapterScores.reduce((a, b) => a + b, 0) / chapters_count
              : 0

            // Examen blanc réalisé ?
            const examDone = scores.some(x => x.level === 'final')

            return {
              ...s,
              cards_count,
              chapters_count,
              progress,
              examDone,
            }
          })
          setData(formatted)
        }
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
