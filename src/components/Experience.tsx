import type { CSSProperties } from 'react';
import { EXPERIENCE, LAYERS } from '../data/content';
import './Experience.css';

export default function Experience() {
  return (
    <section id="experience">
      <p className="eyebrow" style={{ '--layer-color': LAYERS[1].color } as CSSProperties}>
        Logic layer — experience
      </p>
      <h2 className="section-title">Where the code has shipped</h2>
      <div className="panel exp-panel">
        <div className="exp-header">
          <div>
            <p className="exp-role">{EXPERIENCE.role}</p>
            <p className="exp-company">{EXPERIENCE.company}</p>
          </div>
          <span className="exp-dates">{EXPERIENCE.dates}</span>
        </div>
        <ul className="exp-list">
          {EXPERIENCE.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
