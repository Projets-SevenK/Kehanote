import React, { useState } from 'react'
import { Onboarding } from './screens/Onboarding'
import { Home }       from './screens/Home'
import { SubjectHub } from './screens/SubjectHub'
import { Concentre }  from './screens/Concentre'
import { Flashcards } from './screens/Flashcards'
import { Challenge }    from './screens/Challenge'
import { ChapterHub }   from './screens/ChapterHub'
import { QRCPractice }  from './screens/QRCPractice'
import { Panic }        from './screens/Panic'
import { Reward }       from './screens/Reward'
import { Profile }      from './screens/Profile'
import { AllCards }     from './screens/AllCards'

export default function App() {
  const [route, setRoute] = useState({ name: 'onboarding' })
  const [tab, setTab]     = useState('home')

  function go(newRoute) { setRoute(newRoute) }

  // Screens that live outside the tab shell
  const MODAL_SCREENS = { onboarding: Onboarding, subjectHub: SubjectHub, chapterHub: ChapterHub, concentre: Concentre, flashcards: Flashcards, challenge: Challenge, qrcPractice: QRCPractice, panic: Panic, reward: Reward }

  if (route.name !== 'home') {
    const Screen = MODAL_SCREENS[route.name]
    if (Screen) return <Screen key={route.name + (route.subject?.id ?? '') + (route.chapter?.id ?? '')} route={route} go={go} />
  }

  // Tab shell (home / cards / profile)
  if (tab === 'cards')   return <AllCards key="cards"   route={{ name: 'cards' }}   go={go} tab={tab} onTab={setTab} />
  if (tab === 'profile') return <Profile  key="profile" route={{ name: 'profile' }} go={go} tab={tab} onTab={setTab} />
  return <Home key="home" route={{ name: 'home' }} go={go} tab={tab} onTab={setTab} />
}
