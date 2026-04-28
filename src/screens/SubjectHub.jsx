import React from 'react'
import { SubjectIcon } from '../components/SubjectIcon'

const MODES = [
  { name: 'concentre',  label: 'Le Concentré',    emoji: '📖', desc: 'Résumé structuré' },
  { name: 'flashcards', label: 'Swipe & Retiens',  emoji: '🃏', desc: 'Flashcards swipables' },
  { name: 'challenge',  label: 'Challenge',         emoji: '🎯', desc: 'QCM noté' },
  { name: 'panic',      label: 'Mode Panique',      emoji: '🚨', desc: "L'essentiel ultra-vite" },
]

export function SubjectHub({ route, go }) {
  const { subject } = route
  return (
    <div className="kn-screen screen-anim">
      <div className="kn-scroll" style={{ paddingBottom: 40 }}>
        <div style={{ padding: '56px 20px 0' }}>
          <button
            className="tap"
            style={{ background: 'none', border: 'none', color: 'var(--rose-600)', fontWeight: 700, padding: 0, marginBottom: 20 }}
            onClick={() => go({ name: 'home' })}
          >
            ← Retour
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <SubjectIcon icon={subject.icon} color={subject.color} size={52} />
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{subject.title}</h2>
              <p style={{ margin: 0, color: 'var(--ink-500)', fontSize: 13 }}>{subject.teacher}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {MODES.map(mode => (
              <button
                key={mode.name}
                className="kn-card tap"
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', border: 'none', width: '100%', textAlign: 'left', background: 'var(--card)' }}
                onClick={() => go({ name: mode.name, subject })}
              >
                <span style={{ fontSize: 28 }}>{mode.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{mode.label}</div>
                  <div style={{ color: 'var(--ink-500)', fontSize: 13 }}>{mode.desc}</div>
                </div>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                  <path d="M1 1l5 5-5 5" stroke="var(--ink-300)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
