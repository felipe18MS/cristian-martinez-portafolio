import type { CSSProperties } from 'react';
import { LAYERS, SKILL_GROUPS } from '../data/content';
import './Skills.css';

export default function Skills() {
  return (
    <section id="skills">
      <p className="eyebrow" style={{ '--layer-color': LAYERS[2].color } as CSSProperties}>
        Data layer — skills
      </p>
      <h2 className="section-title">The stack, grouped the way I build with it</h2>
      <div className="skills-grid">
        {SKILL_GROUPS.map((group) => (
          <div className="skill-card" key={group.title} style={{ '--card-color': group.color } as CSSProperties}>
            <h3>{group.title}</h3>
            <div className="tag-list">
              {group.items.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
