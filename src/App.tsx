import { useState } from 'react';
import Scene3D from './components/Scene3D';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import LayerNav from './components/LayerNav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SECTION_IDS, type SectionId } from './data/content';
import { useActiveSection } from './hooks/useActiveSection';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection<SectionId>(SECTION_IDS);

  const navigate = (id: SectionId) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="portfolio-root">
      <Scene3D />
      <LayerNav activeSection={activeSection} onNavigate={navigate} />
      <Navbar activeSection={activeSection} onNavigate={navigate} onOpenMenu={() => setMenuOpen(true)} />
      {menuOpen && <MobileMenu onNavigate={navigate} onClose={() => setMenuOpen(false)} />}

      <main className="page">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
