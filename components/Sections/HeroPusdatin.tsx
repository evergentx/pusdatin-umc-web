import Link from "next/link";
import { ArrowRight, Headphones, Search, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HeroPusdatin() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6 animate-fade-in">
                        <CheckCircle size={16} />
                        Semua Sistem Operasional
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
                        Pusat Data dan{" "}
                        <span className="text-primary">Teknologi Informasi</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up">
                        Satu platform terintegrasi untuk semua kebutuhan layanan IT kampus.
                        Helpdesk, SSO, monitoring infrastruktur, dan manajemen aset TI.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
                        <Link href="/helpdesk/tiket-baru">
                            <Button size="lg" leftIcon={<Headphones size={20} />}>
                                Buat Tiket Helpdesk
                            </Button>
                        </Link>
                        <Link href="/helpdesk/status">
                            <Button size="lg" variant="outline" leftIcon={<Search size={20} />}>
                                Cek Status Tiket
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-border">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary">5000+</div>
                            <div className="text-sm text-muted-foreground mt-1">Pengguna Aktif</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary">10K+</div>
                            <div className="text-sm text-muted-foreground mt-1">Tiket Diselesaikan</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary">99.9%</div>
                            <div className="text-sm text-muted-foreground mt-1">Uptime SSO</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary">&lt;4 jam</div>
                            <div className="text-sm text-muted-foreground mt-1">Respon SLA</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}
