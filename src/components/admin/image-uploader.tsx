"use client";

import { useState } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploaderProps {
    onUploadComplete: (url: string) => void;
    initialValue?: string;
    label?: string;
}

export function ImageUploader({ onUploadComplete, initialValue, label }: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(initialValue || null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate type
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
        await uploadFile(file);
    };

    const uploadFile = async (file: File) => {
        setIsUploading(true);
        setUploadProgress(10); // Start progress

        try {
            const formData = new FormData();
            formData.append("file", file);

            // We'll use a simple fetch. For real progress tracking, 
            // you'd typically use XMLHttpRequest or a library like Axios.
            // Here we'll simulate progress steps.
            setUploadProgress(30);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            setUploadProgress(80);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Upload failed");
            }

            const data = await response.json();
            setPreview(data.url);
            onUploadComplete(data.url);
            setUploadProgress(100);
            toast.success("Image uploaded successfully");
        } catch (error: any) {
            toast.error(error.message);
            setPreview(initialValue || null);
        } finally {
            setIsUploading(false);
            setTimeout(() => setUploadProgress(0), 1000);
        }
    };

    const removeImage = () => {
        setPreview(null);
        onUploadComplete("");
    };

    return (
        <div className="space-y-4 w-full">
            {label && <label className="text-sm font-medium text-muted-foreground">{label}</label>}

            <div className="relative group flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors hover:border-indigo-500/50 dark:hover:border-[#5EEAD4]/50 bg-slate-50/50 dark:bg-slate-900/20">
                {preview ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center cursor-pointer py-10 w-full">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm mb-3">
                            <ImageIcon className="h-8 w-8 text-indigo-500 dark:text-[#5EEAD4]" />
                        </div>
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Click to upload cover image
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                            PNG, JPG or WebP (Max 5MB)
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </label>
                )}

                {isUploading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 rounded-xl backdrop-blur-sm">
                        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-[#5EEAD4] mb-2" />
                        <div className="w-2/3 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-600 dark:bg-[#5EEAD4] transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <span className="text-xs font-medium mt-2">{uploadProgress < 100 ? "Uploading..." : "Processing..."}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
