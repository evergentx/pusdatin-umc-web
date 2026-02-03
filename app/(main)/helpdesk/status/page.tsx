"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";

export default function CheckStatusPage() {
    const router = useRouter();
    const [ticketNumber, setTicketNumber] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!ticketNumber.trim()) {
            setError("Masukkan nomor tiket");
            return;
        }

        setIsSearching(true);

        // Simulate API check
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Navigate to ticket detail
        router.push(`/helpdesk/status/${ticketNumber.trim()}`);
    };

    return (
        <div className="min-h-screen bg-muted/30 py-8">
            <div className="container mx-auto px-4 max-w-lg">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Kembali ke Beranda
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        Cek Status Tiket
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Masukkan nomor tiket untuk melihat status penanganan
                    </p>
                </div>

                {/* Search Form */}
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Nomor Tiket"
                                placeholder="Contoh: TKT-12345678"
                                value={ticketNumber}
                                onChange={(e) => {
                                    setTicketNumber(e.target.value.toUpperCase());
                                    setError("");
                                }}
                                error={error}
                                leftIcon={<Search size={18} />}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                isLoading={isSearching}
                                leftIcon={<Search size={18} />}
                            >
                                Cari Tiket
                            </Button>
                        </form>

                        <Alert variant="info" className="mt-6">
                            <p className="text-sm">
                                <strong>Tips:</strong> Nomor tiket dikirim ke email Anda setelah
                                membuat tiket. Format: TKT-XXXXXXXX
                            </p>
                        </Alert>
                    </CardContent>
                </Card>

                {/* Alternative Actions */}
                <div className="mt-8 text-center">
                    <p className="text-muted-foreground mb-4">
                        Tidak menemukan nomor tiket?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/helpdesk/tiket-baru">
                            <Button variant="outline" className="w-full sm:w-auto">
                                Buat Tiket Baru
                            </Button>
                        </Link>
                        <Link href="/helpdesk/riwayat">
                            <Button variant="ghost" className="w-full sm:w-auto">
                                Lihat Riwayat Tiket
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
