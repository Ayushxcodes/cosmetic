import CtaSection from '@/components/Landing/CtaSection'
import FounderSection from '@/components/Landing/FounderSection'
import VeluraHero from '@/components/Landing/HeroSection'
import MarqueeSection from '@/components/Landing/MarqueeSection'
import PhilosophySection from '@/components/Landing/PhilosophySection'
import ProductsSection from '@/components/Landing/ProductsSection'
import React from 'react'

const Homepage = () => {
  return (
    <div>
      <VeluraHero />
      <MarqueeSection />
      <PhilosophySection />
    </div>
  )
}

export default Homepage