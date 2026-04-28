import React from 'react'

const ICONS = {
  book: (
    <path d="M4 4h11a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm2 4h7M6 12h7M6 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  ),
  people: (
    <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.314 2.686-6 6-6h6c3.314 0 6 2.686 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  ),
  pen: (
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  scale: (
    <path d="M12 3v18M3 6l9-3 9 3M5 10l-2 7h4L5 10zM19 10l-2 7h4L19 10zM3 21h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
}

const BG = {
  rose:  { bg: 'var(--rose-100)', color: 'var(--rose-600)' },
  lav:   { bg: '#EFE7F6',         color: '#6E5A8A' },
  peach: { bg: '#FFE4D6',         color: '#B55F30' },
  sage:  { bg: '#DDEDE1',         color: '#406B4D' },
}

export function SubjectIcon({ icon = 'book', color = 'rose', size = 44 }) {
  const { bg, color: iconColor } = BG[color] ?? BG.rose
  return (
    <div style={{
      width: size, height: size,
      borderRadius: size * 0.35,
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" style={{ color: iconColor }}>
        {ICONS[icon] ?? ICONS.book}
      </svg>
    </div>
  )
}
