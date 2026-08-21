"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { globeLandPositions } from "../data/globeLandPositions";

type Marker = {
  label: string;
  lat: number;
  lng: number;
};

const markers: Marker[] = [
  { label: "Canada", lat: 43.6532, lng: -79.3832 },
  { label: "United Kingdom", lat: 51.5074, lng: -0.1278 },
  { label: "United Arab Emirates", lat: 25.2048, lng: 55.2708 },
  { label: "Singapore", lat: 1.3521, lng: 103.8198 },
  { label: "New Zealand", lat: -36.8509, lng: 174.7645 }
];

const toVector = (lat: number, lng: number, radius = 1) => {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

const getLandPositions = () =>
  new Float32Array(window.innerWidth < 760 ? globeLandPositions.mobile : globeLandPositions.desktop);

const createArc = (from: Marker, to: Marker) => {
  const start = toVector(from.lat, from.lng, 1.03);
  const end = toVector(to.lat, to.lng, 1.03);
  const middle = start.clone().add(end).normalize().multiplyScalar(1.42);
  const curve = new THREE.QuadraticBezierCurve3(start, middle, end);
  const points = curve.getPoints(64);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: "#1d4ed8",
    transparent: true,
    opacity: 0.34
  });

  return new THREE.Line(geometry, material);
};

const createPointMaterial = (dotSize: number) =>
  new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color("#092f68") },
      uHover: { value: new THREE.Vector3(0, 0, 1) },
      uHoverStrength: { value: 0 },
      uSize: { value: dotSize },
      uTime: { value: 0 }
    },
    vertexShader: `
      uniform vec3 uHover;
      uniform float uHoverStrength;
      uniform float uSize;
      uniform float uTime;

      varying float vAlpha;
      varying float vWave;

      void main() {
        vec3 normalPosition = normalize(position);
        float distanceToHover = distance(normalPosition, normalize(uHover));
        float ripple = exp(-distanceToHover * distanceToHover * 30.0);
        float wave = ripple * (0.55 + 0.45 * sin(distanceToHover * 34.0 - uTime * 7.0));
        float lift = wave * uHoverStrength * 0.12;
        vec3 displaced = normalPosition * (1.0 + lift);
        vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);

        vWave = wave * uHoverStrength;
        vAlpha = 0.52 + vWave * 0.48;
        gl_PointSize = uSize * (300.0 / -mvPosition.z) * (1.0 + vWave * 1.4);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;
      varying float vWave;

      void main() {
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        float circle = smoothstep(0.5, 0.16, dist);
        vec3 color = mix(uColor, vec3(0.42, 0.72, 1.0), vWave);
        gl_FragColor = vec4(color, circle * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending
  });

export default function AtomicGlobe() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const markerLayerRef = useRef<HTMLDivElement | null>(null);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const host = hostRef.current;
    const markerLayer = markerLayerRef.current;
    if (!host || !markerLayer) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 3.4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    host.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.z = THREE.MathUtils.degToRad(-18);
    globeGroup.rotation.x = THREE.MathUtils.degToRad(10);
    scene.add(globeGroup);

    let pointGeometry: THREE.BufferGeometry | null = null;
    let pointMaterial: THREE.ShaderMaterial | null = null;
    let globePoints: THREE.Points | null = null;
    let disposed = false;
    let hoverTarget = 0;
    const hoverPoint = new THREE.Vector3(0, 0, 1);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const inverseMatrix = new THREE.Matrix4();
    const localRay = new THREE.Ray();
    const hoverSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1.04);

    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.01, 48, 48),
      new THREE.MeshBasicMaterial({
        color: "#123a7a",
        opacity: 0.038,
        transparent: true,
        wireframe: true
      })
    );
    globeGroup.add(shell);

    markers.forEach((marker, index) => {
      globeGroup.add(createArc(marker, markers[(index + 1) % markers.length]));
    });

    const addPointCloud = () => {
      if (disposed) return;

      pointGeometry = new THREE.BufferGeometry();
      pointGeometry.setAttribute("position", new THREE.BufferAttribute(getLandPositions(), 3));

      pointMaterial = createPointMaterial(window.innerWidth < 760 ? 0.028 : 0.026);

      globePoints = new THREE.Points(pointGeometry, pointMaterial);
      globeGroup.add(globePoints);
    };

    const pointCloudTimer = window.setTimeout(addPointCloud, 80);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / Math.max(1, rect.height);
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    let frame = 0;
    const markerProjection = markers.map((marker) => toVector(marker.lat, marker.lng, 1.1));
    const screenPosition = new THREE.Vector3();
    let markerFrame = 0;
    const updateHover = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(pointer, camera);
      inverseMatrix.copy(globeGroup.matrixWorld).invert();
      localRay.copy(raycaster.ray).applyMatrix4(inverseMatrix);

      const intersection = new THREE.Vector3();
      if (localRay.intersectSphere(hoverSphere, intersection)) {
        hoverPoint.copy(intersection.normalize());
        hoverTarget = 1;
        return;
      }

      hoverTarget = 0;
    };
    const clearHover = () => {
      hoverTarget = 0;
    };

    host.addEventListener("pointermove", updateHover, { passive: true });
    host.addEventListener("pointerleave", clearHover);

    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      if (!reducedMotion) globeGroup.rotation.y += 0.0026;
      if (pointMaterial) {
        pointMaterial.uniforms.uTime.value += 0.016;
        pointMaterial.uniforms.uHover.value.copy(hoverPoint);
        pointMaterial.uniforms.uHoverStrength.value +=
          (hoverTarget - pointMaterial.uniforms.uHoverStrength.value) * 0.14;
      }

      renderer.render(scene, camera);

      markerFrame += 1;
      if (markerFrame % 2 === 0) {
        const rect = host.getBoundingClientRect();
        markerProjection.forEach((position, index) => {
          const marker = markerRefs.current[index];
          if (!marker) return;

          screenPosition.copy(position).applyMatrix4(globeGroup.matrixWorld).project(camera);
          const x = (screenPosition.x * 0.5 + 0.5) * rect.width;
          const y = (-screenPosition.y * 0.5 + 0.5) * rect.height;
          marker.style.opacity = screenPosition.z < 1 ? "1" : "0";
          marker.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        });
      }
    };

    animate();

    return () => {
      disposed = true;
      window.clearTimeout(pointCloudTimer);
      window.cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", updateHover);
      host.removeEventListener("pointerleave", clearHover);
      observer.disconnect();
      pointGeometry?.dispose();
      pointMaterial?.dispose();
      if (globePoints) globeGroup.remove(globePoints);
      shell.geometry.dispose();
      (shell.material as THREE.Material).dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Line) {
          object.geometry.dispose();
          (object.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      if (host.contains(renderer.domElement)) host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="atomic-globe" aria-hidden="true">
      <div className="atomic-globe-canvas" ref={hostRef} />
      <div className="atomic-marker-layer" ref={markerLayerRef}>
        {markers.map((marker, index) => (
          <span
            className="atomic-map-marker"
            key={marker.label}
            ref={(node) => {
              markerRefs.current[index] = node;
            }}
          >
            {marker.label}
          </span>
        ))}
      </div>
    </div>
  );
}
