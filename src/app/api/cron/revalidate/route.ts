import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { getAllTeardowns } from "@/lib/teardowns";

/** Runs every morning via Vercel Cron.
 *  Forces the scheduled-publishing pages to regenerate so a post dated today
 *  appears without waiting for a visitor to trigger revalidation. */
export async function GET(request: Request) {
  // Vercel signs cron requests; also allow a manual secret for testing.
  const auth = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  const isVercelCron = request.headers.get("x-vercel-cron") !== null;
  if (!isVercelCron && secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "unauthorised" }, { status: 401 });
  }

  const paths = ["/blog", "/teardowns", "/sitemap.xml"];
  for (const p of paths) revalidatePath(p);

  // regenerate the detail pages of anything now live
  const posts = getAllPosts();
  const teardowns = getAllTeardowns();
  for (const p of posts) revalidatePath(`/blog/${p.slug}`);
  for (const t of teardowns) revalidatePath(`/teardowns/${t.slug}`);

  return NextResponse.json({
    ok: true,
    ranAt: new Date().toISOString(),
    livePosts: posts.length,
    liveTeardowns: teardowns.length,
    newestPost: posts[0]?.slug ?? null,
    newestTeardown: teardowns[0]?.slug ?? null,
  });
}
