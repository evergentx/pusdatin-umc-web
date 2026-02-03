
import { Metadata } from "next";
import Link from "next/link";
import { Search, Headphones, CheckCircle2, ArrowRight } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NativeSelect, SelectOption } from "@/components/ui/native-select";

export const metadata: Metadata = {
    title: "FAQ",
    description: "Pertanyaan yang Sering Diajukan tentang layanan Pusdatin UMC",
};

const faqCategories = [
    {
        category: "Akun & SSO",
        faqs: [
            {
                id: "sso-1",
                title: "Bagaimana cara mendapatkan akun SSO?",
                content:
                    "Akun SSO otomatis dibuat saat Anda terdaftar sebagai mahasiswa atau dosen di UMC. Username adalah NIM (untuk mahasiswa) atau NIK (untuk dosen/karyawan). Password awal dikirim ke email yang terdaftar atau bisa diminta ke Pusdatin.",
            },
            {
                id: "sso-2",
                title: "Saya lupa password SSO, bagaimana cara resetnya?",
                content:
                    "Kunjungi halaman SSO dan klik 'Lupa Password'. Masukkan email yang terdaftar, dan link reset akan dikirim. Jika email tidak terdaftar, hubungi Pusdatin dengan membawa KTM/ID Card.",
            },
            {
                id: "sso-3",
                title: "Mengapa saya tidak bisa login ke SIAKAD?",
                content:
                    "Pastikan Anda menggunakan browser terbaru dan cookies diaktifkan. Clear cache browser dan coba lagi. Jika masih bermasalah, coba reset password atau hubungi Helpdesk.",
            },
            {
                id: "sso-4",
                title: "Apakah akun SSO bisa digunakan untuk semua aplikasi kampus?",
                content:
                    "Ya, satu akun SSO dapat digunakan untuk login ke SIAKAD, LMS, Email institusi, WiFi kampus, dan aplikasi kampus lainnya.",
            },
        ],
    },
    {
        category: "WiFi & Jaringan",
        faqs: [
            {
                id: "wifi-1",
                title: "Bagaimana cara connect ke WiFi kampus?",
                content:
                    "Pilih jaringan 'UMC-WiFi' atau 'eduroam'. Login menggunakan akun SSO Anda. Untuk mahasiswa gunakan format nim@student.umc.ac.id, untuk dosen gunakan nik@umc.ac.id.",
            },
            {
                id: "wifi-2",
                title: "WiFi sering putus-putus, apa yang harus dilakukan?",
                content:
                    "Coba 'forget network' dan reconnect. Pastikan berada di area jangkauan WiFi. Jika masalah persisten di area tertentu, laporkan ke Helpdesk agar kami cek access point di lokasi tersebut.",
            },
            {
                id: "wifi-3",
                title: "Apakah ada batas kuota internet di kampus?",
                content:
                    "Tidak ada batas kuota untuk penggunaan wajar. Namun, akses ke situs tertentu (streaming, game) mungkin dibatasi di jam produktif untuk menjaga kualitas layanan.",
            },
        ],
    },
    {
        category: "Email Institusi",
        faqs: [
            {
                id: "email-1",
                title: "Bagaimana cara mengakses email kampus?",
                content:
                    "Akses mail.google.com dan login dengan email @umc.ac.id atau @student.umc.ac.id. Password sama dengan akun SSO Anda.",
            },
            {
                id: "email-2",
                title: "Berapa kapasitas email institusi?",
                content:
                    "Setiap akun email mendapat storage 15GB dari Google Workspace yang shared dengan Drive. Upgrade storage tersedia untuk dosen/karyawan dengan request ke Pusdatin.",
            },
            {
                id: "email-3",
                title: "Email saya diblokir atau tidak bisa mengirim, bagaimana?",
                content:
                    "Akun mungkin terdeteksi aktivitas mencurigakan. Hubungi Pusdatin untuk verifikasi dan pembukaan blokir. Pastikan tidak mengirim email massal atau spam.",
            },
        ],
    },
    {
        category: "Helpdesk & Tiket",
        faqs: [
            {
                id: "helpdesk-1",
                title: "Bagaimana cara membuat tiket helpdesk?",
                content:
                    "Kunjungi halaman Buat Tiket di website ini, isi form lengkap dengan kategori masalah, deskripsi detail, dan lampirkan screenshot jika ada. Anda akan mendapat nomor tiket via email.",
            },
            {
                id: "helpdesk-2",
                title: "Berapa lama waktu respons tiket?",
                content:
                    "SLA respons tergantung prioritas: Urgent (1 jam), High (4 jam), Medium (8 jam), Low (24 jam). Waktu penyelesaian bervariasi tergantung kompleksitas masalah.",
            },
            {
                id: "helpdesk-3",
                title: "Bagaimana cara melacak status tiket saya?",
                content:
                    "Gunakan fitur 'Cek Status Tiket' di website ini dengan memasukkan nomor tiket. Anda juga akan menerima notifikasi email setiap ada update.",
            },
            {
                id: "helpdesk-4",
                title: "Apakah bisa menghubungi Pusdatin langsung?",
                content:
                    "Ya, Anda bisa datang langsung ke kantor Pusdatin di lantai 2 Gedung Rektorat pada jam kerja (08:00-16:00 Senin-Jumat). Untuk masalah urgent, bisa menghubungi extension 123.",
            },
        ],
    },
    {
        category: "Peminjaman Aset",
        faqs: [
            {
                id: "aset-1",
                title: "Aset apa saja yang bisa dipinjam dari Pusdatin?",
                content:
                    "Laptop, proyektor, speaker portable, microphone wireless, kamera DSLR, tripod, extension cable, dan peralatan IT lainnya. Lihat katalog lengkap di halaman Aset.",
            },
            {
                id: "aset-2",
                title: "Bagaimana prosedur peminjaman aset?",
                content:
                    "Ajukan permintaan via sistem minimal 2 hari sebelumnya. Setelah disetujui, ambil aset di Pusdatin dengan menunjukkan KTM/ID Card. Kembalikan tepat waktu untuk menghindari denda.",
            },
            {
                id: "aset-3",
                title: "Berapa lama maksimal waktu peminjaman?",
                content:
                    "Maksimal 3 hari untuk kegiatan biasa, bisa diperpanjang hingga 7 hari untuk event resmi kampus dengan surat pengantar dari fakultas/unit.",
            },
        ],
    },
];

