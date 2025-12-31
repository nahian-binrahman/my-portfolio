"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function SearchInput({ placeholder = "Search..." }: { placeholder?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(searchParams.get("q") || "");

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    }

    return (
        <div className="relative group max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-600 transition-colors" />
            <Input
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    handleSearch(e.target.value);
                }}
                placeholder={placeholder}
                className="pl-10 pr-10 border-slate-200 dark:border-slate-800 focus:ring-indigo-600/20"
            />
            {value && (
                <button
                    onClick={() => {
                        setValue("");
                        handleSearch("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                >
                    <X size={14} className="text-muted-foreground" />
                </button>
            )}
            {isPending && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    <div className="h-3 w-3 border-2 border-indigo-600 border-r-transparent animate-spin rounded-full" />
                </div>
            )}
        </div>
    );
}
