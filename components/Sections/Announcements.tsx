import Link from "next/link";
import { ArrowRight, Bell, AlertTriangle, Info, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeTime } from "@/lib/format";
import { getRecentAnnouncements } from "@/lib/mock";
import { AnnouncementPriority } from "@/types/service";

const priorityConfig = {
    [AnnouncementPriority.CRITICAL]: {
        icon: AlertTriangle,
        color: "destructive" as const,
    },
    [AnnouncementPriority.HIGH]: {
        icon: Bell,
        color: "warning" as const,
    },
    [AnnouncementPriority.NORMAL]: {
        icon: Megaphone,
        color: "info" as const,
    },
    [AnnouncementPriority.LOW]: {
        icon: Info,
        color: "default" as const,
    },
};

export default function Announcements() {
    const announcements = getRecentAnnouncements(4);

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground tracking-tight">
                            Pengumuman Terbaru
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Informasi penting seputar layanan Pusdatin
                        </p>
                    </div>
                    <Link href="/pengumuman" className="hidden md:block mt-4 md:mt-0">
                        <Button className="bg-black text-white hover:bg-black/90 px-6 h-10 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95">
                            Lihat Semua
                            <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {announcements.map((announcement) => {
                        const config = priorityConfig[announcement.priority];
                        const Icon = config.icon;

                        return (
                            <Card key={announcement.id} hover className="group">
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`flex-shrink-0 p-2 rounded-lg ${announcement.priority === AnnouncementPriority.CRITICAL
                                                ? "bg-destructive/10 text-destructive"
                                                : announcement.priority === AnnouncementPriority.HIGH
                                                    ? "bg-warning/10 text-warning"
                                                    : "bg-info/10 text-info"
                                                }`}
                                        >
                                            <Icon size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant={config.color} size="sm">
                                                    {announcement.category}
                                                </Badge>
                                                {announcement.isPinned && (
                                                    <Badge variant="secondary" size="sm">
                                                        📌 Disematkan
                                                    </Badge>
                                                )}
                                            </div>
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                {announcement.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                {announcement.excerpt || announcement.content}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                {formatRelativeTime(announcement.publishedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Mobile link */}
                <div className="text-center mt-6 md:hidden">
                    <Link href="/pengumuman">
                        <Button className="bg-black text-white hover:bg-black/90 px-6 h-10 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 w-full justify-between">
                            Lihat Semua Pengumuman
                            <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
