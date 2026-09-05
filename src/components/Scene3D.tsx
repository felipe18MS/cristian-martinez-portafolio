import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { LAYERS } from '../data/content';
import { initScene, type SceneHandles } from '../three/scene';
import { useScrollProgressRef } from '../hooks/useScrollProgressRef';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Scene3D.css';

export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneHandles | null>(null);
  const mouseRef = useRef({ x: 0 });
  const introRef = useRef({ t: 0, done: false });
  const scrollProgressRef = useScrollProgressRef();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const handles = initScene(container, isMobile);
    sceneRef.current = handles;
    introRef.current = { t: reducedMotion ? 1 : 0, done: reducedMotion };

    const clock = new THREE.Clock();
    let rafId: number;

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      handles.camera.aspect = w / h;
      handles.camera.updateProjectionMatrix();
      handles.renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const { camera, floaters, particles, scanPlane, topY, bottomY, renderer, scene } = handles;

      if (!introRef.current.done) {
        introRef.current.t = Math.min(1, introRef.current.t + 0.008);
        if (introRef.current.t >= 1) introRef.current.done = true;
      }
      const ease = 1 - Math.pow(1 - introRef.current.t, 3);

      const p = scrollProgressRef.current;
      const targetY = LAYERS[0].y - p * (LAYERS[0].y - LAYERS[LAYERS.length - 1].y);
      const bob = reducedMotion ? 0 : Math.sin(t * 0.5) * 0.12;
      const introOffsetY = (1 - ease) * 5;
      camera.position.y = targetY + bob + introOffsetY;

      const parallaxX = reducedMotion ? 0 : mouseRef.current.x * 0.6;
      camera.position.x += (parallaxX - camera.position.x) * 0.04;
      const baseZ = (window.innerWidth < 768 ? 15 : 13) + (1 - ease) * 6;
      camera.position.z += (baseZ - camera.position.z) * 0.05;
      camera.lookAt(0, targetY - 1.5, 0);

      if (!reducedMotion) {
        floaters.forEach((m) => {
          const y = m.userData.baseY as number;
          const phase = m.userData.phase as number;
          const spin = m.userData.spin as number;
          m.position.y = y + Math.sin(t * spin + phase) * 0.3;
          m.rotation.y += 0.004;
          m.rotation.x += 0.001;
        });

        const pos = particles.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < pos.count; i++) {
          let y = pos.getY(i) + 0.01;
          if (y > topY) y = bottomY;
          pos.setY(i, y);
        }
        pos.needsUpdate = true;

        // scan sweep drifts slowly through the full stack, wraps around
        const span = topY - bottomY;
        const cycle = 0.045;
        scanPlane.position.y = bottomY + (((t * cycle) % 1) * span);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      handles.dispose();
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return <div className="scene3d-mount" ref={mountRef} aria-hidden="true" />;
}
