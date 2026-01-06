import { createClient } from "@/lib/supabase/server";

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nahianbinrahman.com";
    const supabase = await createClient();

    if (!supabase) {
        return new Response("Supabase not configured", { status: 500 });
    }

    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .not("published_at", "is", null)
        .order("published_at", { ascending: false });

    const feedItems = (posts || [])
        .map((post: any) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.content_mdx}]]></content:encoded>
    </item>`)
        .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Nahian Bin Rahman - Blog</title>
  <link>${baseUrl}</link>
  <description>Essays on Full-Stack Engineering and AI</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${feedItems}
</channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
    });
}
