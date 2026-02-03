// Ticket Category
export enum TicketCategory {
    NETWORK = "network",
    HARDWARE = "hardware",
    SOFTWARE = "software",
    EMAIL = "email",
    ACCOUNT = "account",
    SIAKAD = "siakad",
    LMS = "lms",
    WEBSITE = "website",
    OTHER = "other",
}

export const TicketCategoryLabels: Record<TicketCategory, string> = {
    [TicketCategory.NETWORK]: "Jaringan & Internet",
    [TicketCategory.HARDWARE]: "Perangkat Keras",
    [TicketCategory.SOFTWARE]: "Perangkat Lunak",
    [TicketCategory.EMAIL]: "Email Institusi",
    [TicketCategory.ACCOUNT]: "Akun & SSO",
    [TicketCategory.SIAKAD]: "SIAKAD",
    [TicketCategory.LMS]: "LMS / E-Learning",
    [TicketCategory.WEBSITE]: "Website Kampus",
    [TicketCategory.OTHER]: "Lainnya",
};


// Ticket Status
export enum TicketStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    WAITING_USER = "waiting_user",
    RESOLVED = "resolved",
    CLOSED = "closed",
    ESCALATED = "escalated",
}

export const TicketStatusLabels: Record<TicketStatus, string> = {
    [TicketStatus.OPEN]: "Menunggu",
    [TicketStatus.IN_PROGRESS]: "Diproses",
    [TicketStatus.WAITING_USER]: "Menunggu User",
    [TicketStatus.RESOLVED]: "Selesai",
    [TicketStatus.CLOSED]: "Ditutup",
    [TicketStatus.ESCALATED]: "Dieskalasi",
};

// Ticket Priority
export enum TicketPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent",
}

export const TicketPriorityLabels: Record<TicketPriority, string> = {
    [TicketPriority.LOW]: "Rendah",
    [TicketPriority.MEDIUM]: "Sedang",
    [TicketPriority.HIGH]: "Tinggi",
    [TicketPriority.URGENT]: "Mendesak",
};

// Ticket Attachment
export interface TicketAttachment {
    id: string;
    name: string;
    filename?: string;
    url: string;
    size: number;
    mimeType: string;
    createdAt: string;
}

// Ticket Activity/Log
export interface TicketActivity {
    id: string;
    ticketId?: string;
    type: "created" | "status_changed" | "assigned" | "comment" | "attachment" | "escalated";
    description: string;
    userId?: string;
    userName?: string;
    oldValue?: string;
    newValue?: string;
    createdAt: string;
}

// Reporter info
export interface TicketReporter {
    name: string;
    email: string;
    phone?: string;
    unit?: string;
}

// Assignee info
export interface TicketAssignee {
    id: string;
    name: string;
    email?: string;
}

// Main Ticket Interface
export interface Ticket {
    id: string;
    ticketNumber: string;
    category: TicketCategory | string;
    priority: TicketPriority;
    status: TicketStatus;
    subject: string;
    description: string;

    // Reporter info
    reporter: TicketReporter;

    // Assignment
    assignee?: TicketAssignee;

    // SLA
    slaDeadline: string;
    slaMet?: boolean;

    // Attachments
    attachments?: TicketAttachment[];

    // Timestamps
    createdAt: string;
    updatedAt: string;
    resolvedAt?: string;
    closedAt?: string;

    // Activity log
    activities?: TicketActivity[];
}

// Form input for creating ticket
export interface CreateTicketInput {
    category: TicketCategory;
    subject: string;
    description: string;
    reporterName: string;
    reporterEmail: string;
    reporterPhone?: string;
    reporterUnit?: string;
    attachments?: File[];
}

// Form input for checking ticket status
export interface CheckTicketStatusInput {
    ticketNumber: string;
    email: string;
}
