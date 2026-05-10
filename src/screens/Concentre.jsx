import React, { useEffect } from 'react'
import { useConcentre } from '../hooks/useConcentre'
import { Mascot }       from '../components/Mascot'
import { supabase }     from '../lib/supabase'

function BackBtn({ onBack }) {
  return (
    <button className="tap" onClick={onBack} style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', border: '1px solid rgba(180,60,100,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-card)' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9 2L3 7l6 5" stroke="var(--ink-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

const KIND = {
  key: { label: "L'essentiel", bg: 'var(--rose-100)', color: 'var(--rose-700)', icon: '✦' },
  def: { label: 'À retenir',   bg: '#EFE7F6',         color: '#6E5A8A',         icon: '◆' },
  tip: { label: "Pour l'oral", bg: '#FFE4D6',         color: '#B55F30',         icon: '✿' },
}

export function Concentre({ route, go }) {
  const { subject, chapter: routeChapter } = route
  const { data: chapter, loading } = useConcentre(routeChapter?.id)

  useEffect(() => {
    if (chapter && subject) {
      supabase.from('sessions').insert({ subject_id: subject.id, chapter_id: routeChapter?.id, mode: 'concentre', cards_done: 1 }).then(() => {})
    }
  }, [chapter, subject])

  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingTop: 60, paddingBottom: 110 }}>

        {/* Top bar */}
        <div style={{ padding: '0 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BackBtn onBack={() => go({ name: 'chapterHub', subject, chapter: routeChapter })} />
          {chapter && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-500)', fontSize: 12, fontWeight: 700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Lecture · {chapter.reading_time}</span>
            </div>
          )}
        </div>

        {/* Header */}
        <div style={{ padding: '12px 24px 8px' }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--rose-600)', textTransform: 'uppercase', marginBottom: 6 }}>
            Le Concentré
          </div>
          {loading ? (
            <p style={{ color: 'var(--ink-300)' }}>Chargement…</p>
          ) : !chapter ? (
            <p style={{ color: 'var(--ink-300)' }}>Aucun résumé disponible.</p>
          ) : (
            <>
              <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontStyle: 'italic', fontSize: 28, margin: 0, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                {chapter.chapter_title}
              </h1>
              <p style={{ fontSize: 13, color: 'var(--ink-500)', margin: '8px 0 0' }}>{subject?.title}</p>
            </>
          )}
        </div>

        {chapter && (
          <>
            <div className="dot-divider" style={{ margin: '14px 24px' }} />

            {/* Sections */}
            <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {(chapter.sections ?? []).map((sec, idx) => {
                const k = KIND[sec.type] ?? KIND.key
                return (
                  <div key={idx} className="kn-card" style={{ padding: 18, animation: `screen-in 480ms ${idx * 100}ms backwards cubic-bezier(.22,.9,.32,1.02)` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <span className="chip" style={{ background: k.bg, color: k.color }}>
                        {k.icon} {sec.title}
                      </span>
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {(sec.bullets ?? []).map((b, i) => (
                        <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.5, color: 'var(--ink-900)' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: k.color, marginTop: 9, flexShrink: 0 }}/>
                          <span style={{ flex: 1 }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}

              {/* Mochi footer */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '8px 8px 0', marginTop: 8 }}>
                <Mascot size={70} mood="happy" accessory="heart" />
                <div style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--ink-500)', textAlign: 'center', maxWidth: 240 }}>
                  « Tu as fait le plus dur — maintenant on s'amuse avec les flashcards. »
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
