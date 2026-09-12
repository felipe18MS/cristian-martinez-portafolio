import { ArrowDown, ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { PROFILE } from '../data/content';
import profileImg from '../assets/profile.png';
import cvUrl from '../assets/cv.pdf?url';
import './Hero.css';

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-photo" aria-label="Profile photo">
        <div className="hero-photo-status">SYS // ONLINE</div>
        <div className="hero-photo-frame">
          <img src={profileImg} alt={PROFILE.name} />
          <span className="hud-corner tl" /><span className="hud-corner tr" /><span className="hud-corner bl" /><span className="hud-corner br" />
        </div>
        <div className="hero-photo-caption">DEV_ID: CM-01 / CO</div>
      </div>

      <div className="hero-inner">
        <div className="hero-system-line"><span /> AVAILABLE FOR OPPORTUNITIES INMEDIATELY <span /></div>
        <p className="hero-eyebrow">{PROFILE.role}</p>
        <h1 className="hero-name" aria-label="Cristian Felipe Martínez Sánchez"><span>Cristian Felipe</span>
        <br /> Martínez Sánchez</h1>
        <p className="hero-role">{PROFILE.tagline}</p>
        <div className="hero-actions">
          <button className="btn btn-lg" onClick={() => scrollTo('experience')}>Explore profile <ArrowRight size={15} /></button>
          <a className="btn btn-lg btn-secondary" href={cvUrl} download="Cristian_Martinez_CV.pdf"><Download size={15} /> CV / Resume</a>
        </div>
        <div className="hero-meta">
          <span><MapPin size={14} /> {PROFILE.location}</span>
          <a href={`mailto:${PROFILE.email}`}><Mail size={14} /> {PROFILE.email}</a>
        </div>
      </div>
      <button className="scroll-cue" onClick={() => scrollTo('about')} aria-label="Scroll to about section"><span>SCROLL / 01</span><ArrowDown size={14} /></button>
    </section>
  );
}
