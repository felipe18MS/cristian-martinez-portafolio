import { Download, X } from 'lucide-react';
import { SECTION_IDS, type SectionId } from '../data/content';
import cvUrl from '../assets/cv.pdf?url';
import './MobileMenu.css';

interface MobileMenuProps {
  onNavigate: (id: SectionId) => void;
  onClose: () => void;
}

const NAV_IDS = SECTION_IDS.filter((id) => id !== 'hero');

export default function MobileMenu({ onNavigate, onClose }: MobileMenuProps) {
  return (
    <div className="mobile-menu">
      <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
        <X size={26} />
      </button>
      {NAV_IDS.map((id) => (
        <button key={id} className="mobile-menu-link" onClick={() => onNavigate(id)}>
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </button>
      ))}
      <a className="btn btn-lg" href={cvUrl} download="Cristian_Martinez_CV.pdf">
        <Download size={16} /> Download résumé
      </a>
    </div>
  );
}
