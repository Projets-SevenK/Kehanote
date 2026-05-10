import React, { useState, useRef, useEffect } from 'react'
import { useFlashcards } from '../hooks/useFlashcards'
import { Mascot }        from '../components/Mascot'
import { Heart }         from '../components/Heart'
import { supabase }      from '../lib/supabase'

function BackBtn({ onBack }) {
  return (
    <button className="tap" onClick={onBack} style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', border: '1px solid rgba(180,60,100,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-card)' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9 2L3 7l6 5" stroke="var(--ink-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

function CardFace({ children, flip = false }) {
  return (
    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: flip ? 'rotateY(180deg)' : 'rotateY(0deg)', background: flip ? 'linear-gradient(155deg, #FFF, #FFF5F7)' : 'white', borderRadius: 'var(--r-xl)', border: '1px solid rgba(180,60,100,0.06)', boxShadow: 'var(--sh-soft)', padding: 22, display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  )
}

function FloatingHearts() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: 'absolute', left: `${20 + i * 12}%`, top: '40%', animation: `heart-pop 800ms ${i * 60}ms ease-out forwards, float-y 1.2s ${i * 60}ms ease-out forwards` }}>
          <Heart size={18 + (i % 3) * 4} color={i % 2 ? 'var(--rose-500)' : 'var(--rose-400)'} />
        </div>
      ))}
    </div>
  )
}

