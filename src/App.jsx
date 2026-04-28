import React, { useState } from 'react'
import { Onboarding } from './screens/Onboarding'
import { Home }       from './screens/Home'
import { SubjectHub } from './screens/SubjectHub'
import { Concentre }  from './screens/Concentre'
import { Flashcards } from './screens/Flashcards'
import { Challenge }  from './screens/Challenge'
import { Panic }      from './screens/Panic'
import { Reward }     from './screens/Reward'
import { Profile }    from './screens/Profile'
import { AllCards }   from './screens/AllCards'

const SCREENS = {
  onboarding: Onboarding,
  home:       Home,
  subjectHub: SubjectHub,
  concentre:  Concentre,
  flashcards: Flashcards,
  challenge:  Challenge,
  panic:      Panic,
  reward:     Reward,
  profile:    Profile,
  allCards:   AllCards,
}

export default function App() {
  const [route, setRoute] = useState({ name: 'onboarding' })

  function go(newRoute) {
    setRoute(newRoute)
  }

  const Screen = SCREENS[route.name] ?? Home

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <Screen key={route.name} route={route} go={go} />
    </div>
  )
}
