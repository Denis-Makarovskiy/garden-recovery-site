import { useEffect } from 'react'
import { initSmoothScroll } from './lib/scroll'
import LogoSprite from './components/LogoSprite'
import Header from './components/Header'
import Hero from './components/Hero'
import Compass from './components/Compass'
import Process from './components/Process'
import Programs from './components/Programs'
import Why from './components/Why'
import Team from './components/Team'
import Contacts from './components/Contacts'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const lenis = initSmoothScroll()
    return () => {
      lenis?.destroy()
    }
  }, [])

  return (
    <>
      <LogoSprite />
      <Header />
      <Hero />
      <Compass />
      <Process />
      <Programs />
      <Why />
      <Team />
      <Contacts />
      <Footer />
    </>
  )
}
