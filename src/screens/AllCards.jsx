import React from 'react'
import { useSubjects } from '../hooks/useSubjects'
import { SubjectIcon } from '../components/SubjectIcon'
import { Nav } from '../components/Nav'

export function AllCards({ route, go }) {
  const { data: subjects, loading } = useSubjects()

  return (
    <div className="kn-screen">
      <div className="kn-scroll" style={{ paddingBottom: 100 }}>
        <div style={{ padding: '56px 20px 20px' }}>
          <h2 style={{ margin: '0 0 20px', fontFamily: 'var(--f-display)', fontSize: 26 }}>Toutes les matières</h2>
          {loading ? <p style={{ color: 'var(--ink-300)' }}>Chargement…</p> : subjects.map(s => (
            <button key={s.id} className="kn-card tap" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: 'none', width: '100%', textAlign: 'left', background: 'var(--card)', marginBottom: 10 }} onClick={() => go({ name: 'subjectHub', subject: s })}>
              <SubjectIcon icon={s.icon} color={s.color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{s.title}</div>
                <div style={{ color: 'var(--ink-500)', fontSize: 13 }}>{s.teacher}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Nav route={route} go={go} />
    </div>
  )
}
