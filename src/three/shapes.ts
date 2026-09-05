import * as THREE from 'three';

const stdMat = (hex: number, opacity = 0.9) =>
  new THREE.MeshStandardMaterial({ color: hex, metalness: 0.2, roughness: 0.4, transparent: true, opacity, flatShading: true });

const lineMat = (hex: number, opacity = 0.6) =>
  new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity });

/** A "</>" style code-bracket node — two angled strokes meeting like a chevron. */
export function createBracketNode(hex: number, scale = 1): THREE.Group {
  const group = new THREE.Group();
  const mat = stdMat(hex);
  const barGeo = new THREE.BoxGeometry(0.09, 0.62, 0.09);

  const left = new THREE.Group();
  const l1 = new THREE.Mesh(barGeo, mat);
  l1.rotation.z = Math.PI / 5;
  l1.position.y = 0.15;
  const l2 = new THREE.Mesh(barGeo, mat);
  l2.rotation.z = -Math.PI / 5;
  l2.position.y = -0.15;
  left.add(l1, l2);
  left.position.x = -0.32;
  group.add(left);

  const right = left.clone();
  right.position.x = 0.32;
  right.rotation.y = Math.PI;
  group.add(right);

  group.scale.setScalar(scale);
  return group;
}

/** A network/API node — a ring with a glowing hub, like a connection point. */
export function createRingNode(hex: number, scale = 1): THREE.Group {
  const group = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 10, 28), stdMat(hex));
  ring.rotation.x = Math.PI / 2.4;
  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), stdMat(hex, 1));
  group.add(ring, hub);
  group.scale.setScalar(scale);
  return group;
}

/** A stacked-cylinder database node, the universal DB icon. */
export function createDbStackNode(hex: number, scale = 1): THREE.Group {
  const group = new THREE.Group();
  const mat = stdMat(hex);
  const disk = () => new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.1, 20), mat);
  [0.24, 0.02, -0.2].forEach((y) => {
    const d = disk();
    d.position.y = y;
    group.add(d);
  });
  group.scale.setScalar(scale);
  return group;
}

/** A server-rack node — a chassis box with rack-slot accent lines. */
export function createServerNode(hex: number, scale = 1): THREE.Group {
  const group = new THREE.Group();
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.62, 0.36), stdMat(hex, 0.55));
  group.add(chassis);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(chassis.geometry), lineMat(hex, 0.8));
  group.add(edges);
  for (let i = 0; i < 3; i++) {
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.02), stdMat(hex, 1));
    led.position.set(0.18, 0.2 - i * 0.18, 0.19);
    group.add(led);
  }
  group.scale.setScalar(scale);
  return group;
}

const SHAPE_FACTORIES = {
  bracket: createBracketNode,
  ring: createRingNode,
  dbstack: createDbStackNode,
  server: createServerNode,
} as const;

export type ShapeKind = keyof typeof SHAPE_FACTORIES;

export function createTechNode(kind: ShapeKind, hex: number, scale = 1): THREE.Group {
  return SHAPE_FACTORIES[kind](hex, scale);
}

/** Procedural right-angle "circuit trace" polylines scattered across a layer, PCB-board style. */
export function createCircuitTraces(hex: number, extent: number, count: number): THREE.Group {
  const group = new THREE.Group();
  const mat = lineMat(hex, 0.22);

  for (let i = 0; i < count; i++) {
    const startX = (Math.random() - 0.5) * extent;
    const startZ = (Math.random() - 0.5) * extent;
    const points: THREE.Vector3[] = [new THREE.Vector3(startX, 0.01, startZ)];
    const segments = 2 + Math.floor(Math.random() * 2);
    let x = startX;
    let z = startZ;
    for (let s = 0; s < segments; s++) {
      if (s % 2 === 0) x += (Math.random() - 0.5) * 3.2;
      else z += (Math.random() - 0.5) * 3.2;
      points.push(new THREE.Vector3(x, 0.01, z));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    group.add(new THREE.Line(geo, mat));

    // small "via" dot at the trace's end, like a solder pad
    const via = new THREE.Mesh(new THREE.CircleGeometry(0.05, 8), new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.5 }));
    via.rotation.x = -Math.PI / 2;
    via.position.set(x, 0.012, z);
    group.add(via);
  }

  return group;
}

/** A soft radial-gradient sprite used as a cheap glow behind bright nodes. */
export function createGlowSprite(hex: number, size = 2.2): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const color = new THREE.Color(hex);
  const rgb = `${Math.round(color.r * 255)},${Math.round(color.g * 255)},${Math.round(color.b * 255)}`;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, `rgba(${rgb},0.55)`);
  gradient.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(size, size, 1);
  return sprite;
}
