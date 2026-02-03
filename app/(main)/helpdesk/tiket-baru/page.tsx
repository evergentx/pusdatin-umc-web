"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import {
    ArrowLeft,
    Send,
    Paperclip,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectOption } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { useTicketStore } from "@/store/ticket-store";
import { createTicketSchema } from "@/lib/validations";
import { TicketCategory, TicketPriority } from "@/types/ticket";

const categoryOptions: SelectOption[] = [
    { value: TicketCategory.NETWORK, label: "🌐 Jaringan & Internet" },
    { value: TicketCategory.HARDWARE, label: "🖥️ Hardware / Perangkat" },
    { value: TicketCategory.SOFTWARE, label: "💿 Software / Aplikasi" },
    { value: TicketCategory.ACCOUNT, label: "🔐 Akun / SSO" },
    { value: TicketCategory.EMAIL, label: "📧 Email Institusi" },
    { value: TicketCategory.SIAKAD, label: "📚 SIAKAD" },
    { value: TicketCategory.LMS, label: "📝 E-Learning / LMS" },
    { value: TicketCategory.WEBSITE, label: "🌍 Website Kampus" },
    { value: TicketCategory.OTHER, label: "❓ Lainnya" },
];

const priorityOptions: SelectOption[] = [
    { value: TicketPriority.LOW, label: "🟢 Rendah - Tidak mengganggu pekerjaan" },
    { value: TicketPriority.MEDIUM, label: "🟡 Sedang - Ada solusi sementara" },
    { value: TicketPriority.HIGH, label: "🟠 Tinggi - Mengganggu pekerjaan" },
    { value: TicketPriority.URGENT, label: "🔴 Urgent - Dampak besar segera" },
];

export default function CreateTicketPage() {
    const router = useRouter();
    const { draft, setDraft, clearDraft, lastSaved } = useTicketStore();

    const [files, setFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDraftAlert, setShowDraftAlert] = useState(false);

    // Check for saved draft
    useEffect(() => {
        if (lastSaved && draft.subject) {
            setShowDraftAlert(true);
        }
    }, []);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            if (draft.subject || draft.description) {
                useTicketStore.getState().saveDraft();
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [draft]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        try {
            // Validate
            const result = createTicketSchema.safeParse({
                category: draft.category,
                subject: draft.subject,
                description: draft.description,
                priority: draft.priority,
                reporterName: draft.reporterName,
                reporterEmail: draft.reporterEmail,
                reporterPhone: draft.reporterPhone,
                reporterUnit: draft.reporterUnit,
            });

            if (!result.success) {
                const fieldErrors: Record<string, string> = {};
                result.error.errors.forEach((err: { path: (string | number)[]; message: string }) => {
                    const field = err.path[0] as string;
                    fieldErrors[field] = err.message;
                });
                setErrors(fieldErrors);
                setIsSubmitting(false);
                return;
            }

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Generate ticket number (mock)
            const ticketNumber = `TKT-${Date.now().toString().slice(-8)}`;

            // Clear draft after successful submission
            clearDraft();

            // Redirect to success page
            router.push(`/helpdesk/status/${ticketNumber}?success=true`);
        } catch {
            setErrors({ form: "Terjadi kesalahan. Silakan coba lagi." });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 py-8">
            <div className="container mx-auto px-4 max-w-3xl">
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
                        Buat Tiket Helpdesk
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Laporkan masalah IT yang Anda alami. Tim kami akan segera merespons.
                    </p>
                </div>

                {/* Draft Alert */}
                {showDraftAlert && (
                    <Alert
                        variant="info"
                        title="Draft tersimpan"
                        dismissible
                        onDismiss={() => setShowDraftAlert(false)}
                        className="mb-6"
                    >
                        Anda memiliki draft tiket yang tersimpan. Data sudah dipulihkan.
                    </Alert>
                )}

                {/* Form Error */}
                {errors.form && (
                    <Alert variant="destructive" className="mb-6">
                        {errors.form}
                    </Alert>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-lg">Informasi Masalah</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Select
                                label="Kategori Masalah"
                                options={categoryOptions}
                                value={draft.category || ""}
                                onChange={(value) => setDraft({ category: value as TicketCategory })}
                                error={errors.category}
                                required
                            />

                            <Input
                                label="Subjek / Judul"
                                placeholder="Contoh: Tidak bisa akses WiFi di Gedung A"
                                value={draft.subject}
                                onChange={(e) => setDraft({ subject: e.target.value })}
                                error={errors.subject}
                                required
                            />

                            <Textarea
                                label="Deskripsi Masalah"
                                placeholder="Jelaskan masalah yang Anda alami secara detail. Sertakan langkah-langkah yang sudah dicoba, pesan error yang muncul, dll."
                                value={draft.description}
                                onChange={(e) => setDraft({ description: e.target.value })}
                                error={errors.description}
                                showCount
                                maxLength={2000}
                                required
                            />

                            <Select
                                label="Prioritas"
                                options={priorityOptions}
                                value={draft.priority || TicketPriority.MEDIUM}
                                onChange={(value) => setDraft({ priority: value as TicketPriority })}
                                error={errors.priority}
                                hint="Pilih sesuai dampak masalah terhadap pekerjaan Anda"
                            />

                            <FileUpload
                                label="Lampiran (opsional)"
                                hint="Screenshot, dokumen, atau file terkait (maks 5 file, 5MB/file)"
                                value={files}
                                onChange={setFiles}
                                multiple
                                maxFiles={5}
                            />
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-lg">Informasi Pelapor</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Nama Lengkap"
                                    placeholder="Nama sesuai identitas"
                                    value={draft.reporterName}
                                    onChange={(e) => setDraft({ reporterName: e.target.value })}
                                    error={errors.reporterName}
                                    required
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="email@umc.ac.id"
                                    value={draft.reporterEmail}
                                    onChange={(e) => setDraft({ reporterEmail: e.target.value })}
                                    error={errors.reporterEmail}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="No. Telepon/WhatsApp"
                                    type="tel"
                                    placeholder="08xxxxxxxxxx"
                                    value={draft.reporterPhone}
                                    onChange={(e) => setDraft({ reporterPhone: e.target.value })}
                                    error={errors.reporterPhone}
                                    required
                                />

                                <Input
                                    label="Unit / Fakultas"
                                    placeholder="Contoh: Fakultas Teknik"
                                    value={draft.reporterUnit}
                                    onChange={(e) => setDraft({ reporterUnit: e.target.value })}
                                    error={errors.reporterUnit}
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                if (confirm("Yakin ingin menghapus draft?")) {
                                    clearDraft();
                                    setFiles([]);
                                }
                            }}
                        >
                            Reset Form
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            leftIcon={<Send size={18} />}
                        >
                            Kirim Tiket
                        </Button>
                    </div>

                    {/* Last saved indicator */}
                    {lastSaved && (
                        <p className="text-xs text-muted-foreground text-center mt-4">
                            Draft tersimpan otomatis{" "}
                            {new Date(lastSaved).toLocaleTimeString("id-ID")}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
