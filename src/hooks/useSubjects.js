import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSubjects() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('subjects')
      .select('*, flashcards(count), sessions(mode, cards_done), challenge_scores(score), chapters(count)')
      .order('created_at')
      .then(({ data, error }) => {
        if (error) {
          setError(error)
        } else {
          const formatted = (data ?? []).map(s => {
            const cards_count = s.flashcards?.[0]?.count ?? 0
            const chapters_count = s.chapters?.[0]?.count ?? 0
            
            // Flashcards mastery: how many cards swiped vs total existing cards
            const fcDone = s.sessions?.filter(x => x.mode === 'swipe').reduce((acc, x) => acc + (x.cards_done || 0), 0) ?? 0
            const fcProgress = cards_count > 0 ? Math.min(1, fcDone / cards_count) : 0
            
            // QCM mastery: highest score out of 20
            const maxScore = Math.max(0, ...(s.challenge_scores?.map(x => x.score) || [0]))
            const qcmProgress = Math.min(1, maxScore / 20)
            
            // Global progress: 50% Flashcards + 50% QCM
            let progress = (fcProgress * 0.5) + (qcmProgress * 0.5)
            
            return {
              ...s,
              cards_count,
              chapters_count,
              progress
            }
          })
          setData(formatted)
        }
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
