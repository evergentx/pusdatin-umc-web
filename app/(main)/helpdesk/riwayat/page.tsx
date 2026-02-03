"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    Filter,
    ArrowLeft,
    Calendar,
    ChevronDown,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { NoDataState } from "@/components/ui/EmptyState";
import { formatRelativeTime, formatDate } from "@/lib/format";
import { mockTickets } from "@/lib/mock";
import { Ticket, TicketStatus, TicketPriority, TicketCategory } from "@/types/ticket";

const statusOptions = [
    { value: "", label: "Semua Status" },
    { value: TicketStatus.OPEN, label: "Menunggu" },
    { value: TicketStatus.IN_PROGRESS, label: "Sedang Ditangani" },
    { value: TicketStatus.WAITING_USER, label: "Menunggu Respons" },
    { value: TicketStatus.RESOLVED, label: "Selesai" },
    { value: TicketStatus.CLOSED, label: "Ditutup" },
    { value: TicketStatus.ESCALATED, label: "Dieskalasi" },
];

const priorityOptions = [
    { value: "", label: "Semua Prioritas" },
    { value: TicketPriority.LOW, label: "Rendah" },
    { value: TicketPriority.MEDIUM, label: "Sedang" },
    { value: TicketPriority.HIGH, label: "Tinggi" },
    { value: TicketPriority.URGENT, label: "Urgent" },
];

const categoryOptions = [
    { value: "", label: "Semua Kategori" },
    { value: TicketCategory.NETWORK, label: "Jaringan" },
    { value: TicketCategory.HARDWARE, label: "Hardware" },
    { value: TicketCategory.SOFTWARE, label: "Software" },
    { value: TicketCategory.ACCOUNT, label: "Akun / SSO" },
    { value: TicketCategory.EMAIL, label: "Email" },
    { value: TicketCategory.SIAKAD, label: "SIAKAD" },
    { value: TicketCategory.LMS, label: "LMS" },
    { value: TicketCategory.OTHER, label: "Lainnya" },
];

const statusLabels: Record<TicketStatus, string> = {
    [TicketStatus.OPEN]: "Menunggu",
    [TicketStatus.IN_PROGRESS]: "Sedang Ditangani",
    [TicketStatus.WAITING_USER]: "Menunggu Respons",
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

export default function TicketHistoryPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 600));
            setTickets(mockTickets);
            setIsLoading(false);
        };
        loadData();
    }, []);

    const filteredTickets = useMemo(() => {
        return tickets.filter((ticket) => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    ticket.ticketNumber.toLowerCase().includes(query) ||
                    ticket.subject.toLowerCase().includes(query) ||
                    ticket.description.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            // Status filter
            if (statusFilter && ticket.status !== statusFilter) return false;

            // Priority filter
            if (priorityFilter && ticket.priority !== priorityFilter) return false;

            // Category filter
            if (categoryFilter && ticket.category !== categoryFilter) return false;

            return true;
        });
    }, [tickets, searchQuery, statusFilter, priorityFilter, categoryFilter]);

    const activeFiltersCount = [statusFilter, priorityFilter, categoryFilter].filter(Boolean).length;

    const clearFilters = () => {
        setStatusFilter("");
        setPriorityFilter("");
        setCategoryFilter("");
    };

    if (isLoading) {
        return <PageLoader text="Memuat riwayat tiket..." />;
    }

    return (
        <div className="min-h-screen bg-muted/30 py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Kembali ke Dashboard
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        Riwayat Tiket
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Lihat semua tiket yang pernah Anda buat
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <Card className="mb-6">
                    <CardContent className="pt-5">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Input */}
                            <div className="flex-1">
                                <Input
                                    placeholder="Cari tiket berdasarkan nomor, subjek, atau deskripsi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    leftIcon={<Search size={18} />}
                                    rightIcon={
                                        searchQuery ? (
                                            <button
                                                onClick={() => setSearchQuery("")}
                                                className="hover:text-foreground"
                                            >
                                                <X size={16} />
                                            </button>
                                        ) : undefined
                                    }
                                />
                            </div>

                            {/* Filter Toggle */}
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                leftIcon={<Filter size={18} />}
                                rightIcon={<ChevronDown size={16} className={showFilters ? "rotate-180 transition-transform" : "transition-transform"} />}
                            >
                                Filter
                                {activeFiltersCount > 0 && (
                                    <Badge variant="info" size="sm" className="ml-2">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                        </div>

                        {/* Filters Panel */}
                        {showFilters && (
                            <div className="mt-4 pt-4 border-t border-border">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Select
                                        label="Status"
                                        options={statusOptions}
                                        value={statusFilter}
                                        onChange={setStatusFilter}
                                    />
                                    <Select
                                        label="Prioritas"
                                        options={priorityOptions}
                                        value={priorityFilter}
                                        onChange={setPriorityFilter}
                                    />
                                    <Select
                                        label="Kategori"
                                        options={categoryOptions}
                                        value={categoryFilter}
                                        onChange={setCategoryFilter}
                                    />
                                </div>
                                {activeFiltersCount > 0 && (
                                    <div className="mt-4 flex justify-end">
                                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                                            Hapus Filter
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Results Count */}
                <div className="mb-4 text-sm text-muted-foreground">
                    Menampilkan {filteredTickets.length} dari {tickets.length} tiket
                </div>

                {/* Ticket List */}
                {filteredTickets.length === 0 ? (
                    <NoDataState
                        title="Tidak ada tiket ditemukan"
                        description={
                            searchQuery || activeFiltersCount > 0
                                ? "Coba ubah kata kunci atau filter pencarian Anda"
                                : "Anda belum pernah membuat tiket"
                        }
                        action={
                            searchQuery || activeFiltersCount > 0
                                ? {
                                    label: "Reset Pencarian",
                                    onClick: () => {
                                        setSearchQuery("");
                                        clearFilters();
                                    },
                                }
                                : {
                                    label: "Buat Tiket Baru",
                                    onClick: () => window.location.href = "/helpdesk/tiket-baru",
                                }
                        }
                    />
                ) : (
                    <div className="space-y-4">
                        {filteredTickets.map((ticket) => (
                            <Link
                                key={ticket.id}
                                href={`/helpdesk/status/${ticket.ticketNumber}`}
                                className="block"
                            >
                                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardContent className="pt-5">
                                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                                    <span className="text-sm font-medium text-primary">
                                                        {ticket.ticketNumber}
                                                    </span>
                                                    <Badge variant="outline" size="sm">
                                                        {ticket.category}
                                                    </Badge>
                                                    <Badge
                                                        variant={
                                                            ticket.priority === TicketPriority.URGENT
                                                                ? "destructive"
                                                                : ticket.priority === TicketPriority.HIGH
                                                                    ? "warning"
                                                                    : "default"
                                                        }
                                                        size="sm"
                                                    >
                                                        {priorityLabels[ticket.priority]}
                                                    </Badge>
                                                </div>
                                                <h3 className="text-base font-semibold text-foreground mb-1">
                                                    {ticket.subject}
                                                </h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {ticket.description}
                                                </p>
                                                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {formatDate(ticket.createdAt)}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{formatRelativeTime(ticket.createdAt)}</span>
                                                </div>
                                            </div>
                                            <div className="flex md:flex-col items-center md:items-end gap-2">
                                                <StatusBadge status={ticket.status.toLowerCase()}>
                                                    {statusLabels[ticket.status]}
                                                </StatusBadge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
