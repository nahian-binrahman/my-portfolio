"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Speaking", href: "/speaking" },
    { name: "Services", href: "/services" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 z-50">
                    <Link href="/" className="text-xl font-bold tracking-tight text-[#4338CA] dark:text-[#5EEAD4]">
                        Nahian B. Rahman
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "group relative px-4 py-2 transition-all duration-300",
                                    isActive ? "text-white dark:text-slate-900" : "text-muted-foreground hover:text-white dark:hover:text-slate-900 transition-none"
                                )}
                            >
                                {/* Active Link Parallelogram */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-parallelogram"
                                        className="absolute inset-0 -skew-x-[15deg] bg-indigo-600 dark:bg-[#5EEAD4] shadow-lg shadow-indigo-500/20 dark:shadow-[#5EEAD4]/30 rounded-[2px]"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 32,
                                        }}
                                    />
                                )}

                                {/* Hover Slant Transition */}
                                <div className="absolute inset-0 -skew-x-[15deg] bg-indigo-600 dark:bg-[#5EEAD4] opacity-0 group-hover:opacity-100 scale-x-50 group-hover:scale-x-100 transition-all duration-300 origin-center -z-10 rounded-[2px]" />

                                <span className="relative z-10 text-[10px] font-black uppercase tracking-widest leading-none">
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
                        className="group relative px-6 py-2.5 transition-all duration-300 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-[#4338CA] dark:bg-[#5EEAD4] shadow-xl shadow-indigo-500/10 dark:shadow-[#5EEAD4]/20 group-hover:shadow-[rgba(67,56,202,0.3)] dark:group-hover:shadow-[rgba(94,234,212,0.3)] group-hover:brightness-110 transition-all rounded-xl" />
                        <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-white dark:text-slate-900 whitespace-nowrap">
                            Hire Me
                        </span>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden z-50">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Content */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 top-[64px] z-40 bg-background/98 backdrop-blur-2xl md:hidden flex flex-col"
                    >
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

                        <div className="flex-1 container mx-auto px-6 py-12 flex flex-col justify-between relative z-10">
                            <nav className="flex flex-col gap-4">
                                {navItems.map((item, idx) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: idx * 0.08,
                                                type: "spring",
                                                stiffness: 100
                                            }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "group relative block px-6 py-4 transition-all duration-300",
                                                    isActive ? "text-white dark:text-slate-900" : "text-slate-500 dark:text-slate-400"
                                                )}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {/* Parallelogram Background */}
                                                <div className={cn(
                                                    "absolute inset-0 -skew-x-[12deg] rounded-lg transition-all duration-300",
                                                    isActive
                                                        ? "bg-indigo-600 dark:bg-[#5EEAD4] shadow-xl shadow-indigo-500/20"
                                                        : "bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50"
                                                )} />

                                                <div className="relative z-10 flex items-center justify-between">
                                                    <span className="text-sm font-black uppercase tracking-[0.2em]">
                                                        {item.name}
                                                    </span>
                                                    <ArrowRight size={18} className={cn(
                                                        "transition-transform",
                                                        isActive ? "translate-x-0" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                    )} />
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="pb-8"
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="group relative block w-full px-8 py-5 text-center active:scale-95 transition-all"
                                >
                                    <div className="absolute inset-0 bg-indigo-600 dark:bg-[#5EEAD4] shadow-2xl shadow-indigo-500/30 dark:shadow-cyan-500/20 rounded-2xl" />
                                    <span className="relative z-10 text-xs font-black uppercase tracking-[0.3em] text-white dark:text-slate-900">
                                        Hire Me Now
                                    </span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
