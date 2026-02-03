import Link from "next/link";
import { Headphones, Search, Laptop, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const quickActions = [
    {
        icon: Headphones,
        title: "Buat Tiket Helpdesk",
        description: "Laporkan masalah IT yang Anda alami",
        href: "/helpdesk/tiket-baru",
        variant: "primary" as const,
    },
    {
        icon: Search,
        title: "Cek Status Tiket",
        description: "Pantau progress penanganan tiket",
        href: "/helpdesk/status",
        variant: "outline" as const,
    },
    {
        icon: Laptop,
        title: "Pinjam Aset TI",
        description: "Ajukan peminjaman peralatan IT",
        href: "/aset/pinjam",
        variant: "outline" as const,
    },
    {
        icon: User,
        title: "Login SSO",
        description: "Masuk ke akun Anda",
        href: "/login",
        variant: "outline" as const,
    },
];

export default function QuickActions() {
    return (
        <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground">Aksi Cepat</h2>
                    <p className="text-muted-foreground mt-1">
                        Akses langsung ke layanan yang sering digunakan
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Link key={action.title} href={action.href}>
                                <Card
                                    className={`h-full transition-all duration-200 hover:shadow-lg ${action.variant === "primary"
                                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                                        : "hover:border-primary/30"
                                        }`}
                                >
                                    <div className="flex flex-col items-center p-6 text-center">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3
                                            ${action.variant === "primary"
                                                    ? "bg-white/20"
                                                    : "bg-primary/10 text-primary"
                                                }`}
                                        >
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="font-semibold">{action.title}</h3>
                                        <p
                                            className={`text-sm mt-1 ${action.variant === "primary"
                                                ? "text-primary-foreground/80"
                                                : "text-muted-foreground"
                                                }`}
                                        >
                                            {action.description}
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
