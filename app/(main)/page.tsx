import { HeroSection } from "@/components/Sections/HeroSection";
import QuickActions from "@/components/Sections/QuickActions";
import Services from "@/components/Sections/Services";
import Announcements from "@/components/Sections/Announcements";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
    return (
        <main className="flex flex-col gap-0">
            <HeroSection
                logo={undefined}
                title={
                    <>
                        Sistem Pusdatin <br />
                        <span className="text-primary">Universitas Muhammadiyah Cirebon</span>
                    </>
                }
                subtitle="Platform terintegrasi untuk manajemen layanan TI kampus, helpdesk, monitoring infrastruktur, dan keamanan informasi. Mendukung transformasi digital perguruan tinggi yang modern dan efisien."
                callToAction={{
                    text: "AKSES LAYANAN →",
                    href: "/login",
                }}
                backgroundImage="/kampus-umc.webp"
                contactInfo={{
                    website: "pusdatin.umc.ac.id",
                    phone: "+62 231 200418",
                    address: "Jl. Fatahillah No.40, Cirebon",
                }}
            />
            <ScrollReveal direction="left" delay={0.2}>
                <QuickActions />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
                <Services />
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2}>
                <Announcements />
            </ScrollReveal>
        </main>
    );
}
