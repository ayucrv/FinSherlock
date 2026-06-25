import Navbar from '@/components/Landing/Navbar'
import Hero from '@/components/Landing/Hero'
import Features from '@/components/Landing/Features'
import HowItWorks from '@/components/Landing/HowItWorks'
import InvestigationProcess from '@/components/Landing/InvestigationProcess'
import CaseFiles from '@/components/Landing/CaseFiles'
import SupportedReports from '@/components/Landing/SupportedReports'
import Stats from '@/components/Landing/Stats'
import SherryStory from '@/components/Landing/SherryStory'
import FAQ from '@/components/Landing/FAQ'
import Footer from '@/components/Landing/Footer'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'

export default function Home() {
  return (
    <main className="relative">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <InvestigationProcess />
      <CaseFiles />
      <SupportedReports />
      <Stats />
      <SherryStory /> 
      <FAQ />
      <Footer />
    </main>
  )
}