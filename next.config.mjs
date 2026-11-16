import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default function nextConfig(phase) {
  return {
    // Keep Fast Refresh output separate from production builds. This prevents
    // `next build` from replacing CSS and manifests used by a running dev server.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1366, 1440, 1600, 1920, 2048, 3840],
      imageSizes: [32, 48, 64, 96, 128, 180, 256, 384]
    }
  };
}
