"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const CUSTOM_EARTH_MAP = "/image/hero-3d.avif";

function Earth() {
  const earthRef = useRef();
  const atmosphereRef = useRef();
  const customMap = useTexture(CUSTOM_EARTH_MAP);
  const earthTexture = useMemo(() => {
    const texture = customMap.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, [customMap]);

  // Atmosphere shader
  const atmosphereVertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const atmosphereFragmentShader = `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
      gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
    }
  `;

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.1}
          emissive="#000511"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Stars background */}
      <Stars />
    </group>
  );
}

function Stars() {
  const starsRef = useRef();
  const starPositions = useMemo(() => {
    const pseudoRandom = (seed) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const positions = [];
    for (let i = 0; i < 2000; i++) {
      const radius = 20 + pseudoRandom(i + 1) * 30;
      const theta = pseudoRandom(i + 101) * Math.PI * 2;
      const phi = Math.acos(2 * pseudoRandom(i + 1001) - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function EarthBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#000000"]} />
        
        {/* Ambient light */}
        <ambientLight intensity={0.15} />
        
        {/* Main directional light */}
        <directionalLight
          position={[5, 3, 5]}
          intensity={1.5}
          color="#b4c6d9"
        />
        
        {/* Blue rim light */}
        <pointLight position={[-5, 0, -5]} intensity={0.8} color="#4a90d9" />
        
        {/* Subtle fill light */}
        <pointLight position={[0, -3, 2]} intensity={0.3} color="#d94a4a" />

        <Earth />
      </Canvas>
    </div>
  );
}
