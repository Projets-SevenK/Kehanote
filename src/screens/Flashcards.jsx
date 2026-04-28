import React, { useState } from 'react'
import { useFlashcards } from '../hooks/useFlashcards'

export function Flashcards({ route, go }) {
  const { subject } = route
  const { data, loading } = useFlashcards(subject?.id)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (loading) return <div className="kn-screen screen-anim" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: 'var(--ink-300)' }}>Chargement…</p></div>
  if (!data.length) return (
    <div className="kn-screen screen-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <p style={{ color: 'var(--ink-300)' }}>Aucune flashcard.</p>
      <button className="btn-ghost" onClick={() => go({ name: 'subjectHub', subject })}>Retour</button>
    </div>
  )

  const card = data[index]
  return (
    <div className="kn-screen screen-anim" style={{ display: 'flex', flexDirection: 'column', padding: '56px 20px 40px' }}>
      <button className="tap" style={{ background: 'none', border: 'none', color: 'var(--rose-600)', fontWeight: 700, padding: 0, marginBottom: 20, textAlign: 'left' }} onClick={() => go({ name: 'subjectHub', subject })}>← Retour</button>
      <p style={{ color: 'var(--ink-500)', fontSize: 13, fontWeight: 700, margin: '0 0 16px' }}>{index + 1} / {data.length}</p>
      <div
        className="kn-card tap"
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28, cursor: 'pointer', textAlign: 'center' }}
        onClick={() => setFlipped(f => !f)}
      >
        <p style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{flipped ? card.answer : card.question}</p>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <button className="btn-ghost" style={{ flex: 1 }} onClick={() => { setIndex(i => Math.max(0, i - 1)); setFlipped(false) }} disabled={index === 0}>←</button>
        <button className="btn-ghost" style={{ flex: 1 }} onClick={() => { setIndex(i => Math.min(data.length - 1, i + 1)); setFlipped(false) }} disabled={index === data.length - 1}>→</button>
      </div>
    </div>
  )
}
