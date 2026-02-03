import { Metadata } from "next";
import { CheckCircle, AlertTriangle, XCircle, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceStatus } from "@/types/service";
import { getMockSystemServices } from "@/lib/mock";
import { formatRelativeTime } from "@/lib/format";

export const metadata: Metadata = {
    title: "Status Sistem",
    description: "Status real-time seluruh layanan IT Universitas Muhammadiyah Cirebon",
};

const statusConfig = {
    [ServiceStatus.OPERATIONAL]: {
        icon: CheckCircle,
        label: "Operasional",
        color: "text-success",
        bgColor: "bg-success/10",
        badgeVariant: "success" as const,
    },
    [ServiceStatus.DEGRADED]: {
        icon: AlertTriangle,
        label: "Performa Menurun",
        color: "text-warning",
        bgColor: "bg-warning/10",
        badgeVariant: "warning" as const,
    },
    [ServiceStatus.PARTIAL_OUTAGE]: {
        icon: AlertTriangle,
        label: "Gangguan Sebagian",
        color: "text-warning",
        bgColor: "bg-warning/10",
        badgeVariant: "warning" as const,
    },
    [ServiceStatus.MAJOR_OUTAGE]: {
        icon: XCircle,
        label: "Gangguan Total",
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        badgeVariant: "destructive" as const,
    },
    [ServiceStatus.MAINTENANCE]: {
        icon: RefreshCw,
        label: "Pemeliharaan",
        color: "text-info",
        bgColor: "bg-info/10",
        badgeVariant: "info" as const,
    },
};

export default function StatusPage() {
    const services = getMockSystemServices();
    const lastUpdated = new Date().toISOString();

    // Calculate overall status
    const hasOutage = services.some(
        (s) => s.status === ServiceStatus.MAJOR_OUTAGE
    );
    const hasDegraded = services.some(
        (s) =>
            s.status === ServiceStatus.DEGRADED ||
            s.status === ServiceStatus.PARTIAL_OUTAGE
    );

    const overallStatus = hasOutage
        ? "major_outage"
        : hasDegraded
            ? "degraded"
            : "operational";

    const overallConfig = {
        operational: {
            icon: CheckCircle,
            label: "Semua Sistem Operasional",
            description: "Seluruh layanan berjalan normal tanpa gangguan.",
            color: "text-success",
            bg: "bg-success/10 border-success/20",
        },
        degraded: {
            icon: AlertTriangle,
            label: "Beberapa Sistem Bermasalah",
            description: "Ada layanan yang mengalami gangguan sebagian.",
            color: "text-warning",
            bg: "bg-warning/10 border-warning/20",
        },
        major_outage: {
            icon: XCircle,
            label: "Gangguan Sistem",
            description: "Terdapat layanan yang mengalami gangguan major.",
            color: "text-destructive",
            bg: "bg-destructive/10 border-destructive/20",
        },
    };

    const overall = overallConfig[overallStatus];
    const OverallIcon = overall.icon;

    return (
        <div className="min-h-screen bg-muted/30 py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Status Sistem
                    </h1>
                    <p className="text-muted-foreground">
                        Pantau status seluruh layanan IT kampus secara real-time
                    </p>
                </div>

                {/* Overall Status */}
                <Card className={`border-2 ${overall.bg} mb-8`}>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${overall.bg}`}>
                                <OverallIcon size={32} className={overall.color} />
                            </div>
                            <div>
                                <h2 className={`text-xl font-bold ${overall.color}`}>
                                    {overall.label}
                                </h2>
                                <p className="text-muted-foreground">{overall.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                            <Clock size={14} />
                            Terakhir diperbarui: {formatRelativeTime(lastUpdated)}
                        </div>
                    </CardContent>
                </Card>

                {/* Services List */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                        Layanan
                    </h3>
                    {services.map((service) => {
                        const config = statusConfig[service.status];
                        const StatusIcon = config.icon;

                        return (
                            <Card key={service.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${config.bgColor}`}>
                                                <StatusIcon size={20} className={config.color} />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-foreground">
                                                    {service.name}
                                                </h4>
                                                {service.description && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {service.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <Badge variant={config.badgeVariant}>{config.label}</Badge>
                                    </div>

                                    {/* Show uptime bar */}
                                    {service.uptime && (
                                        <div className="mt-3">
                                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                                <span>Uptime 30 hari terakhir</span>
                                                <span>{service.uptime}%</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${service.uptime >= 99.9
                                                        ? "bg-success"
                                                        : service.uptime >= 99
                                                            ? "bg-warning"
                                                            : "bg-destructive"
                                                        }`}
                                                    style={{ width: `${service.uptime}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Show incident message if any */}
                                    {service.incident && (
                                        <div className={`mt-3 p-3 rounded-lg ${config.bgColor}`}>
                                            <p className="text-sm font-medium text-foreground">
                                                {service.incident.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {service.incident.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Sejak {formatRelativeTime(service.incident.startedAt)}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Uptime Legend */}
                <div className="mt-8 p-4 bg-card rounded-lg border border-border">
                    <h4 className="font-medium mb-3">Keterangan Status:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {Object.entries(statusConfig).map(([key, value]) => {
                            const Icon = value.icon;
                            return (
                                <div key={key} className="flex items-center gap-2 text-sm">
                                    <Icon size={16} className={value.color} />
                                    <span className="text-muted-foreground">{value.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Report Issue */}
                <div className="mt-8 text-center">
                    <p className="text-muted-foreground mb-4">
                        Mengalami masalah yang tidak tercantum di sini?
                    </p>
                    <a
                        href="/helpdesk/tiket-baru"
                        className="text-primary font-medium hover:underline"
                    >
                        Laporkan ke Helpdesk →
                    </a>
                </div>
            </div>
        </div>
    );
}
