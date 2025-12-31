"use client";

import Link from "next/link";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-xl font-bold tracking-tight text-indigo-600  dark:text-[#5EEAD4]">
                            Nahian Bin Rahman
                        </Link>
                        <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                            Full-Stack Engineer building scalable web & AI-powered products.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Pages</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400">About</Link></li>
                            <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400">Projects</Link></li>
                            <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
                        <div className="mt-4">
                            <SocialLinks />
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {currentYear} Nahian Bin Rahman. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
