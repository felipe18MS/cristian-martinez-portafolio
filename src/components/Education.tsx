import type { CSSProperties } from 'react';
import { EDUCATION, LAYERS } from '../data/content';
import './Education.css';

export default function Education() {
  return (
    <section id="education">
      <p className="eyebrow" style={{ '--layer-color': LAYERS[3].color } as CSSProperties}>
        Foundation — education
      </p>
      <h2 className="section-title">What it's built on</h2>
      <div className="timeline">
        {EDUCATION.map((ed, i) => (
          <div className="tl-item" key={ed.school}>
            <span className="tl-year">{ed.year}</span>
            <div className="tl-dot-col">
              <span className="tl-dot" />
              {i < EDUCATION.length - 1 && <span className="tl-line" />}
            </div>
            <div>
              <p className="tl-school">{ed.school}</p>
              <p className="tl-degree">{ed.degree}</p>
              <p className="tl-place">{ed.place}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
