import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/ui/structure";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function CTAStrip() {
    return (
        <Section className="bg-[#4338CA] dark:bg-slate-900 border-t border-indigo-500/20 dark:border-indigo-900/50 py-24 md:py-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white dark:bg-[#5EEAD4] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-white dark:bg-[#5EEAD4] rounded-full translate-x-1/2 translate-y-1/2 blur-[150px]" />
            </div>
            <Container className="relative z-10 text-center">
                <h2 className="text-4xl font-black text-white dark:text-[#5EEAD4] sm:text-6xl tracking-tight leading-tight">
                    Ready to build <span className="underline decoration-white/20 underline-offset-8">something amazing?</span>
                </h2>
                <p className="mt-8 text-white/80 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    I'm currently available for freelance projects and full-time opportunities.
                    Let's talk about your next big idea and bring it to life.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-6">
                    <Button asChild size="lg" className="bg-white text-[#4338CA] hover:bg-slate-50 dark:bg-[#5EEAD4] dark:text-slate-900 dark:hover:bg-[#2DD4BF] font-black uppercase tracking-widest px-10 h-14 shadow-2xl transition-all hover:scale-105 active:scale-95">
                        <Link href="/contact" className="gap-2">
                            <Mail className="h-5 w-5" /> Let's Connect
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 dark:text-[#5EEAD4] dark:border-[#5EEAD4]/30 dark:hover:bg-[#5EEAD4]/10 font-black uppercase tracking-widest px-10 h-14 transition-all hover:scale-105 active:scale-95">
                        <Link href="/projects">
                            Work Gallery
                        </Link>
                    </Button>
                </div>
            </Container>
        </Section>
    );
}
