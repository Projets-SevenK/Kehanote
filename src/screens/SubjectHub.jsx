import React from 'react'
import { useChapters }  from '../hooks/useChapters'
import { useProgress }  from '../hooks/useProgress'
import { Mascot }       from '../components/Mascot'
import { ProgressRing } from '../components/ProgressRing'

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

const ACCENT_COLOR = {
  rose:  { bg: 'var(--rose-600)',  light: 'var(--rose-100)' },
  lav:   { bg: '#7C5EA8',          light: '#EFE7F6' },
  peach: { bg: '#C4663A',          light: '#FFE4D6' },
  sage:  { bg: '#4A7A58',          light: '#DDEDE1' },
}

export function SubjectHub({ route, go }) {
  const { subject } = route
  const { data: chapters, loading } = useChapters(subject?.id)
  const { data: progress }          = useProgress()

  const chip   = CHIP_COLOR[subject?.color]  ?? CHIP_COLOR.rose
  const accent = ACCENT_COLOR[subject?.color] ?? ACCENT_COLOR.rose

  function chapterPct(chapterId) {
    const levels = new Set(
      progress.scores
        .filter(s => s.chapter_id === chapterId)
        .map(s => s.level)
    )
    return Math.min(Math.round((levels.size / 3) * 100), 100)
  }

  const allSeen = chapters.length > 0 && chapters.every(ch => chapterPct(ch.id) > 0)

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
        <div style={{ margin: '0 18px 20px', padding: '14px 16px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(180,60,100,0.08)', borderRadius: 'var(--r-md)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Mascot size={48} mood="wink" />
          <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.4, fontStyle: 'italic' }}>
            « Choisis un chapitre et on y va. Un à la fois. »
          </div>
        </div>

        {/* Section label */}
        <div style={{ padding: '0 24px 10px', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--ink-400)', textTransform: 'uppercase' }}>
          Chapitres
        </div>

        {/* Chapter cards */}
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {loading ? (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--ink-400)', fontSize: 14 }}>Chargement...</div>
          ) : chapters.map((ch, i) => {
            const pct = chapterPct(ch.id)
            return (
              <button
                key={ch.id}
                className="tap"
                onClick={() => go({ name: 'chapterHub', subject, chapter: ch })}
                style={{
                  border: 'none', textAlign: 'left', padding: '16px 18px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: 'white', borderRadius: 'var(--r-lg)',
                  boxShadow: 'var(--sh-card)',
                  animation: `screen-in 460ms ${i * 70}ms backwards cubic-bezier(.22,.9,.32,1.02)`,
                }}
              >
                {/* Chapter number badge */}
                <div style={{ width: 44, height: 44, borderRadius: 14, background: accent.light, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: accent.bg }}>
                    {ch.number}
                  </span>
                </div>

                {/* Title */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-400)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>
                    Chapitre {ch.number}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {ch.title}
                  </div>
                </div>

                {/* Progress + chevron */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <ProgressRing pct={pct} size={36} stroke={3.5} />
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2l6 5-6 5" stroke="var(--ink-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            )
          })}
        </div>

        {/* Examen Blanc */}
        <div style={{ padding: '20px 18px 0' }}>
          <button
            className="tap"
            onClick={() => go({ name: 'examenBlanc', subject })}
            style={{
              width: '100%', border: 'none', padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 14,
              background: allSeen
                ? 'linear-gradient(135deg, #FFF0D0, #FFD97D)'
                : 'linear-gradient(135deg, #F5F5F5, #EBEBEB)',
              borderRadius: 'var(--r-lg)',
              boxShadow: allSeen ? '0 4px 18px rgba(200,150,0,0.18)' : 'var(--sh-card)',
              opacity: allSeen ? 1 : 0.65,
              transition: 'opacity 300ms',
            }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 14, background: allSeen ? 'rgba(255,255,255,0.7)' : 'rgba(200,200,200,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
              🎓
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: allSeen ? '#7A5200' : 'var(--ink-600)', marginBottom: 2 }}>
                Examen Blanc
              </div>
              <div style={{ fontSize: 12, color: allSeen ? '#A87000' : 'var(--ink-400)' }}>
                {allSeen ? '30 questions · tu es prête !' : 'Complète tous les chapitres pour débloquer'}
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l6 5-6 5" stroke={allSeen ? '#A87000' : 'var(--ink-400)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Mode Panique */}
        <button className="tap" onClick={() => go({ name: 'panic', subject, fromHub: true })} style={{ margin: '14px 18px 0', padding: 14, background: 'transparent', border: '1.5px dashed rgba(180,60,100,0.25)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--rose-700)', fontWeight: 800, fontSize: 14 }}>
          🚨 <span>Activer le Mode Panique</span>
        </button>

      </div>
    </div>
  )
}
