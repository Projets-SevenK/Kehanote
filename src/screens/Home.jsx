import React from 'react'
import { useSubjects } from '../hooks/useSubjects'
import { Mascot } from '../components/Mascot'
import { SubjectIcon } from '../components/SubjectIcon'
import { Nav } from '../components/Nav'

export function Home({ route, go }) {
  const { data: subjects, loading } = useSubjects()

  return (
    <div className="kn-screen">
      <div className="kn-scroll" style={{ paddingBottom: 100 }}>
        <div style={{ padding: '56px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <p style={{ margin: 0, color: 'var(--ink-500)', fontSize: 14, fontWeight: 600 }}>Bonjour 👋</p>
              <h1 className="kn-wordmark" style={{ margin: 0, fontSize: 28 }}>Kehanote</h1>
            </div>
            <Mascot mood="happy" size={52} />
          </div>

          {loading ? (
            <p style={{ color: 'var(--ink-300)', textAlign: 'center' }}>Chargement…</p>
          ) : subjects.length === 0 ? (
            <p style={{ color: 'var(--ink-300)', textAlign: 'center' }}>Aucune matière pour l'instant.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {subjects.map(s => (
                <button
                  key={s.id}
                  className="kn-card tap"
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: 'none', width: '100%', textAlign: 'left', background: 'var(--card)' }}
                  onClick={() => go({ name: 'subjectHub', subject: s })}
                >
                  <SubjectIcon icon={s.icon} color={s.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{s.title}</div>
                    <div style={{ color: 'var(--ink-500)', fontSize: 13, marginTop: 2 }}>{s.teacher}</div>
                  </div>
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                    <path d="M1 1l5 5-5 5" stroke="var(--ink-300)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Nav route={route} go={go} />
    </div>
  )
}
