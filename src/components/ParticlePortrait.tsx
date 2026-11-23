import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Data = { positions: Float32Array; colors: Float32Array };
function samplePhoto(image: HTMLImageElement): Data {
  const width = 360, height = Math.round(width * image.naturalHeight / image.naturalWidth);
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('Canvas sampling unavailable');
  context.drawImage(image, 0, 0, width, height);
  const px = context.getImageData(0, 0, width, height).data;
  const positions: number[] = [], colors: number[] = [];
  for (let y = 0; y < height; y += 2) for (let x = 0; x < width; x += 2) {
    const nx = x / width, ny = y / height, i = (y * width + x) * 4;
    const r = px[i], g = px[i+1], b = px[i+2], max = Math.max(r,g,b), min = Math.min(r,g,b);
    const brightness = (r+g+b)/3, saturation = (max-min)/Math.max(1,max);
    const head = ((nx-.5)/.31)**2 + ((ny-.34)/.32)**2 <= 1 && ny >= .045 && ny < .67;
    const shoulderSpread = Math.max(0, Math.min(1, (ny-.64)/.18));
    const shoulderWidth = .22 + .24 * shoulderSpread;
    const torso = ny >= .64 && ny <= .99 && Math.abs(nx-.5) < shoulderWidth;
    if (!head && !torso) continue;
    const keep = head ? brightness < 215 : brightness < 249 && (brightness < 238 || saturation > .035);
    if (!keep) continue;
    const lum = brightness/255, depth = (.52-lum)*.34 + Math.sin(x*.071+y*.043)*.012;
    positions.push((nx-.5)*3.05, (.5-ny)*4.55, depth);
    const blue = Math.max(0,Math.min(1,(b-r+42)/165)), shade = .68+(1-lum)*.28;
    colors.push(Math.min(1,r/255*shade+.13),Math.min(1,g/255*shade+.15),Math.min(1,b/255*shade+.20+blue*.13));
  }
  return {positions:new Float32Array(positions),colors:new Float32Array(colors)};
}
const vertex = `uniform float uTime; uniform vec2 uMouse; uniform float uPixelRatio; uniform float uMotion; attribute vec3 aColor; varying vec3 vColor; varying float vAlpha;
void main(){vec3 p=position;vec2 d=p.xy-uMouse;float dist=length(d);float force=exp(-dist*3.45)*uMotion;vec2 dir=d/max(dist,.0001);p.xy+=dir*force*.245;p.z+=force*.26+sin(uTime*.72+position.x*3.8+position.y*2.7)*.016*uMotion;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(1.45+force*1.9)*uPixelRatio*(3.4/max(1.,-mv.z));vColor=aColor;vAlpha=.72+force*.25;}`;
const fragment = `varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p);if(d>.5)discard;float glow=smoothstep(.5,.03,d);gl_FragColor=vec4(vColor*(.96+glow*.4),glow*vAlpha);}`;

function Cloud({data,reduced}:{data:Data;reduced:boolean}) {
  const material=useRef<THREE.ShaderMaterial>(null), points=useRef<THREE.Points>(null);
  const geometry=useMemo(()=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(data.positions,3));g.setAttribute('aColor',new THREE.BufferAttribute(data.colors,3));return g;},[data]);
  useEffect(()=>()=>geometry.dispose(),[geometry]);
  useFrame(({clock,pointer,viewport})=>{
    if(material.current){material.current.uniforms.uTime.value=clock.elapsedTime;material.current.uniforms.uMouse.value.set(pointer.x*viewport.width/2,pointer.y*viewport.height/2);material.current.uniforms.uPixelRatio.value=Math.min(window.devicePixelRatio||1,1.7);material.current.uniforms.uMotion.value=reduced?0:1;}
    if(points.current){points.current.rotation.y=THREE.MathUtils.lerp(points.current.rotation.y,reduced?0:pointer.x*.075,.055);points.current.rotation.x=THREE.MathUtils.lerp(points.current.rotation.x,reduced?0:-pointer.y*.045,.055);}
  });
  return <points ref={points} geometry={geometry} frustumCulled={false}><shaderMaterial ref={material} vertexShader={vertex} fragmentShader={fragment} transparent depthWrite={false} blending={THREE.AdditiveBlending} uniforms={{uTime:{value:0},uMouse:{value:new THREE.Vector2(100,100)},uPixelRatio:{value:1},uMotion:{value:1}}}/></points>;
}
export default function ParticlePortrait(){
  const [data,setData]=useState<Data|null>(null),[error,setError]=useState(false),[reduced,setReduced]=useState(false);
  useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'),update=()=>setReduced(media.matches);update();media.addEventListener?.('change',update);const image=new Image();image.src='/portrait.webp';image.onload=()=>{try{setData(samplePhoto(image));}catch{setError(true);}};image.onerror=()=>setError(true);return()=>media.removeEventListener?.('change',update);},[]);
  return <div className="particle-stage" aria-label="Interactive particle portrait of Manuj"><div className="particle-label"><span className="live-dot"/> INTERACTIVE POINT-CLOUD <span>01 / 01</span></div>{data?<Canvas camera={{position:[0,0,5.65],fov:42}} dpr={[1,1.7]} gl={{alpha:true,antialias:true,powerPreference:'high-performance'}}><Cloud data={data} reduced={reduced}/></Canvas>:<div className="portrait-loading">{error?'PORTRAIT ASSET COULD NOT BE LOADED':'FORMING THE PORTRAIT…'}</div>}<div className="particle-caption">MOVE YOUR CURSOR THROUGH THE FORM</div></div>;
}
