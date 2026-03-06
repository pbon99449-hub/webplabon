"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function ParticleField({
  count = 900,
  color = "#60a5fa",
  size = 0.045,
  opacity = 0.5,
  radiusBase = 3.8,
  radiusStep = 0.12,
  speedY = 0.025,
  speedX = 0.1,
  zOffset = 0,
}) {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    const golden = 2.399963229728653;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = 1 - t * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * golden;
      const spread = radiusBase + (i % 17) * radiusStep;

      values[i * 3] = Math.cos(theta) * radius * spread;
      values[i * 3 + 1] = y * spread;
      values[i * 3 + 2] = Math.sin(theta) * radius * spread + zOffset;
    }

    return values;
  }, [count, radiusBase, radiusStep, zOffset]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * speedY;
    pointsRef.current.rotation.x = Math.sin(t * speedX) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function SceneLayer({ isMobile, reducedMotion, pointerRef }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const motionScale = reducedMotion ? 0.15 : 1;
    const px = pointerRef.current.x * 0.24 * motionScale;
    const py = pointerRef.current.y * 0.16 * motionScale;

    groupRef.current.rotation.y = t * 0.01 * motionScale + px;
    groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.03 * motionScale + py;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, pointerRef.current.x * 0.22 * motionScale, 0.02);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, pointerRef.current.y * 0.18 * motionScale, 0.02);
  });

  const farCount = isMobile ? 520 : 900;
  const midCount = isMobile ? 280 : 480;
  const nearCount = isMobile ? 120 : 220;
  const speedFactor = reducedMotion ? 0.45 : 1;

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.55} />
      <ParticleField
        count={farCount}
        color="#60a5fa"
        size={isMobile ? 0.03 : 0.042}
        opacity={0.5}
        radiusBase={3.6}
        radiusStep={0.12}
        speedY={0.024 * speedFactor}
        speedX={0.11 * speedFactor}
        zOffset={-1.2}
      />
      <ParticleField
        count={midCount}
        color="#dbeafe"
        size={isMobile ? 0.022 : 0.028}
        opacity={0.72}
        radiusBase={4.4}
        radiusStep={0.16}
        speedY={0.012 * speedFactor}
        speedX={0.07 * speedFactor}
        zOffset={0.1}
      />
      <ParticleField
        count={nearCount}
        color="#a5f3fc"
        size={isMobile ? 0.018 : 0.022}
        opacity={0.35}
        radiusBase={2.8}
        radiusStep={0.1}
        speedY={0.03 * speedFactor}
        speedX={0.14 * speedFactor}
        zOffset={1.1}
      />
    </group>
  );
}

export default function ParticleBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMobile = () => setIsMobile(mobileQuery.matches);
    const updateMotion = () => setReducedMotion(motionQuery.matches);

    const onMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    updateMobile();
    updateMotion();
    mobileQuery.addEventListener("change", updateMobile);
    motionQuery.addEventListener("change", updateMotion);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      mobileQuery.removeEventListener("change", updateMobile);
      motionQuery.removeEventListener("change", updateMotion);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={isMobile ? [1, 1.3] : [1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SceneLayer isMobile={isMobile} reducedMotion={reducedMotion} pointerRef={pointerRef} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.10),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(250,204,21,0.08),transparent_40%),radial-gradient(circle_at_50%_85%,rgba(14,165,233,0.07),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_45%_55%,rgba(59,130,246,0.08),transparent_70%),radial-gradient(48%_44%_at_58%_38%,rgba(45,212,191,0.08),transparent_72%)] animate-aurora-shift" />
      <div className="absolute inset-x-[-10%] bottom-[-12%] h-[42%] opacity-50 animate-wave-drift">
        <svg viewBox="0 0 1600 420" className="h-full w-full" preserveAspectRatio="none">
          <path
            d="M0 225 C180 170 320 300 520 240 C710 180 860 110 1060 175 C1240 235 1410 325 1600 250 L1600 420 L0 420 Z"
            fill="rgba(37,99,235,0.18)"
          />
          <path
            d="M0 265 C170 320 360 170 560 225 C760 285 920 360 1150 300 C1320 255 1450 205 1600 245 L1600 420 L0 420 Z"
            fill="rgba(125,211,252,0.14)"
          />
        </svg>
      </div>
      <div className="absolute inset-x-[-8%] top-[14%] h-[26%] opacity-35 animate-wave-float">
        <svg viewBox="0 0 1600 300" className="h-full w-full" preserveAspectRatio="none">
          <path
            d="M0 165 C190 95 340 220 520 165 C710 110 905 55 1100 110 C1290 165 1430 240 1600 185 L1600 300 L0 300 Z"
            fill="rgba(56,189,248,0.12)"
          />
        </svg>
      </div>
    </div>
  );
}
