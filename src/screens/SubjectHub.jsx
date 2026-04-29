import React from 'react'
import { useFlashcards } from '../hooks/useFlashcards'
import { useQCM }        from '../hooks/useQCM'
import { useConcentre }  from '../hooks/useConcentre'
import { Mascot }        from '../components/Mascot'
import { ProgressRing }  from '../components/ProgressRing'

function BackBtn({ onBack }) {
  return (
    <button className="tap" onClick={onBack} style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', border: '1px solid rgba(180,60,100,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-card)' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9 2L3 7l6 5" stroke="var(--ink-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

const CHIP_COLOR = {
  rose:  { bg: 'var(--rose-100)', color: 'var(--rose-700)' },
  lav:   { bg: '#EFE7F6',         color: '#6E5A8A' },
  peach: { bg: '#FFE4D6',         color: '#B55F30' },
  sage:  { bg: '#DDEDE1',         color: '#406B4D' },
}

export function SubjectHub({ route, go }) {
  const { subject } = route
  const { data: flashcards } = useFlashcards(subject?.id)
  const { data: qcm }        = useQCM(subject?.id)
  const { data: concentre }  = useConcentre(subject?.id)

  const readingTime = concentre[0]?.reading_time ?? '—'
  const chip = CHIP_COLOR[subject?.color] ?? CHIP_COLOR.rose

  const modes = [
    { id: 'concentre',  title: 'Le Concentré',   sub: "Comprendre l'essentiel",  icon: '📖', bg: 'linear-gradient(155deg, #FFE7EE, #FFD3DF)', time: readingTime },
    { id: 'flashcards', title: 'Swipe & Retiens', sub: "Mémoriser en s'amusant",  icon: '💗', bg: 'linear-gradient(155deg, #FFD3DF, #F590AB)', time: `${flashcards.length} cartes` },
    { id: 'challenge',  title: 'Challenge',        sub: "S'auto-tester",           icon: '🎯', bg: 'linear-gradient(155deg, #EFE7F6, #C8B8DC)', time: `${qcm.length} questions` },
  ]

  function navigate(modeId) {
    go({ name: modeId, subject })
  }

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 110 }}>

        {/* Top bar */}
        <div style={{ padding: '0 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BackBtn onBack={() => go({ name: 'home' })} />
          <span className="chip" style={{ background: chip.bg, color: chip.color }}>
            {subject?.teacher}
          </span>
        </div>

        {/* Title block */}
        <div style={{ padding: '12px 24px 24px' }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--rose-600)', textTransform: 'uppercase', marginBottom: 6 }}>
            Matière
          </div>
          <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 36, margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            {subject?.title}
          </h1>
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
            <ProgressRing pct={Math.round((subject?.progress ?? 0) * 100)} size={56} stroke={5} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink-900)' }}>
                {Math.round((subject?.progress ?? 0) * 100)}<span style={{ fontSize: 12, opacity: 0.5 }}>%</span>
              </div>
              {subject?.next_exam && (
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Prochain partiel · {subject.next_exam}</div>
              )}
            </div>
          </div>
        </div>

        {/* Mochi encouragement */}
        <div style={{ margin: '0 18px 16px', padding: '14px 16px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(180,60,100,0.08)', borderRadius: 'var(--r-md)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Mascot size={48} mood="wink" />
          <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.4, fontStyle: 'italic' }}>
            « Une session de 10 minutes, c'est déjà énorme. Choisis ton format. »
          </div>
        </div>

        {/* Mode cards */}
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {modes.map((m, i) => (
            <button key={m.id} className="tap" onClick={() => navigate(m.id)} style={{ border: 'none', textAlign: 'left', padding: 18, display: 'flex', alignItems: 'center', gap: 16, background: m.bg, borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-card)', animation: `screen-in 460ms ${i * 90}ms backwards cubic-bezier(.22,.9,.32,1.02)` }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                {m.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink-900)', marginBottom: 2 }}>{m.title}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-700)', opacity: 0.75 }}>{m.sub}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-700)', opacity: 0.7, letterSpacing: '0.04em' }}>{m.time}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l6 5-6 5" stroke="var(--ink-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Mode Panique secondary */}
        <button className="tap" onClick={() => go({ name: 'panic', subject, fromHub: true })} style={{ margin: '14px 18px 0', padding: 14, background: 'transparent', border: '1.5px dashed rgba(180,60,100,0.25)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--rose-700)', fontWeight: 800, fontSize: 14 }}>
          🚨 <span>Activer le Mode Panique</span>
        </button>
      </div>
    </div>
  )
}
