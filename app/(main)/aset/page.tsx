"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Laptop,
    Monitor,
    Projector,
    Printer,
    Search,
    Filter,
    ArrowLeft,
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle,
    Package,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { NoDataState } from "@/components/ui/EmptyState";

interface Asset {
    id: string;
    name: string;
    code: string;
    category: "laptop" | "monitor" | "projector" | "printer" | "other";
    status: "available" | "borrowed" | "maintenance" | "reserved";
    location: string;
    specs?: string;
    imageUrl?: string;
}

interface BorrowRequest {
    id: string;
    asset: Asset;
    borrowDate: string;
    returnDate: string;
    status: "pending" | "approved" | "rejected" | "returned";
    purpose: string;
}

const categoryIcons = {
    laptop: Laptop,
    monitor: Monitor,
    projector: Projector,
    printer: Printer,
    other: Package,
};

const categoryLabels = {
    laptop: "Laptop",
    monitor: "Monitor",
    projector: "Proyektor",
    printer: "Printer",
    other: "Lainnya",
};

const statusLabels = {
    available: "Tersedia",
    borrowed: "Dipinjam",
    maintenance: "Maintenance",
    reserved: "Dipesan",
};

const statusColors = {
    available: "success",
    borrowed: "warning",
    maintenance: "info",
    reserved: "default",
};

const mockAssets: Asset[] = [
    {
        id: "1",
        name: "Laptop Asus ROG",
        code: "LPT-001",
        category: "laptop",
        status: "available",
        location: "Ruang Pusdatin",
        specs: "Intel i7, 16GB RAM, RTX 3060",
    },
    {
        id: "2",
        name: "Laptop HP Pavilion",
        code: "LPT-002",
        category: "laptop",
        status: "borrowed",
        location: "Ruang Pusdatin",
        specs: "Intel i5, 8GB RAM",
    },
    {
        id: "3",
        name: "Proyektor Epson EB-X51",
        code: "PRJ-001",
        category: "projector",
        status: "available",
        location: "Gudang A",
        specs: "3800 Lumens, XGA",
    },
    {
        id: "4",
        name: "Monitor LG 27 inch",
        code: "MON-001",
        category: "monitor",
        status: "available",
        location: "Ruang Pusdatin",
        specs: "27 inch, 4K UHD",
    },
    {
        id: "5",
        name: "Printer HP LaserJet",
        code: "PRT-001",
        category: "printer",
        status: "maintenance",
        location: "Ruang Pusdatin",
        specs: "Laser, B/W",
    },
];

const mockBorrowHistory: BorrowRequest[] = [
    {
        id: "1",
        asset: mockAssets[1],
        borrowDate: "2026-02-01",
        returnDate: "2026-02-05",
        status: "approved",
        purpose: "Presentasi proyek akhir",
    },
    {
        id: "2",
        asset: mockAssets[2],
        borrowDate: "2026-01-25",
        returnDate: "2026-01-26",
        status: "returned",
        purpose: "Seminar nasional",
    },
];

const categoryOptions = [
    { value: "", label: "Semua Kategori" },
    { value: "laptop", label: "Laptop" },
    { value: "monitor", label: "Monitor" },
    { value: "projector", label: "Proyektor" },
    { value: "printer", label: "Printer" },
    { value: "other", label: "Lainnya" },
];

const statusOptions = [
    { value: "", label: "Semua Status" },
    { value: "available", label: "Tersedia" },
    { value: "borrowed", label: "Dipinjam" },
    { value: "maintenance", label: "Maintenance" },
    { value: "reserved", label: "Dipesan" },
];

