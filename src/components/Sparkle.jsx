import React from 'react'

export function Sparkle({ size = 16, color = 'var(--gold)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ animation: 'sparkle 2s ease-in-out infinite', ...style }}>
      <path
        d="M8 1 L9 6.5 L14.5 8 L9 9.5 L8 15 L7 9.5 L1.5 8 L7 6.5 Z"
        fill={color}
      />
    </svg>
  )
}
