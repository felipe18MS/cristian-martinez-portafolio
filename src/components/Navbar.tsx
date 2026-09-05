import { Download, Menu } from 'lucide-react';
import { SECTION_IDS, type SectionId } from '../data/content';
import cvUrl from '../assets/cv.pdf?url';
import './Navbar.css';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  onOpenMenu: () => void;
}

const NAV_IDS = SECTION_IDS.filter((id) => id !== 'hero');

export default function Navbar({ activeSection, onNavigate, onOpenMenu }: NavbarProps) {
  return (
    <nav className="navbar">
      <button className="navbar-mark" onClick={() => onNavigate('hero')}>
        C<span>·</span>M
      </button>

      <div className="navbar-links">
        {NAV_IDS.map((id) => (
          <button
            key={id}
            className={`navbar-link ${activeSection === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
        <a className="btn" href={cvUrl} download="Cristian_Martinez_CV.pdf">
          <Download size={15} /> Resume
        </a>
      </div>

      <button className="navbar-menu-btn" onClick={onOpenMenu} aria-label="Open menu">
        <Menu size={24} />
      </button>
    </nav>
  );
}
