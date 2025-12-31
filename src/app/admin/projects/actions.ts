"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { projectSchema, type ProjectFormData } from "@/lib/validations/project";

export async function createProject(data: ProjectFormData) {
    const { supabase } = await requireAdmin();

    const validated = projectSchema.parse(data);

    const { error } = await supabase
        .from("projects")
        .insert([validated]);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { success: true };
}

export async function updateProject(id: string, data: ProjectFormData) {
    const { supabase } = await requireAdmin();

    const validated = projectSchema.parse(data);

    const { error } = await supabase
        .from("projects")
        .update(validated)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath(`/projects/${validated.slug}`);
    return { success: true };
}

export async function deleteProject(id: string) {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { success: true };
}
