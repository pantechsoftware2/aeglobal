type BlogImageRecord = {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  heroImagePrompt: string;
};

/**
 * Production contract for blog artwork.
 *
 * Every post gets a content-specific image, stored as an optimized WebP under
 * /public/images/blog and named after the post slug. Reusing another post's
 * image is intentionally rejected so the rule also applies to future posts.
 */
export const BLOG_IMAGE_POLICY = {
  publicDirectory: "/images/blog/",
  extension: ".webp",
  minimumAltLength: 30,
  minimumPromptLength: 80
} as const;

export function enforceBlogImagePolicy(posts: readonly BlogImageRecord[]) {
  const imageOwners = new Map<string, string>();
  const errors: string[] = [];

  for (const post of posts) {
    const expectedImage = `${BLOG_IMAGE_POLICY.publicDirectory}${post.slug}${BLOG_IMAGE_POLICY.extension}`;
    const existingOwner = imageOwners.get(post.heroImage);

    if (post.heroImage !== expectedImage) {
      errors.push(`${post.slug}: heroImage must be ${expectedImage}`);
    }

    if (existingOwner) {
      errors.push(`${post.slug}: heroImage is already used by ${existingOwner}`);
    } else {
      imageOwners.set(post.heroImage, post.slug);
    }

    if (post.heroImageAlt.trim().length < BLOG_IMAGE_POLICY.minimumAltLength) {
      errors.push(`${post.slug}: heroImageAlt must describe the actual scene`);
    }

    if (post.heroImagePrompt.trim().length < BLOG_IMAGE_POLICY.minimumPromptLength) {
      errors.push(`${post.slug}: heroImagePrompt must contain a content-specific production brief`);
    }

    const subjectTerms = `${post.title} ${post.description}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((term) => term.length >= 5);
    const prompt = post.heroImagePrompt.toLowerCase();

    if (!subjectTerms.some((term) => prompt.includes(term))) {
      errors.push(`${post.slug}: heroImagePrompt must clearly relate to the post content`);
    }
  }

  if (errors.length) {
    throw new Error(`Blog image policy failed:\n- ${errors.join("\n- ")}`);
  }
}
