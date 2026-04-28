import React, { useEffect, useState } from 'react'
import { Mascot } from '../components/Mascot'

function Confetti() {
  const pieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.2,
    color: ['var(--rose-400)', 'var(--lav)', 'var(--peach)', 'var(--gold)', 'var(--sage)'][i % 5],
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute', top: -20, left: `${p.left}%`,
          width: 10, height: 10, borderRadius: 2,
          background: p.color,
          animation: `confetti-fall 2.5s ${p.delay}s ease-in forwards`,
        }} />
      ))}
    </div>
  )
}

export function Reward({ route, go }) {
  const { subject, score = 100 } = route
  const mood = score >= 80 ? 'hooray' : score >= 50 ? 'happy' : 'sad'
  const msg = score >= 80 ? 'Excellent travail ! 🎉' : score >= 50 ? 'Pas mal du tout !' : 'Continue, tu vas y arriver !'

  return (
    <div className="kn-screen screen-anim" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 24, textAlign: 'center' }}>
      <Confetti />
      <Mascot mood={mood} size={100} className="float" />
      <div>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'var(--f-display)', fontSize: 32 }}>{score}%</h2>
        <p style={{ margin: 0, color: 'var(--ink-500)', fontSize: 16 }}>{msg}</p>
      </div>
      <button className="btn-primary" style={{ width: '100%' }} onClick={() => go({ name: 'home' })}>
        Retour à l'accueil
      </button>
      <button className="btn-ghost" style={{ width: '100%' }} onClick={() => go({ name: 'subjectHub', subject })}>
        Réessayer
      </button>
    </div>
  )
}
