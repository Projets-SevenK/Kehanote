import React, { useState, useMemo, useEffect } from 'react'
import { useQCM } from '../hooks/useQCM'
import { Mascot } from '../components/Mascot'
import { supabase } from '../lib/supabase'

const LEVELS = [
  { id: 'easy',   label: 'Facile',    sub: 'Les bases',       icon: '🌸', color: '#BCD4C0', bg: 'rgba(188,212,192,0.18)', multiplier: 1,    target: 5 },
  { id: 'medium', label: 'Moyen',     sub: 'Pour progresser', icon: '🌹', color: '#EC6F92', bg: 'rgba(236,111,146,0.15)', multiplier: 1.25, target: 5 },
  { id: 'hard',   label: 'Difficile', sub: 'Pour le partiel', icon: '⚡',  color: '#6E5A8A', bg: 'rgba(110,90,138,0.15)',  multiplier: 1.5,  target: 5 },
]
const SCORING = { correct: 1, wrong: -0.5, skip: -0.25 }
const HISTORY_KEY = 'kehanote.challenge.history.v1'

function loadHistory()    { try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}') } catch { return {} } }
function readBest(sid, lid) { return loadHistory()[`${sid}__${lid}`]?.best ?? 0 }
function recordRun(sid, lid, score) {
  const h = loadHistory(); const key = `${sid}__${lid}`
  const e = h[key] || { best: 0, runs: [] }
  e.best = Math.max(e.best, score)
  e.runs = [...e.runs, { date: new Date().toISOString().slice(0, 10), score }].slice(-30)
  h[key] = e; try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)) } catch {}
  return e
}

