import React from 'react'
import { usePanic } from '../hooks/usePanic'

export function Panic({ route, go }) {
  const { subject } = route
  const { data, loading } = usePanic(subject?.id)

  return (
    <div className="kn-screen screen-anim" style={{ background: 'radial-gradient(circle at 50% 0%, #FFE2EB 0%, var(--bg) 70%)' }}>
      <div className="kn-scroll" style={{ padding: '56px 20px 40px' }}>
        <button className="tap" style={{ background: 'none', border: 'none', color: 'var(--rose-600)', fontWeight: 700, padding: 0, marginBottom: 20 }} onClick={() => go({ name: 'subjectHub', subject })}>← Retour</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 28, animation: 'panic-pulse 1s ease-in-out infinite' }}>🚨</span>
          <h2 style={{ margin: 0, fontFamily: 'var(--f-display)', fontSize: 26 }}>Mode Panique</h2>
        </div>
        {loading ? <p style={{ color: 'var(--ink-300)' }}>Chargement…</p> : data.length === 0 ? (
          <p style={{ color: 'var(--ink-300)' }}>Aucune donnée panique.</p>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.map(item => (
              <li key={item.id} className="kn-card" style={{ padding: '14px 18px', borderLeft: '4px solid var(--rose-400)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ color: 'var(--rose-500)', fontWeight: 900, fontSize: 16 }}>!</span>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>{item.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
