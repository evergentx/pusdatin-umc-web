"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Clock,
    User,
    Building,
    Mail,
    Phone,
    Paperclip,
    MessageSquare,
    AlertTriangle,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { TicketTimeline } from "@/components/ui/Timeline";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { NotFoundState } from "@/components/ui/EmptyState";
import { formatDate, formatRelativeTime, formatSLARemaining } from "@/lib/format";
import { getMockTicketByNumber } from "@/lib/mock";
import { Ticket, TicketStatus, TicketPriority } from "@/types/ticket";

const statusLabels: Record<TicketStatus, string> = {
    [TicketStatus.OPEN]: "Menunggu",
    [TicketStatus.IN_PROGRESS]: "Sedang Ditangani",
    [TicketStatus.WAITING_USER]: "Menunggu Respons Anda",
    [TicketStatus.RESOLVED]: "Selesai",
    [TicketStatus.CLOSED]: "Ditutup",
    [TicketStatus.ESCALATED]: "Dieskalasi",
};

const priorityLabels: Record<TicketPriority, string> = {
    [TicketPriority.LOW]: "Rendah",
    [TicketPriority.MEDIUM]: "Sedang",
    [TicketPriority.HIGH]: "Tinggi",
    [TicketPriority.URGENT]: "Urgent",
};

export default function TicketDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const ticketNumber = params.ticketId as string;
    const isSuccess = searchParams.get("success") === "true";

    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const loadTicket = async () => {
            setIsLoading(true);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 800));

            const foundTicket = getMockTicketByNumber(ticketNumber);

            if (foundTicket) {
                setTicket(foundTicket);
            } else {
                setNotFound(true);
            }

            setIsLoading(false);
        };

        loadTicket();
    }, [ticketNumber]);

    if (isLoading) {
        return <PageLoader text="Memuat detail tiket..." />;
    }

    if (notFound) {
        return (
            <div className="min-h-screen bg-muted/30 py-8">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Link
                        href="/helpdesk/status"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Kembali
                    </Link>
                    <NotFoundState
                        title="Tiket tidak ditemukan"
                        description={`Tiket dengan nomor "${ticketNumber}" tidak ditemukan. Pastikan nomor tiket sudah benar.`}
                        action={{
                            label: "Cari Tiket Lain",
                            onClick: () => window.location.href = "/helpdesk/status",
                        }}
                    />
                </div>
            </div>
        );
    }

    if (!ticket) return null;

    const slaInfo = formatSLARemaining(ticket.slaDeadline);

    return (
        <div className="min-h-screen bg-muted/30 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/helpdesk/status"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Kembali ke Cek Status
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                {ticket.ticketNumber}
                            </h1>
                            <p className="text-muted-foreground mt-1">{ticket.subject}</p>
                        </div>
                        <StatusBadge status={ticket.status.toLowerCase()} className="self-start">
                            {statusLabels[ticket.status]}
                        </StatusBadge>
                    </div>
                </div>

                {/* Success Alert */}
                {isSuccess && (
                    <Alert
                        variant="success"
                        title="Tiket berhasil dibuat!"
                        dismissible
                        className="mb-6"
                    >
                        Tiket Anda telah terdaftar. Tim kami akan segera merespons sesuai
                        SLA yang berlaku.
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Deskripsi Masalah</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground whitespace-pre-wrap">
                                    {ticket.description}
                                </p>

                                {/* Attachments */}
                                {ticket.attachments && ticket.attachments.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                            <Paperclip size={16} />
                                            Lampiran ({ticket.attachments.length})
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {ticket.attachments.map((file, idx) => (
                                                <a
                                                    key={idx}
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-primary hover:underline px-3 py-1 bg-primary/5 rounded-lg"
                                                >
                                                    {file.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Activity Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Clock size={18} />
                                    Riwayat Aktivitas
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <TicketTimeline activities={ticket.activities || []} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* SLA Info */}
                        <Card
                            className={
                                slaInfo.isOverdue
                                    ? "border-destructive bg-destructive/5"
                                    : slaInfo.isWarning
                                        ? "border-warning bg-warning/5"
                                        : ""
                            }
                        >
                            <CardContent className="pt-5">
                                <div className="flex items-center gap-2 mb-3">
                                    {slaInfo.isOverdue ? (
                                        <AlertTriangle className="text-destructive" size={20} />
                                    ) : (
                                        <Clock className="text-primary" size={20} />
                                    )}
                                    <h3 className="font-semibold">SLA Response</h3>
                                </div>
                                <div
                                    className={`text-2xl font-bold ${slaInfo.isOverdue
                                        ? "text-destructive"
                                        : slaInfo.isWarning
                                            ? "text-warning"
                                            : "text-success"
                                        }`}
                                >
                                    {slaInfo.text}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Deadline: {formatDate(ticket.slaDeadline)}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Ticket Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Informasi Tiket</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Kategori</span>
                                    <Badge>{ticket.category}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Prioritas</span>
                                    <Badge variant={ticket.priority === TicketPriority.URGENT ? "destructive" : ticket.priority === TicketPriority.HIGH ? "warning" : "default"}>
                                        {priorityLabels[ticket.priority]}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Dibuat</span>
                                    <span className="text-sm">{formatRelativeTime(ticket.createdAt)}</span>
                                </div>
                                {ticket.assignee && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">PIC</span>
                                        <span className="text-sm">{ticket.assignee.name}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Reporter Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Pelapor</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-muted-foreground" />
                                    <span className="text-sm">{ticket.reporter.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-muted-foreground" />
                                    <span className="text-sm">{ticket.reporter.email}</span>
                                </div>
                                {ticket.reporter.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-muted-foreground" />
                                        <span className="text-sm">{ticket.reporter.phone}</span>
                                    </div>
                                )}
                                {ticket.reporter.unit && (
                                    <div className="flex items-center gap-2">
                                        <Building size={16} className="text-muted-foreground" />
                                        <span className="text-sm">{ticket.reporter.unit}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardContent className="pt-5 space-y-2">
                                <Button variant="outline" className="w-full" leftIcon={<MessageSquare size={16} />}>
                                    Tambah Komentar
                                </Button>
                                <Link href="/helpdesk/tiket-baru" className="block">
                                    <Button variant="ghost" className="w-full">
                                        Buat Tiket Baru
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
