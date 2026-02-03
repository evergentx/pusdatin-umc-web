import { Service, ServiceCategory, ServiceStatus, SystemService } from "@/types/service";

export const mockServices: Service[] = [
    {
        id: "1",
        slug: "helpdesk",
        name: "Helpdesk & Ticketing",
        description:
            "Layanan dukungan teknis untuk seluruh civitas akademika. Sampaikan kendala IT Anda dan tim kami akan segera menangani.",
        category: ServiceCategory.ADMINISTRATION,
        status: ServiceStatus.OPERATIONAL,
        icon: "Headphones",
        slaResponseTime: "4 jam",
        slaResolutionTime: "24 jam",
        uptimePercentage: 99.9,
        features: [
            "Pelaporan masalah berbasis tiket",
            "Tracking status penanganan real-time",
            "Notifikasi email dan WhatsApp",
            "SLA monitoring",
            "Eskalasi otomatis",
        ],
        procedures: [
            "Buat tiket melalui portal atau email ke pusdatin@umc.ac.id",
            "Dapatkan nomor tiket sebagai referensi",
            "Pantau status tiket melalui portal",
            "Berikan feedback setelah masalah terselesaikan",
        ],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
    },
    {
        id: "2",
        slug: "sso",
        name: "Single Sign-On (SSO)",
        description:
            "Sistem autentikasi terpusat untuk akses ke seluruh aplikasi kampus dengan satu akun.",
        category: ServiceCategory.ADMINISTRATION,
        status: ServiceStatus.OPERATIONAL,
        icon: "KeyRound",
        slaResponseTime: "1 jam",
        slaResolutionTime: "4 jam",
        uptimePercentage: 99.95,
        features: [
            "Satu akun untuk semua aplikasi",
            "Integrasi LDAP/OAuth2",
            "Password policy standar keamanan",
            "Multi-factor authentication (opsional)",
            "Sinkronisasi otomatis dengan SIAKAD",
        ],
        requirements: [
            "Terdaftar sebagai mahasiswa/dosen/tendik aktif",
            "Email institusi yang valid",
            "Browser modern (Chrome, Firefox, Safari, Edge)",
        ],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
    },
    {
        id: "3",
        slug: "siakad",
        name: "SIAKAD",
        description:
            "Sistem Informasi Akademik untuk pengelolaan data akademik mahasiswa, KRS, nilai, dan jadwal perkuliahan.",
        category: ServiceCategory.ACADEMIC,
        status: ServiceStatus.OPERATIONAL,
        icon: "GraduationCap",
        url: "https://siakad.umc.ac.id",
        uptimePercentage: 99.8,
        features: [
            "Pengisian KRS online",
            "Kartu hasil studi (KHS)",
            "Jadwal perkuliahan",
            "Informasi pembayaran",
            "Transkrip akademik",
        ],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
    },
    {
        id: "4",
        slug: "lms",
        name: "Learning Management System",
        description:
            "Platform pembelajaran daring untuk perkuliahan online, materi, tugas, dan kuis.",
        category: ServiceCategory.LEARNING,
        status: ServiceStatus.OPERATIONAL,
        icon: "BookOpen",
        url: "https://lms.umc.ac.id",
        uptimePercentage: 99.7,
        features: [
            "Materi perkuliahan digital",
            "Pengumpulan tugas online",
            "Kuis dan ujian online",
            "Forum diskusi",
            "Video conference terintegrasi",
        ],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
    },
    {
        id: "5",
        slug: "email",
        name: "Email Institusi",
        description:
            "Layanan email resmi institusi untuk komunikasi akademik dan administratif.",
        category: ServiceCategory.COMMUNICATION,
        status: ServiceStatus.OPERATIONAL,
        icon: "Mail",
        url: "https://mail.umc.ac.id",
        uptimePercentage: 99.9,
        features: [
            "Kapasitas penyimpanan besar",
            "Kalender terintegrasi",
            "Video conference",
            "File sharing",
            "Mobile app support",
        ],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
    },
    {
        id: "6",
        slug: "jaringan",
        name: "Jaringan & Internet",
        description:
            "Layanan konektivitas internet dan jaringan di seluruh area kampus.",
        category: ServiceCategory.NETWORK,
        status: ServiceStatus.OPERATIONAL,
        icon: "Wifi",
        uptimePercentage: 99.5,
        features: [
            "WiFi seluruh area kampus",
            "Bandwidth dedicated",
            "Akses ke jurnal internasional",
            "VPN untuk akses remote",
        ],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
    },
    {
        id: "7",
        slug: "aset-ti",
        name: "Manajemen Aset TI",
        description:
            "Layanan peminjaman dan pengelolaan aset TI kampus seperti laptop, proyektor, dan peralatan lainnya.",
        category: ServiceCategory.ADMINISTRATION,
        status: ServiceStatus.OPERATIONAL,
        icon: "Laptop",
        slaResponseTime: "24 jam",
        features: [
            "Katalog aset online",
            "Peminjaman aset online",
            "Tracking dengan QR code",
            "Riwayat peminjaman",
            "Jadwal maintenance",
        ],
        procedures: [
            "Cek ketersediaan aset di katalog",
            "Ajukan peminjaman melalui portal",
            "Tunggu persetujuan admin",
            "Ambil aset di lokasi yang ditentukan",
            "Kembalikan tepat waktu",
        ],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
    },
    {
        id: "8",
        slug: "pengembangan-aplikasi",
        name: "Pengembangan Aplikasi",
        description:
            "Layanan pengajuan pengembangan aplikasi atau fitur baru untuk kebutuhan unit kerja.",
        category: ServiceCategory.ADMINISTRATION,
        status: ServiceStatus.OPERATIONAL,
        icon: "Code",
        slaResponseTime: "3 hari kerja",
        features: [
            "Pengajuan aplikasi baru",
            "Permintaan fitur tambahan",
            "Konsultasi teknis",
            "Dokumentasi API",
        ],
        procedures: [
            "Ajukan proposal pengembangan",
            "Konsultasi dengan tim Pusdatin",
            "Review dan persetujuan",
            "Development dan testing",
            "Deployment dan pelatihan",
        ],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
    },
];

