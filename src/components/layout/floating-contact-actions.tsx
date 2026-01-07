"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useAnimation, useMotionValueEvent } from "framer-motion";
import { Mail, Linkedin, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const CONTACT_LINKS = [
    {
        id: "email",
        label: "Email me",
        href: "mailto:contact@nahianbinrahman.com",
        icon: Mail,
        color: "text-zinc-900 dark:text-white",
        bgColor: "bg-white dark:bg-zinc-900",
        borderColor: "border-zinc-200 dark:border-zinc-800",
    },
    {
        id: "linkedin",
        label: "Message on LinkedIn",
        href: "https://www.linkedin.com/in/nahian-bin-rahman",
        icon: Linkedin,
        color: "text-[#0077B5]/80 dark:text-[#0077B5]",
        bgColor: "bg-white dark:bg-zinc-900",
        borderColor: "border-zinc-200 dark:border-zinc-800",
    },
    {
        id: "whatsapp",
        label: "Let's talk on WhatsAPP",
        href: "https://wa.me/8801778298484",
        icon: MessageCircle,
        color: "text-emerald-600/80 dark:text-emerald-500",
        bgColor: "bg-white dark:bg-zinc-900",
        borderColor: "border-zinc-200 dark:border-zinc-800",
    },
];

export function FloatingContactActions() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const [showLabels, setShowLabels] = useState(false);
    const controls = useAnimation();
    const { scrollY } = useScroll();

    // Scroll-triggered bounce effect
    useMotionValueEvent(scrollY, "change", () => {
        controls.start({
            y: [-3, 0],
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        });
    });

    // Initial hint on mobile
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const hasVisited = localStorage.getItem("has_seen_contact_hint");

        if (isMobile && !hasVisited) {
            setShowLabels(true);
            const timer = setTimeout(() => {
                setShowLabels(false);
                localStorage.setItem("has_seen_contact_hint", "true");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (isAdmin) return null;

    return (
        <div className={cn(
            "fixed bottom-8 right-3 lg:right-0 z-[100] flex flex-col items-end gap-4 pointer-events-none",
            "lg:w-[var(--floating-safe-width)] lg:bottom-12", // Desktop: Centered in safe zone
            "bottom-20 md:bottom-12" // Mobile: Extra bottom clearance to avoid covering tab bars/CTAs
        )}>
            <motion.div
                animate={controls}
                className="flex flex-col gap-3 pointer-events-auto items-center lg:w-full"
            >
                {CONTACT_LINKS.map((link, index) => (
                    <motion.div
                        key={link.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        className="group relative flex items-center justify-center lg:w-full"
                    >
                        {/* Label Pill - Desktop Only */}
                        <span className={cn(
                            "absolute right-full mr-4 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap",
                            "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl",
                            "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out",
                            "hidden lg:block pointer-events-none text-zinc-600 dark:text-zinc-400"
                        )}>
                            {link.label}
                        </span>

                        {/* Mobile Hint (shown once) */}
                        <AnimatePresence>
                            {showLabels && (
                                <motion.span
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute right-full mr-4 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl lg:hidden text-zinc-600 dark:text-zinc-400"
                                >
                                    {link.label}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Icon Button */}
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className={cn(
                                "flex items-center justify-center rounded-full border transition-all duration-200",
                                "w-10 h-10 md:w-12 md:h-12", // Smaller on mobile
                                link.bgColor,
                                link.borderColor,
                                "shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
                                "hover:scale-[1.05] active:scale-95",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
                            )}
                        >
                            <link.icon className={cn("w-4 h-4 md:w-5 md:h-5 transition-colors duration-200", link.color)} />
                        </a>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
