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

const createDotTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");

  if (context) {
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 30);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.32, "rgba(7,38,92,0.98)");
    gradient.addColorStop(1, "rgba(7,38,92,0)");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(32, 32, 30, 0, Math.PI * 2);
    context.fill();
  }

  return new THREE.CanvasTexture(canvas);
};

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
    let pointMaterial: THREE.PointsMaterial | null = null;
    let globePoints: THREE.Points | null = null;
    let disposed = false;

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

      pointMaterial = new THREE.PointsMaterial({
        color: "#092f68",
        map: createDotTexture(),
        opacity: 0.98,
        size: window.innerWidth < 760 ? 0.028 : 0.026,
        sizeAttenuation: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending
      });

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

    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      if (!reducedMotion) globeGroup.rotation.y += 0.0026;

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
      observer.disconnect();
      pointGeometry?.dispose();
      pointMaterial?.map?.dispose();
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