// Quick status overview for public display
export const mockServiceStatus = mockServices.map((s) => ({
    id: s.id,
    name: s.name,
    status: s.status,
    uptimePercentage: s.uptimePercentage,
}));

// Get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
    return mockServices.find((s) => s.slug === slug);
}

// Get services by category
export function getServicesByCategory(category: ServiceCategory): Service[] {
    return mockServices.filter((s) => s.category === category);
}

// Get system services for status monitoring
export function getMockSystemServices(): SystemService[] {
    const systemServices: SystemService[] = [
        {
            id: "siakad",
            name: "SIAKAD Online",
            description: "Sistem Informasi Akademik",
            status: ServiceStatus.OPERATIONAL,
            uptime: 99.95,
        },
        {
            id: "lms",
            name: "Learning Management System",
            description: "E-Learning Platform",
            status: ServiceStatus.OPERATIONAL,
            uptime: 99.8,
        },
        {
            id: "email",
            name: "Email Institusi",
            description: "Mail dengan domain @umc.ac.id",
            status: ServiceStatus.OPERATIONAL,
            uptime: 99.99,
        },
        {
            id: "sso",
            name: "Single Sign-On",
            description: "Autentikasi terpusat",
            status: ServiceStatus.OPERATIONAL,
            uptime: 99.95,
        },
        {
            id: "wifi",
            name: "WiFi Kampus",
            description: "Jaringan wireless kampus",
            status: ServiceStatus.DEGRADED,
            uptime: 98.5,
            incident: {
                title: "Performa menurun di Gedung B",
                message: "Terjadi penurunan kecepatan WiFi di area Gedung B lantai 2-3. Tim sedang melakukan pengecekan.",
                startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            },
        },
        {
            id: "website",
            name: "Website UMC",
            description: "Portal resmi kampus",
            status: ServiceStatus.OPERATIONAL,
            uptime: 99.9,
        },
        {
            id: "helpdesk",
            name: "Helpdesk Portal",
            description: "Sistem ticketing IT",
            status: ServiceStatus.OPERATIONAL,
            uptime: 99.95,
        },
        {
            id: "cloud",
            name: "Cloud Storage",
            description: "Penyimpanan cloud kampus",
            status: ServiceStatus.OPERATIONAL,
            uptime: 99.8,
        },
    ];
    return systemServices;
}
