import type { CSSProperties } from 'react';
import { LAYERS, SECTION_LAYER, type SectionId } from '../data/content';
import './LayerNav.css';

interface LayerNavProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

const LAYER_TARGET: SectionId[] = ['hero', 'experience', 'skills', 'contact'];

export default function LayerNav({ activeSection, onNavigate }: LayerNavProps) {
  const activeLayerIndex = SECTION_LAYER[activeSection] ?? 0;

  return (
    <div className="layer-nav">
      {LAYERS.map((layer, i) => (
        <button
          key={layer.id}
          className={`layer-dot ${activeLayerIndex === i ? 'active' : ''}`}
          style={{ '--dot-color': layer.color } as CSSProperties}
          onClick={() => onNavigate(LAYER_TARGET[i])}
          aria-label={`Jump to ${layer.name} layer`}
        >
          <span className="layer-tip">{layer.name}</span>
        </button>
      ))}
    </div>
  );
}
