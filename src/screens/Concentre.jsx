import React from 'react'
import { useConcentre } from '../hooks/useConcentre'

export function Concentre({ route, go }) {
  const { subject } = route
  const { data, loading } = useConcentre(subject?.id)

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ padding: '56px 20px 40px' }}>
        <button className="tap" style={{ background: 'none', border: 'none', color: 'var(--rose-600)', fontWeight: 700, padding: 0, marginBottom: 20 }} onClick={() => go({ name: 'subjectHub', subject })}>← Retour</button>
        <h2 style={{ margin: '0 0 20px', fontFamily: 'var(--f-display)', fontSize: 26 }}>Le Concentré</h2>
        {loading ? <p style={{ color: 'var(--ink-300)' }}>Chargement…</p> : data.length === 0 ? (
          <p style={{ color: 'var(--ink-300)' }}>Aucun résumé disponible.</p>
        ) : data.map(chapter => (
          <div key={chapter.id} className="kn-card" style={{ padding: 20, marginBottom: 16 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 17, fontWeight: 800 }}>{chapter.chapter_title}</h3>
            <p style={{ margin: 0, color: 'var(--ink-500)', fontSize: 13 }}>⏱ {chapter.reading_time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
