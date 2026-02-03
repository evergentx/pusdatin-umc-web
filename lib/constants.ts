import { TicketCategory, TicketPriority } from "@/types/ticket";

// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Pusdatin UMC";
export const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "https://sso.umc.ac.id";

// Ticket Configuration
export const TICKET_CATEGORIES = Object.values(TicketCategory);
export const TICKET_PRIORITIES = Object.values(TicketPriority);

// SLA Configuration (in hours)
export const SLA_RESPONSE_TIME: Record<TicketPriority, number> = {
    [TicketPriority.URGENT]: 1,
    [TicketPriority.HIGH]: 4,
    [TicketPriority.MEDIUM]: 8,
    [TicketPriority.LOW]: 24,
};

export const SLA_RESOLUTION_TIME: Record<TicketPriority, number> = {
    [TicketPriority.URGENT]: 4,
    [TicketPriority.HIGH]: 8,
    [TicketPriority.MEDIUM]: 24,
    [TicketPriority.LOW]: 72,
};

// File Upload Configuration
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    "application/zip",
    "application/x-rar-compressed",
];

export const ALLOWED_FILE_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".txt",
    ".zip",
    ".rar",
];

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Date configuration
export const DATE_FORMAT = "yyyy-MM-dd";
export const DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
export const DISPLAY_DATE_FORMAT = "dd MMMM yyyy";
export const DISPLAY_DATE_TIME_FORMAT = "dd MMMM yyyy HH:mm";

// Operational Hours
export const OPERATIONAL_HOURS = {
    weekday: { open: "08:00", close: "16:00" },
    saturday: { open: "08:00", close: "12:00" },
    sunday: null, // Closed
};

// Contact Information
export const CONTACT_INFO = {
    phone: "(0231) 234567",
    whatsapp: "08123456789",
    email: "pusdatin@umc.ac.id",
    address: "Kampus UMC, Jl. Fatahillah No. 40, Watubelah, Cirebon 45151",
    maps: "https://maps.google.com/?q=UMC+Cirebon",
};

// Social Media
export const SOCIAL_MEDIA = {
    instagram: "https://instagram.com/pusdatin_umc",
    facebook: "https://facebook.com/pusdatinumc",
    youtube: "https://youtube.com/@pusdatinumc",
    twitter: "https://twitter.com/pusdatin_umc",
};

// Navigation Items
export const NAV_ITEMS = [
    { label: "Beranda", href: "/" },
    { label: "Layanan", href: "/layanan" },
    {
        label: "Helpdesk",
        href: "/helpdesk",
        children: [
            { label: "Buat Tiket", href: "/helpdesk/tiket-baru" },
            { label: "Cek Status Tiket", href: "/helpdesk/status" },
            { label: "Riwayat Tiket", href: "/helpdesk/riwayat" },
        ],
    },
    { label: "Status Sistem", href: "/status" },
    { label: "FAQ", href: "/faq" },
] as const;

// Footer Links
export const FOOTER_LINKS = {
    layanan: [
        { label: "Helpdesk", href: "/pengembangan" },
        { label: "Aset TI", href: "/aset" },
        { label: "Status Sistem", href: "/status" },
        { label: "SSO", href: "https://www.sso.umc.ac.id/" },
    ],
    informasi: [
        { label: "Tentang Pusdatin", href: "/pengembangan" },
        { label: "FAQ", href: "/faq" },
        { label: "Kontak", href: "/pengembangan" },
    ],
    tautan: [
        { label: "Portal UMC", href: "https://umc.ac.id" },
        { label: "SIAKAD", href: "https://siakad.umc.ac.id" },
        { label: "LMS", href: "https://lms.umc.ac.id" },
        { label: "Email", href: "https://mail.umc.ac.id" },
    ],
};

// Status Colors
export const STATUS_COLORS = {
    // Tickets
    open: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    waiting_user: "bg-purple-100 text-purple-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
    escalated: "bg-red-100 text-red-800",

    // Priority
    low: "bg-slate-100 text-slate-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",

    // Services
    operational: "bg-green-100 text-green-800",
    degraded: "bg-yellow-100 text-yellow-800",
    partial_outage: "bg-orange-100 text-orange-800",
    major_outage: "bg-red-100 text-red-800",
    maintenance: "bg-blue-100 text-blue-800",
} as const;

// Priority Icons (lucide-react icon names)
export const PRIORITY_ICONS = {
    low: "ArrowDown",
    medium: "ArrowRight",
    high: "ArrowUp",
    urgent: "AlertTriangle",
} as const;
