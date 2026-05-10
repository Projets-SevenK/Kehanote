import React, { useState, useMemo } from 'react'
import { useQRC }  from '../hooks/useQRC'
import { Mascot }  from '../components/Mascot'
import { Sparkle } from '../components/Sparkle'

function BackBtn({ onBack }) {
  return (
    <button className="tap" onClick={onBack} style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', border: '1px solid rgba(180,60,100,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-card)' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9 2L3 7l6 5" stroke="var(--ink-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

// Palette de couleurs pour les chips key_concepts
const CONCEPT_COLORS = [
  { bg: 'var(--rose-100)',  color: 'var(--rose-700)' },
  { bg: '#EFE7F6',          color: '#6E5A8A' },
  { bg: '#FFE4D6',          color: '#B55F30' },
  { bg: '#DDEDE1',          color: '#406B4D' },
  { bg: '#FFF0D0',          color: '#8A6400' },
  { bg: '#E7F0F6',          color: '#2A5A80' },
]

// ── Écran de fin QRC ──────────────────────────────────────────────────────────
function QRCEnd({ subject, chapter, score, total, onContinue }) {
  const pct   = total > 0 ? Math.round((score / total) * 100) : 0
  const tone  = pct >= 80 ? 'great' : pct >= 50 ? 'good' : 'gentle'
  const msgs  = {
    great:  { t: 'Excellente maîtrise.',  s: 'Tu peux répondre à ces questions les yeux fermés.' },
    good:   { t: 'Bonne progression.',    s: 'Repasse les questions à retravailler encore une fois.' },
    gentle: { t: 'Continue le travail.',  s: 'Ces questions méritent une nouvelle lecture du cours.' },
  }[tone]

  return (
    <div className="screen-anim" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(170deg, #FFE7EE 0%, #FFF5F7 50%, #FFFAF7 100%)', overflow: 'hidden' }}>
      <Sparkle x={50}  y={140} size={18} delay={0.3} color="#FBB6C8" />
      <Sparkle x={340} y={180} size={14} delay={0.8} color="#E8C57A" />

      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 130 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 28px 0' }}>

          <div className="float">
            <Mascot size={140} mood={tone === 'great' ? 'hooray' : tone === 'good' ? 'wink' : 'happy'} accessory="star" />
          </div>

          {/* Score visuel */}
          <div style={{ marginTop: 18, padding: '22px 32px', background: 'white', borderRadius: 'var(--r-xl)', boxShadow: 'var(--sh-card)', border: '1px solid rgba(180,60,100,0.06)', display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 48, fontWeight: 600, color: 'var(--rose-600)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {score}<span style={{ fontSize: 22, color: 'var(--ink-300)' }}>/{total}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-400)', marginTop: 4 }}>Maîtrisées</div>
            </div>
            <div style={{ width: 1, height: 52, background: 'rgba(180,60,100,0.08)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 48, fontWeight: 600, color: '#9784B0', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {total - score}<span style={{ fontSize: 22, color: 'var(--ink-300)' }}>/{total}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-400)', marginTop: 4 }}>A retravailler</div>
            </div>
          </div>

          <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 30, margin: '20px 0 6px', textAlign: 'center', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            {msgs.t}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink-500)', textAlign: 'center', margin: 0, maxWidth: 300, lineHeight: 1.5 }}>
            {msgs.s}
          </p>

          {/* Note perso */}
          <div style={{ marginTop: 20, padding: '16px 20px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', border: '1px dashed var(--rose-300)', borderRadius: 'var(--r-lg)', maxWidth: 340, position: 'relative', width: '100%' }}>
            <div style={{ position: 'absolute', top: -10, left: 16, padding: '2px 10px', background: 'var(--rose-500)', color: 'white', borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: '0.08em' }}>
              UN MOT POUR TOI
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 15, lineHeight: 1.5, color: 'var(--ink-700)' }}>
              « Rédiger, c'est penser. Et toi tu penses bien. »
            </p>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 56, left: 28, right: 28 }}>
        <button className="btn-primary tap" style={{ width: '100%' }} onClick={onContinue}>
          Continuer
        </button>
      </div>
    </div>
  )
}

