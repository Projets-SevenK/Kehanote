import React from 'react'

function HomeIcon({ active }) {
  const col = active ? 'var(--rose-600)' : 'var(--ink-500)'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-6h-6v6H5a2 2 0 01-2-2v-9z"
        stroke={col} strokeWidth="1.8" strokeLinejoin="round"
        fill={active ? col : 'none'} fillOpacity={active ? 0.15 : 0}/>
    </svg>
  )
}

function CardsIcon({ active }) {
  const col = active ? 'var(--rose-600)' : 'var(--ink-500)'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="14" height="12" rx="3"
        stroke={col} strokeWidth="1.8"
        fill={active ? col : 'none'} fillOpacity={active ? 0.15 : 0}/>
      <rect x="7" y="3" width="14" height="12" rx="3" stroke={col} strokeWidth="1.8" fill="white"/>
    </svg>
  )
}

function UserIcon({ active }) {
  const col = active ? 'var(--rose-600)' : 'var(--ink-500)'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={col} strokeWidth="1.8"
        fill={active ? col : 'none'} fillOpacity={active ? 0.15 : 0}/>
      <path d="M4 21c0-4.5 3.5-8 8-8s8 3.5 8 8" stroke={col} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

const TABS = [
  { id: 'home',    label: 'Accueil', Icon: HomeIcon  },
  { id: 'cards',   label: 'Cartes',  Icon: CardsIcon },
  { id: 'profile', label: 'Profil',  Icon: UserIcon  },
]

export function Nav({ tab, onTab }) {
  return (
    <div className="kn-tabbar">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`kn-tab tap${tab === id ? ' active' : ''}`}
          onClick={() => onTab(id)}
        >
          <Icon active={tab === id} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
