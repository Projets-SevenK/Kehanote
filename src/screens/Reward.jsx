import React, { useMemo } from 'react'
import { Mascot }      from '../components/Mascot'
import { Sparkle }     from '../components/Sparkle'
import { ProgressRing } from '../components/ProgressRing'

function BreakdownStat({ label, value, color, bg }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontWeight: 800, fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
    </div>
  )
}

export function Reward({ route, go }) {
  const { subject, score = 0, total = 20, mode = 'qcm', counts, level, best, isNewBest } = route

  const isQuiz = mode === 'qcm'
  const ratio  = total ? Math.max(0, Math.min(1, score / total)) : 0

  const tone = isQuiz
    ? (score >= 14 ? 'great' : score >= 10 ? 'good' : 'gentle')
    : (ratio >= 0.8 ? 'great' : ratio >= 0.5 ? 'good' : 'gentle')

  const messages = {
    great:  { t: 'Magnifique.',       s: "Tu maîtrises ce chapitre. Sérieusement, c'est impressionnant." },
    good:   { t: 'Très bien joué.',   s: "Encore un passage et ce sera ancré pour de bon." },
    gentle: { t: "C'est un début.",   s: "Pas de pression — chaque erreur, c'est un point qui rentre." },
  }[tone]

  const confetti = useMemo(() => Array.from({ length: 32 }, (_, i) => ({
    left:  Math.random() * 100,
    delay: Math.random() * 0.6,
    color: ['#EC6F92', '#F590AB', '#FFD3DF', '#E8C57A', '#C8B8DC', '#BCD4C0'][i % 6],
    size:  6 + Math.random() * 8,
    rot:   Math.random() * 360,
    dur:   2 + Math.random() * 1.5,
  })), [])

  return (
    <div className="screen-anim" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(170deg, #FFE7EE 0%, #FFF5F7 50%, #FFFAF7 100%)', overflow: 'hidden' }}>
      {/* Confetti */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {confetti.map((c, i) => (
          <div key={i} style={{ position: 'absolute', top: -20, left: `${c.left}%`, width: c.size, height: c.size, background: c.color, borderRadius: i % 3 === 0 ? '50%' : 2, transform: `rotate(${c.rot}deg)`, animation: `confetti-fall ${c.dur}s ${c.delay}s linear forwards` }}/>
        ))}
      </div>

      <Sparkle x={50}  y={140} size={18} delay={0.3} color="#FBB6C8" />
      <Sparkle x={340} y={180} size={14} delay={0.8} color="#E8C57A" />
      <Sparkle x={60}  y={580} size={12} delay={1.2} color="#FBB6C8" />

      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 110 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 28px 0' }}>

          {/* Mascot */}
          <div className="float">
            <Mascot size={150} mood="hooray" accessory="star" />
          </div>

          {/* Level badge */}
          {isQuiz && level && (
            <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'white', border: `1.5px solid ${level.color}55`, boxShadow: 'var(--sh-card)', fontSize: 12, fontWeight: 800, color: level.color, letterSpacing: '0.04em' }}>
              <span>{level.icon}</span>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>{level.label}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>×{level.multiplier}</span>
            </div>
          )}

          {/* Score ring */}
          {total > 0 && (
            <div style={{ position: 'relative', marginTop: 18 }}>
              <ProgressRing pct={Math.round(ratio * 100)} size={130} stroke={9} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 38, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                  {isQuiz ? score.toFixed(1).replace('.', ',') : score}
                  <span style={{ fontSize: 18, color: 'var(--ink-300)' }}>/{total}</span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--rose-600)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
                  {isQuiz ? 'Note' : 'Score'}
                </div>
              </div>
            </div>
          )}

          <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 32, margin: '18px 0 6px', textAlign: 'center', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            {messages.t}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink-500)', textAlign: 'center', margin: 0, maxWidth: 300, lineHeight: 1.5 }}>
            {messages.s}
          </p>

          {/* QCM breakdown */}
          {isQuiz && counts && (
            <div style={{ marginTop: 18, padding: '14px 18px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(180,60,100,0.08)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'stretch', gap: 14, boxShadow: 'var(--sh-card)', width: '100%', maxWidth: 340 }}>
              <BreakdownStat label="Bonnes"    value={counts.correct} color="#2C5A38"          bg="rgba(188,212,192,0.3)" />
              <div style={{ width: 1, background: 'rgba(0,0,0,0.06)' }}/>
              <BreakdownStat label="Mauvaises" value={counts.wrong}   color="var(--rose-700)"  bg="rgba(252,220,230,0.6)" />
              <div style={{ width: 1, background: 'rgba(0,0,0,0.06)' }}/>
              <BreakdownStat label="Passées"   value={counts.skip}    color="#6E5A8A"           bg="rgba(200,184,220,0.3)" />
            </div>
          )}

          {/* Best score */}
          {isQuiz && best != null && (
            <div style={{ marginTop: 12, padding: '12px 16px', background: isNewBest ? 'linear-gradient(155deg, #FFE0EB, #FFF0F5)' : 'rgba(255,255,255,0.7)', border: isNewBest ? '1.5px solid var(--rose-400)' : '1px solid rgba(180,60,100,0.08)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: 340 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: isNewBest ? 'var(--rose-500)' : 'var(--rose-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isNewBest ? 'white' : 'var(--rose-700)', flexShrink: 0, fontSize: 16 }}>★</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-900)', lineHeight: 1.2 }}>
                  {isNewBest ? 'Nouveau record !' : `Meilleur : ${best.toFixed(1).replace('.', ',')}/20`}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>
                  {isNewBest ? 'Tu progresses, ça se voit.' : `Aujourd'hui : ${score.toFixed(1).replace('.', ',')}/20`}
                </div>
              </div>
            </div>
          )}

          {/* Personal note */}
          <div style={{ marginTop: 18, padding: '16px 20px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', border: '1px dashed var(--rose-300)', borderRadius: 'var(--r-lg)', maxWidth: 340, position: 'relative', width: '100%' }}>
            <div style={{ position: 'absolute', top: -10, left: 16, padding: '2px 10px', background: 'var(--rose-500)', color: 'white', borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: '0.08em' }}>
              UN MOT POUR TOI
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 15, lineHeight: 1.5, color: 'var(--ink-700)' }}>
              « Quoi qu'il arrive à l'examen, je suis déjà fière de toi. Tu fais le boulot, jour après jour Nini »
            </p>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 56, left: 28, right: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn-primary tap" onClick={() => go({ name: 'home' })}>Continuer</button>
      </div>
    </div>
  )
}
