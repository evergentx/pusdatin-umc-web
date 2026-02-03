// Generic API Response
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    statusCode?: number;
}

// Paginated Response
export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    meta: PaginationMeta;
    error?: string;
    message?: string;
}

// Pagination Meta
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

// Pagination Params
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
}

// Error Response
export interface ErrorResponse {
    success: false;
    error: string;
    message: string;
    statusCode: number;
    details?: Record<string, string[]>;
}

// Validation Error
export interface ValidationError {
    field: string;
    message: string;
}
