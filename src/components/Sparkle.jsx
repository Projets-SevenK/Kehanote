import React from 'react'

export function Sparkle({ x, y, size = 14, delay = 0, color = '#FFFFFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{
      position: 'absolute', left: x, top: y,
      animation: `sparkle 2.4s ease-in-out ${delay}s infinite`,
      pointerEvents: 'none',
    }}>
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill={color}/>
    </svg>
  )
}
