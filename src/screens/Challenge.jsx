import React, { useState } from 'react'
import { useQCM } from '../hooks/useQCM'
import { supabase } from '../lib/supabase'

export function Challenge({ route, go }) {
  const { subject } = route
  const [level, setLevel] = useState('easy')
  const { data, loading } = useQCM(subject?.id, level)
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [chosen, setChosen] = useState(null)

  if (loading) return <div className="kn-screen screen-anim" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: 'var(--ink-300)' }}>Chargement…</p></div>

  if (!data.length) return (
    <div className="kn-screen screen-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <p style={{ color: 'var(--ink-300)' }}>Aucune question pour ce niveau.</p>
      <button className="btn-ghost" onClick={() => go({ name: 'subjectHub', subject })}>Retour</button>
    </div>
  )

  if (step >= data.length) return (
    <div className="kn-screen screen-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 20 }}>
      <h2 style={{ margin: 0 }}>Score : {score}/{data.length}</h2>
      <button className="btn-primary" onClick={() => go({ name: 'reward', subject, score: Math.round((score / data.length) * 100) })}>Voir la récompense</button>
      <button className="btn-ghost" onClick={() => go({ name: 'subjectHub', subject })}>Retour</button>
    </div>
  )

  const q = data[step]
  const correct = chosen !== null && chosen === q.correct_index

  function pick(i) {
    if (chosen !== null) return
    setChosen(i)
    if (i === q.correct_index) setScore(s => s + 1)
  }

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ padding: '56px 20px 40px' }}>
        <button className="tap" style={{ background: 'none', border: 'none', color: 'var(--rose-600)', fontWeight: 700, padding: 0, marginBottom: 20 }} onClick={() => go({ name: 'subjectHub', subject })}>← Retour</button>
        <p style={{ color: 'var(--ink-500)', fontSize: 13, fontWeight: 700, margin: '0 0 12px' }}>{step + 1} / {data.length}</p>
        <div className="kn-card" style={{ padding: 20, marginBottom: 20 }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 16 }}>{q.question}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.choices.map((choice, i) => {
            let bg = 'var(--card)'
            if (chosen !== null) {
              if (i === q.correct_index) bg = '#DDEDE1'
              else if (i === chosen) bg = '#FFE4D6'
            }
            return (
              <button key={i} className="kn-card tap" style={{ padding: '14px 16px', border: 'none', textAlign: 'left', fontSize: 15, fontWeight: 600, background: bg }} onClick={() => pick(i)}>
                {choice}
              </button>
            )
          })}
        </div>
        {chosen !== null && (
          <div style={{ marginTop: 20 }}>
            {q.explanation && <p style={{ color: 'var(--ink-500)', fontSize: 14 }}>{q.explanation}</p>}
            <button className="btn-primary" style={{ width: '100%', marginTop: 12 }} onClick={() => { setStep(s => s + 1); setChosen(null) }}>
              {step < data.length - 1 ? 'Suivant →' : 'Voir le score'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
