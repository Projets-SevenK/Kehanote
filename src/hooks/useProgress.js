import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useProgress() {
  const [data, setData] = useState({ streak: 0, totalSessions: 0, scores: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      supabase.from('sessions').select('*').order('played_at', { ascending: false }),
      supabase.from('challenge_scores').select('*').order('played_at', { ascending: false }),
    ]).then(([sessions, scores]) => {
      if (sessions.error) { setError(sessions.error); setLoading(false); return }
      const rows = sessions.data ?? []
      const streak = computeStreak(rows)
      setData({ streak, totalSessions: rows.length, scores: scores.data ?? [] })
      setLoading(false)
    })
  }, [])

  return { data, loading, error }
}

function computeStreak(sessions) {
  if (!sessions.length) return 0
  const days = [...new Set(sessions.map(s => s.played_at))].sort().reverse()
  const today = new Date().toISOString().slice(0, 10)
  let streak = 0
  let cursor = today
  for (const day of days) {
    if (day === cursor) { streak++; cursor = prevDay(cursor) }
    else break
  }
  return streak
}

function prevDay(dateStr) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}
