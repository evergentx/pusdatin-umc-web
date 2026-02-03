import { Announcement, AnnouncementPriority, FAQ } from "@/types/service";

export const mockAnnouncements: Announcement[] = [
    {
        id: "1",
        title: "Maintenance Server SIAKAD",
        content:
            "Dalam rangka peningkatan layanan, akan dilakukan maintenance server SIAKAD pada hari Sabtu, 8 Februari 2026 pukul 22:00 - 02:00 WIB. Selama maintenance, layanan SIAKAD tidak dapat diakses. Mohon maaf atas ketidaknyamanannya.",
        excerpt:
            "Maintenance server SIAKAD akan dilakukan pada Sabtu, 8 Februari 2026.",
        priority: AnnouncementPriority.HIGH,
        category: "Maintenance",
        publishedAt: "2026-02-01T08:00:00.000Z",
        isPinned: true,
        createdAt: "2026-02-01T08:00:00.000Z",
        updatedAt: "2026-02-01T08:00:00.000Z",
    },
    {
        id: "2",
        title: "Update Password Policy SSO",
        content:
            "Mulai 15 Februari 2026, password SSO akan menerapkan kebijakan baru: minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka. Pengguna akan diminta untuk mengubah password saat login pertama kali setelah kebijakan berlaku.",
        excerpt: "Kebijakan password baru akan diterapkan mulai 15 Februari 2026.",
        priority: AnnouncementPriority.NORMAL,
        category: "Keamanan",
        publishedAt: "2026-01-28T10:00:00.000Z",
        isPinned: false,
        createdAt: "2026-01-28T10:00:00.000Z",
        updatedAt: "2026-01-28T10:00:00.000Z",
    },
    {
        id: "3",
        title: "Peluncuran Fitur Helpdesk Baru",
        content:
            "Kami dengan bangga mengumumkan peluncuran portal Helpdesk baru dengan fitur tracking tiket real-time, notifikasi WhatsApp, dan antarmuka yang lebih user-friendly. Akses sekarang melalui pusdatin.umc.ac.id/helpdesk",
        excerpt: "Portal Helpdesk baru sudah diluncurkan dengan berbagai fitur baru.",
        priority: AnnouncementPriority.NORMAL,
        category: "Layanan Baru",
        publishedAt: "2026-01-25T09:00:00.000Z",
        isPinned: false,
        createdAt: "2026-01-25T09:00:00.000Z",
        updatedAt: "2026-01-25T09:00:00.000Z",
    },
    {
        id: "4",
        title: "Jadwal Operasional Pusdatin Semester Genap",
        content:
            "Pusdatin akan beroperasi dengan jadwal berikut selama semester genap 2025/2026:\n\nSenin - Jumat: 08:00 - 16:00 WIB\nSabtu: 08:00 - 12:00 WIB\nMinggu & Libur Nasional: Tutup\n\nUntuk bantuan di luar jam operasional, silakan kirim email ke pusdatin@umc.ac.id",
        excerpt: "Informasi jadwal operasional Pusdatin semester genap 2025/2026.",
        priority: AnnouncementPriority.LOW,
        category: "Informasi",
        publishedAt: "2026-01-15T08:00:00.000Z",
        isPinned: false,
        createdAt: "2026-01-15T08:00:00.000Z",
        updatedAt: "2026-01-15T08:00:00.000Z",
    },
];

