"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { postSchema, type PostFormData } from "@/lib/validations/post";

export async function createPost(data: PostFormData) {
    const { supabase } = await requireAdmin();

    const validated = postSchema.parse(data);

    const { error } = await supabase
        .from("posts")
        .insert([validated]);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
}

export async function updatePost(id: string, data: PostFormData) {
    const { supabase } = await requireAdmin();

    const validated = postSchema.parse(data);

    const { error } = await supabase
        .from("posts")
        .update(validated)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/${validated.slug}`);
    revalidatePath("/");
    return { success: true };
}

export async function deletePost(id: string) {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
}

export async function togglePublishPost(id: string, isPublished: boolean) {
    const { supabase } = await requireAdmin();

    const published_at = isPublished ? new Date().toISOString() : null;

    const { error } = await supabase
        .from("posts")
        .update({ published_at })
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
}
