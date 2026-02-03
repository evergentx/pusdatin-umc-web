import Link from "next/link";
import {
    Headphones,
    KeyRound,
    Laptop,
    Activity,
    Server,
    Code,
    ArrowRight,
    Mail,
    Wifi,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
    {
        icon: Headphones,
        title: "Helpdesk & Ticketing",
        description:
            "Laporkan masalah IT Anda dengan mudah. Tim kami siap membantu dengan SLA yang terjamin.",
        href: "/helpdesk",
        color: "text-blue-600 bg-blue-100",
    },
    {
        icon: KeyRound,
        title: "Single Sign-On (SSO)",
        description:
            "Satu akun untuk mengakses seluruh aplikasi kampus. Login sekali, akses semua.",
        href: "/layanan/sso",
        color: "text-purple-600 bg-purple-100",
    },
    {
        icon: Laptop,
        title: "Manajemen Aset TI",
        description:
            "Peminjaman peralatan IT seperti laptop, proyektor, dan perangkat lainnya.",
        href: "/aset",
        color: "text-green-600 bg-green-100",
    },
    {
        icon: Activity,
        title: "Status Sistem",
        description:
            "Pantau status layanan kampus secara real-time. SIAKAD, LMS, Email, dan lainnya.",
        href: "/status",
        color: "text-orange-600 bg-orange-100",
    },
    {
        icon: Wifi,
        title: "Jaringan & Internet",
        description:
            "Koneksi WiFi kampus yang stabil dan cepat untuk mendukung aktivitas akademik.",
        href: "/layanan/jaringan",
        color: "text-cyan-600 bg-cyan-100",
    },
    {
        icon: Mail,
        title: "Email Institusi",
        description:
            "Layanan email resmi kampus dengan kapasitas besar dan fitur lengkap.",
        href: "/layanan/email",
        color: "text-red-600 bg-red-100",
    },
];

export default function Services() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                        Layanan Kami
                    </h2>
                    <p className="text-muted-foreground">
                        Pusdatin menyediakan berbagai layanan TI untuk mendukung aktivitas
                        akademik dan administratif di Universitas Muhammadiyah Cirebon.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <Link key={service.title} href={service.href}>
                                <Card
                                    className="h-full group transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                                >
                                    <CardHeader className="pt-6 px-6 pb-2">
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.color}`}
                                        >
                                            <Icon size={24} />
                                        </div>
                                        <CardTitle className="group-hover:text-primary transition-colors">
                                            {service.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-6 pb-6 pt-0">
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {service.description}
                                        </p>
                                        <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                                            Selengkapnya
                                            <ArrowRight
                                                size={16}
                                                className="ml-1 group-hover:translate-x-1 transition-transform"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* View All Link */}
                <div className="text-center mt-10">
                    <Link href="/layanan">
                        <Button className="bg-black text-white hover:bg-black/90 px-8 h-12 rounded-full text-base font-medium transition-all hover:scale-105 active:scale-95">
                            Lihat Semua Layanan
                            <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
