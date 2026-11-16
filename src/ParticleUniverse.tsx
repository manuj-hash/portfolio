import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

type ParticleFieldProps = { reduced: boolean };

function ParticleField({ reduced }: ParticleFieldProps) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const rippleStart = useRef(-100);
  const rippleCenter = useRef(new THREE.Vector2(0, 0));
  const { positions, sizes, colors } = useMemo(() => {
    const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 700px)').matches;
    const count = mobile ? 2600 : 7800;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const blue = new THREE.Color('#168bff');
    const cyan = new THREE.Color('#00cfff');
    const violet = new THREE.Color('#773bff');

    for (let i = 0; i < count; i++) {
      const core = Math.random() < 0.28;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = core ? Math.random() * 1.1 : 1.1 + Math.pow(Math.random(), 0.72) * 2.25;
      const swirl = theta + (phi - Math.PI / 2) * 0.62;
      positions[i * 3] = Math.sin(phi) * Math.cos(swirl) * radius * 1.52;
      positions[i * 3 + 1] = Math.cos(phi) * radius * (0.68 + Math.random() * 0.18);
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(swirl) * radius * 0.72;
      sizes[i] = core ? 1.2 + Math.random() * 2.2 : 0.55 + Math.random() * 1.4;
      const color = Math.random() > 0.91 ? violet : Math.random() > 0.46 ? cyan : blue;
      const intensity = core ? 0.8 + Math.random() * 0.5 : 0.48 + Math.random() * 0.52;
      colors[i * 3] = color.r * intensity;
      colors[i * 3 + 1] = color.g * intensity;
      colors[i * 3 + 2] = color.b * intensity;
    }
    return { positions, sizes, colors };
  }, []);

  const geometry = useMemo(() => {
    const value = new THREE.BufferGeometry();
    value.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    value.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    value.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    return value;
  }, [positions, sizes, colors]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uRippleCenter: { value: new THREE.Vector2(0, 0) },
    uRippleStart: { value: -100 },
    uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.6) : 1 },
  }), []);

  useFrame(({ clock, pointer, size }) => {
    const time = clock.getElapsedTime();
    if (material.current) {
      material.current.uniforms.uTime.value = reduced ? 0 : time;
      material.current.uniforms.uMouse.value.set(pointer.x * (size.width / size.height) * 4.5, pointer.y * 2.5);
      material.current.uniforms.uRippleCenter.value.copy(rippleCenter.current);
      material.current.uniforms.uRippleStart.value = rippleStart.current;
    }
    if (group.current && !reduced) {
      group.current.rotation.y = Math.sin(time * 0.12) * 0.045;
      group.current.rotation.x = Math.sin(time * 0.09) * 0.025;
    }
  });

  const triggerRipple = (event: { point: THREE.Vector3 }) => {
    rippleCenter.current.set(event.point.x, event.point.y);
    rippleStart.current = performance.now() / 1000;
  };

  return (
    <>
      <group ref={group}>
        <points geometry={geometry} frustumCulled={false}>
          <shaderMaterial
            ref={material}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            uniforms={uniforms}
            vertexShader={`
              attribute float aSize;
              attribute vec3 aColor;
              uniform float uTime;
              uniform float uPixelRatio;
              uniform vec2 uMouse;
              uniform vec2 uRippleCenter;
              uniform float uRippleStart;
              varying vec3 vColor;
              varying float vAlpha;
              void main() {
                vec3 p = position;
                float wave = sin(p.x * 1.8 + uTime * 0.55) * 0.075
                           + cos(p.y * 2.2 - uTime * 0.4) * 0.06;
                p += normalize(position + vec3(0.001)) * wave;
                float influence = exp(-dot(p.xy - uMouse, p.xy - uMouse) * 0.62);
                vec2 away = normalize(p.xy - uMouse + vec2(0.0001));
                p.xy += away * influence * 0.24;
                float age = uTime - uRippleStart;
                float distanceFromRipple = distance(p.xy, uRippleCenter);
                float ripple = exp(-pow((distanceFromRipple - age * 2.25) * 3.0, 2.0));
                if (age > 0.0 && age < 2.2) p += normalize(p + vec3(0.001)) * ripple * 0.11;
                float a = uTime * 0.055;
                float c = cos(a), s = sin(a);
                p.xz = mat2(c, -s, s, c) * p.xz;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_Position = projectionMatrix * mv;
                gl_PointSize = aSize * uPixelRatio * (32.0 / max(1.0, -mv.z));
                vColor = aColor + vec3(0.12, 0.22, 0.42) * influence + vec3(0.1, 0.3, 0.55) * ripple;
                vAlpha = smoothstep(8.0, 1.5, -mv.z) * 0.92;
              }
            `}
            fragmentShader={`
              varying vec3 vColor;
              varying float vAlpha;
              void main() {
                vec2 uv = gl_PointCoord - 0.5;
                float d = length(uv);
                float core = exp(-d * 17.0);
                float halo = exp(-d * 7.0) * 0.42;
                float alpha = (core + halo) * vAlpha;
                if (alpha < 0.025) discard;
                gl_FragColor = vec4(vColor, alpha);
              }
            `}
          />
        </points>
      </group>
      <mesh position={[0, 0, -2]} onPointerDown={triggerRipple}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>
    </>
  );
}

export default function ParticleUniverse() {
  const reduced = useReducedMotion();
  return (
    <Canvas
      className="universe-canvas"
      camera={{ position: [0, 0, 9.2], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <ParticleField reduced={Boolean(reduced)} />
    </Canvas>
  );
}
