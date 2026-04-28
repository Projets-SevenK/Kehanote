import React from 'react'

const MOODS = {
  happy: { eyeL: 'M8 10 Q10 7 12 10', eyeR: 'M18 10 Q20 7 22 10', mouth: 'M10 16 Q15 21 20 16', blush: true },
  wink:  { eyeL: 'M8 10 Q10 7 12 10', eyeR: 'M18 10 L22 10', mouth: 'M10 16 Q15 20 20 16', blush: false },
  sleepy:{ eyeL: 'M8 11 L12 11', eyeR: 'M18 11 L22 11', mouth: 'M11 17 Q15 19 19 17', blush: false },
  hooray:{ eyeL: 'M8 10 Q10 6 12 10', eyeR: 'M18 10 Q20 6 22 10', mouth: 'M9 15 Q15 22 21 15', blush: true },
  focus: { eyeL: 'M8 10 Q10 8 12 10', eyeR: 'M18 10 Q20 8 22 10', mouth: 'M11 17 L19 17', blush: false },
  blush: { eyeL: 'M8 10 Q10 7 12 10', eyeR: 'M18 10 Q20 7 22 10', mouth: 'M11 16 Q15 19 19 16', blush: true },
  sad:   { eyeL: 'M8 11 Q10 9 12 11', eyeR: 'M18 11 Q20 9 22 11', mouth: 'M10 19 Q15 15 20 19', blush: false },
}

export function Mascot({ mood = 'happy', size = 80, style = {} }) {
  const m = MOODS[mood] ?? MOODS.happy
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 30 30"
      style={{ display: 'block', ...style }}
    >
      {/* Body */}
      <ellipse cx="15" cy="17" rx="11" ry="10" fill="#FFDBE8" />
      {/* Head */}
      <circle cx="15" cy="13" r="10" fill="#FFF0F5" />
      {/* Ears */}
      <ellipse cx="7" cy="5" rx="3" ry="5" fill="#FFC8DC" />
      <ellipse cx="23" cy="5" rx="3" ry="5" fill="#FFC8DC" />
      <ellipse cx="7" cy="5" rx="1.8" ry="3.5" fill="#FFAACE" />
      <ellipse cx="23" cy="5" rx="1.8" ry="3.5" fill="#FFAACE" />
      {/* Eyes */}
      <path d={m.eyeL} stroke="#4A3441" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d={m.eyeR} stroke="#4A3441" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* Blush */}
      {m.blush && <>
        <ellipse cx="9"  cy="15" rx="2.5" ry="1.4" fill="#F590AB" opacity="0.4" />
        <ellipse cx="21" cy="15" rx="2.5" ry="1.4" fill="#F590AB" opacity="0.4" />
      </>}
      {/* Mouth */}
      <path d={m.mouth} stroke="#D9527A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}
