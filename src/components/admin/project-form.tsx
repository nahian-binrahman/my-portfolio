"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormData } from "@/lib/validations/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createProject, updateProject } from "@/app/admin/projects/actions";

interface ProjectFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing }: ProjectFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData ? {
            ...initialData,
            tech_stack: initialData.tech_stack || [],
        } : {
            type: "WEB",
            tech_stack: [],
            featured: false,
        },
    });

    const featured = watch("featured");
    const coverImageUrl = watch("cover_image_url");
    const title = watch("title");

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEditing && title) {
            const slug = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [title, setValue, isEditing]);

    const onSubmit = async (data: ProjectFormData) => {
        setIsSubmitting(true);
        try {
            if (isEditing && initialData?.id) {
                await updateProject(initialData.id, data);
                toast.success("Project updated successfully");
            } else {
                await createProject(data);
                toast.success("Project created successfully");
            }
            router.push("/admin/projects");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                            id="title"
                            {...register("title")}
                            placeholder="e.g. AI SaaS Platform"
                            error={errors.title?.message}
                        />
                        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            {...register("slug")}
                            placeholder="e.g. ai-saas-platform"
                        />
                        {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Project Type</Label>
                        <select
                            id="type"
                            {...register("type")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="WEB">Web App</option>
                            <option value="LLM">AI / LLM Tool</option>
                            <option value="AIVIDEO">AI Video</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tech_stack">Tech Stack (comma separated)</Label>
                        <Input
                            id="tech_stack"
                            placeholder="Next.js, Tailwind, OpenAI"
                            defaultValue={initialData?.tech_stack?.join(", ") || ""}
                            onChange={(e) => {
                                const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                                setValue("tech_stack", tags);
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                        <Switch
                            id="featured"
                            checked={featured}
                            onChange={(e) => setValue("featured", e.target.checked)}
                        />
                        <div className="space-y-1">
                            <Label htmlFor="featured" className="cursor-pointer">Featured Project</Label>
                            <p className="text-xs text-muted-foreground">This project will appear on the homepage.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <ImageUploader
                        label="Cover Image"
                        initialValue={coverImageUrl}
                        onUploadComplete={(url) => setValue("cover_image_url", url)}
                    />

                    <div className="space-y-2">
                        <Label htmlFor="summary">Short Summary</Label>
                        <Textarea
                            id="summary"
                            {...register("summary")}
                            placeholder="Catchy one-liner about the project..."
                            className="h-24"
                        />
                        {errors.summary && <p className="text-xs text-destructive">{errors.summary.message}</p>}
                    </div>
                </div>
            </div>

            <Card className="border-slate-200/60 dark:border-slate-800/60">
                <CardContent className="p-6 space-y-6">
                    <h3 className="text-lg font-semibold">Links & Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="live_url">Live Demo URL</Label>
                            <Input id="live_url" {...register("live_url")} placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="repo_url">Repository URL</Label>
                            <Input id="repo_url" {...register("repo_url")} placeholder="https://github.com/..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="video_url">Demo Video URL</Label>
                            <Input id="video_url" {...register("video_url")} placeholder="https://youtube.com/..." />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content_mdx">Detailed Content (MDX)</Label>
                        <Textarea
                            id="content_mdx"
                            {...register("content_mdx")}
                            placeholder="Write the full case study here using Markdown..."
                            className="min-h-[300px] font-mono"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900"
                    disabled={isSubmitting}
                >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? "Update Project" : "Create Project"}
                </Button>
            </div>
        </form>
    );
}
