import React from 'react'
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
  rose:  { bg: 'var(--rose-600)',  light: 'var(--rose-100)', mid: 'var(--rose-200)' },
  lav:   { bg: '#7C5EA8',          light: '#EFE7F6',          mid: '#DDD0F0' },
  peach: { bg: '#C4663A',          light: '#FFE4D6',          mid: '#FFD0BB' },
  sage:  { bg: '#4A7A58',          light: '#DDEDE1',          mid: '#C6DFC9' },
}

const MODES = [
  {
    key: 'concentre',
    emoji: '📖',
    label: 'Le Concentre',
    desc: 'Résumé structuré du chapitre',
    route: 'concentre',
  },
  {
    key: 'flashcards',
    emoji: '🃏',
    label: 'Swipe & Retiens',
    desc: 'Flashcards à swiper',
    route: 'flashcards',
  },
  {
    key: 'challenge',
    emoji: '⚡',
    label: 'Challenge',
    desc: 'QCM facile / moyen / difficile',
    route: 'challenge',
  },
]

const QRC_MODE = {
  key: 'qrc',
  emoji: '✍️',
  label: 'Questions de cours',
  desc: 'Entraînement aux réponses ouvertes',
  route: 'qrcPractice',
}

export function ChapterHub({ route, go }) {
  const { subject, chapter } = route
  const { data: progress }   = useProgress()

  const chip   = CHIP_COLOR[subject?.color]  ?? CHIP_COLOR.rose
  const accent = ACCENT_COLOR[subject?.color] ?? ACCENT_COLOR.rose

  // Calcul du % global du chapitre : niveaux de challenge joués + flashcards
  const levels = new Set(
    progress.scores
      .filter(s => s.chapter_id === chapter?.id)
      .map(s => s.level)
  )
  const pct = Math.min(Math.round((levels.size / 3) * 100), 100)

  const modes = subject?.exam_type === 'qrc' ? [...MODES, QRC_MODE] : MODES

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 110 }}>

        {/* Top bar */}
        <div style={{ padding: '0 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BackBtn onBack={() => go({ name: 'subjectHub', subject })} />
          <span className={`chip ${subject?.color === 'rose' ? '' : subject?.color}`}
            style={subject?.color === 'rose' ? {} : { background: chip.bg, color: chip.color }}>
            Chapitre {chapter?.number}
          </span>
        </div>

        {/* Title block */}
        <div style={{ padding: '12px 24px 20px' }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: accent.bg, textTransform: 'uppercase', marginBottom: 6 }}>
            {subject?.title}
          </div>
          <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 30, margin: 0, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            {chapter?.title}
          </h1>

          {/* Progress */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <ProgressRing pct={pct} size={50} stroke={4.5} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink-900)' }}>
                {pct}<span style={{ fontSize: 12, opacity: 0.5 }}>%</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>
                {pct === 0 ? 'Pas encore commencé' : pct === 100 ? 'Chapitre maîtrisé !' : 'En cours...'}
              </div>
            </div>
          </div>
        </div>

        {/* Mochi + message */}
        <div style={{ margin: '0 18px 20px', padding: '14px 16px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(180,60,100,0.08)', borderRadius: 'var(--r-md)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Mascot size={44} mood={pct === 100 ? 'hooray' : pct > 0 ? 'focus' : 'happy'} />
          <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.4, fontStyle: 'italic' }}>
            {pct === 100
              ? '« Ce chapitre est dans la poche ! »'
              : pct > 0
                ? '« Continue ! Tu es sur la bonne voie. »'
                : '« Par quel mode tu veux commencer ? »'}
          </div>
        </div>

        {/* Section label */}
        <div style={{ padding: '0 24px 10px', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--ink-400)', textTransform: 'uppercase' }}>
          Modes de révision
        </div>

        {/* Mode cards */}
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {modes.map((mode, i) => {
            const isQRC = mode.key === 'qrc'
            return (
              <button
                key={mode.key}
                className="tap"
                onClick={() => go({ name: mode.route, subject, chapter })}
                style={{
                  border: isQRC ? `1.5px solid ${accent.mid}` : 'none',
                  textAlign: 'left',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: isQRC
                    ? `linear-gradient(135deg, ${accent.light}, white)`
                    : 'white',
                  borderRadius: 'var(--r-lg)',
                  boxShadow: 'var(--sh-card)',
                  animation: `screen-in 460ms ${i * 80}ms backwards cubic-bezier(.22,.9,.32,1.02)`,
                }}
              >
                {/* Emoji badge */}
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: isQRC ? accent.light : `linear-gradient(145deg, ${accent.light}, ${accent.mid})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0,
                  boxShadow: isQRC ? 'none' : `0 2px 8px ${accent.light}`,
                }}>
                  {mode.emoji}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink-900)', marginBottom: 3 }}>
                    {mode.label}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.3 }}>
                    {mode.desc}
                  </div>
                </div>

                {/* Chevron */}
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: accent.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2l6 5-6 5" stroke={accent.bg} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            )
          })}
        </div>

      </div>
    </div>
  )
}