export function Flashcards({ route, go }) {
  const { subject, chapter } = route
  const { data: cards, loading } = useFlashcards(chapter?.id)

  const [idx,      setIdx]      = useState(0)
  const [flipped,  setFlipped]  = useState(false)
  const [drag,     setDrag]     = useState({ x: 0, y: 0, active: false })
  const [feedback, setFeedback] = useState(null)
  const [score,    setScore]    = useState({ know: 0, unsure: 0 })
  const startRef = useRef({ x: 0, y: 0 })

  const card   = cards[idx]
  const isLast = idx >= cards.length

  const startDrag = (cx, cy) => { startRef.current = { x: cx, y: cy }; setDrag({ x: 0, y: 0, active: true }) }
  const moveDrag  = (cx, cy) => { if (!drag.active) return; setDrag(d => ({ ...d, x: cx - startRef.current.x, y: cy - startRef.current.y })) }
  const endDrag   = () => {
    if (!drag.active) return
    if (Math.abs(drag.x) > 80) {
      const dir = drag.x > 0 ? 'know' : 'unsure'
      setFeedback(dir)
      setScore(s => ({ ...s, [dir]: s[dir] + 1 }))
      setDrag({ x: drag.x > 0 ? 500 : -500, y: drag.y, active: false })
      setTimeout(() => { setDrag({ x: 0, y: 0, active: false }); setFlipped(false); setFeedback(null); setIdx(i => i + 1) }, 320)
    } else {
      setDrag({ x: 0, y: 0, active: false })
    }
  }

  const swipeBtn = (dir) => {
    setFeedback(dir)
    setScore(s => ({ ...s, [dir]: s[dir] + 1 }))
    setDrag({ x: dir === 'know' ? 500 : -500, y: 0, active: false })
    setTimeout(() => { setDrag({ x: 0, y: 0, active: false }); setFlipped(false); setFeedback(null); setIdx(i => i + 1) }, 320)
  }

  useEffect(() => {
    if (isLast && cards.length > 0) {
      supabase.from('sessions').insert({ subject_id: subject?.id, chapter_id: chapter?.id, mode: 'swipe', cards_done: cards.length }).then(() => {})
      const t = setTimeout(() => go({ name: 'reward', subject, chapter, score: score.know, total: cards.length, mode: 'swipe' }), 600)
      return () => clearTimeout(t)
    }
  }, [isLast])

  const rot          = drag.x * 0.06
  const opacityRight = Math.max(0, Math.min(1, drag.x / 100))
  const opacityLeft  = Math.max(0, Math.min(1, -drag.x / 100))

  if (loading) return <div className="kn-screen screen-anim" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: 'var(--ink-300)' }}>Chargement…</p></div>
  if (!cards.length) return (
    <div className="kn-screen screen-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 32 }}>
      <p style={{ color: 'var(--ink-300)' }}>Pas de cartes pour ce chapitre.</p>
      <button className="btn-ghost" onClick={() => go({ name: 'chapterHub', subject, chapter })}>Retour</button>
    </div>
  )

  return (
    <div className="kn-screen screen-anim">
      {/* Top bar */}
      <div style={{ padding: '60px 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackBtn onBack={() => go({ name: 'chapterHub', subject, chapter })} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--rose-600)', textTransform: 'uppercase' }}>Swipe & Retiens</div>
          <div style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 700 }}>{Math.min(idx + 1, cards.length)} / {cards.length}</div>
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Progress bar */}
      <div style={{ padding: '0 24px', marginBottom: 24 }}>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--rose-100)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(idx / cards.length) * 100}%`, background: 'linear-gradient(90deg, var(--rose-400), var(--rose-500))', borderRadius: 3, transition: 'width 400ms cubic-bezier(.22,.9,.32,1.02)' }}/>
        </div>
      </div>

      {/* Card area */}
      <div style={{ position: 'relative', height: 440, margin: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none', touchAction: 'none' }}>
        {/* Next card peek */}
        {!isLast && cards[idx + 1] && (
          <div className="kn-card" style={{ position: 'absolute', inset: '8px 12px', borderRadius: 'var(--r-xl)', transform: 'scale(0.94) translateY(10px)', opacity: 0.6 }}/>
        )}

        {!isLast && card && (
          <div
            onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY) }}
            onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY) }}
            onTouchEnd={endDrag}
            onClick={() => { if (Math.abs(drag.x) < 6) setFlipped(f => !f) }}
            style={{ position: 'absolute', inset: 0, transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rot}deg)`, transition: drag.active ? 'none' : 'transform 320ms cubic-bezier(.22,.9,.32,1.02)', cursor: drag.active ? 'grabbing' : 'grab', transformStyle: 'preserve-3d', perspective: 1000 }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 520ms cubic-bezier(.22,.9,.32,1.02)', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
              {/* Front */}
              <CardFace>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span className="chip">Question</span>
                  <span style={{ fontSize: 11, color: 'var(--ink-300)', fontWeight: 700 }}>Tape pour révéler</span>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontWeight: 500, fontSize: 24, lineHeight: 1.3, textAlign: 'center', color: 'var(--ink-900)', padding: '0 12px' }}>
                  {card.question}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                  <Mascot size={50} mood="focus" />
                </div>
              </CardFace>

              {/* Back */}
              <CardFace flip>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span className="chip" style={{ background: '#EFE7F6', color: '#6E5A8A' }}>Réponse</span>
                  <span style={{ fontSize: 11, color: 'var(--ink-300)', fontWeight: 700 }}>← inconnu · connu →</span>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, lineHeight: 1.5, textAlign: 'center', color: 'var(--ink-900)', padding: '0 6px' }}>
                  {card.answer}
                </div>
              </CardFace>
            </div>

            {/* Feedback badges */}
            <div style={{ position: 'absolute', top: 22, left: 22, padding: '8px 14px', borderRadius: 12, background: 'var(--rose-500)', color: 'white', fontWeight: 800, fontSize: 14, letterSpacing: '0.06em', transform: 'rotate(-12deg)', opacity: opacityRight, border: '2px solid white' }}>JE CONNAIS 💗</div>
            <div style={{ position: 'absolute', top: 22, right: 22, padding: '8px 14px', borderRadius: 12, background: 'var(--lav)', color: 'white', fontWeight: 800, fontSize: 14, letterSpacing: '0.06em', transform: 'rotate(12deg)', opacity: opacityLeft, border: '2px solid white' }}>À REVOIR</div>
          </div>
        )}

        {isLast && (
          <div style={{ textAlign: 'center' }}>
            <Mascot size={120} mood="hooray" accessory="star" />
            <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 24, marginTop: 12 }}>
              Bravo, c'est fini !
            </div>
          </div>
        )}

        {feedback === 'know' && <FloatingHearts />}
      </div>

      {/* Action buttons */}
      {!isLast && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, marginTop: 18 }}>
          <button className="tap" onClick={() => swipeBtn('unsure')} style={{ width: 64, height: 64, borderRadius: '50%', background: 'white', border: '2px solid var(--lav)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-card)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="#9784B0" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="tap" onClick={() => setFlipped(f => !f)} style={{ width: 56, height: 56, borderRadius: '50%', background: 'white', border: '1.5px solid rgba(180,60,100,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-card)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 12a9 9 0 0115-6.7M21 4v5h-5M21 12a9 9 0 01-15 6.7M3 20v-5h5" stroke="var(--ink-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="tap" onClick={() => swipeBtn('know')} style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--rose-500)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-pop)' }}>
            <Heart size={26} color="white" />
          </button>
        </div>
      )}

      {/* Score readout */}
      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 16, fontSize: 12, fontWeight: 800 }}>
        <span style={{ color: 'var(--rose-600)' }}>💗 {score.know}</span>
        <span style={{ color: '#9784B0' }}>↻ {score.unsure}</span>
      </div>
    </div>
  )
}
