// Asset Category
export enum AssetCategory {
    COMPUTER = "computer",
    LAPTOP = "laptop",
    MONITOR = "monitor",
    PRINTER = "printer",
    PROJECTOR = "projector",
    NETWORK = "network",
    SERVER = "server",
    PERIPHERAL = "peripheral",
    SOFTWARE = "software",
    OTHER = "other",
}

export const AssetCategoryLabels: Record<AssetCategory, string> = {
    [AssetCategory.COMPUTER]: "Komputer Desktop",
    [AssetCategory.LAPTOP]: "Laptop",
    [AssetCategory.MONITOR]: "Monitor",
    [AssetCategory.PRINTER]: "Printer",
    [AssetCategory.PROJECTOR]: "Proyektor",
    [AssetCategory.NETWORK]: "Perangkat Jaringan",
    [AssetCategory.SERVER]: "Server",
    [AssetCategory.PERIPHERAL]: "Peripheral",
    [AssetCategory.SOFTWARE]: "Software/Lisensi",
    [AssetCategory.OTHER]: "Lainnya",
};

// Asset Status
export enum AssetStatus {
    AVAILABLE = "available",
    IN_USE = "in_use",
    BORROWED = "borrowed",
    MAINTENANCE = "maintenance",
    DAMAGED = "damaged",
    DISPOSED = "disposed",
}

export const AssetStatusLabels: Record<AssetStatus, string> = {
    [AssetStatus.AVAILABLE]: "Tersedia",
    [AssetStatus.IN_USE]: "Digunakan",
    [AssetStatus.BORROWED]: "Dipinjam",
    [AssetStatus.MAINTENANCE]: "Maintenance",
    [AssetStatus.DAMAGED]: "Rusak",
    [AssetStatus.DISPOSED]: "Dihapuskan",
};

// Asset Condition
export enum AssetCondition {
    EXCELLENT = "excellent",
    GOOD = "good",
    FAIR = "fair",
    POOR = "poor",
}

export const AssetConditionLabels: Record<AssetCondition, string> = {
    [AssetCondition.EXCELLENT]: "Sangat Baik",
    [AssetCondition.GOOD]: "Baik",
    [AssetCondition.FAIR]: "Cukup",
    [AssetCondition.POOR]: "Buruk",
};

// Asset Interface
export interface Asset {
    id: string;
    assetCode: string;
    qrCode: string;
    name: string;
    category: AssetCategory;
    brand?: string;
    model?: string;
    serialNumber?: string;
    specifications?: string;
    purchaseYear?: number;
    purchasePrice?: number;
    location: string;
    status: AssetStatus;
    condition: AssetCondition;
    notes?: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

// Borrow Request Status
export enum BorrowRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    BORROWED = "borrowed",
    RETURNED = "returned",
    OVERDUE = "overdue",
}

export const BorrowRequestStatusLabels: Record<BorrowRequestStatus, string> = {
    [BorrowRequestStatus.PENDING]: "Menunggu Persetujuan",
    [BorrowRequestStatus.APPROVED]: "Disetujui",
    [BorrowRequestStatus.REJECTED]: "Ditolak",
    [BorrowRequestStatus.BORROWED]: "Sedang Dipinjam",
    [BorrowRequestStatus.RETURNED]: "Sudah Dikembalikan",
    [BorrowRequestStatus.OVERDUE]: "Terlambat",
};

// Borrow Request Interface
export interface BorrowRequest {
    id: string;
    requestNumber: string;
    assetId: string;
    asset?: Asset;

    // Borrower info
    borrowerName: string;
    borrowerEmail: string;
    borrowerPhone?: string;
    borrowerUnit: string;
    borrowerNIM?: string; // For students

    // Borrow details
    purpose: string;
    borrowDate: string;
    expectedReturnDate: string;
    actualReturnDate?: string;

    // Status
    status: BorrowRequestStatus;
    approvedBy?: string;
    rejectionReason?: string;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}

// Form input for borrow request
export interface CreateBorrowRequestInput {
    assetId: string;
    borrowerName: string;
    borrowerEmail: string;
    borrowerPhone?: string;
    borrowerUnit: string;
    borrowerNIM?: string;
    purpose: string;
    borrowDate: string;
    expectedReturnDate: string;
}
