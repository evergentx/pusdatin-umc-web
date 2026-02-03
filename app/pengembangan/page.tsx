"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { Construction } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PengembanganPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-12 min-h-[60vh] flex items-center justify-center">
            <EmptyState
                icon={<Construction className="h-12 w-12 text-primary" />}
                title="Dalam Tahap Pengembangan"
                description="Mohon maaf, halaman yang Anda tuju saat ini masih dalam tahap pengembangan. Kami sedang bekerja keras untuk segera menyediakannya."
                action={{
                    label: "Kembali ke Beranda",
                    onClick: () => router.push("/"),
                }}
            />
        </div>
    );
}