export const mockFAQs: FAQ[] = [
    {
        id: "1",
        question: "Bagaimana cara membuat tiket helpdesk?",
        answer:
            "Anda dapat membuat tiket melalui menu Helpdesk > Buat Tiket Baru. Isi formulir dengan lengkap meliputi kategori masalah, subjek, deskripsi detail, dan data diri Anda. Setelah tiket dibuat, Anda akan menerima nomor tiket melalui email untuk tracking.",
        category: "Helpdesk",
        order: 1,
        isActive: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
        id: "2",
        question: "Berapa lama waktu penanganan tiket?",
        answer:
            "Waktu penanganan tiket tergantung pada prioritas:\n\n• Urgent: 4 jam\n• Tinggi: 8 jam\n• Sedang: 24 jam\n• Rendah: 72 jam\n\nWaktu ini dihitung dalam jam kerja (Senin-Jumat, 08:00-16:00 WIB).",
        category: "Helpdesk",
        order: 2,
        isActive: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
        id: "3",
        question: "Bagaimana cara cek status tiket?",
        answer:
            "Buka menu Helpdesk > Cek Status Tiket. Masukkan nomor tiket dan email yang digunakan saat membuat tiket. Anda akan melihat status terkini dan riwayat penanganan tiket.",
        category: "Helpdesk",
        order: 3,
        isActive: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
        id: "4",
        question: "Bagaimana cara reset password SSO?",
        answer:
            "Untuk reset password SSO:\n\n1. Buka halaman login SSO\n2. Klik 'Lupa Password'\n3. Masukkan email institusi Anda\n4. Cek email untuk link reset password\n5. Buat password baru sesuai kebijakan\n\nJika tidak menerima email, hubungi Pusdatin melalui helpdesk.",
        category: "SSO & Akun",
        order: 4,
        isActive: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
        id: "5",
        question: "Bagaimana cara mengakses WiFi kampus?",
        answer:
            "Untuk mengakses WiFi kampus:\n\n1. Hubungkan ke SSID 'UMC-WiFi'\n2. Buka browser dan Anda akan diarahkan ke halaman login\n3. Masukkan username dan password SSO Anda\n4. Klik Login\n\nKoneksi akan bertahan selama 24 jam sebelum perlu login ulang.",
        category: "Jaringan",
        order: 5,
        isActive: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
        id: "6",
        question: "Bagaimana cara meminjam aset TI?",
        answer:
            "Untuk meminjam aset TI:\n\n1. Buka halaman Aset TI dan lihat katalog\n2. Pilih aset yang ingin dipinjam\n3. Isi formulir peminjaman\n4. Tunggu persetujuan admin (maks. 24 jam kerja)\n5. Ambil aset di kantor Pusdatin\n6. Kembalikan sesuai jadwal yang disepakati",
        category: "Aset TI",
        order: 6,
        isActive: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
        id: "7",
        question: "Apa yang harus dilakukan jika tidak bisa akses SIAKAD?",
        answer:
            "Jika tidak bisa akses SIAKAD:\n\n1. Pastikan internet stabil\n2. Coba clear cache browser\n3. Gunakan browser lain\n4. Cek halaman Status Sistem untuk melihat apakah ada maintenance\n5. Jika masih tidak bisa, buat tiket helpdesk dengan kategori 'SIAKAD'",
        category: "SIAKAD",
        order: 7,
        isActive: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
        id: "8",
        question: "Bagaimana cara menghubungi Pusdatin?",
        answer:
            "Anda dapat menghubungi Pusdatin melalui:\n\n• Helpdesk Portal: pusdatin.umc.ac.id/helpdesk\n• Email: pusdatin@umc.ac.id\n• Telepon: (0231) 234567\n• WhatsApp: 08123456789\n• Kunjungan langsung: Gedung Rektorat Lt. 2\n\nJam operasional: Senin-Jumat 08:00-16:00, Sabtu 08:00-12:00 WIB",
        category: "Umum",
        order: 8,
        isActive: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
    },
];

// Get FAQs by category
export function getFAQsByCategory(category: string): FAQ[] {
    return mockFAQs.filter((f) => f.category === category && f.isActive);
}

// Get all FAQ categories
export function getFAQCategories(): string[] {
    const categories = new Set(mockFAQs.map((f) => f.category));
    return Array.from(categories);
}

// Get pinned announcements
export function getPinnedAnnouncements(): Announcement[] {
    return mockAnnouncements.filter((a) => a.isPinned);
}

// Get recent announcements
export function getRecentAnnouncements(limit: number = 5): Announcement[] {
    return [...mockAnnouncements]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
}
