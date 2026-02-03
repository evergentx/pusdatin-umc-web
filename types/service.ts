// Service Status
export enum ServiceStatus {
    OPERATIONAL = "operational",
    DEGRADED = "degraded",
    PARTIAL_OUTAGE = "partial_outage",
    MAJOR_OUTAGE = "major_outage",
    MAINTENANCE = "maintenance",
}

export const ServiceStatusLabels: Record<ServiceStatus, string> = {
    [ServiceStatus.OPERATIONAL]: "Operasional",
    [ServiceStatus.DEGRADED]: "Terganggu",
    [ServiceStatus.PARTIAL_OUTAGE]: "Gangguan Sebagian",
    [ServiceStatus.MAJOR_OUTAGE]: "Gangguan Total",
    [ServiceStatus.MAINTENANCE]: "Maintenance",
};

export const ServiceStatusColors: Record<ServiceStatus, string> = {
    [ServiceStatus.OPERATIONAL]: "success",
    [ServiceStatus.DEGRADED]: "warning",
    [ServiceStatus.PARTIAL_OUTAGE]: "warning",
    [ServiceStatus.MAJOR_OUTAGE]: "destructive",
    [ServiceStatus.MAINTENANCE]: "info",
};

// Service Category
export enum ServiceCategory {
    ACADEMIC = "academic",
    NETWORK = "network",
    COMMUNICATION = "communication",
    LEARNING = "learning",
    ADMINISTRATION = "administration",
}

export const ServiceCategoryLabels: Record<ServiceCategory, string> = {
    [ServiceCategory.ACADEMIC]: "Sistem Akademik",
    [ServiceCategory.NETWORK]: "Jaringan & Internet",
    [ServiceCategory.COMMUNICATION]: "Komunikasi",
    [ServiceCategory.LEARNING]: "Pembelajaran",
    [ServiceCategory.ADMINISTRATION]: "Administrasi",
};

// Service Interface
export interface Service {
    id: string;
    slug: string;
    name: string;
    description: string;
    category: ServiceCategory;
    status: ServiceStatus;
    icon?: string;
    url?: string;

    // SLA info
    slaResponseTime?: string; // e.g., "4 hours"
    slaResolutionTime?: string; // e.g., "24 hours"

    // Uptime
    uptimePercentage?: number;
    lastIncident?: string;

    // Details
    features?: string[];
    requirements?: string[];
    procedures?: string[];

    createdAt: string;
    updatedAt: string;
}

// Announcement Priority
export enum AnnouncementPriority {
    LOW = "low",
    NORMAL = "normal",
    HIGH = "high",
    CRITICAL = "critical",
}

// Announcement Interface
export interface Announcement {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    priority: AnnouncementPriority;
    category: string;
    imageUrl?: string;
    publishedAt: string;
    expiresAt?: string;
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
}

// FAQ Interface
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// System Service for status monitoring
export interface SystemService {
    id: string;
    name: string;
    description?: string;
    status: ServiceStatus;
    uptime?: number;
    incident?: {
        title: string;
        message: string;
        startedAt: string;
    };
}
