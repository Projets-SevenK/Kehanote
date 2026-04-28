import React from 'react'

const fur      = '#FFD1DC'
const furShade = '#F8B5C5'
const inner    = '#FFE9EE'
const nose     = '#E68FA1'
const blushC   = 'rgba(231, 100, 130, 0.45)'
const eye      = '#3A2330'
const white    = '#FFFFFF'

function Eyes({ mood }) {
  if (mood === 'wink') return (
    <g>
      <ellipse cx="78" cy="115" rx="6" ry="8" fill={eye}/>
      <circle cx="80" cy="112" r="2.2" fill={white}/>
      <path d="M115 113 Q123 118 131 113" stroke={eye} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    </g>
  )
  if (mood === 'sleepy') return (
    <g>
      <path d="M72 115 Q78 118 84 115" stroke={eye} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M115 115 Q121 118 127 115" stroke={eye} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    </g>
  )
  if (mood === 'hooray') return (
    <g>
      <path d="M70 118 Q78 110 86 118" stroke={eye} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M113 118 Q121 110 129 118" stroke={eye} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    </g>
  )
  if (mood === 'focus') return (
    <g>
      <ellipse cx="78" cy="115" rx="5" ry="6" fill={eye}/>
      <ellipse cx="121" cy="115" rx="5" ry="6" fill={eye}/>
    </g>
  )
  if (mood === 'sad') return (
    <g>
      <ellipse cx="78" cy="116" rx="5" ry="7" fill={eye}/>
      <ellipse cx="121" cy="116" rx="5" ry="7" fill={eye}/>
      <path d="M70 105 Q78 102 86 107" stroke={eye} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M113 107 Q121 102 129 105" stroke={eye} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    </g>
  )
  // happy / blush
  return (
    <g>
      <ellipse cx="78" cy="115" rx="6.5" ry="8.5" fill={eye}/>
      <circle cx="80" cy="112" r="2.4" fill={white}/>
      <ellipse cx="121" cy="115" rx="6.5" ry="8.5" fill={eye}/>
      <circle cx="123" cy="112" r="2.4" fill={white}/>
    </g>
  )
}

function Mouth({ mood }) {
  if (mood === 'hooray') return (
    <path d="M88 138 Q100 152 112 138 Q100 144 88 138 Z" fill="#C84968" stroke="#A33857" strokeWidth="1.5"/>
  )
  if (mood === 'sleepy') return (
    <path d="M95 138 Q100 142 105 138" stroke={eye} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  )
  if (mood === 'sad') return (
    <path d="M92 142 Q100 137 108 142" stroke={eye} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  )
  return (
    <g>
      <path d="M100 132 L96 138 L104 138 Z" fill={nose}/>
      <path d="M96 138 Q92 144 88 142" stroke={eye} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M104 138 Q108 144 112 142" stroke={eye} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    </g>
  )
}

export function Mascot({ mood = 'happy', size = 120, accessory = null, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={style}>
      {/* ear shadows */}
      <ellipse cx="62" cy="48" rx="14" ry="38" fill={furShade} transform="rotate(-12 62 48)"/>
      <ellipse cx="138" cy="48" rx="14" ry="38" fill={furShade} transform="rotate(12 138 48)"/>
      {/* ears */}
      <ellipse cx="64" cy="50" rx="12" ry="34" fill={fur} transform="rotate(-12 64 50)"/>
      <ellipse cx="136" cy="50" rx="12" ry="34" fill={fur} transform="rotate(12 136 50)"/>
      {/* inner ears */}
      <ellipse cx="64" cy="55" rx="6" ry="22" fill={inner} transform="rotate(-12 64 55)"/>
      <ellipse cx="136" cy="55" rx="6" ry="22" fill={inner} transform="rotate(12 136 55)"/>
      {/* head */}
      <ellipse cx="100" cy="115" rx="58" ry="52" fill={fur}/>
      <ellipse cx="100" cy="125" rx="50" ry="40" fill={inner} opacity="0.55"/>
      {/* blush */}
      <ellipse cx="65"  cy="132" rx="11" ry="6" fill={blushC}/>
      <ellipse cx="135" cy="132" rx="11" ry="6" fill={blushC}/>
      <Eyes mood={mood}/>
      <Mouth mood={mood}/>
      {accessory === 'heart' && (
        <g transform="translate(155 60)">
          <path d="M0 6 C0 2 4 -1 8 1 C12 -1 16 2 16 6 C16 11 8 17 8 17 C8 17 0 11 0 6 Z" fill="#EC6F92"/>
        </g>
      )}
      {accessory === 'book' && (
        <g transform="translate(58 162)">
          <rect x="0" y="0" width="84" height="22" rx="3" fill="#fff" stroke="#E68FA1" strokeWidth="1.5"/>
          <line x1="42" y1="2" x2="42" y2="20" stroke="#E68FA1" strokeWidth="1"/>
          <line x1="8"  y1="8" x2="36" y2="8"  stroke="#FFD1DC" strokeWidth="1"/>
          <line x1="8"  y1="13" x2="32" y2="13" stroke="#FFD1DC" strokeWidth="1"/>
          <line x1="48" y1="8" x2="76" y2="8"  stroke="#FFD1DC" strokeWidth="1"/>
          <line x1="48" y1="13" x2="72" y2="13" stroke="#FFD1DC" strokeWidth="1"/>
        </g>
      )}
      {accessory === 'star' && (
        <g transform="translate(150 50)">
          <path d="M10 0 L12 7 L19 7 L13.5 11.5 L15.5 19 L10 14.5 L4.5 19 L6.5 11.5 L1 7 L8 7 Z" fill="#E8C57A"/>
        </g>
      )}
    </svg>
  )
}
