import React from 'react'

const c = 'rgba(42, 27, 38, 0.7)'

const ICONS = {
  book: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14H6a2 2 0 00-2 2V5z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M4 19a2 2 0 002 2h14" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  people: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke={c} strokeWidth="1.8"/>
      <circle cx="16" cy="9" r="2.2" stroke={c} strokeWidth="1.8"/>
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 14c2.5 0 5 1.5 6 4" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  pen: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 7l3 3" stroke={c} strokeWidth="1.8"/>
    </svg>
  ),
  scale: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v16M5 20h14M6 8h12" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3 13l3-5 3 5a3 3 0 11-6 0zM15 13l3-5 3 5a3 3 0 11-6 0z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
}

const GRADIENTS = {
  rose:  'linear-gradient(155deg, #FFD3DF, #F590AB)',
  lav:   'linear-gradient(155deg, #EFE7F6, #C8B8DC)',
  peach: 'linear-gradient(155deg, #FFE4D6, #FFC09E)',
  sage:  'linear-gradient(155deg, #DDEDE1, #BCD4C0)',
}

export function SubjectIcon({ icon = 'book', color = 'rose', size = 48 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: Math.round(size * 0.29),
      background: GRADIENTS[color] ?? GRADIENTS.rose,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {ICONS[icon] ?? ICONS.book}
    </div>
  )
}
