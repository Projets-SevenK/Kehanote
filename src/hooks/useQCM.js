import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Usage:
//   chapter QCM  → useQCM({ chapterId: '...', level: 'easy' })
//   final exam   → useQCM({ subjectId: '...', finalExam: true })
export function useQCM({ chapterId = null, subjectId = null, level = null, finalExam = false } = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const id = finalExam ? subjectId : chapterId
    if (!id) return

    let query = supabase.from('qcm_questions').select('*')

    if (finalExam) {
      query = query.eq('subject_id', subjectId).eq('is_final_exam', true)
    } else {
      query = query.eq('chapter_id', chapterId).eq('is_final_exam', false)
      if (level) query = query.eq('level', level)
    }

    query.order('created_at').then(({ data, error }) => {
      if (error) setError(error)
      else setData(data ?? [])
      setLoading(false)
    })
  }, [chapterId, subjectId, level, finalExam])

  return { data, loading, error }
}
