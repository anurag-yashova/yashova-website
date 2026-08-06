import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ee6fwzzp",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  body?: unknown;
};

const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, excerpt, publishedAt
}`;

const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, excerpt, publishedAt, body
}`;

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    return await sanityClient.fetch(postsQuery);
  } catch {
    // Sanity project/dataset not fully configured yet — fail soft.
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await sanityClient.fetch(postQuery, { slug });
  } catch {
    return null;
  }
}
