import {
    Ticket,
    TicketCategory,
    TicketStatus,
    TicketPriority,
    TicketActivity,
} from "@/types/ticket";

export const mockTickets: Ticket[] = [
    {
        id: "1",
        ticketNumber: "TKT-20260201-1234",
        category: TicketCategory.NETWORK,
        priority: TicketPriority.HIGH,
        status: TicketStatus.IN_PROGRESS,
        subject: "Tidak bisa akses internet di Gedung A lantai 2",
        description:
            "Sejak pagi ini tidak bisa mengakses internet. Sudah coba restart komputer dan modem tetapi tetap tidak bisa. Kondisi ini mengganggu pekerjaan karena tidak bisa akses SIAKAD dan email.",
        reporter: {
            name: "Ahmad Fauzi",
            email: "ahmad.fauzi@umc.ac.id",
            phone: "081234567890",
            unit: "Fakultas Teknik",
        },
        assignee: {
            id: "tech-001",
            name: "Budi Santoso",
            email: "budi.santoso@umc.ac.id",
        },
        slaDeadline: "2026-02-01T16:00:00.000Z",
        slaMet: true,
        createdAt: "2026-02-01T08:30:00.000Z",
        updatedAt: "2026-02-01T10:15:00.000Z",
        activities: [
            {
                id: "act-1",
                ticketId: "1",
                type: "created",
                description: "Tiket dibuat",
                userName: "Ahmad Fauzi",
                createdAt: "2026-02-01T08:30:00.000Z",
            },
            {
                id: "act-2",
                ticketId: "1",
                type: "assigned",
                description: "Tiket ditugaskan ke Budi Santoso",
                userName: "System",
                createdAt: "2026-02-01T08:35:00.000Z",
            },
            {
                id: "act-3",
                ticketId: "1",
                type: "status_changed",
                description: "Status diubah",
                userName: "Budi Santoso",
                oldValue: "open",
                newValue: "in_progress",
                createdAt: "2026-02-01T09:00:00.000Z",
            },
            {
                id: "act-4",
                ticketId: "1",
                type: "comment",
                description: "Sedang melakukan pengecekan di lokasi. Kemungkinan ada masalah pada switch di lantai 2.",
                userName: "Budi Santoso",
                createdAt: "2026-02-01T10:15:00.000Z",
            },
        ],
    },
    {
        id: "2",
        ticketNumber: "TKT-20260201-1235",
        category: TicketCategory.EMAIL,
        priority: TicketPriority.MEDIUM,
        status: TicketStatus.OPEN,
        subject: "Tidak bisa login ke email institusi",
        description:
            "Saya tidak bisa login ke email institusi menggunakan akun yang sudah diberikan. Muncul pesan 'Invalid credentials'. Sudah coba reset password tapi tidak berhasil.",
        reporter: {
            name: "Siti Nurhaliza",
            email: "siti.nurhaliza@student.umc.ac.id",
            phone: "082345678901",
            unit: "Fakultas Ekonomi",
        },
        slaDeadline: "2026-02-02T08:00:00.000Z",
        createdAt: "2026-02-01T14:00:00.000Z",
        updatedAt: "2026-02-01T14:00:00.000Z",
    },
    {
        id: "3",
        ticketNumber: "TKT-20260131-1233",
        category: TicketCategory.HARDWARE,
        priority: TicketPriority.LOW,
        status: TicketStatus.RESOLVED,
        subject: "Printer di ruang admin tidak bisa print",
        description:
            "Printer HP LaserJet di ruang admin lantai 1 tidak merespon saat dikirim perintah print. Lampu indikator menyala normal.",
        reporter: {
            name: "Dedi Kurniawan",
            email: "dedi.kurniawan@umc.ac.id",
            phone: "083456789012",
            unit: "BAK",
        },
        assignee: {
            id: "tech-002",
            name: "Andi Wijaya",
        },
        slaDeadline: "2026-02-03T08:00:00.000Z",
        slaMet: true,
        createdAt: "2026-01-31T09:00:00.000Z",
        updatedAt: "2026-01-31T15:30:00.000Z",
        resolvedAt: "2026-01-31T15:30:00.000Z",
    },
    {
        id: "4",
        ticketNumber: "TKT-20260130-1232",
        category: TicketCategory.SIAKAD,
        priority: TicketPriority.URGENT,
        status: TicketStatus.ESCALATED,
        subject: "Data KRS tidak muncul di SIAKAD",
        description:
            "Sudah melakukan pengisian KRS minggu lalu tapi data tidak muncul di sistem. Padahal sudah disetujui dosen wali. Ini urgent karena sudah mendekati batas waktu.",
        reporter: {
            name: "Rizki Pratama",
            email: "rizki.pratama@student.umc.ac.id",
            phone: "084567890123",
            unit: "Fakultas Teknik",
        },
        assignee: {
            id: "tech-003",
            name: "Candra Lesmana",
        },
        slaDeadline: "2026-01-30T12:00:00.000Z",
        slaMet: false,
        createdAt: "2026-01-30T08:00:00.000Z",
        updatedAt: "2026-01-30T14:00:00.000Z",
    },
    {
        id: "5",
        ticketNumber: "TKT-20260129-1231",
        category: TicketCategory.SOFTWARE,
        priority: TicketPriority.MEDIUM,
        status: TicketStatus.CLOSED,
        subject: "Instalasi Microsoft Office di Lab Komputer",
        description:
            "Mohon bantuan untuk instalasi Microsoft Office di 20 unit komputer Lab Komputer 1 untuk keperluan praktikum.",
        reporter: {
            name: "Dr. Hendra Gunawan",
            email: "hendra.gunawan@umc.ac.id",
            phone: "085678901234",
            unit: "Fakultas Teknik",
        },
        assignee: {
            id: "tech-001",
            name: "Budi Santoso",
        },
        slaDeadline: "2026-01-31T08:00:00.000Z",
        slaMet: true,
        createdAt: "2026-01-29T10:00:00.000Z",
        updatedAt: "2026-01-30T16:00:00.000Z",
        resolvedAt: "2026-01-30T14:00:00.000Z",
        closedAt: "2026-01-30T16:00:00.000Z",
    },
];

