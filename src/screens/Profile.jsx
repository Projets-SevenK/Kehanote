import React from 'react'
import { useProgress } from '../hooks/useProgress'
import { Mascot }      from '../components/Mascot'
import { Nav }         from '../components/Nav'

export function Profile({ go, tab, onTab }) {
  const { data, loading } = useProgress()

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 110 }}>
        <div style={{ padding: '8px 24px 24px' }}>
          <h2 style={{ margin: '0 0 28px', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 28, fontWeight: 500 }}>Mon Profil</h2>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <Mascot mood="blush" size={90} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 18 }}>Kehane</p>
              <p style={{ margin: '4px 0 0', color: 'var(--ink-500)', fontSize: 14 }}>Communication / Journalisme — L3</p>
            </div>
          </div>

          {loading ? (
            <p style={{ color: 'var(--ink-300)', textAlign: 'center' }}>Chargement…</p>
          ) : (
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="kn-card" style={{ flex: 1, padding: 16, textAlign: 'center' }}>
                <p style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 900, color: 'var(--rose-600)' }}>{data.streak}</p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>jours 🔥</p>
              </div>
              <div className="kn-card" style={{ flex: 1, padding: 16, textAlign: 'center' }}>
                <p style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 900, color: 'var(--rose-600)' }}>{data.totalSessions}</p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>sessions</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Nav tab={tab} onTab={onTab} />
    </div>
  )
}
