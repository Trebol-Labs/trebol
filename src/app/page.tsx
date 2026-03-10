import Hero from '@/components/sections/Hero'
import HumbleStrip from '@/components/sections/HumbleStrip'
import Services from '@/components/sections/Services'
import ProjectShowcase from '@/components/sections/ProjectShowcase'
import Manifesto from '@/components/sections/Manifesto'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <HumbleStrip />
      <Services />
      <ProjectShowcase />
      <Manifesto />
      <Contact />
    </main>
  )
}
