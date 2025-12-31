"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
    return (
        <input
            type="checkbox"
            className={cn(
                "peer h-5 w-10 cursor-pointer appearance-none rounded-full bg-slate-200 transition-colors checked:bg-indigo-600 dark:bg-slate-800 dark:checked:bg-[#5EEAD4]",
                "relative before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform peer-checked:before:translate-x-5",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Switch.displayName = "Switch";

export { Switch };
