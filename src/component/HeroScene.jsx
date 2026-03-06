"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, OrbitControls, Text, useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const EARTH_DAY_MAP = "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL_MAP = "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg";
const EARTH_SPECULAR_MAP = "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg";
const EARTH_NIGHT_MAP = "https://threejs.org/examples/textures/planets/earth_lights_2048.png";
const EARTH_CLOUD_MAP = "https://threejs.org/examples/textures/planets/earth_clouds_1024.png";
const MOON_MAP = "https://threejs.org/examples/textures/planets/moon_1024.jpg";

const EARTH_SPIN_SPEED = 0.3;
const CLOUD_SPIN_SPEED = EARTH_SPIN_SPEED * 1.2;
const ATMOSPHERE_SPIN_SPEED = EARTH_SPIN_SPEED * 0.8;
const MOON_ORBIT_SPEED = EARTH_SPIN_SPEED * 4;
const MOON_SELF_SPIN_SPEED = EARTH_SPIN_SPEED * 1.5;

function Earth() {
  const earthRef = useRef(null);
  const cloudRef = useRef(null);
  const atmosphereRef = useRef(null);
  const lightsRef = useRef(null);
  const moonOrbitRef = useRef(null);
  const moonRef = useRef(null);
  const moonTrailRef = useRef(null);
  const moonTrailLightRef = useRef(null);
  const markerRef = useRef(null);
  const markerHeadRef = useRef(null);
  const pulseRingRef = useRef(null);

  const [dayMap, normalMap, specularMap, nightMap, cloudMap, moonMap] = useTexture([
    EARTH_DAY_MAP,
    EARTH_NORMAL_MAP,
    EARTH_SPECULAR_MAP,
    EARTH_NIGHT_MAP,
    EARTH_CLOUD_MAP,
    MOON_MAP,
  ]);

  const { dayTex, normalTex, specularTex, nightTex, cloudTex, moonTex } = useMemo(() => {
    const nextDay = dayMap.clone();
    const nextNormal = normalMap.clone();
    const nextSpecular = specularMap.clone();
    const nextNight = nightMap.clone();
    const nextCloud = cloudMap.clone();
    const nextMoon = moonMap.clone();

    nextDay.colorSpace = THREE.SRGBColorSpace;
    nextNight.colorSpace = THREE.SRGBColorSpace;
    nextCloud.colorSpace = THREE.SRGBColorSpace;
    nextMoon.colorSpace = THREE.SRGBColorSpace;

    [nextDay, nextNormal, nextSpecular, nextNight, nextCloud, nextMoon].forEach((tex) => {
      tex.anisotropy = 8;
      tex.needsUpdate = true;
    });

    return {
      dayTex: nextDay,
      normalTex: nextNormal,
      specularTex: nextSpecular,
      nightTex: nextNight,
      cloudTex: nextCloud,
      moonTex: nextMoon,
    };
  }, [dayMap, normalMap, specularMap, nightMap, cloudMap, moonMap]);

  const sunDirection = useMemo(() => new THREE.Vector3(4, 2, 4).normalize(), []);
  const bangladeshMarker = useMemo(() => {
    const radius = 1.36;
    const lat = 23.685;
    const lon = 90.3563;
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon + 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    const normal = new THREE.Vector3(x, y, z).normalize();
    const position = normal.clone().multiplyScalar(radius + 0.065);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

    return { position, quaternion, normal };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (earthRef.current) earthRef.current.rotation.y += delta * EARTH_SPIN_SPEED;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * CLOUD_SPIN_SPEED;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y += delta * ATMOSPHERE_SPIN_SPEED;
    if (lightsRef.current) lightsRef.current.rotation.y += delta * EARTH_SPIN_SPEED;
    if (moonOrbitRef.current) moonOrbitRef.current.rotation.y += delta * MOON_ORBIT_SPEED;
    if (moonRef.current) moonRef.current.rotation.y += delta * MOON_SELF_SPIN_SPEED;
    if (moonTrailRef.current) {
      const pulse = 1 + Math.sin(t * 8) * 0.15;
      moonTrailRef.current.scale.set(pulse, pulse, pulse);
      moonTrailRef.current.material.opacity = 0.62 + Math.sin(t * 8) * 0.18;
    }
    if (moonTrailLightRef.current) {
      moonTrailLightRef.current.intensity = 1.35 + Math.sin(t * 8) * 0.45;
    }

    if (markerRef.current) {
      const bob = Math.sin(t * 2.5) * 0.015;
      markerRef.current.position.copy(bangladeshMarker.position).addScaledVector(bangladeshMarker.normal, bob);
      markerRef.current.quaternion.copy(bangladeshMarker.quaternion);
    }

    if (pulseRingRef.current) {
      const pulse = (Math.sin(t * 3.6) + 1) * 0.5;
      const scale = 1 + pulse * 0.75;
      pulseRingRef.current.scale.set(scale, scale, scale);
      pulseRingRef.current.material.opacity = 0.85 - pulse * 0.65;
    }

    if (markerHeadRef.current) {
      markerHeadRef.current.material.emissiveIntensity = 0.65 + Math.sin(t * 3.4) * 0.25;
    }
  });

  return (
    <group rotation={[-0.2, 0, 0]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.36, 128, 128]} />
        <meshPhongMaterial
          map={dayTex}
          normalMap={normalTex}
          normalScale={new THREE.Vector2(0.55, 0.55)}
          specularMap={specularTex}
          specular={new THREE.Color("#3f6ea4")}
          shininess={18}
        />

        <group ref={markerRef} position={bangladeshMarker.position} quaternion={bangladeshMarker.quaternion}>
          <mesh position={[0, 0.045, 0]}>
            <coneGeometry args={[0.03, 0.1, 20]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0c4a6e" emissiveIntensity={0.5} />
          </mesh>
          <mesh ref={markerHeadRef} position={[0, 0.105, 0]}>
            <sphereGeometry args={[0.028, 20, 20]} />
            <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.65} />
          </mesh>
          <mesh ref={pulseRingRef} position={[0, 0.012, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.045, 0.004, 12, 32]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.8} />
          </mesh>
          <Billboard position={[0, 0.2, 0]} follow>
            <Text
              fontSize={0.055}
              color="#e0f2fe"
              outlineColor="#0f172a"
              outlineWidth={0.01}
              anchorX="center"
              anchorY="middle"
            >
              Bangladesh
            </Text>
          </Billboard>
          <pointLight color="#60a5fa" intensity={0.55} distance={0.45} decay={2} position={[0, 0.09, 0]} />
        </group>
      </mesh>

      <mesh ref={lightsRef} scale={1.003}>
        <sphereGeometry args={[1.36, 128, 128]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uNightMap: { value: nightTex },
            uLightDir: { value: sunDirection },
          }}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vWorldNormal;
            void main() {
              vUv = uv;
              vWorldNormal = normalize(mat3(modelMatrix) * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform sampler2D uNightMap;
            uniform vec3 uLightDir;
            varying vec2 vUv;
            varying vec3 vWorldNormal;
            void main() {
              vec3 normal = normalize(vWorldNormal);
              float day = max(dot(normal, normalize(uLightDir)), 0.0);
              float nightMask = pow(1.0 - day, 1.8);
              vec3 city = texture2D(uNightMap, vUv).rgb;
              vec3 color = city * nightMask * 1.35;
              float alpha = max(max(city.r, city.g), city.b) * nightMask;
              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </mesh>

      <mesh ref={cloudRef} scale={1.015}>
        <sphereGeometry args={[1.36, 128, 128]} />
        <meshPhongMaterial map={cloudTex} transparent opacity={0.42} depthWrite={false} />
      </mesh>

      <mesh ref={atmosphereRef} scale={1.08}>
        <sphereGeometry args={[1.36, 128, 128]} />
        <meshBasicMaterial
          color="#78b6ff"
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <group ref={moonOrbitRef}>
        <group position={[2.3, 0.22, 0]}>
          <mesh ref={moonRef}>
            <sphereGeometry args={[0.28, 64, 64]} />
            <meshStandardMaterial map={moonTex} roughness={0.9} metalness={0.03} />
          </mesh>

          <mesh ref={moonTrailRef} position={[0, 0, 0.3]}>
            <sphereGeometry args={[0.11, 22, 22]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.62} />
          </mesh>
          <mesh position={[0, 0, 0.5]}>
            <sphereGeometry args={[0.085, 20, 20]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.72]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.25} />
          </mesh>
          <mesh position={[0, 0, 0.95]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.14} />
          </mesh>
          <pointLight
            ref={moonTrailLightRef}
            color="#7dd3fc"
            intensity={1.35}
            distance={1.8}
            decay={2}
            position={[0, 0, 0.36]}
          />
        </group>
      </group>
    </group>
  );
}

function Stars() {
  const starsRef = useRef(null);

  const positions = useMemo(() => {
    const list = [];
    for (let i = 0; i < 1000; i++) {
      const t = i * 0.61803398875;
      const y = 1 - (i / 999) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = t * Math.PI * 2;
      const radius = 6 + (i % 29) * 0.16;
      list.push(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius);
    }
    return new Float32Array(list);
  }, []);

  useFrame((_, delta) => {
    if (!starsRef.current) return;
    starsRef.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#dbeafe" size={0.03} transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="h-[320px] md:h-[390px] rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden shadow-sm">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.17} />
        <directionalLight position={[4, 2, 4]} intensity={1.5} color="#f8fbff" />
        <pointLight position={[-3, -2, -2]} intensity={0.3} color="#2b69d1" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.75}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
        />
        <Stars />
        <Earth />
      </Canvas>
    </div>
  );
}
