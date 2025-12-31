"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Assuming sonner is used or I'll just use alerts

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!supabase) {
            toast.error("Supabase client not initialized. Check your .env.local keys.");
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            router.push("/admin");
            router.refresh();
            toast.success("Welcome back, Admin!");
        } catch (error: any) {
            toast.error(error.message || "Invalid login credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <Card className="w-full max-w-md shadow-2xl border-indigo-100 dark:border-indigo-900/20">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight text-indigo-600 dark:text-[#5EEAD4]">Admin Portal</CardTitle>
                    <CardDescription>Enter your credentials to access the dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                className="focus-visible:ring-indigo-600 dark:focus-visible:ring-[#5EEAD4]"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                className="focus-visible:ring-indigo-600 dark:focus-visible:ring-[#5EEAD4]"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#4338CA] hover:bg-[#3730a3] dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 text-white font-semibold py-6 text-lg transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? "Authenticating..." : "Login to Dashboard"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
