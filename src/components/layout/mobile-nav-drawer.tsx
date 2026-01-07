"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowRight, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { navItems } from "./navbar"

export function MobileNavDrawer() {
    const pathname = usePathname()
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden -mr-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle menu"
                >
                    <Menu size={28} />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className={cn(
                    "w-[min(360px,65vw)] sm:w-[min(380px,50vw)] h-full p-0 flex flex-col border-l border-slate-200/50 dark:border-zinc-800/50 bg-background/95 backdrop-blur-xl transition-transform duration-500 rounded-l-[2rem] shadow-2xl",
                    "focus:outline-none"
                )}
            >
                <SheetHeader className="p-6 border-b border-slate-200/50 dark:border-zinc-800/50 flex flex-row items-center justify-between space-y-0">
                    <SheetTitle asChild>
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight text-[#4338CA] dark:text-[#5EEAD4]"
                            onClick={() => setOpen(false)}
                        >
                            Nahian B.
                        </Link>
                    </SheetTitle>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800">
                                <X size={20} />
                                <span className="sr-only">Close</span>
                            </Button>
                        </SheetClose>
                    </div>
                </SheetHeader>

                <nav className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "group relative flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300",
                                    isActive
                                        ? "bg-indigo-600 dark:bg-[#5EEAD4] text-white dark:text-slate-900 shadow-lg shadow-indigo-500/20"
                                        : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-zinc-900/50 hover:text-foreground"
                                )}
                            >
                                <span className="text-sm font-black uppercase tracking-[0.15em]">
                                    {item.name}
                                </span>
                                <ArrowRight
                                    size={18}
                                    className={cn(
                                        "transition-transform duration-300",
                                        isActive ? "translate-x-0" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                    )}
                                />
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-6 border-t border-slate-200/50 dark:border-zinc-800/50">
                    <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="group relative flex items-center justify-center gap-3 w-full px-8 py-4 bg-indigo-600 dark:bg-[#5EEAD4] text-white dark:text-slate-900 font-bold uppercase tracking-[0.2em] text-[13px] rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
                    >
                        <Mail size={18} />
                        Hire Me Now
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}