// ── Écran principal QRCPractice ───────────────────────────────────────────────
export function QRCPractice({ route, go }) {
  const { subject, chapter } = route
  const { data: questions, loading } = useQRC(chapter?.id)

  // Pile = questions originales + les "à retravailler" rajoutées en fin
  const [pile,     setPile]     = useState(null)   // null = pas encore initialisée
  const [idx,      setIdx]      = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [score,    setScore]    = useState({ mastered: 0, retry: 0 })
  const [done,     setDone]     = useState(false)

  // Initialiser la pile quand les questions sont chargées
  const activePile = pile ?? questions

  const q      = activePile[idx]
  const isLast = idx >= activePile.length

  function reveal() { setRevealed(true) }

  function judge(status) {
    if (status === 'mastered') {
      setScore(s => ({ ...s, mastered: s.mastered + 1 }))
      next()
    } else {
      // Rajouter en fin de pile
      setPile(p => {
        const current = p ?? questions
        return [...current, current[idx]]
      })
      setScore(s => ({ ...s, retry: s.retry + 1 }))
      next()
    }
  }

  function next() {
    setRevealed(false)
    setIdx(i => i + 1)
  }

  // Total de questions originales (pour le score de fin)
  const totalOriginal = questions.length

  if (loading) return (
    <div className="kn-screen screen-anim" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--ink-300)' }}>Chargement…</p>
    </div>
  )

  if (!questions.length) return (
    <div className="kn-screen screen-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 32 }}>
      <Mascot size={80} mood="sleepy" />
      <p style={{ color: 'var(--ink-400)', textAlign: 'center', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 20 }}>
        Pas de questions QRC pour ce chapitre.
      </p>
      <button className="btn-ghost" onClick={() => go({ name: 'chapterHub', subject, chapter })}>Retour</button>
    </div>
  )

  if (isLast || done) {
    return (
      <QRCEnd
        subject={subject}
        chapter={chapter}
        score={score.mastered}
        total={totalOriginal}
        onContinue={() => go({ name: 'reward', subject, chapter, score: score.mastered, total: totalOriginal, mode: 'qrc' })}
      />
    )
  }

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 130 }}>

        {/* Top bar */}
        <div style={{ padding: '0 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BackBtn onBack={() => go({ name: 'chapterHub', subject, chapter })} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: '#6E5A8A', textTransform: 'uppercase' }}>Questions de cours</div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 700 }}>
              {Math.min(idx + 1, activePile.length)} / {totalOriginal}
              {score.retry > 0 && <span style={{ color: 'var(--rose-600)', marginLeft: 6 }}>+ {score.retry} a revoir</span>}
            </div>
          </div>
          <div style={{ width: 40 }} />
        </div>

        {/* Barre de progression */}
        <div style={{ padding: '0 24px', marginBottom: 22 }}>
          <div style={{ height: 5, borderRadius: 3, background: '#EFE7F6', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(idx / totalOriginal) * 100}%`, background: 'linear-gradient(90deg, #9784B0, #7C5EA8)', borderRadius: 3, transition: 'width 400ms cubic-bezier(.22,.9,.32,1.02)' }} />
          </div>
        </div>

        {/* Carte question */}
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Header chapitre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="chip" style={{ background: '#EFE7F6', color: '#6E5A8A' }}>✍ QRC</span>
            <span style={{ fontSize: 12, color: 'var(--ink-400)', fontWeight: 700 }}>Ch. {chapter?.number}</span>
          </div>

          {/* Question card */}
          <div className="kn-card" style={{ padding: '22px 22px 20px', animation: 'screen-in 340ms cubic-bezier(.22,.9,.32,1.02)' }} key={idx}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <Mascot size={52} mood="focus" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6E5A8A', marginBottom: 10 }}>
                  Question probable
                </div>
                <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontWeight: 500, fontSize: 20, lineHeight: 1.35, color: 'var(--ink-900)', margin: 0, letterSpacing: '-0.01em' }}>
                  {q.question}
                </p>
              </div>
            </div>

            {/* Plan type (toujours visible comme aide) */}
            {q.plan_type && (
              <div style={{ marginTop: 18, padding: '12px 14px', background: 'rgba(110,90,138,0.06)', border: '1px solid rgba(110,90,138,0.12)', borderRadius: 'var(--r-sm)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6E5A8A', marginBottom: 6 }}>Plan suggere</div>
                <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.5 }}>
                  {q.plan_type}
                </div>
              </div>
            )}
          </div>

          {/* Bouton "Voir le corrigé" */}
          {!revealed && (
            <button
              className="btn-primary tap"
              onClick={reveal}
              style={{ width: '100%', animation: 'screen-in 380ms 60ms backwards' }}
            >
              Voir le corrige
            </button>
          )}

          {/* Corrigé — slide down on reveal */}
          {revealed && (
            <div style={{ animation: 'screen-in 420ms cubic-bezier(.22,.9,.32,1.02)', display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Model answer */}
              <div className="kn-card" style={{ padding: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rose-600)', marginBottom: 12 }}>
                  Corrige indicatif
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-900)', margin: 0, whiteSpace: 'pre-line' }}>
                  {q.model_answer}
                </p>
              </div>

              {/* Key concepts chips */}
              {Array.isArray(q.key_concepts) && q.key_concepts.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 10, padding: '0 2px' }}>
                    Notions cles a avoir mentionnees
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {q.key_concepts.map((concept, i) => {
                      const c = CONCEPT_COLORS[i % CONCEPT_COLORS.length]
                      return (
                        <span
                          key={i}
                          style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800, background: c.bg, color: c.color, animation: `screen-in 320ms ${i * 50}ms backwards` }}
                        >
                          {concept}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Auto-évaluation */}
              <div className="kn-card" style={{ padding: '18px 20px' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-700)', marginBottom: 14, textAlign: 'center' }}>
                  Honnêtement, tu as su repondre ?
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="tap"
                    onClick={() => judge('retry')}
                    style={{ flex: 1, padding: '14px 12px', borderRadius: 'var(--r-md)', background: 'var(--rose-100)', border: '1.5px solid var(--rose-300)', color: 'var(--rose-700)', fontWeight: 800, fontSize: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                  >
                    <span style={{ fontSize: 22 }}>↻</span>
                    <span>A retravailler</span>
                  </button>
                  <button
                    className="tap"
                    onClick={() => judge('mastered')}
                    style={{ flex: 1, padding: '14px 12px', borderRadius: 'var(--r-md)', background: '#EAF7EE', border: '1.5px solid var(--sage)', color: '#2C5A38', fontWeight: 800, fontSize: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                  >
                    <span style={{ fontSize: 22 }}>✓</span>
                    <span>Je maitrise</span>
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}
