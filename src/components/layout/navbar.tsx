"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-3 py-2 text-sm font-medium transition-colors hover:text-[#4338CA] dark:hover:text-[#5EEAD4]",
                                    isActive ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4338CA] dark:bg-[#5EEAD4]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <Button asChild variant="default" className="bg-[#4338CA] hover:bg-[#3730a3] dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 text-white shadow-lg shadow-indigo-500/20 dark:shadow-[#5EEAD4]/20">
                        <Link href="/contact">Hire Me</Link>
                    </Button>
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="container mx-auto px-4 py-8 flex flex-col gap-6 h-full overflow-y-auto">
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item, idx) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center justify-between p-4 rounded-xl text-lg font-medium transition-all",
                                                    isActive
                                                        ? "bg-indigo-50/50 dark:bg-indigo-500/10 text-[#4338CA] dark:text-[#5EEAD4]"
                                                        : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-900"
                                                )}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#4338CA] dark:bg-[#5EEAD4]" />}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-auto pb-10"
                            >
                                <Button asChild size="lg" className="w-full bg-[#4338CA] hover:bg-[#3730a3] dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 text-white text-lg font-bold h-12 shadow-xl">
                                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                        Hire Me
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
