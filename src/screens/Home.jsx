import React from 'react'
import { useSubjects }  from '../hooks/useSubjects'
import { useProgress }  from '../hooks/useProgress'
import { Mascot }       from '../components/Mascot'
import { Sparkle }      from '../components/Sparkle'
import { Heart }        from '../components/Heart'
import { ProgressRing } from '../components/ProgressRing'
import { SubjectIcon }  from '../components/SubjectIcon'
import { Nav }          from '../components/Nav'

const ENCOURAGE = [
  "Respire. Tu progresses chaque jour.",
  "Une petite session vaut mieux qu'une grande qui n'arrive pas.",
  "Tu es exactement là où tu dois être.",
  "Doucement, sûrement.",
  "Trois cartes, et c'est déjà gagné.",
]

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function buildWeekStreak(sessions) {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    const iso = d.toISOString().slice(0, 10)
    return sessions.some(s => s.played_at === iso)
  })
}

export function Home({ go, tab, onTab }) {
  const { data: subjects, loading: subLoading } = useSubjects()
  const { data: progress, loading: progLoading } = useProgress()

  const today    = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  const greeting = ENCOURAGE[Math.floor(Date.now() / 86400000) % ENCOURAGE.length]
  const streak   = progLoading ? 0 : progress.streak
  const weekDays = progLoading ? Array(7).fill(false) : buildWeekStreak(progress.sessions ?? [])

  return (
    <div className="kn-screen screen-anim">
      {/* floating sparkles */}
      <Sparkle x={340} y={70}  size={12} delay={0.4} color="#FBB6C8" />
      <Sparkle x={30}  y={210} size={10} delay={0.9} color="#E8C57A" />

      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 110 }}>

        {/* ── Greeting ─────────────────────────────────────── */}
        <div style={{ padding: '8px 24px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--rose-600)', textTransform: 'uppercase' }}>
              {today}
            </div>
            <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 32, margin: '6px 0 4px', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              Bonjour, Kehane
            </h1>
            <p style={{ fontSize: 14, color: 'var(--ink-500)', margin: 0, maxWidth: 240 }}>
              {greeting}
            </p>
          </div>
          <button
            className="tap"
            onClick={() => subjects.length && go({ name: 'subjectHub', subject: subjects[0] })}
            style={{ width: 44, height: 44, borderRadius: '50%', background: 'white', border: '1px solid rgba(180,60,100,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-card)', flexShrink: 0 }}
          >
            <Mascot size={36} mood="happy" />
          </button>
        </div>

        {/* ── Streak + Mode Panique ────────────────────────── */}
        <div style={{ margin: '0 18px 16px', display: 'flex', gap: 10 }}>

          {/* Streak card */}
          <div className="kn-card" style={{ flex: 1.4, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-500)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Série</div>
              <div style={{ fontSize: 13, color: 'var(--rose-600)', fontWeight: 800 }}>{streak} jour{streak !== 1 ? 's' : ''} 💗</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {weekDays.map((on, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 8, background: on ? 'var(--rose-500)' : 'var(--rose-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {on && <Heart size={12} color="white" />}
                  </div>
                  <span style={{ fontSize: 10, color: 'var(--ink-500)', fontWeight: 700 }}>{DAY_LABELS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mode Panique */}
          <button
            className="tap"
            onClick={() => subjects.length && go({ name: 'panic', subject: subjects[0] })}
            style={{ flex: 1, border: 'none', background: 'linear-gradient(155deg, #2A1B26 0%, #4A2B3E 100%)', color: 'white', borderRadius: 'var(--r-lg)', padding: 14, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(42,27,38,0.25)', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ fontSize: 22, lineHeight: 1 }}>🚨</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 2 }}>Mode Panique</div>
              <div style={{ fontSize: 11, opacity: 0.7, lineHeight: 1.3 }}>Tout en 5 min</div>
            </div>
            <Sparkle x={70} y={6} size={10} delay={0.3} color="#F590AB" />
          </button>
        </div>

        {/* ── Subjects ─────────────────────────────────────── */}
        <div style={{ padding: '8px 24px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 500 }}>
            Tes matières
          </div>
          {!subLoading && (
            <span style={{ fontSize: 12, color: 'var(--ink-500)', fontWeight: 700 }}>
              {subjects.length} cours
            </span>
          )}
        </div>

        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {subLoading ? (
            <p style={{ color: 'var(--ink-300)', padding: '16px 0' }}>Chargement…</p>
          ) : subjects.length === 0 ? (
            <p style={{ color: 'var(--ink-300)', padding: '16px 0' }}>Aucune matière pour l'instant.</p>
          ) : subjects.map((s, i) => (
            <button
              key={s.id}
              className="kn-card tap"
              onClick={() => go({ name: 'subjectHub', subject: s })}
              style={{ border: 'none', textAlign: 'left', padding: 16, display: 'flex', alignItems: 'center', gap: 14, background: 'white', animation: `screen-in 480ms ${i * 80}ms backwards cubic-bezier(.22,.9,.32,1.02)` }}
            >
              <SubjectIcon icon={s.icon} color={s.color} size={48} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 2, color: 'var(--ink-900)' }}>{s.title}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span>{s.chapters} chap.</span>
                  <span style={{ color: 'var(--rose-200)' }}>•</span>
                  <span>{s.cards_count ?? '—'} cartes</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                <ProgressRing pct={Math.round((s.progress ?? 0) * 100)} size={44} stroke={4} />
                <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--rose-600)' }}>
                  {Math.round((s.progress ?? 0) * 100)}%
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* ── Footer ───────────────────────────────────────── */}
        <div style={{ padding: '24px 32px 0', textAlign: 'center', fontSize: 12, color: 'var(--ink-300)', fontStyle: 'italic' }}>
          « Doucement, sûrement. »
        </div>

      </div>

      <Nav tab={tab} onTab={onTab} />
    </div>
  )
}
