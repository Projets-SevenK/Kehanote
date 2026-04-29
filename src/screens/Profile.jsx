import React from 'react'
import { useProgress } from '../hooks/useProgress'
import { Mascot }      from '../components/Mascot'
import { Nav }         from '../components/Nav'

function buildWeekHeights(sessions) {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    const iso  = d.toISOString().slice(0, 10)
    const count = sessions.filter(s => s.played_at === iso).length
    const label = d.toLocaleDateString('fr-FR', { weekday: 'short' }).charAt(0).toUpperCase()
    return {
      label,
      h: Math.min(1, count * 0.4 + (count > 0 ? 0.2 : 0))
    }
  })
}

export function Profile({ go, tab, onTab }) {
  const { data, loading } = useProgress()

  const sessions    = data.sessions ?? []
  const scores      = data.scores ?? []
  
  const totalCardsDone = sessions.reduce((acc, s) => acc + (s.cards_done || 0), 0)
  const hasFirstSession = sessions.length > 0
  const has7Days = data.streak >= 7
  const hasPerfectQCM = scores.filter(s => s.score >= 20).length >= 10
  const has50Cards = totalCardsDone >= 50

  const isAfter22 = new Date().getHours() >= 22;
  const hasNightOwl = isAfter22 || localStorage.getItem('kehanote.nightowl') === 'true';
  if (isAfter22) localStorage.setItem('kehanote.nightowl', 'true');

  const BADGES = [
    { e: '🌸', t: 'Première fleur', s: 'Première session', locked: !hasFirstSession },
    { e: '💗', t: '7 jours',        s: 'Une semaine de suite', locked: !has7Days },
    { e: '✨', t: 'Sans-faute',     s: '10 QCM parfaits', locked: !hasPerfectQCM },
    { e: '🌙', t: 'Nuit douce',     s: 'Révisé après 22h', locked: !hasNightOwl },
    { e: '⭐', t: has50Cards ? 'Exploratrice' : 'Locked', s: '50 cartes', locked: !has50Cards },
    { e: '🏆', t: 'Locked',         s: 'Examen', locked: true },
  ]

  const weekHeights = buildWeekHeights(sessions)
  const daysThisWeek = weekHeights.filter(day => day.h > 0).length

  const stats = [
    { label: 'Sessions', value: data.totalSessions, sub: 'au total' },
    { label: 'Série',    value: data.streak,         sub: 'jours 🔥' },
    { label: 'Scores',   value: data.scores.length,  sub: 'QCM joués' },
  ]

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 110 }}>

        {/* Top bar */}
        <div style={{ padding: '0 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 40 }} />
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--rose-600)', textTransform: 'uppercase' }}>Profil</div>
          <button className="tap" style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', border: '1px solid rgba(180,60,100,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-card)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="var(--ink-700)" strokeWidth="2"/>
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" stroke="var(--ink-700)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Avatar */}
        <div style={{ padding: '12px 24px 20px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 130, height: 130, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(155deg, #FFD3DF, #F590AB)' }}/>
            <div style={{ position: 'absolute', inset: 6, borderRadius: '50%', background: 'white' }}/>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Mascot size={110} mood="happy" accessory="heart" />
            </div>
          </div>
          <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 28, margin: '4px 0 4px', letterSpacing: '-0.01em' }}>Kehane</h1>
          <p style={{ fontSize: 13, color: 'var(--ink-500)', margin: 0 }}>L3 · Communication & Journalisme</p>
        </div>

        {/* Stats row */}
        <div style={{ padding: '0 18px 14px', display: 'flex', gap: 8 }}>
          {loading ? <p style={{ color: 'var(--ink-300)' }}>Chargement…</p> : stats.map((s, i) => (
            <div key={i} className="kn-card" style={{ flex: 1, padding: 14, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 22, color: 'var(--ink-900)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'var(--rose-600)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '6px 0 2px' }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Streak chart */}
        <div style={{ padding: '0 18px 14px' }}>
          <div className="kn-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--rose-600)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Cette semaine</div>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 600 }}>{daysThisWeek} jour{daysThisWeek !== 1 ? 's' : ''} sur 7</div>
              </div>
              <div style={{ fontSize: 28 }}>💗</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 90, gap: 6 }}>
              {weekHeights.map((day, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: '100%', height: day.h ? `${day.h * 70}px` : '4px', background: day.h ? 'linear-gradient(180deg, var(--rose-400), var(--rose-500))' : 'var(--rose-100)', borderRadius: 6, transition: 'height 800ms cubic-bezier(.22,.9,.32,1.02)' }}/>
                  <span style={{ fontSize: 10, color: 'var(--ink-500)', fontWeight: 700 }}>{day.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div style={{ padding: '0 24px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 20, fontWeight: 500 }}>Tes badges</div>
        </div>
        <div style={{ padding: '8px 18px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {BADGES.map((a, i) => (
            <div key={i} className="kn-card" style={{ padding: 14, textAlign: 'center', opacity: a.locked ? 0.4 : 1, filter: a.locked ? 'grayscale(0.8)' : 'none' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{a.e}</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-900)' }}>{a.t}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-500)', marginTop: 2 }}>{a.s}</div>
            </div>
          ))}
        </div>

      </div>
      <Nav tab={tab} onTab={onTab} />
    </div>
  )
}
