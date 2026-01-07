"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    ArrowRight,
    Mail,
    ExternalLink,
    LayoutGrid,
    Cpu,
    BookOpen,
    MessageCircle,
    User,
    Mic2,
    Home
} from "lucide-react";

interface NavItem {
    name: string;
    href: string;
    icon?: React.ElementType;
}

const PRIMARY_LINKS: NavItem[] = [
    { name: "Projects", href: "/projects", icon: LayoutGrid },
    { name: "Services", href: "/services", icon: Cpu },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: MessageCircle },
];

const SECONDARY_LINKS: NavItem[] = [
    { name: "About", href: "/about", icon: User },
    { name: "Speaking", href: "/speaking", icon: Mic2 },
    { name: "Home", href: "/", icon: Home },
];

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const pathname = usePathname();
    const [isSecondaryExpanded, setIsSecondaryExpanded] = React.useState(false);

    // Lock body scroll when open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const handleLinkClick = () => {
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
                        aria-hidden="true"
                    />

                    {/* Bottom Sheet Drawer */}
                    <motion.div
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        dragListener={false} // Disable drag on the whole container to allow internal scroll
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 500) {
                                onClose();
                            }
                        }}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-[70] w-full max-h-[75vh] bg-white dark:bg-zinc-950 rounded-t-[2.5rem] border-t border-slate-200 dark:border-zinc-800 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col md:hidden overflow-hidden"
                    >
                        {/* Drag Handle Area (Active Listener) */}
                        <motion.div
                            drag="y"
                            dragConstraints={{ top: 0 }}
                            dragElastic={0}
                            onDragEnd={(_, info) => {
                                if (info.offset.y > 50 || info.velocity.y > 300) {
                                    onClose();
                                }
                            }}
                            className="flex justify-center p-6 cursor-grab active:cursor-grabbing"
                        >
                            <div className="w-12 h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full" />
                        </motion.div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto px-6 pb-12 scrollbar-none">
                            <div className="space-y-8">

                                {/* Primary Section */}
                                <div className="space-y-3">
                                    <p className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
                                        Main Navigation
                                    </p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {PRIMARY_LINKS.map((item) => {
                                            const isActive = pathname === item.href;
                                            const Icon = item.icon || ArrowRight;
                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={handleLinkClick}
                                                    className={cn(
                                                        "group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                                                        isActive
                                                            ? "bg-indigo-600 dark:bg-[#5EEAD4] text-white dark:text-slate-900 shadow-lg shadow-indigo-500/20"
                                                            : "bg-slate-50 dark:bg-zinc-900/50 text-slate-600 dark:text-zinc-400 border border-slate-200/50 dark:border-zinc-800/50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "p-2 rounded-xl transition-colors",
                                                        isActive ? "bg-white/20" : "bg-white dark:bg-zinc-800 shadow-sm"
                                                    )}>
                                                        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                                    </div>
                                                    <span className="font-black uppercase tracking-widest text-sm">
                                                        {item.name}
                                                    </span>
                                                    <ArrowRight size={16} className={cn(
                                                        "ml-auto transition-transform duration-300",
                                                        isActive ? "translate-x-0" : "-translate-x-4 opacity-0 group-active:translate-x-0 group-active:opacity-100"
                                                    )} />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Secondary Section (Accordion) */}
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setIsSecondaryExpanded(!isSecondaryExpanded)}
                                        className="w-full flex items-center justify-between px-2 group cursor-pointer"
                                    >
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-colors">
                                            More Explore
                                        </p>
                                        <ChevronDown
                                            size={14}
                                            className={cn(
                                                "text-slate-400 transition-transform duration-300",
                                                isSecondaryExpanded ? "rotate-180" : ""
                                            )}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isSecondaryExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden space-y-2"
                                            >
                                                {SECONDARY_LINKS.map((item) => {
                                                    const isActive = pathname === item.href;
                                                    const Icon = item.icon || ArrowRight;
                                                    return (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            onClick={handleLinkClick}
                                                            className={cn(
                                                                "flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200",
                                                                isActive
                                                                    ? "text-indigo-600 dark:text-[#5EEAD4] bg-indigo-50 dark:bg-indigo-950/30"
                                                                    : "text-slate-500 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-[#5EEAD4]"
                                                            )}
                                                        >
                                                            <div className="w-8 flex justify-center">
                                                                <Icon size={18} />
                                                            </div>
                                                            <span className="font-bold text-sm tracking-wide">
                                                                {item.name}
                                                            </span>
                                                        </Link>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Bottom CTA Section */}
                                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/50 space-y-4">
                                    <a
                                        href="mailto:contact@nahianbinrahman.com"
                                        className="flex items-center justify-center gap-3 w-full py-5 rounded-3xl bg-indigo-600 dark:bg-[#5EEAD4] text-white dark:text-slate-900 font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
                                    >
                                        <Mail size={18} />
                                        Email Me Now
                                    </a>

                                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest">
                                        <span>Highly Responsive</span>
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>Available for Hire</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