function BackBtn({ onBack }) {
  return (
    <button className="tap" onClick={onBack} style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', border: '1px solid rgba(180,60,100,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-card)' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9 2L3 7l6 5" stroke="var(--ink-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

// ── Difficulty picker ───────────────────────────────────────────────────────
function DifficultyPicker({ subject, allQcm, onBack, onPick }) {
  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 110 }}>
        <div style={{ padding: '0 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BackBtn onBack={onBack} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: '#6E5A8A', textTransform: 'uppercase' }}>Challenge</div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 700 }}>{subject?.title}</div>
          </div>
          <div style={{ width: 40 }}/>
        </div>

        <div style={{ padding: '20px 24px 28px' }}>
          <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 32, margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            Choisis ton niveau.
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink-500)', margin: '10px 0 0', lineHeight: 1.5 }}>
            Plus c'est dur, plus le score compte. Pas de stress — tu peux toujours recommencer.
          </p>
        </div>

        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LEVELS.map((lv, i) => {
            const count    = Math.min(allQcm.filter(q => q.level === lv.id).length, lv.target)
            const best     = readBest(subject?.id, lv.id)
            const disabled = count === 0
            return (
              <button key={lv.id} className="tap" disabled={disabled} onClick={() => !disabled && onPick(lv)} style={{ textAlign: 'left', padding: 18, background: disabled ? 'rgba(255,255,255,0.6)' : 'white', border: `1.5px solid ${disabled ? 'rgba(180,60,100,0.06)' : lv.color + '55'}`, borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', gap: 16, boxShadow: disabled ? 'none' : 'var(--sh-card)', opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer', animation: `screen-in 480ms ${i * 80}ms backwards cubic-bezier(.22,.9,.32,1.02)` }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: lv.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>{lv.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 22, color: 'var(--ink-900)', lineHeight: 1.1 }}>{lv.label}</span>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', padding: '3px 7px', borderRadius: 999, background: lv.color, color: 'white' }}>×{lv.multiplier}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)', marginBottom: 6 }}>{lv.sub} · {count > 0 ? `${count} questions` : 'À venir'}</div>
                  {best > 0 && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'var(--rose-100)', color: 'var(--rose-700)', fontSize: 11, fontWeight: 800 }}>
                      ★ Meilleur : {best.toFixed(1)}/20
                    </div>
                  )}
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                  <path d="M5 2l6 5-6 5" stroke="var(--ink-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )
          })}
        </div>

        {/* Scoring legend */}
        <div style={{ padding: '24px 18px 0' }}>
          <div style={{ padding: '16px 18px', background: 'rgba(255,255,255,0.7)', border: '1px dashed var(--rose-300)', borderRadius: 'var(--r-md)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: '#6E5A8A', textTransform: 'uppercase', marginBottom: 10 }}>Comment ça se note</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--ink-700)' }}>
              {[['#2C5A38', '+1', 'bonne réponse'], ['var(--rose-700)', '−0,5', 'mauvaise réponse'], ['#6E5A8A', '−0,25', 'question passée']].map(([color, val, label]) => (
                <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 36, fontWeight: 800, color, fontVariantNumeric: 'tabular-nums' }}>{val}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Quiz ────────────────────────────────────────────────────────────────────
function Quiz({ subject, level, questions, onBack, onComplete }) {
  const [idx,     setIdx]     = useState(0)
  const [picked,  setPicked]  = useState(null)
  const [answers, setAnswers] = useState([])

  const q      = questions[idx]
  const isLast = idx >= questions.length

  const tally = useMemo(() => {
    let raw = 0, c = 0, w = 0, s = 0
    answers.forEach(a => {
      if (a.status === 'correct') { raw += SCORING.correct; c++ }
      else if (a.status === 'wrong')  { raw += SCORING.wrong;   w++ }
      else if (a.status === 'skip')   { raw += SCORING.skip;    s++ }
    })
    return { raw, c, w, s }
  }, [answers])

  function pick(i) {
    if (picked !== null) return
    setPicked(i)
    const correct = i === q.correct_index
    setAnswers(a => [...a, { status: correct ? 'correct' : 'wrong', picked: i }])
  }

  function skip() {
    if (picked !== null) return
    setAnswers(a => [...a, { status: 'skip' }])
    advance(answers.length + 1)
  }

  function next() { advance(answers.length) }

  function advance(answerCount) {
    setPicked(null)
    setIdx(i => i + 1)
  }

  useEffect(() => {
    if (!isLast || !questions.length) return
    let raw = 0, c = 0, w = 0, s = 0
    answers.forEach(a => {
      if (a.status === 'correct') { raw += SCORING.correct; c++ }
      else if (a.status === 'wrong')  { raw += SCORING.wrong;   w++ }
      else if (a.status === 'skip')   { raw += SCORING.skip;    s++ }
    })
    const maxRaw    = questions.length * SCORING.correct
    const scoreOn20 = Math.min(20, Math.max(0, raw) / maxRaw * 20 * level.multiplier)
    const rounded   = Math.round(scoreOn20 * 10) / 10
    const prevBest  = readBest(subject?.id, level.id)
    const history   = recordRun(subject?.id, level.id, rounded)

    // Persist to Supabase
    supabase.from('challenge_scores').insert({ subject_id: subject?.id, level: level.id, score: rounded }).then(() => {})
    supabase.from('sessions').insert({ subject_id: subject?.id, mode: 'qcm', cards_done: questions.length }).then(() => {})

    onComplete({ score: rounded, total: 20, counts: { correct: c, wrong: w, skip: s, n: questions.length }, level, best: history.best, isNewBest: rounded > prevBest })
  }, [isLast])

  if (isLast) return null

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 130 }}>
        {/* Top bar */}
        <div style={{ padding: '0 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BackBtn onBack={onBack} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: level.color, textTransform: 'uppercase' }}>
              <span>{level.icon}</span> {level.label}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 700 }}>{idx + 1} / {questions.length}</div>
          </div>
          <div style={{ padding: '6px 10px', minWidth: 56, height: 36, borderRadius: 12, background: tally.raw >= 0 ? 'rgba(188,212,192,0.25)' : 'rgba(252,220,230,0.7)', border: `1px solid ${tally.raw >= 0 ? 'rgba(188,212,192,0.6)' : 'var(--rose-300)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tally.raw >= 0 ? '#2C5A38' : 'var(--rose-700)', fontWeight: 800, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>
            {tally.raw > 0 ? '+' : ''}{tally.raw.toFixed(2).replace(/\.?0+$/, '')}
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ padding: '0 24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {questions.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < idx ? (answers[i]?.status === 'correct' ? 'var(--rose-500)' : answers[i]?.status === 'wrong' ? 'var(--lav)' : '#D8D0E4') : i === idx ? 'var(--rose-300)' : 'var(--rose-100)' }}/>
            ))}
          </div>
        </div>

        {/* Question card */}
        <div style={{ padding: '0 18px' }}>
          <div className="kn-card" style={{ padding: 22, marginBottom: 16 }}>
            <span className="chip lav" style={{ marginBottom: 14, display: 'inline-flex' }}>Question {idx + 1}</span>
            <h2 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 23, lineHeight: 1.25, margin: '4px 0 0', letterSpacing: '-0.01em' }}>{q.question}</h2>
          </div>

          {/* Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(q.choices ?? []).map((choice, i) => {
              const isPicked    = picked === i
              const isCorrect   = i === q.correct_index
              const showResult  = picked !== null
              let bg = 'white', border = 'rgba(180,60,100,0.08)', labelBg = 'var(--rose-100)', labelColor = 'var(--rose-700)'
              if (showResult && isCorrect)             { bg = '#EAF7EE'; border = 'var(--sage)';       labelBg = 'var(--sage)';       labelColor = '#2C5A38' }
              else if (showResult && isPicked)         { bg = '#FBE7EC'; border = 'var(--rose-300)';   labelBg = 'var(--rose-400)';   labelColor = 'white' }
              const letter = String.fromCharCode(65 + i)
              const labelChar = showResult && isCorrect ? '✓' : showResult && isPicked && !isCorrect ? '✕' : letter
              return (
                <button key={i} className="tap" onClick={() => pick(i)} disabled={showResult} style={{ textAlign: 'left', padding: '14px 16px', background: bg, border: `1.5px solid ${border}`, borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 600, cursor: showResult ? 'default' : 'pointer', transition: 'all 240ms ease', animation: `screen-in 380ms ${i * 60}ms backwards` }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: labelBg, color: labelColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{labelChar}</span>
                  <span style={{ flex: 1 }}>{choice}</span>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {picked !== null && (
            <div style={{ marginTop: 16, padding: 16, background: picked === q.correct_index ? 'rgba(188,212,192,0.25)' : 'rgba(252,220,230,0.6)', borderRadius: 'var(--r-md)', display: 'flex', gap: 12, alignItems: 'flex-start', animation: 'screen-in 320ms' }}>
              <Mascot size={48} mood={picked === q.correct_index ? 'hooray' : 'sad'} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4, color: picked === q.correct_index ? '#2C5A38' : 'var(--rose-700)' }}>
                  {picked === q.correct_index ? `Bravo, c'est ça ! +${SCORING.correct}` : `Pas tout à fait. ${SCORING.wrong}`}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.5 }}>{q.explanation}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTAs */}
      <div style={{ position: 'absolute', bottom: 96, left: 18, right: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {picked !== null ? (
          <button className="btn-primary tap" onClick={next}>
            {idx + 1 >= questions.length ? 'Voir mon score' : 'Question suivante'}
          </button>
        ) : (
          <button className="tap" onClick={skip} style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.7)', border: '1px dashed rgba(110,90,138,0.4)', color: '#6E5A8A', borderRadius: 'var(--r-md)', fontSize: 13, fontWeight: 700 }}>
            Passer cette question · −0,25
          </button>
        )}
      </div>
    </div>
  )
}

// ── Main Challenge component ────────────────────────────────────────────────
export function Challenge({ route, go }) {
  const { subject } = route
  const { data: allQcm, loading } = useQCM(subject?.id)
  const [level, setLevel] = useState(null)

  if (loading) return <div className="kn-screen screen-anim" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: 'var(--ink-300)' }}>Chargement…</p></div>

  if (!level) return <DifficultyPicker subject={subject} allQcm={allQcm} onBack={() => go({ name: 'subjectHub', subject })} onPick={setLevel} />

  const questions = allQcm.filter(q => q.level === level.id).slice(0, level.target)

  return (
    <Quiz
      subject={subject}
      level={level}
      questions={questions}
      onBack={() => setLevel(null)}
      onComplete={(payload) => go({ name: 'reward', subject, mode: 'qcm', ...payload })}
    />
  )
}
