"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ChevronDown, Mail } from "lucide-react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Speaking", href: "/speaking" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
];

const mobilePrimaryLinks = [
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact", isCTA: true },
];

const mobileSecondaryLinks = [
    { name: "About", href: "/about" },
    { name: "Speaking", href: "/speaking" },
    { name: "Home", href: "/" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 z-50">
                    <Link href="/" className="text-2xl font-bold tracking-tight text-[#4338CA] dark:text-[#5EEAD4]">
                        Nahian B. Rahman
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "group relative px-5 py-2.5 transition-all duration-300",
                                    isActive ? "text-white dark:text-slate-900" : "text-muted-foreground hover:text-white dark:hover:text-slate-900 transition-none"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-parallelogram"
                                        initial={{ skewX: -12 }}
                                        animate={{ skewX: -12 }}
                                        className="absolute inset-0 bg-indigo-600 dark:bg-[#5EEAD4] shadow-lg shadow-indigo-500/20 dark:shadow-[#5EEAD4]/30 rounded-[2px]"
                                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                    />
                                )}
                                <div className="absolute inset-0 -skew-x-[12deg] bg-indigo-600 dark:bg-[#5EEAD4] opacity-0 group-hover:opacity-100 scale-x-50 group-hover:scale-x-100 transition-all duration-300 origin-center -z-10 rounded-[2px]" />
                                <span className="relative z-10 text-[13px] font-black uppercase tracking-widest leading-none">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="group relative px-7 py-3 transition-all duration-300 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-[#4338CA] dark:bg-[#5EEAD4] shadow-xl shadow-indigo-500/10 dark:shadow-[#5EEAD4]/20 group-hover:shadow-[rgba(67,56,202,0.3)] dark:group-hover:shadow-[rgba(94,234,212,0.3)] group-hover:brightness-110 transition-all rounded-xl" />
                        <span className="relative z-10 text-[13px] font-black uppercase tracking-widest text-white dark:text-slate-900 whitespace-nowrap">
                            Hire Me
                        </span>
                    </Link>
                </div>

                {/* Mobile Header Controls */}
                <div className="flex items-center gap-3 md:hidden z-50">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-3 -mr-3 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 transition-all active:scale-90"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} className="text-zinc-600 dark:text-zinc-400" /> : <Menu size={24} className="text-zinc-600 dark:text-zinc-400" />}
                    </button>
                </div>
            </div>

            {/* Mobile Bottom Sheet Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
                        />

                        {/* Bottom Sheet */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            drag="y"
                            dragConstraints={{ top: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, info) => {
                                if (info.offset.y > 100) setIsMobileMenuOpen(false);
                            }}
                            className="fixed bottom-0 left-0 right-0 z-50 max-h-[75vh] bg-background border-t rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:hidden overflow-hidden flex flex-col"
                        >
                            {/* Handle Bar */}
                            <div className="flex justify-center p-4">
                                <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                            </div>

                            <div className="px-6 pb-12 overflow-y-auto custom-scrollbar flex-1">
                                <nav className="space-y-3 mt-4">
                                    {/* Primary Links */}
                                    {mobilePrimaryLinks.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    "group relative flex items-center justify-between px-6 py-5 rounded-3xl transition-all active:scale-[0.98]",
                                                    item.isCTA
                                                        ? "bg-indigo-600 dark:bg-[#5EEAD4] text-white dark:text-slate-900 shadow-lg shadow-indigo-500/20"
                                                        : isActive
                                                            ? "bg-slate-100 dark:bg-slate-900 border border-indigo-500/20"
                                                            : "bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50"
                                                )}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <span className={cn(
                                                    "text-sm font-black uppercase tracking-[0.2em]",
                                                    isActive && !item.isCTA ? "text-indigo-600 dark:text-[#5EEAD4]" : ""
                                                )}>
                                                    {item.name}
                                                </span>
                                                <ArrowRight size={18} className={cn(
                                                    "transition-transform",
                                                    item.isCTA ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                )} />
                                            </Link>
                                        );
                                    })}

                                    {/* Secondary Accordion */}
                                    <div className="pt-2">
                                        <button
                                            onClick={() => setIsSecondaryOpen(!isSecondaryOpen)}
                                            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-transparent text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <span className="text-xs font-bold uppercase tracking-widest">More Links</span>
                                            <ChevronDown size={16} className={cn("transition-transform duration-300", isSecondaryOpen ? "rotate-180" : "")} />
                                        </button>

                                        <AnimatePresence>
                                            {isSecondaryOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden space-y-2 mt-2"
                                                >
                                                    {mobileSecondaryLinks.map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            className="flex items-center px-8 py-3 text-sm text-muted-foreground hover:text-indigo-600 dark:hover:text-[#5EEAD4] transition-colors"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </nav>

                                {/* Footer Contact CTA */}
                                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <Link
                                        href="mailto:contact@nahianbinrahman.com"
                                        className="flex items-center justify-center gap-3 w-full px-6 py-5 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-widest transition-transform active:scale-95"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Mail size={16} />
                                        Email Me Directly
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}

