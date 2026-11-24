import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type PointData = { positions: Float32Array; colors: Float32Array };

function random(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function makeParticleTree(): PointData {
  const positions: number[] = [];
  const colors: number[] = [];
  let seed = 1;

  const addPoint = (x: number, y: number, z: number, brightness = 1) => {
    const variation = random(seed++);
    positions.push(x, y, z);
    colors.push(
      0.16 + variation * 0.20 * brightness,
      0.48 + variation * 0.31 * brightness,
      0.82 + variation * 0.18 * brightness
    );
  };

  // Main trunk: a dense, gently winding column of light.
  for (let i = 0; i < 3600; i++) {
    const t = random(seed++);
    const y = -1.72 + t * 2.58;
    const radius = 0.025 + random(seed++) * 0.075;
    const angle = random(seed++) * Math.PI * 2;
    addPoint(Math.cos(angle) * radius + Math.sin(y * 2.1) * 0.025, y, Math.sin(angle) * radius, 0.82);
  }

  // Repeating limbs build the recognizable branching silhouette.
  for (let level = 0; level < 7; level++) {
    const y = -1.02 + level * 0.37;
    const reach = 0.46 + level * 0.105;
    const rise = 0.25 + level * 0.025;

    for (const side of [-1, 1]) {
      const start = new THREE.Vector3(0, y, 0);
      const middle = new THREE.Vector3(side * reach * 0.48, y + rise * 0.48, 0.015);
      const end = new THREE.Vector3(side * reach, y + rise, 0.02);

      for (let i = 0; i < 560; i++) {
        const t = random(seed++);
        const oneMinus = 1 - t;
        const curve = start.clone().multiplyScalar(oneMinus * oneMinus)
          .add(middle.clone().multiplyScalar(2 * oneMinus * t))
          .add(end.clone().multiplyScalar(t * t));
        const spread = 0.025 + 0.055 * t;
        addPoint(
          curve.x + (random(seed++) - 0.5) * spread,
          curve.y + (random(seed++) - 0.5) * spread,
          curve.z + (random(seed++) - 0.5) * spread * 1.6,
          0.92
        );
      }

      // Smaller offshoots create a fine, tree-like branching edge.
      for (let twig = 0; twig < 3; twig++) {
        const originT = 0.36 + twig * 0.18;
        const origin = start.clone().lerp(end, originT);
        const twigEnd = new THREE.Vector3(
          side * (reach * (0.68 + twig * 0.11)),
          y + rise + 0.19 + twig * 0.055,
          0.04
        );
        for (let i = 0; i < 155; i++) {
          const t = random(seed++);
          const p = origin.clone().lerp(twigEnd, t);
          const spread = 0.014 + t * 0.035;
          addPoint(
            p.x + (random(seed++) - 0.5) * spread,
            p.y + (random(seed++) - 0.5) * spread,
            p.z + (random(seed++) - 0.5) * spread,
            0.78
          );
        }
      }

      // Small luminous foliage clusters at the branch tips.
      for (let cluster = 0; cluster < 3; cluster++) {
        const cx = side * (reach * (0.72 + cluster * 0.085));
        const cy = y + rise + 0.12 + cluster * 0.055;
        for (let i = 0; i < 115; i++) {
          const angle = random(seed++) * Math.PI * 2;
          const radial = Math.sqrt(random(seed++));
          addPoint(
            cx + Math.cos(angle) * radial * 0.19,
            cy + Math.sin(angle) * radial * 0.15,
            (random(seed++) - 0.5) * 0.21,
            1.04
          );
        }
      }
    }
  }

  // Sparse particles around the crown soften the outline into a starfield.
  for (let i = 0; i < 1700; i++) {
    const y = -0.2 + random(seed++) * 2.0;
    const width = Math.max(0.08, (1.8 - y) * 0.48);
    const x = (random(seed++) * 2 - 1) * width;
    const edge = Math.abs(x) / width;
    if (random(seed++) > 0.42 + edge * 0.42) continue;
    addPoint(x, y, (random(seed++) - 0.5) * 0.65, 0.55);
  }

  return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
}

function ParticleTree() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const points = useRef<THREE.Points>(null);
  const data = useMemo(makeParticleTree, []);
  const geometry = useMemo(() => {
    const result = new THREE.BufferGeometry();
    result.setAttribute('position', new THREE.BufferAttribute(data.positions, 3));
    result.setAttribute('aColor', new THREE.BufferAttribute(data.colors, 3));
    return result;
  }, [data]);

  useFrame(({ clock, pointer }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime;
      material.current.uniforms.uPointer.value.set(pointer.x * 2.45, pointer.y * 2.0);
    }
    if (points.current) {
      points.current.rotation.y = THREE.MathUtils.lerp(points.current.rotation.y, pointer.x * 0.055, 0.035);
      points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, -pointer.y * 0.035, 0.035);
    }
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          uniform float uTime;
          uniform vec2 uPointer;
          attribute vec3 aColor;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vec3 p = position;
            vec2 delta = p.xy - uPointer;
            float distanceToPointer = length(delta);
            float influence = exp(-distanceToPointer * 3.1);
            vec2 direction = delta / max(distanceToPointer, 0.001);
            p.xy += direction * influence * 0.16;
            p.z += influence * 0.20 + sin(uTime * 0.75 + position.x * 3.0 + position.y * 2.3) * 0.025;
            vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = (1.2 + influence * 1.5) * (3.8 / max(1.0, -viewPosition.z));
            vColor = aColor;
            vAlpha = 0.62 + influence * 0.32;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vec2 centered = gl_PointCoord - vec2(0.5);
            float radius = length(centered);
            if (radius > 0.5) discard;
            float core = smoothstep(0.34, 0.02, radius);
            float halo = smoothstep(0.5, 0.08, radius);
            gl_FragColor = vec4(vColor * (0.72 + core * 1.2), halo * vAlpha);
          }
        `}
        uniforms={{ uTime: { value: 0 }, uPointer: { value: new THREE.Vector2(8, 8) } }}
      />
    </points>
  );
}

function StarField() {
  const geometry = useMemo(() => {
    const positions = new Float32Array(1700 * 3);
    for (let i = 0; i < 1700; i++) {
      positions[i * 3] = (random(i + 100) - 0.5) * 15;
      positions[i * 3 + 1] = (random(i + 700) - 0.5) * 8;
      positions[i * 3 + 2] = -1.5 - random(i + 1300) * 4;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return result;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#9dcfff" size={0.012} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function WaterSurface() {
  const material = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.78, 0]}>
      <planeGeometry args={[19, 9, 1, 1]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv;
            float horizon = smoothstep(0.92, 0.16, uv.y);
            float ring1 = sin(length((uv - vec2(0.5, 0.78)) * vec2(1.0, 0.55)) * 82.0 - uTime * 1.5);
            float ring2 = sin(length((uv - vec2(0.5, 0.78)) * vec2(1.0, 0.55)) * 48.0 - uTime * 1.1);
            float ripples = pow(max(0.0, ring1 * 0.5 + 0.5), 18.0) * 0.13
                          + pow(max(0.0, ring2 * 0.5 + 0.5), 20.0) * 0.08;
            float streak = pow(max(0.0, sin(uv.y * 170.0 + uv.x * 19.0 + uTime * 0.35)), 28.0) * 0.035;
            float centerGlow = exp(-abs(uv.x - 0.5) * 6.0) * exp(-abs(uv.y - 0.8) * 8.0);
            vec3 color = vec3(0.006, 0.018, 0.043) + vec3(0.025, 0.12, 0.24) * (ripples + streak + centerGlow * 0.13);
            gl_FragColor = vec4(color, horizon * 0.88);
          }
        `}
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
  );
}

export default function AnchorParticleScene() {
  return (
    <div className="anchor-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.06, 7.2], fov: 38 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ParticleTree />
        <StarField />
        <WaterSurface />
      </Canvas>
    </div>
  );
}
