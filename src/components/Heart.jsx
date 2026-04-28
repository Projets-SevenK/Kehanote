import React from 'react'

export function Heart({ size = 16, color = '#EC6F92', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={style}>
      <path
        d="M10 17 C10 17 1 11.5 1 6 C1 3 3.5 1 6 1 C8 1 9.5 2 10 3.5 C10.5 2 12 1 14 1 C16.5 1 19 3 19 6 C19 11.5 10 17 10 17 Z"
        fill={color}
      />
    </svg>
  )
}
