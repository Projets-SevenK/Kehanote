import React from 'react'

const TABS = [
  {
    name: 'home', label: 'Accueil',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--rose-500)' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    name: 'profile', label: 'Profil',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--rose-500)' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export function Nav({ route, go }) {
  return (
    <div className="kn-tabbar">
      {TABS.map(tab => {
        const active = route.name === tab.name
        return (
          <button
            key={tab.name}
            className={`kn-tab tap${active ? ' active' : ''}`}
            onClick={() => go({ name: tab.name })}
          >
            {tab.icon(active)}
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
