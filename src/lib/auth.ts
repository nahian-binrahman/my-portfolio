import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Server-side helper to ensure the user is an admin.
 * Use this in Server Components or Server Actions.
 */
export async function requireAdmin() {
    const supabase = await createClient();

    if (!supabase) {
        redirect("/admin/login");
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const adminEmail = process.env.ADMIN_EMAIL;

    if (!user || user.email !== adminEmail) {
        redirect("/admin/login");
    }

    return { user, supabase };
}