export const mockTicketActivities: TicketActivity[] = [
    {
        id: "act-1",
        ticketId: "1",
        type: "created",
        description: "Tiket dibuat",
        userName: "Ahmad Fauzi",
        createdAt: "2026-02-01T08:30:00.000Z",
    },
    {
        id: "act-2",
        ticketId: "1",
        type: "assigned",
        description: "Tiket ditugaskan ke Budi Santoso",
        userName: "System",
        newValue: "Budi Santoso",
        createdAt: "2026-02-01T08:35:00.000Z",
    },
    {
        id: "act-3",
        ticketId: "1",
        type: "status_changed",
        description: "Status diubah dari Menunggu ke Diproses",
        userName: "Budi Santoso",
        oldValue: "open",
        newValue: "in_progress",
        createdAt: "2026-02-01T09:00:00.000Z",
    },
];

// Helper function to get ticket by number
export function getTicketByNumber(ticketNumber: string): Ticket | undefined {
    return mockTickets.find((t) => t.ticketNumber === ticketNumber);
}

export function getMockTicketByNumber(ticketNumber: string): Ticket | undefined {
    // Case insensitive match and also try partial match
    const normalized = ticketNumber.toUpperCase();
    return mockTickets.find((t) =>
        t.ticketNumber.toUpperCase() === normalized ||
        t.ticketNumber.toUpperCase().includes(normalized)
    );
}

// Helper function to get ticket by ID
export function getTicketById(id: string): Ticket | undefined {
    return mockTickets.find((t) => t.id === id);
}

// Helper to filter tickets
export function filterTickets(params: {
    status?: TicketStatus;
    category?: TicketCategory;
    priority?: TicketPriority;
    search?: string;
}): Ticket[] {
    let filtered = [...mockTickets];

    if (params.status) {
        filtered = filtered.filter((t) => t.status === params.status);
    }
    if (params.category) {
        filtered = filtered.filter((t) => t.category === params.category);
    }
    if (params.priority) {
        filtered = filtered.filter((t) => t.priority === params.priority);
    }
    if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(
            (t) =>
                t.subject.toLowerCase().includes(search) ||
                t.ticketNumber.toLowerCase().includes(search) ||
                t.reporter.name.toLowerCase().includes(search)
        );
    }

    return filtered;
}
