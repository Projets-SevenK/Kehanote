import React from 'react'
import { useSubjects }  from '../hooks/useSubjects'
import { SubjectIcon }  from '../components/SubjectIcon'
import { Nav }          from '../components/Nav'

export function AllCards({ go, tab, onTab }) {
  const { data: subjects, loading } = useSubjects()

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 110 }}>
        <div style={{ padding: '8px 24px 20px' }}>
          <h2 style={{ margin: '0 0 20px', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 28, fontWeight: 500 }}>
            Toutes les cartes
          </h2>
          {loading ? (
            <p style={{ color: 'var(--ink-300)' }}>Chargement…</p>
          ) : subjects.map((s, i) => (
            <button
              key={s.id}
              className="kn-card tap"
              onClick={() => go({ name: 'flashcards', subject: s })}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: 'none', width: '100%', textAlign: 'left', background: 'white', marginBottom: 10, animation: `screen-in 480ms ${i * 80}ms backwards cubic-bezier(.22,.9,.32,1.02)` }}
            >
              <SubjectIcon icon={s.icon} color={s.color} size={48} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--ink-900)' }}>{s.title}</div>
                <div style={{ color: 'var(--ink-500)', fontSize: 12, marginTop: 2 }}>{s.teacher}</div>
              </div>
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1l5 5-5 5" stroke="var(--ink-300)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
      <Nav tab={tab} onTab={onTab} />
    </div>
  )
}
