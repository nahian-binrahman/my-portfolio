import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
    { name: "GitHub", href: "https://github.com/nahian", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/nahian", icon: Linkedin },
    { name: "X", href: "https://x.com/nahian", icon: Twitter },
    { name: "YouTube", href: "https://youtube.com/@nahian", icon: Youtube },
];

export function SocialLinks() {
    return (
        <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <Button key={link.name} variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href={link.href} target="_blank" rel="noopener noreferrer">
                            <Icon className="h-5 w-5" />
                            <span className="sr-only">{link.name}</span>
                        </Link>
                    </Button>
                );
            })}
        </div>
    );
}
