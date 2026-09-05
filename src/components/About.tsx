import { ABOUT_FACTS, ABOUT_TEXT, LAYERS } from '../data/content';
import type { CSSProperties } from 'react';
import './About.css';

export default function About() {
  return (
    <section id="about">
      <p className="eyebrow" style={{ '--layer-color': LAYERS[0].color } as CSSProperties}>
        Interface layer — about
      </p>
      <h2 className="section-title">A developer who thinks in layers</h2>
      <div className="about-grid">
        <p className="about-text">{ABOUT_TEXT}</p>
        <div className="about-facts">
          {ABOUT_FACTS.map((fact) => (
            <div key={fact.label}>
              <p className="fact-label">{fact.label}</p>
              <p className="fact-value">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
