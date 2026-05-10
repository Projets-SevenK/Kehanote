import React, { useState, useEffect } from 'react'
import { useSubjects } from '../hooks/useSubjects'
import { usePanic }    from '../hooks/usePanic'
import { Mascot }      from '../components/Mascot'
import { Sparkle }     from '../components/Sparkle'
import { supabase }    from '../lib/supabase'

function SubjectPanicContent({ subjectId }) {
  const { data: groups, loading } = usePanic(subjectId)
  if (loading) return <p style={{ color: 'rgba(255,255,255,0.5)', padding: '0 18px' }}>Chargement…</p>
  const items = groups.flatMap(g => g.items)
  if (!items.length) return (
    <div style={{ margin: '0 18px', padding: 24, textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 'var(--r-lg)', fontSize: 14, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
      Le résumé éclair pour cette matière arrive très bientôt.
    </div>
  )
  return (
    <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }} key={subjectId}>
      {items.map((item, i) => (
        <div key={item.id} style={{ padding: '16px 18px', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--r-md)', display: 'flex', gap: 14, alignItems: 'flex-start', animation: `screen-in 480ms ${i * 110}ms backwards cubic-bezier(.22,.9,.32,1.02)` }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(155deg, var(--rose-400), var(--rose-600))', color: 'white', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(236,111,146,0.4)' }}>{i + 1}</div>
          <div style={{ flex: 1, fontSize: 15, lineHeight: 1.45 }}>{item.content}</div>
        </div>
      ))}
    </div>
  )
}

export function Panic({ route, go }) {
  const { subject, fromHub } = route
  const { data: subjects } = useSubjects()

  const [activeId, setActiveId] = useState(subject?.id ?? null)
  const activeSubject = subjects.find(s => s.id === activeId) ?? subjects[0]

  // Set first subject once loaded
  useEffect(() => { if (!activeId && subjects.length) setActiveId(subjects[0].id) }, [subjects])

  useEffect(() => {
    if (activeId) {
      supabase.from('sessions').insert({ subject_id: activeId, mode: 'panic', cards_done: 1 }).then(() => {})
    }
  }, [activeId])

  // 5-min countdown
  const [seconds, setSeconds] = useState(300)
  useEffect(() => {
    setSeconds(300)
    const id = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000)
    return () => clearInterval(id)
  }, [activeId])
  const mm    = Math.floor(seconds / 60)
  const ss    = String(seconds % 60).padStart(2, '0')
  const timeUp = seconds === 0

  function onBack() {
    if (fromHub && subject) go({ name: 'subjectHub', subject })
    else go({ name: 'home' })
  }

  return (
    <div className="screen-anim" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 0%, #4A2B3E 0%, #2A1B26 60%, #1B0F18 100%)', color: 'white', overflow: 'hidden' }}>
      <Sparkle x={50}  y={120} size={10} delay={0.2} color="#F590AB" />
      <Sparkle x={340} y={180} size={8}  delay={0.7} color="#FBB6C8" />
      <Sparkle x={60}  y={500} size={12} delay={1.1} color="#E8C57A" />

      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 100 }}>
        {/* Top bar */}
        <div style={{ padding: '0 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button className="tap" onClick={onBack} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L3 7l6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Countdown pill */}
          <div style={{ padding: '6px 12px', borderRadius: 999, background: timeUp ? 'rgba(255,107,138,0.25)' : 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: timeUp ? '1px solid rgba(255,107,138,0.5)' : '1px solid transparent', fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B8A', boxShadow: '0 0 8px #FF6B8A', animation: timeUp ? 'none' : 'panic-pulse 1.4s ease-in-out infinite' }}/>
            <span style={{ opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{timeUp ? 'Terminé' : 'Révision'}</span>
            <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 13, color: timeUp ? '#FFB6C7' : 'white' }}>{mm}:{ss}</span>
          </div>
        </div>

        {/* Title */}
        <div style={{ padding: '12px 24px 16px' }}>
          <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 8 }}>🚨</div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', color: '#F590AB', textTransform: 'uppercase', marginBottom: 6 }}>Mode Panique</div>
          <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 34, margin: 0, lineHeight: 1.05, color: 'white', letterSpacing: '-0.01em' }}>
            L'examen dans 1 heure ? Respire.
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: '12px 0 0', lineHeight: 1.5, maxWidth: 320 }}>
            Choisis la matière à réviser en 5 minutes chrono.
          </p>
        </div>

        {/* Subject picker */}
        {subjects.length > 1 && (
          <div style={{ display: 'flex', gap: 8, padding: '0 18px 18px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {subjects.map(s => {
              const isActive = s.id === activeId
              return (
                <button key={s.id} className="tap" onClick={() => setActiveId(s.id)} style={{ flexShrink: 0, padding: '9px 14px', background: isActive ? 'white' : 'rgba(255,255,255,0.08)', color: isActive ? '#2A1B26' : 'rgba(255,255,255,0.7)', border: isActive ? 'none' : '1px solid rgba(255,255,255,0.12)', borderRadius: 999, fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', transition: 'all 200ms' }}>
                  {s.title}
                </button>
              )
            })}
          </div>
        )}

        {/* Active subject label */}
        {activeSubject && (
          <div style={{ padding: '0 24px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 4 }}>Tu révises</div>
            <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 500, color: 'white', lineHeight: 1.1 }}>{activeSubject.title}</div>
          </div>
        )}

        {/* Items */}
        {activeId && <SubjectPanicContent key={activeId} subjectId={activeId} />}

        {/* Mochi calming */}
        <div style={{ margin: '18px 18px 0', padding: 18, background: 'linear-gradient(155deg, rgba(255,211,223,0.12), rgba(236,111,146,0.08))', border: '1px solid rgba(255,211,223,0.25)', borderRadius: 'var(--r-lg)', display: 'flex', gap: 14, alignItems: 'center' }}>
          <Mascot size={64} mood="sleepy" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, marginBottom: 4 }}>Inspire 4s, expire 6s.</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>Tu sais déjà plus que tu ne crois.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
