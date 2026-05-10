import React, { useState, useMemo, useEffect } from 'react'
import { useQCM }       from '../hooks/useQCM'
import { Mascot }       from '../components/Mascot'
import { Sparkle }      from '../components/Sparkle'
import { ProgressRing } from '../components/ProgressRing'
import { supabase }     from '../lib/supabase'

const SCORING    = { correct: 1, wrong: -0.5 }
const MULTIPLIER = 1.5   // équivalent mode difficile

function BackBtn({ onBack, light = false }) {
  return (
    <button className="tap" onClick={onBack} style={{ width: 40, height: 40, borderRadius: '50%', background: light ? 'rgba(255,255,255,0.12)' : 'white', border: light ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(180,60,100,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: light ? 'none' : 'var(--sh-card)' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9 2L3 7l6 5" stroke={light ? 'white' : 'var(--ink-700)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

// ── Écran de résultats détaillé ───────────────────────────────────────────────
function ExamResults({ subject, questions, answers, score, onContinue }) {
  const [showDetail, setShowDetail] = useState(false)
  const correct = answers.filter(a => a.status === 'correct').length
  const wrong   = answers.filter(a => a.status === 'wrong').length
  const ratio   = Math.max(0, Math.min(1, score / 20))
  const tone    = score >= 14 ? 'great' : score >= 10 ? 'good' : 'gentle'

  const msgs = {
    great:  { t: 'Excellent !',           s: 'Tu es prête pour le vrai partiel. Sérieusement.' },
    good:   { t: 'Solide.',               s: 'Encore quelques révisions et tu y es. Tu progresses.' },
    gentle: { t: "On va y arriver.",      s: 'Chaque session compte. Repasse les réponses ci-dessous.' },
  }[tone]

  const confetti = useMemo(() => {
    if (tone !== 'great') return []
    return Array.from({ length: 28 }, (_, i) => ({
      left:  Math.random() * 100,
      delay: Math.random() * 0.5,
      color: ['#EC6F92', '#F590AB', '#FFD3DF', '#E8C57A', '#C8B8DC', '#BCD4C0'][i % 6],
      size:  6 + Math.random() * 8,
      rot:   Math.random() * 360,
      dur:   2 + Math.random() * 1.5,
    }))
  }, [tone])

  return (
    <div className="screen-anim" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(170deg, #FFF0D0 0%, #FFF5F7 50%, #FFFAF7 100%)', overflow: 'hidden' }}>
      {/* Confetti si excellent */}
      {confetti.length > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {confetti.map((c, i) => (
            <div key={i} style={{ position: 'absolute', top: -20, left: `${c.left}%`, width: c.size, height: c.size, background: c.color, borderRadius: i % 3 === 0 ? '50%' : 2, transform: `rotate(${c.rot}deg)`, animation: `confetti-fall ${c.dur}s ${c.delay}s linear forwards` }} />
          ))}
        </div>
      )}
      <Sparkle x={50}  y={120} size={16} delay={0.3} color="#E8C57A" />
      <Sparkle x={340} y={200} size={12} delay={0.9} color="#FBB6C8" />

      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 130 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 24px 0' }}>

          {/* Badge Partiel Simulé */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, background: 'linear-gradient(135deg, #FFF0D0, #FFD97D)', border: '1.5px solid #E8C57A', boxShadow: '0 4px 18px rgba(200,150,0,0.18)', fontSize: 13, fontWeight: 800, color: '#7A5200', letterSpacing: '0.04em', marginBottom: 16 }}>
            🎓 <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 11 }}>Partiel Simule</span>
          </div>

          {/* Mascot */}
          <div className="float">
            <Mascot size={130} mood={tone === 'great' ? 'hooray' : tone === 'good' ? 'wink' : 'happy'} accessory="star" />
          </div>

          {/* Score ring */}
          <div style={{ position: 'relative', marginTop: 16 }}>
            <ProgressRing pct={Math.round(ratio * 100)} size={130} stroke={9} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 38, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {score.toFixed(1).replace('.', ',')}
                <span style={{ fontSize: 18, color: 'var(--ink-300)' }}>/20</span>
              </div>
              <div style={{ fontSize: 10, color: '#8A6400', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Note</div>
            </div>
          </div>

          <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 30, margin: '16px 0 6px', textAlign: 'center', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            {msgs.t}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink-500)', textAlign: 'center', margin: '0 0 18px', maxWidth: 300, lineHeight: 1.5 }}>
            {msgs.s}
          </p>

          {/* Stats */}
          <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(180,60,100,0.08)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'stretch', gap: 14, boxShadow: 'var(--sh-card)', width: '100%', maxWidth: 340 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(188,212,192,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C5A38', fontWeight: 800, fontSize: 15 }}>{correct}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Bonnes</div>
            </div>
            <div style={{ width: 1, background: 'rgba(0,0,0,0.06)' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(252,220,230,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rose-700)', fontWeight: 800, fontSize: 15 }}>{wrong}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mauvaises</div>
            </div>
            <div style={{ width: 1, background: 'rgba(0,0,0,0.06)' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(200,184,220,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6E5A8A', fontWeight: 800, fontSize: 15 }}>{questions.length}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total</div>
            </div>
          </div>

          {/* Toggle détail */}
          <button
            className="tap"
            onClick={() => setShowDetail(d => !d)}
            style={{ marginTop: 14, padding: '10px 20px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(180,60,100,0.12)', borderRadius: 999, fontSize: 13, fontWeight: 800, color: 'var(--ink-700)', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span>{showDetail ? '▲' : '▼'}</span>
            {showDetail ? 'Masquer le detail' : 'Voir le detail question par question'}
          </button>

          {/* Détail des questions */}
          {showDetail && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              {questions.map((q, i) => {
                const a       = answers[i]
                const correct = a?.status === 'correct'
                return (
                  <div key={i} className="kn-card" style={{ padding: '16px 18px', borderLeft: `4px solid ${correct ? 'var(--sage)' : 'var(--rose-400)'}`, animation: `screen-in 380ms ${i * 40}ms backwards` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ width: 22, height: 22, borderRadius: '50%', background: correct ? '#EAF7EE' : 'var(--rose-100)', color: correct ? '#2C5A38' : 'var(--rose-700)', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {correct ? '✓' : '✕'}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Q{i + 1}</span>
                    </div>
                    <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 14, lineHeight: 1.4, color: 'var(--ink-900)' }}>
                      {q.question}
                    </p>
                    {!correct && (
                      <div style={{ fontSize: 12, color: '#2C5A38', fontWeight: 700, marginBottom: 6 }}>
                        Bonne reponse : {q.choices[q.correct_index]}
                      </div>
                    )}
                    <div style={{ fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.5, padding: '8px 10px', background: 'rgba(0,0,0,0.02)', borderRadius: 8 }}>
                      {q.explanation}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Note perso */}
          <div style={{ marginTop: 18, padding: '16px 20px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', border: '1px dashed var(--gold)', borderRadius: 'var(--r-lg)', maxWidth: 340, position: 'relative', width: '100%' }}>
            <div style={{ position: 'absolute', top: -10, left: 16, padding: '2px 10px', background: 'linear-gradient(135deg, #E8C57A, #D4A850)', color: '#5A3C00', borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: '0.08em' }}>
              UN MOT POUR TOI
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 15, lineHeight: 1.5, color: 'var(--ink-700)' }}>
              « Tu viens de simuler l'examen. Ce n'est pas rien. Maintenant tu sais ou travailler. »
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

// ── Examen Blanc ──────────────────────────────────────────────────────────────
export function ExamenBlanc({ route, go }) {
  const { subject } = route
  const { data: rawQcm, loading } = useQCM({ subjectId: subject?.id, finalExam: true })

  // Mélange aléatoire une seule fois au chargement
  const questions = useMemo(() => {
    if (!rawQcm.length) return []
    const shuffled = [...rawQcm].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 30)
  }, [rawQcm.length])

  const [idx,     setIdx]     = useState(0)
  const [picked,  setPicked]  = useState(null)     // index choisi
  const [answers, setAnswers] = useState([])        // [{ status, picked }]
  const [result,  setResult]  = useState(null)      // payload de fin

  const q      = questions[idx]
  const isLast = idx >= questions.length && questions.length > 0

  // Calcul du score final
  useEffect(() => {
    if (!isLast || !questions.length || result) return
    let raw = 0
    answers.forEach(a => {
      if (a.status === 'correct') raw += SCORING.correct
      else                        raw += SCORING.wrong
    })
    const maxRaw    = questions.length * SCORING.correct
    const scoreOn20 = Math.min(20, Math.max(0, raw) / maxRaw * 20 * MULTIPLIER)
    const rounded   = Math.round(scoreOn20 * 10) / 10

    // Persist
    supabase.from('challenge_scores').insert({ subject_id: subject?.id, level: 'final', score: rounded, total: 20 }).then(() => {})
    supabase.from('sessions').insert({ subject_id: subject?.id, mode: 'final_exam', cards_done: questions.length }).then(() => {})

    setResult({ score: rounded })
  }, [isLast])

  function pick(i) {
    if (picked !== null) return
    setPicked(i)
    const correct = i === q.correct_index
    setAnswers(a => [...a, { status: correct ? 'correct' : 'wrong', picked: i }])
    // Pas de feedback : on avance automatiquement après 400ms
    setTimeout(() => {
      setPicked(null)
      setIdx(n => n + 1)
    }, 400)
  }

  if (loading) return (
    <div className="kn-screen screen-anim" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--ink-300)' }}>Chargement…</p>
    </div>
  )

  if (!questions.length && !loading) return (
    <div className="kn-screen screen-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 32 }}>
      <Mascot size={80} mood="sleepy" />
      <p style={{ color: 'var(--ink-400)', textAlign: 'center', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 20 }}>
        Aucune question d'examen blanc disponible.
      </p>
      <button className="btn-ghost" onClick={() => go({ name: 'subjectHub', subject })}>Retour</button>
    </div>
  )

  if (result) {
    return (
      <ExamResults
        subject={subject}
        questions={questions}
        answers={answers}
        score={result.score}
        onContinue={() => go({ name: 'reward', subject, score: result.score, total: 20, mode: 'final' })}
      />
    )
  }

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 130 }}>

        {/* Top bar */}
        <div style={{ padding: '0 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BackBtn onBack={() => go({ name: 'subjectHub', subject })} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'linear-gradient(135deg, #FFF0D0, #FFE08A)', border: '1px solid #E8C57A', fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A5200' }}>
              🎓 Partiel Simule
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 700, marginTop: 2 }}>
              {Math.min(idx + 1, questions.length)} / {questions.length}
            </div>
          </div>
          <div style={{ width: 40 }} />
        </div>

        {/* Barre de progression gold */}
        <div style={{ padding: '0 24px', marginBottom: 24 }}>
          <div style={{ height: 6, borderRadius: 3, background: '#FFE8A0', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(idx / questions.length) * 100}%`, background: 'linear-gradient(90deg, #E8C57A, #D4A030)', borderRadius: 3, transition: 'width 400ms cubic-bezier(.22,.9,.32,1.02)' }} />
          </div>
        </div>

        {/* Question card */}
        {q && (
          <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="kn-card" style={{ padding: 22 }}>
              <span className="chip" style={{ background: '#FFF0D0', color: '#8A6400', marginBottom: 14, display: 'inline-flex' }}>
                🎓 Question {idx + 1}
              </span>
              <h2 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 22, lineHeight: 1.25, margin: '4px 0 0', letterSpacing: '-0.01em' }}>
                {q.question}
              </h2>
            </div>

            {/* Choix — pas de feedback, juste highlight de la sélection pendant 400ms */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(q.choices ?? []).map((choice, i) => {
                const isPicked = picked === i
                let bg     = 'white'
                let border = 'rgba(180,60,100,0.08)'
                if (isPicked) { bg = '#FFF0D0'; border = '#E8C57A' }

                const letter = String.fromCharCode(65 + i)
                return (
                  <button
                    key={i}
                    className="tap"
                    onClick={() => pick(i)}
                    disabled={picked !== null}
                    style={{ textAlign: 'left', padding: '14px 16px', background: bg, border: `1.5px solid ${border}`, borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 600, cursor: picked !== null ? 'default' : 'pointer', transition: 'all 200ms ease', animation: `screen-in 360ms ${i * 55}ms backwards` }}
                  >
                    <span style={{ width: 28, height: 28, borderRadius: 8, background: isPicked ? '#E8C57A' : 'var(--rose-100)', color: isPicked ? '#5A3C00' : 'var(--rose-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{letter}</span>
                    <span style={{ flex: 1 }}>{choice}</span>
                  </button>
                )
              })}
            </div>

            {/* Indice de tension */}
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-400)', fontStyle: 'italic', marginTop: 4 }}>
              Pas de retour immédiat — les corrections apparaissent a la fin.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