export default function FAQPage() {
    // Flatten FAQs for accordion
    const allFaqs = faqCategories.flatMap((cat) =>
        cat.faqs.map((faq) => ({
            ...faq,
            category: cat.category,
        }))
    );

    return (
        <div className="min-h-screen bg-muted/30 py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
                        Pertanyaan Umum (FAQ)
                    </h1>
                    <p className="text-muted-foreground">
                        Temukan jawaban untuk pertanyaan yang sering diajukan
                    </p>
                </div>

                {/* Search (for future implementation) */}
                <div className="mb-8">
                    <div className="relative max-w-md mx-auto">
                        <Input
                            placeholder="Cari pertanyaan..."
                            leftIcon={<Search className="h-4 w-4" />}
                            className="bg-background shadow-sm"
                        />
                    </div>
                </div>

                {/* FAQ by Category */}
                {faqCategories.map((category) => (
                    <div key={category.category} className="mb-8">
                        <h2 className="text-xl font-semibold text-foreground mb-4 tracking-tight">
                            {category.category}
                        </h2>
                        <Accordion type="single" collapsible className="w-full">
                            {category.faqs.map((faq) => (
                                <AccordionItem key={faq.id} value={faq.id}>
                                    <AccordionTrigger>{faq.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-sm leading-relaxed">{faq.content}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}

                {/* Still Need Help? */}
                {/* CTA Section */}
                <div className="mt-12 bg-[#0B0F19] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden ring-1 ring-white/10 shadow-2xl">
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
