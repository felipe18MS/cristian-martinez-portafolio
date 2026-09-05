import * as THREE from 'three';
import { LAYERS } from '../data/content';
import { createTechNode, createCircuitTraces, createGlowSprite } from './shapes';

export interface SceneHandles {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  floaters: THREE.Object3D[];
  particles: THREE.Points;
  scanPlane: THREE.Mesh;
  topY: number;
  bottomY: number;
  dispose: () => void;
}

const BG = 0x03070d;

export function initScene(container: HTMLDivElement, isMobile: boolean): SceneHandles {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);
  scene.fog = new THREE.FogExp2(BG, 0.032);

  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, LAYERS[0].y + 7, isMobile ? 15 : 13);
  camera.lookAt(0, LAYERS[0].y, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(BG, 1);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
  dirLight.position.set(4, 10, 6);
  scene.add(dirLight);

  const nodeCount = isMobile ? 4 : 7;
  const floaters: THREE.Object3D[] = [];

  LAYERS.forEach((layer, li) => {
    const group = new THREE.Group();
    group.position.y = layer.y;

    const grid = new THREE.GridHelper(16, 16, layer.hex, layer.hex);
    const gridMat = grid.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = 0.22;
    group.add(grid);

    const wash = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.MeshBasicMaterial({ color: layer.hex, transparent: true, opacity: 0.035, side: THREE.DoubleSide })
    );
    wash.rotation.x = -Math.PI / 2;
    wash.position.y = -0.02;
    group.add(wash);

    // PCB-style circuit traces — the "futuristic tech" texture on each layer floor
    group.add(createCircuitTraces(layer.hex, 14, isMobile ? 5 : 9));

    // tech-shaped floating nodes specific to this layer (brackets / rings / db stacks / server racks)
    for (let i = 0; i < nodeCount; i++) {
      const node = createTechNode(layer.shape, layer.hex, 0.85 + Math.random() * 0.35);
      const angle = (i / nodeCount) * Math.PI * 2 + li;
      const radius = 3.4 + Math.random() * 3.2;
      node.position.set(Math.cos(angle) * radius, 0.6 + Math.random() * 1.3, Math.sin(angle) * radius);
      node.userData = { baseY: node.position.y, phase: Math.random() * Math.PI * 2, spin: 0.15 + Math.random() * 0.25 };
      group.add(node);
      floaters.push(node);

      if (i % 3 === 0) {
        const glow = createGlowSprite(layer.hex, 1.6);
        glow.position.copy(node.position);
        group.add(glow);
      }
    }

    scene.add(group);

    if (li < LAYERS.length - 1) {
      const nextY = LAYERS[li + 1].y;
      [[-5, -5], [5, -5], [-5, 5], [5, 5]].forEach(([x, z]) => {
        const points = [new THREE.Vector3(x, layer.y, z), new THREE.Vector3(x, nextY, z)];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: layer.hex, transparent: true, opacity: 0.18 });
        scene.add(new THREE.Line(geo, mat));
      });
    }
  });

  // ambient data-flow particles rising through the whole stack
  const particleCount = isMobile ? 220 : 420;
  const positions = new Float32Array(particleCount * 3);
  const topY = LAYERS[0].y + 4;
  const bottomY = LAYERS[LAYERS.length - 1].y - 4;
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = bottomY + Math.random() * (topY - bottomY);
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xdfe8f2, size: 0.045, transparent: true, opacity: 0.5 });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // holographic scan sweep — a single soft bright band that drifts through the stack
  const scanCanvas = document.createElement('canvas');
  scanCanvas.width = 4;
  scanCanvas.height = 128;
  const sctx = scanCanvas.getContext('2d')!;
  const grad = sctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, 'rgba(78,217,200,0)');
  grad.addColorStop(0.5, 'rgba(78,217,200,0.35)');
  grad.addColorStop(1, 'rgba(78,217,200,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 4, 128);
  const scanTexture = new THREE.CanvasTexture(scanCanvas);
  const scanPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 3),
    new THREE.MeshBasicMaterial({ map: scanTexture, transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false })
  );
  scanPlane.rotation.x = -Math.PI / 2;
  scene.add(scanPlane);

  const dispose = () => {
    renderer.dispose();
    if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
  };

  return { scene, camera, renderer, floaters, particles, scanPlane, topY, bottomY, dispose };
}
