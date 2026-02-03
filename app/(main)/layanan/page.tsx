import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    Headphones,
    KeyRound,
    Laptop,
    Activity,
    Mail,
    Wifi,
    Server,
    Shield,
    Code,
    Database,
    Cloud,
    Smartphone,
    CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Layanan",
    description: "Layanan Pusat Data dan Teknologi Informasi Universitas Muhammadiyah Cirebon",
};

const services = [
    {
        category: "Layanan Utama",
        items: [
            {
                icon: Headphones,
                title: "Helpdesk & IT Support",
                description:
                    "Layanan bantuan teknis untuk seluruh masalah IT. Dilengkapi dengan sistem ticketing dan SLA yang terjamin. Tim support profesional siap membantu 24/7.",
                href: "/helpdesk",
                color: "bg-blue-100 text-blue-600",
            },
            {
                icon: KeyRound,
                title: "Single Sign-On (SSO)",
                description:
                    "Satu akun untuk mengakses seluruh aplikasi kampus termasuk SIAKAD, LMS, Email, dan layanan digital lainnya. Keamanan terjamin dengan autentikasi multi-layer.",
                href: "/layanan/sso",
                color: "bg-purple-100 text-purple-600",
            },
            {
                icon: Laptop,
                title: "Manajemen Aset TI",
                description:
                    "Layanan peminjaman peralatan IT seperti laptop, proyektor, kamera, dan perangkat lainnya untuk kebutuhan akademik dan acara kampus.",
                href: "/aset",
                color: "bg-green-100 text-green-600",
            },
        ],
    },
    {
        category: "Infrastruktur & Jaringan",
        items: [
            {
                icon: Wifi,
                title: "Jaringan & WiFi Kampus",
                description:
                    "Koneksi internet berkecepatan tinggi yang mencakup seluruh area kampus. Akses WiFi mudah dengan akun SSO Anda.",
                href: "/layanan/jaringan",
                color: "bg-cyan-100 text-cyan-600",
            },
            {
                icon: Cloud,
                title: "Cloud Storage",
                description:
                    "Penyimpanan cloud gratis untuk dosen dan mahasiswa dengan kapasitas besar. Sinkronisasi otomatis dan akses dari mana saja.",
                href: "/layanan/cloud",
                color: "bg-sky-100 text-sky-600",
            },
            {
                icon: Server,
                title: "Data Center",
                description:
                    "Layanan hosting dan server untuk unit kerja, fakultas, dan organisasi di lingkungan kampus.",
                href: "/layanan/datacenter",
                color: "bg-slate-100 text-slate-600",
            },
        ],
    },
    {
        category: "Aplikasi & Email",
        items: [
            {
                icon: Mail,
                title: "Email Institusi",
                description:
                    "Layanan email resmi dengan domain @umc.ac.id dan @student.umc.ac.id. Terintegrasi dengan Google Workspace.",
                href: "/layanan/email",
                color: "bg-red-100 text-red-600",
            },
            {
                icon: Database,
                title: "SIAKAD Online",
                description:
                    "Sistem Informasi Akademik untuk KRS, KHS, jadwal kuliah, dan informasi akademik lainnya.",
                href: "/layanan/siakad",
                color: "bg-orange-100 text-orange-600",
            },
            {
                icon: Smartphone,
                title: "Mobile Apps",
                description:
                    "Aplikasi mobile UMC untuk akses layanan kampus dari smartphone. Tersedia di Android dan iOS.",
                href: "/layanan/mobile",
                color: "bg-pink-100 text-pink-600",
            },
        ],
    },
    {
        category: "Keamanan & Monitoring",
        items: [
            {
                icon: Activity,
                title: "Monitoring Sistem",
                description:
                    "Dashboard real-time untuk memantau status seluruh layanan kampus. Notifikasi otomatis jika terjadi gangguan.",
                href: "/status",
                color: "bg-emerald-100 text-emerald-600",
            },
            {
                icon: Shield,
                title: "Keamanan Informasi",
                description:
                    "Proteksi data dan sistem kampus dengan standar keamanan tinggi. Endpoint protection dan firewall enterprise.",
                href: "/layanan/keamanan",
                color: "bg-indigo-100 text-indigo-600",
            },
            {
                icon: Code,
                title: "Pengembangan Aplikasi",
                description:
                    "Layanan pembuatan sistem informasi custom untuk unit kerja dan fakultas. Konsultasi gratis untuk kebutuhan digital.",
                href: "/layanan/development",
                color: "bg-violet-100 text-violet-600",
            },
        ],
    },
];

export default function LayananPage() {
    return (
        <div className="min-h-screen bg-muted/30 py-8 md:py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                        Layanan Pusdatin
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Pusat Data dan Teknologi Informasi menyediakan berbagai layanan TI
                        untuk mendukung kegiatan akademik, administratif, dan pengembangan
                        di Universitas Muhammadiyah Cirebon.
                    </p>
                </div>

                {/* Services by Category */}
                {services.map((category) => (
                    <div key={category.category} className="mb-12">
                        <h2 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border tracking-tight">
                            {category.category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.items.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <Link key={service.title} href={service.href}>
                                        <Card
                                            hover
                                            className="h-full group transition-all duration-300 hover:border-primary/30"
                                        >
                                            <CardContent className="p-6">
                                                <div
                                                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${service.color}`}
                                                >
                                                    <Icon size={28} />
                                                </div>
                                                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                    {service.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    {service.description}
                                                </p>
                                                <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                                                    Pelajari Lebih Lanjut
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
                    </div>
                ))}

                {/* CTA Section */}
                {/* CTA Section */}
                {/* CTA Section */}
                <div className="mt-12 bg-[#0B0F19] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden ring-1 ring-white/10 shadow-2xl max-w-4xl mx-auto">
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-2 text-[#00C46B] bg-[#00C46B]/10 px-4 py-1.5 rounded-full ring-1 ring-[#00C46B]/20">
                            <CheckCircle2 size={18} className="text-[#00C46B]" />
                            <span className="text-sm font-semibold tracking-wide">Ready to Assist</span>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                        Masih belum menemukan jawaban?
                    </h2>

                    <p className="text-slate-400 mb-8 max-w-xl mx-auto text-base leading-relaxed">
                        Tim Helpdesk kami siap membantu menjawab pertanyaan Anda. Jangan ragu untuk menghubungi kami.
                    </p>

                    <Link href="/helpdesk/tiket-baru">
                        <Button className="bg-white text-black hover:bg-white/90 rounded-full h-12 px-8 text-base font-semibold transition-all hover:scale-105 active:scale-95">
                            Hubungi Helpdesk
                            <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
