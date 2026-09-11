import type { CSSProperties } from 'react';
import { Download, Mail, Phone } from 'lucide-react';
import { LAYERS, PROFILE } from '../data/content';
import cvUrl from '../assets/cv.pdf?url';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contact">
      <p className="eyebrow" style={{ '--layer-color': LAYERS[3].color } as CSSProperties}>
        Get in touch
      </p>
      <h2 className="section-title">Let's build something layered</h2>
      <div className="panel contact-grid">
        <div>
          <div className="contact-list">
            <a href={`mailto:${PROFILE.email}`}>
              <Mail size={16} /> {PROFILE.email}
            </a>
            <a href={`tel:${PROFILE.phoneHref}`}>
              <Phone size={16} /> {PROFILE.phone}
            </a>
            
          </div>
          <p className="contact-note">References available upon request.</p>
        </div>
        <a className="btn btn-lg" href={cvUrl} download="Cristian_Martinez_CV.pdf">
          <Download size={17} /> Download résumé (PDF)
        </a>
      </div>
    </section>
  );
}
