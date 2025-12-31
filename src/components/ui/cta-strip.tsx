import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/ui/structure";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function CTAStrip() {
    return (
        <Section className="bg-[#4338CA] dark:bg-slate-900 border-t border-b overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white dark:bg-[#5EEAD4] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white dark:bg-[#5EEAD4] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            </div>
            <Container className="relative z-10 text-center">
                <h2 className="text-3xl font-bold text-white dark:text-[#5EEAD4] sm:text-4xl">
                    Ready to build something amazing?
                </h2>
                <p className="mt-4 text-white/80 dark:text-muted-foreground text-lg max-w-2xl mx-auto">
                    I'm currently available for freelance projects and full-time opportunities.
                    Let's talk about your next big idea.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="bg-white text-[#4338CA] hover:bg-slate-100 dark:bg-[#5EEAD4] dark:text-slate-900 dark:hover:bg-[#2DD4BF]">
                        <Link href="/contact" className="gap-2">
                            <Mail className="h-5 w-5" /> Email Me
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 dark:text-[#5EEAD4] dark:border-[#5EEAD4] dark:hover:bg-[#5EEAD4]/10">
                        <Link href="/services">
                            View Services
                        </Link>
                    </Button>
                </div>
            </Container>
        </Section>
    );
}
