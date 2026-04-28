import React from 'react'
import { useProgress } from '../hooks/useProgress'
import { Mascot } from '../components/Mascot'
import { ProgressRing } from '../components/ProgressRing'
import { Nav } from '../components/Nav'

export function Profile({ route, go }) {
  const { data, loading } = useProgress()

  return (
    <div className="kn-screen">
      <div className="kn-scroll" style={{ paddingBottom: 100 }}>
        <div style={{ padding: '56px 20px 20px' }}>
          <h2 style={{ margin: '0 0 24px', fontFamily: 'var(--f-display)', fontSize: 26 }}>Mon Profil</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <Mascot mood="blush" size={80} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 18 }}>Kehanote</p>
              <p style={{ margin: '4px 0 0', color: 'var(--ink-500)', fontSize: 14 }}>Étudiante en Communication</p>
            </div>
          </div>
          {loading ? <p style={{ color: 'var(--ink-300)', textAlign: 'center' }}>Chargement…</p> : (
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="kn-card" style={{ flex: 1, padding: 16, textAlign: 'center' }}>
                <p style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 900, color: 'var(--rose-600)' }}>{data.streak}</p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--ink-500)' }}>jours 🔥</p>
              </div>
              <div className="kn-card" style={{ flex: 1, padding: 16, textAlign: 'center' }}>
                <p style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 900, color: 'var(--rose-600)' }}>{data.totalSessions}</p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--ink-500)' }}>sessions</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Nav route={route} go={go} />
    </div>
  )
}
