import { requireAdmin } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Shield, ShieldAlert, Database } from "lucide-react";

export default async function SettingsPage() {
    await requireAdmin();

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight">Site Settings</h1>
                <p className="text-muted-foreground mt-1 text-lg">Configure your global portfolio parameters and security.</p>
            </div>

            <div className="grid gap-8 max-w-4xl">
                <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                    <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b">
                        <div className="flex items-center gap-2">
                            <Shield className="text-indigo-600 dark:text-[#5EEAD4]" size={20} />
                            <CardTitle>Profile Configuration</CardTitle>
                        </div>
                        <CardDescription>Public information that appears across your site.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Display Name</Label>
                                <Input defaultValue="Nahian B. Rahman" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <Label>Professional Title</Label>
                                <Input defaultValue="Full Stack Engineer & AI Specialist" placeholder="Role" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Contact Email</Label>
                            <Input defaultValue="hello@nahian.dev" placeholder="Public email" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm border-l-4 border-l-amber-500">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-amber-600">
                            <ShieldAlert size={20} />
                            <CardTitle>Security & Access</CardTitle>
                        </div>
                        <CardDescription>Managed via environment variables for maximum security.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/50">
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-amber-900 dark:text-amber-200">Admin Authentication</p>
                                <p className="text-xs text-amber-800 dark:text-amber-400 opacity-80">Currently locked to ADMIN_EMAIL environment variable.</p>
                            </div>
                            <Badge className="bg-amber-500 text-white border-transparent uppercase text-[10px]">Secure</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-[#5EEAD4]">
                            <Database size={20} />
                            <CardTitle>Data Management</CardTitle>
                        </div>
                        <CardDescription>Supabase connection status and health.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="font-medium">Supabase Cloud Connected</span>
                            </div>
                            <Button variant="outline" size="sm">Check Health</Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end p-4">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 px-8 py-6 text-lg font-bold">
                        <Save size={18} className="mr-2" /> Save All Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`px-2 py-0.5 rounded-full font-bold tracking-wider ${className}`}>
            {children}
        </span>
    );
}