export default function AssetPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"catalog" | "history">("catalog");
    const [assets, setAssets] = useState<Asset[]>([]);
    const [borrowHistory, setBorrowHistory] = useState<BorrowRequest[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const loadData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 600));
            setAssets(mockAssets);
            setBorrowHistory(mockBorrowHistory);
            setIsLoading(false);
        };
        loadData();
    }, []);

    const filteredAssets = assets.filter((asset) => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (
                !asset.name.toLowerCase().includes(query) &&
                !asset.code.toLowerCase().includes(query)
            ) {
                return false;
            }
        }
        if (categoryFilter && asset.category !== categoryFilter) return false;
        if (statusFilter && asset.status !== statusFilter) return false;
        return true;
    });

    if (isLoading) {
        return <PageLoader text="Memuat data aset..." />;
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
                        Manajemen Aset TI
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Pinjam peralatan IT untuk kebutuhan akademik
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <Button
                        variant={activeTab === "catalog" ? "primary" : "outline"}
                        onClick={() => setActiveTab("catalog")}
                    >
                        Katalog Aset
                    </Button>
                    <Button
                        variant={activeTab === "history" ? "primary" : "outline"}
                        onClick={() => setActiveTab("history")}
                    >
                        Riwayat Peminjaman
                    </Button>
                </div>

                {activeTab === "catalog" && (
                    <>
                        {/* Search & Filter */}
                        <Card className="mb-6">
                            <CardContent className="pt-5">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="md:col-span-2">
                                        <Input
                                            placeholder="Cari nama atau kode aset..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            leftIcon={<Search size={18} />}
                                        />
                                    </div>
                                    <Select
                                        options={categoryOptions}
                                        value={categoryFilter}
                                        onChange={setCategoryFilter}
                                        placeholder="Kategori"
                                    />
                                    <Select
                                        options={statusOptions}
                                        value={statusFilter}
                                        onChange={setStatusFilter}
                                        placeholder="Status"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Asset Grid */}
                        {filteredAssets.length === 0 ? (
                            <NoDataState
                                title="Tidak ada aset ditemukan"
                                description="Coba ubah filter pencarian Anda"
                            />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredAssets.map((asset) => {
                                    const Icon = categoryIcons[asset.category];
                                    return (
                                        <Card key={asset.id} className="hover:shadow-md transition-shadow">
                                            <CardContent className="pt-5">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 rounded-xl bg-primary/10">
                                                        <Icon className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs text-muted-foreground">
                                                                {asset.code}
                                                            </span>
                                                            <Badge
                                                                variant={statusColors[asset.status] as "success" | "warning" | "info" | "default"}
                                                                size="sm"
                                                            >
                                                                {statusLabels[asset.status]}
                                                            </Badge>
                                                        </div>
                                                        <h3 className="font-semibold text-foreground mb-1">
                                                            {asset.name}
                                                        </h3>
                                                        {asset.specs && (
                                                            <p className="text-sm text-muted-foreground mb-2">
                                                                {asset.specs}
                                                            </p>
                                                        )}
                                                        <p className="text-xs text-muted-foreground">
                                                            📍 {asset.location}
                                                        </p>
                                                    </div>
                                                </div>
                                                {asset.status === "available" && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full mt-4"
                                                    >
                                                        Ajukan Peminjaman
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                {activeTab === "history" && (
                    <>
                        {borrowHistory.length === 0 ? (
                            <NoDataState
                                title="Belum ada riwayat peminjaman"
                                description="Anda belum pernah meminjam aset TI"
                                action={{
                                    label: "Lihat Katalog",
                                    onClick: () => setActiveTab("catalog"),
                                }}
                            />
                        ) : (
                            <div className="space-y-4">
                                {borrowHistory.map((request) => {
                                    const Icon = categoryIcons[request.asset.category];
                                    return (
                                        <Card key={request.id}>
                                            <CardContent className="pt-5">
                                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <div className="p-3 rounded-xl bg-primary/10">
                                                            <Icon className="h-6 w-6 text-primary" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold">
                                                                {request.asset.name}
                                                            </h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {request.purpose}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-1 text-muted-foreground">
                                                            <Calendar size={14} />
                                                            {request.borrowDate} - {request.returnDate}
                                                        </div>
                                                        <Badge
                                                            variant={
                                                                request.status === "approved"
                                                                    ? "success"
                                                                    : request.status === "returned"
                                                                        ? "default"
                                                                        : request.status === "pending"
                                                                            ? "warning"
                                                                            : "destructive"
                                                            }
                                                        >
                                                            {request.status === "approved" && "Disetujui"}
                                                            {request.status === "returned" && "Dikembalikan"}
                                                            {request.status === "pending" && "Menunggu"}
                                                            {request.status === "rejected" && "Ditolak"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
