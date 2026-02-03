import { ApiResponse, ErrorResponse } from "@/types/api";
import { API_URL } from "./constants";

// Base request function using fetch
async function request<T>(
    url: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
    };

    // Get token from localStorage (if exists)
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
            (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle 401 Unauthorized
            if (response.status === 401) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";
                }
            }

            const errorResponse: ErrorResponse = {
                success: false,
                error: data.error || "Unknown error",
                message: data.message || "An error occurred",
                statusCode: response.status,
                details: data.details,
            };
            throw errorResponse;
        }

        return data as ApiResponse<T>;
    } catch (error) {
        if ((error as ErrorResponse).statusCode) {
            throw error;
        }
        throw {
            success: false,
            error: "Network Error",
            message: "Failed to connect to server",
            statusCode: 0,
        } as ErrorResponse;
    }
}

// HTTP methods
export const http = {
    get: <T>(url: string, options?: RequestInit) =>
        request<T>(url, { ...options, method: "GET" }),

    post: <T>(url: string, body?: unknown, options?: RequestInit) =>
        request<T>(url, {
            ...options,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        }),

    put: <T>(url: string, body?: unknown, options?: RequestInit) =>
        request<T>(url, {
            ...options,
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        }),

    patch: <T>(url: string, body?: unknown, options?: RequestInit) =>
        request<T>(url, {
            ...options,
            method: "PATCH",
            body: body ? JSON.stringify(body) : undefined,
        }),

    delete: <T>(url: string, options?: RequestInit) =>
        request<T>(url, { ...options, method: "DELETE" }),
};

// API Endpoints
export const endpoints = {
    // Auth
    auth: {
        login: "/auth/login",
        logout: "/auth/logout",
        me: "/auth/me",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
    },

    // Tickets
    tickets: {
        list: "/tickets",
        create: "/tickets",
        get: (id: string) => `/tickets/${id}`,
        update: (id: string) => `/tickets/${id}`,
        status: (ticketNumber: string) => `/tickets/status/${ticketNumber}`,
        myTickets: "/tickets/my",
    },

    // Assets
    assets: {
        list: "/assets",
        get: (id: string) => `/assets/${id}`,
        borrow: "/assets/borrow",
        myBorrows: "/assets/my-borrows",
    },

    // Services
    services: {
        list: "/services",
        get: (slug: string) => `/services/${slug}`,
        status: "/services/status",
    },

    // Announcements
    announcements: {
        list: "/announcements",
        get: (id: string) => `/announcements/${id}`,
    },

    // FAQ
    faq: {
        list: "/faq",
    },

    // Contact
    contact: {
        send: "/contact",
    },
};

export default http;
