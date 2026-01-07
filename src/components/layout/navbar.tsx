"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNavDrawer } from "./mobile-nav-drawer";

export const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Speaking", href: "/speaking" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();

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
                                {/* Active Link Parallelogram */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-parallelogram"
                                        initial={{ skewX: -12 }}
                                        animate={{ skewX: -12 }}
                                        className="absolute inset-0 bg-indigo-600 dark:bg-[#5EEAD4] shadow-lg shadow-indigo-500/20 dark:shadow-[#5EEAD4]/30 rounded-[2px]"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 32,
                                        }}
                                    />
                                )}

                                {/* Hover Slant Transition */}
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

                {/* Mobile Menu Toggle & Drawer */}
                <div className="flex items-center gap-4 md:hidden z-50">
                    <MobileNavDrawer />
                </div>
            </div>
        </header>
    );
}
