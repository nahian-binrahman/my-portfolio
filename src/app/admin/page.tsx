import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, FolderKanban, Users, Eye, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const { user } = await requireAdmin();
    const supabase = await createClient();

    if (!supabase) {
        return <div className="p-8 text-center text-red-500">Supabase Error: Client not initialized.</div>;
    }

    // Parallel data fetching
    const [
        { count: postsCount },
        { count: projectsCount },
        { data: recentPosts },
        { data: recentProjects }
    ] = await Promise.all([
        supabase.from("posts").select("*", { count: 'exact', head: true }),
        supabase.from("projects").select("*", { count: 'exact', head: true }),
        supabase.from("posts").select("id, title, created_at").order("created_at", { ascending: false }).limit(3),
        supabase.from("projects").select("id, title, created_at").order("created_at", { ascending: false }).limit(3)
    ]);

    const stats = [
        { name: "Total Posts", value: postsCount || "0", icon: <FileText className="text-blue-500" />, change: "Latest: " + (recentPosts?.[0]?.title?.slice(0, 20) || "none") + "..." },
        { name: "Total Projects", value: projectsCount || "0", icon: <FolderKanban className="text-cyan-500" />, change: "Latest: " + (recentProjects?.[0]?.title?.slice(0, 20) || "none") + "..." },
        { name: "Admin Sessions", value: "1", icon: <Users className="text-indigo-500" />, change: "Active: " + user?.email },
        { name: "Page Views", value: "---", icon: <Eye className="text-emerald-500" />, change: "Vercel Analytics Only" },
    ];

    interface ActivityItem {
        id: string;
        title: string;
        type: 'Post' | 'Project';
        date: string;
        href: string;
    }

    const activities: ActivityItem[] = [
        ...(recentPosts?.map((p: any) => ({ id: `post-${p.id}`, title: p.title, type: 'Post', date: p.created_at, href: `/admin/posts/${p.id}/edit` })) || []),
        ...(recentProjects?.map((p: any) => ({ id: `proj-${p.id}`, title: p.title, type: 'Project', date: p.created_at, href: `/admin/projects/${p.id}/edit` })) || [])
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-cyan-300">
                        Admin Overview
                    </h1>
                    <p className="text-muted-foreground mt-1 text-lg">Welcome back. Everything in your command center looks good.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
                    <Clock size={16} />
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.name} className="border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-all hover:shadow-lg hover:border-indigo-500/30 group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{stat.name}</CardTitle>
                            <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                            <p className="text-[10px] text-muted-foreground pt-1 truncate italic">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-7">
                <Card className="md:col-span-4 border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800/60">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Your latest modifications and content additions.</CardDescription>
                            </div>
                            <Link href="/admin/posts" className="text-xs text-indigo-600 dark:text-cyan-400 font-medium hover:underline flex items-center gap-1">
                                View all <ArrowRight size={12} />
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {activities.length > 0 ? (
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {activities.map((activity) => (
                                    <Link
                                        key={activity.id}
                                        href={activity.href}
                                        className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${activity.type === 'Post' ? 'bg-blue-500' : 'bg-cyan-500'}`} />
                                            <div>
                                                <p className="text-sm font-medium leading-none group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                                                    {activity.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {activity.type} • {new Date(activity.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform translate-x-1" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="h-48 flex flex-col items-center justify-center text-muted-foreground space-y-2">
                                <FileText size={32} className="opacity-20" />
                                <p className="text-sm italic">No recent activity found.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="md:col-span-3 border-slate-200/60 dark:border-slate-800/60 shadow-sm h-fit">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Shortcuts to essential management tasks.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-3">
                        <QuickActionButton href="/admin/posts/new" color="indigo">New Blog Post</QuickActionButton>
                        <QuickActionButton href="/admin/projects/new" color="cyan">Add New Project</QuickActionButton>
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-4 text-sm font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 group"
                        >
                            <span>Preview Live Portfolio</span>
                            <Eye size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function QuickActionButton({ href, children, color }: { href: string; children: React.ReactNode, color: 'indigo' | 'cyan' }) {
    const colorClasses = color === 'indigo'
        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-indigo-900/20"
        : "bg-cyan-500 hover:bg-cyan-600 text-slate-950 shadow-cyan-200 dark:shadow-cyan-900/20";

    return (
        <Link
            href={href}
            className={`flex items-center justify-between rounded-xl p-4 text-sm font-bold transition-all hover:-translate-y-0.5 shadow-lg ${colorClasses}`}
        >
            <span>{children}</span>
            <div className="bg-white/20 p-1 rounded-lg">
                <ArrowRight size={16} />
            </div>
        </Link>
    );
}
