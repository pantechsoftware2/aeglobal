import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const blogDataPath = path.join(projectRoot, "app", "data", "blogPosts.ts");
const source = await readFile(blogDataPath, "utf8");
const postPattern = /slug:\s*"([^"]+)"[\s\S]*?heroImage:\s*"([^"]+)"[\s\S]*?heroImageAlt:\s*"([^"]+)"[\s\S]*?heroImagePrompt:\s*\n?\s*"([^"]+)"/g;
const posts = [...source.matchAll(postPattern)].map((match) => ({
  slug: match[1],
  heroImage: match[2],
  heroImageAlt: match[3],
  heroImagePrompt: match[4]
}));

if (!posts.length) {
  throw new Error("Blog image verification found no posts.");
}

const seenImages = new Set();

for (const post of posts) {
  const expectedImage = `/images/blog/${post.slug}.webp`;

  if (post.heroImage !== expectedImage) {
    throw new Error(`${post.slug}: expected heroImage ${expectedImage}`);
  }

  if (seenImages.has(post.heroImage)) {
    throw new Error(`${post.slug}: heroImage must be unique across blog posts`);
  }
  seenImages.add(post.heroImage);

  if (post.heroImageAlt.trim().length < 30 || post.heroImagePrompt.trim().length < 80) {
    throw new Error(`${post.slug}: add a descriptive alt and content-specific image prompt`);
  }

  const assetPath = path.join(projectRoot, "public", ...post.heroImage.split("/").filter(Boolean));
  const assetStats = await stat(assetPath);
  const metadata = await sharp(assetPath).metadata();

  if (metadata.format !== "webp" || !metadata.width || !metadata.height) {
    throw new Error(`${post.slug}: hero image must be a readable WebP`);
  }

  if (metadata.width < 1200 || metadata.width / metadata.height < 1.6) {
    throw new Error(`${post.slug}: hero image must be at least 1200px wide with a landscape crop`);
  }

  if (assetStats.size > 500_000) {
    throw new Error(`${post.slug}: hero image exceeds the 500 KB production budget`);
  }
}

console.log(`Verified ${posts.length} unique production blog images.`);
