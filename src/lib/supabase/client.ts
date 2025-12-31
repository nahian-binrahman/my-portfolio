import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project")) {
        console.warn("Supabase Init Failed:", {
            urlMissing: !supabaseUrl,
            keyMissing: !supabaseKey,
            urlValue: supabaseUrl ? supabaseUrl.slice(0, 15) + "..." : "undefined",
            isPlaceholder: supabaseUrl?.includes("your-project")
        });
        return null as any;
    }

    return createBrowserClient(supabaseUrl, supabaseKey);
};
