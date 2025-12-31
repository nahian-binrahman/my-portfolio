import { createClient } from "@supabase/supabase-js";

/**
 * Service Role Client
 * ONLY use this in Server Components, API routes, or Server Actions.
 * Never expose the SUPABASE_SERVICE_ROLE_KEY to the browser.
 */
export const createAdminClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey || supabaseUrl.includes("your-project")) {
        return null;
    }

    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
};
