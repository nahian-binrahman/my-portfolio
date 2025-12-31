"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CopyToClipboardButtonProps {
    value: string;
    label?: string;
}

export function CopyToClipboardButton({ value, label }: CopyToClipboardButtonProps) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={copy}
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {label && <span>{label}</span>}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
