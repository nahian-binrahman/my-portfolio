"use client";

import { LogoutButton } from "@/components/admin/logout-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, FolderKanban, Settings, ExternalLink, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 w-full h-16 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-between px-4">
                <Link href="/admin" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                    CMS
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X /> : <Menu />}
                </Button>
            </header>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Admin Sidebar */}
            <aside className={cn(
                "fixed left-0 top-0 h-full w-72 flex-col border-r bg-white dark:bg-slate-900 z-50 transition-transform duration-300 md:translate-x-0 md:flex shadow-2xl md:shadow-none",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-20 items-center border-b px-8">
                    <Link href="/admin" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">
                            NB
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Nahian<span className="text-indigo-600 dark:text-[#5EEAD4]">Admin</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 space-y-2 p-6 overflow-y-auto">
                    <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">Main Menu</p>
                    <AdminNavLink href="/admin" icon={<LayoutDashboard size={20} />} active={pathname === "/admin"}>Dashboard</AdminNavLink>
                    <AdminNavLink href="/admin/posts" icon={<FileText size={20} />} active={pathname.startsWith("/admin/posts")}>Blog Writing</AdminNavLink>
                    <AdminNavLink href="/admin/projects" icon={<FolderKanban size={20} />} active={pathname.startsWith("/admin/projects")}>Portfolio Projects</AdminNavLink>

                    <div className="pt-8 mb-2">
                        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">System</p>
                    </div>
                    <AdminNavLink href="/admin/settings" icon={<Settings size={20} />} active={pathname === "/admin/settings"}>Global Settings</AdminNavLink>
                </nav>

                <div className="mt-auto border-t p-6 bg-slate-50/50 dark:bg-slate-950/20">
                    <Link
                        href="/"
                        className="flex items-center justify-between group rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-[#5EEAD4] transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm"
                        target="_blank"
                    >
                        <div className="flex items-center gap-3">
                            <ExternalLink size={18} />
                            <span>Live Site</span>
                        </div>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all" />
                    </Link>
                    <div className="mt-3">
                        <LogoutButton />
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:pl-72 pt-16 md:pt-0">
                <div className="min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}

function AdminNavLink({ href, icon, children, active }: { href: string; icon: React.ReactNode; children: React.ReactNode; active?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                active
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-[#5EEAD4] shadow-sm shadow-indigo-100 dark:shadow-none translate-x-1"
                    : "text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800/50"
            )}
        >
            <div className={cn(
                "transition-colors",
                active ? "text-indigo-600 dark:text-[#5EEAD4]" : "text-slate-400 group-hover:text-slate-600"
            )}>
                {icon}
            </div>
            <span>{children}</span>
            {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-[#5EEAD4]" />
            )}
        </Link>
    );
}

function ArrowRight({ size, className }: { size: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14m-7-7 7 7-7 7" />
        </svg>
    );
}
