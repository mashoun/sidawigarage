<script setup lang="ts">
import * as THREE from 'three';

const canvasContainer = ref<HTMLDivElement | null>(null);
let animationFrameId: number | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let fluidMesh: THREE.Mesh | null = null;
let particlesMesh: THREE.Points | null = null;
let fluidMaterial: THREE.ShaderMaterial | null = null;
let observer: IntersectionObserver | null = null;

// Fluid simulation state
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
let scrollVelocity = 0;
let lastScrollY = 0;
let isVisible = true;

// Custom Viscous Golden Lubricant Surface Vertex & Fragment Shaders
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vElevation;

  // Wave generator
  float calculateElevation(vec2 p) {
    float wave1 = sin(p.x * 1.5 + uTime * 0.7 + uMouse.x * 1.8) * cos(p.y * 1.2 + uTime * 0.5 + uMouse.y * 1.8) * 0.45;
    float wave2 = sin(p.x * 2.8 - uTime * 0.9 + uScroll * 1.2) * sin(p.y * 2.5 + uTime * 0.8) * 0.25;
    float wave3 = cos(length(p - uMouse * 2.0) * 3.5 - uTime * 1.5) * 0.2;
    return wave1 + wave2 + wave3;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float elevation = calculateElevation(pos.xy);
    pos.z += elevation;
    vElevation = elevation;

    // Approximate dynamic normal by sampling surrounding elevations
    float delta = 0.05;
    float eRight = calculateElevation(pos.xy + vec2(delta, 0.0));
    float eUp = calculateElevation(pos.xy + vec2(0.0, delta));
    vec3 tangent = normalize(vec3(delta, 0.0, eRight - elevation));
    vec3 bitangent = normalize(vec3(0.0, delta, eUp - elevation));
    vec3 newNormal = normalize(cross(tangent, bitangent));

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalMatrix * newNormal;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vElevation;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Fresnel reflectance rim lighting
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);

    // Synthetic Lubricant Golden Amber Palette
    vec3 obsidian = vec3(0.04, 0.045, 0.06);     // Dark titanium background
    vec3 deepAmber = vec3(0.72, 0.38, 0.05);     // Viscous fluid base
    vec3 pureGold = vec3(0.98, 0.72, 0.18);      // Pure synthetic gold highlight
    vec3 brightSpecular = vec3(1.0, 0.95, 0.85); // Metallic specular shine

    // Gradient based on wave height
    float heightFactor = smoothstep(-0.4, 0.5, vElevation);
    vec3 fluidColor = mix(obsidian, deepAmber, heightFactor);
    fluidColor = mix(fluidColor, pureGold, fresnel * 0.85);

    // Specular light point tracking the cursor
    vec3 lightPos = vec3(uMouse.x * 3.0, uMouse.y * 3.0 + 1.0, 3.5);
    vec3 lightDir = normalize(lightPos - vViewPosition);
    vec3 halfVector = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfVector), 0.0), 24.0);
    fluidColor += brightSpecular * (spec * 0.65);

    // Vignette fade at borders
    float edgeDist = length(vUv - vec2(0.5));
    float alpha = smoothstep(0.75, 0.25, edgeDist) * 0.85;

    gl_FragColor = vec4(fluidColor, alpha);
  }
`;

const handlePointerMove = (e: PointerEvent) => {
  const width = window.innerWidth || 1920;
  const height = window.innerHeight || 1080;
  mouse.targetX = (e.clientX / width) * 2 - 1;
  mouse.targetY = -(e.clientY / height) * 2 + 1;
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  scrollVelocity = (currentScrollY - lastScrollY) * 0.005;
  lastScrollY = currentScrollY;
};

const handleResize = () => {
  if (!canvasContainer.value || !renderer || !camera) return;
  const width = canvasContainer.value.clientWidth || window.innerWidth;
  const height = canvasContainer.value.clientHeight || window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
};

let prefersReducedMotion = false;

const animate = (time: number) => {
  if (!isVisible) {
    animationFrameId = null;
    return;
  }

  if (prefersReducedMotion) {
    // Single static frame render for reduced motion preference
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
    animationFrameId = null;
    return;
  }

  // Damping mouse velocity
  mouse.x += (mouse.targetX - mouse.x) * 0.05;
  mouse.y += (mouse.targetY - mouse.y) * 0.05;

  if (fluidMaterial) {
    fluidMaterial.uniforms.uTime.value = time * 0.001;
    fluidMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);
    fluidMaterial.uniforms.uScroll.value = scrollVelocity;
  }

  // Floating particles gentle movement
  if (particlesMesh) {
    particlesMesh.rotation.y = time * 0.00015;
    particlesMesh.rotation.x = time * 0.00008;
  }

  // Decay scroll velocity
  scrollVelocity *= 0.95;

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }

  animationFrameId = requestAnimationFrame(animate);
};

onMounted(async () => {
  await nextTick();
  if (!canvasContainer.value || typeof window === 'undefined') return;

  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const width = canvasContainer.value.clientWidth || window.innerWidth;
  const height = canvasContainer.value.clientHeight || window.innerHeight;

  // Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 3.6);

  // 1. Adaptive Density Plane Geometry: 45x45 on mobile, 90x90 on desktop for GPU efficiency
  const segments = width < 768 ? 45 : 90;
  const geometry = new THREE.PlaneGeometry(7.0, 4.5, segments, segments);

  fluidMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  fluidMesh = new THREE.Mesh(geometry, fluidMaterial);
  fluidMesh.rotation.x = -0.3;
  scene.add(fluidMesh);

  // 2. Amber Lubricant Micro-Droplets / Specular Dust Particles
  const particleCount = 120;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 8.0;
    particlePositions[i + 1] = (Math.random() - 0.5) * 5.0;
    particlePositions[i + 2] = (Math.random() - 0.5) * 3.0;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xF59E0B,
    size: 0.035,
    transparent: true,
    opacity: 0.6,
  });
  particlesMesh = new THREE.Points(particleGeo, particleMat);
  scene.add(particlesMesh);

  // WebGL Renderer setup
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.pointerEvents = 'none';

  canvasContainer.value.appendChild(renderer.domElement);

  // IntersectionObserver to pause render loop when offscreen
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry) {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(canvasContainer.value);

  // Window-level events
  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('pointermove', handlePointerMove, { passive: true });

  animationFrameId = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (observer) observer.disconnect();

  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('pointermove', handlePointerMove);

  if (fluidMesh) {
    fluidMesh.geometry.dispose();
    if (Array.isArray(fluidMesh.material)) {
      fluidMesh.material.forEach((m) => m.dispose());
    } else {
      fluidMesh.material.dispose();
    }
  }

  if (particlesMesh) {
    particlesMesh.geometry.dispose();
    if (Array.isArray(particlesMesh.material)) {
      particlesMesh.material.forEach((m) => m.dispose());
    } else {
      particlesMesh.material.dispose();
    }
  }

  if (renderer) {
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }
});
</script>

<template>
  <div class="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
    <!-- WebGL Canvas Container -->
    <div ref="canvasContainer" class="relative h-full w-full" />
    
    <!-- Apple-style soft vignette overlays -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#08090C] to-transparent opacity-90" />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#08090C] via-[#08090C]/70 to-transparent" />
  </div>
</template>
