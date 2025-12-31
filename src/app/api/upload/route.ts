import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
    try {
        // 1. Verify Admin Session
        const supabase = await createClient();
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const { data: { user } } = await supabase.auth.getUser();
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!user || user.email !== adminEmail) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Parse Multipart Form Data
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // 3. Validate File
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({
                error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`
            }, { status: 400 });
        }

        if (file.size > MAX_SIZE) {
            return NextResponse.json({
                error: "File too large. Maximum size is 5MB."
            }, { status: 400 });
        }

        // 4. Prepare File for Upload
        const buffer = await file.arrayBuffer();
        const extension = file.name.split(".").pop();
        const cleanName = file.name.split(".")[0].replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
        const filename = `${Date.now()}-${cleanName}.${extension}`;
        const contentType = file.type;

        // 5. Upload using Service Role Client
        const adminSupabase = createAdminClient();
        if (!adminSupabase) {
            return NextResponse.json({ error: "Admin client not configured" }, { status: 500 });
        }

        const { data, error } = await adminSupabase.storage
            .from("media")
            .upload(filename, buffer, {
                contentType,
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error("Supabase storage error:", error);
            return NextResponse.json({ error: "Failed to upload to storage" }, { status: 500 });
        }

        // 6. Get Public URL
        const { data: { publicUrl } } = adminSupabase.storage
            .from("media")
            .getPublicUrl(filename);

        return NextResponse.json({
            url: publicUrl,
            filename: filename,
            size: file.size,
            type: file.type
        });
    } catch (error: any) {
        console.error("Upload route error:", error);
        return NextResponse.json({ error: "An unexpected error occurred during upload" }, { status: 500 });
    }
}
