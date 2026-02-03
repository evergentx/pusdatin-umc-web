import { format, formatDistanceToNow, parseISO, isValid } from "date-fns";
import { id } from "date-fns/locale";

/**
 * Format date to Indonesian locale
 * @param date - Date string or Date object
 * @param formatStr - Format string (default: "dd MMMM yyyy")
 */
export function formatDate(
    date: string | Date,
    formatStr: string = "dd MMMM yyyy"
): string {
    try {
        const dateObj = typeof date === "string" ? parseISO(date) : date;
        if (!isValid(dateObj)) return "-";
        return format(dateObj, formatStr, { locale: id });
    } catch {
        return "-";
    }
}

/**
 * Format date with time
 * @param date - Date string or Date object
 */
export function formatDateTime(date: string | Date): string {
    return formatDate(date, "dd MMMM yyyy HH:mm");
}

/**
 * Format date short
 * @param date - Date string or Date object
 */
export function formatDateShort(date: string | Date): string {
    return formatDate(date, "dd/MM/yyyy");
}

/**
 * Format time only
 * @param date - Date string or Date object
 */
export function formatTime(date: string | Date): string {
    return formatDate(date, "HH:mm");
}

/**
 * Format relative time (e.g., "2 hari yang lalu")
 * @param date - Date string or Date object
 */
export function formatRelativeTime(date: string | Date): string {
    try {
        const dateObj = typeof date === "string" ? parseISO(date) : date;
        if (!isValid(dateObj)) return "-";
        return formatDistanceToNow(dateObj, { addSuffix: true, locale: id });
    } catch {
        return "-";
    }
}

/**
 * Format countdown timer (for SLA)
 * @param targetDate - Target date string
 * @returns Object with days, hours, minutes, seconds, and isOverdue
 */
export function formatCountdown(targetDate: string): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isOverdue: boolean;
    formatted: string;
} {
    try {
        const target = parseISO(targetDate);
        const now = new Date();
        const diffMs = target.getTime() - now.getTime();
        const isOverdue = diffMs < 0;
        const absDiffMs = Math.abs(diffMs);

        const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((absDiffMs % (1000 * 60)) / 1000);

        let formatted = "";
        if (days > 0) formatted += `${days}h `;
        if (hours > 0 || days > 0) formatted += `${hours}j `;
        formatted += `${minutes}m`;
        if (isOverdue) formatted = `Terlambat ${formatted}`;

        return { days, hours, minutes, seconds, isOverdue, formatted };
    } catch {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isOverdue: false, formatted: "-" };
    }
}

/**
 * Format SLA remaining time with status
 * @param targetDate - SLA deadline date string
 * @returns Object with text, isOverdue, isWarning
 */
export function formatSLARemaining(targetDate: string): {
    text: string;
    isOverdue: boolean;
    isWarning: boolean;
} {
    try {
        const target = parseISO(targetDate);
        const now = new Date();
        const diffMs = target.getTime() - now.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        const isOverdue = diffMs < 0;
        const isWarning = diffHours > 0 && diffHours <= 4; // Warning if less than 4 hours

        if (isOverdue) {
            const absDiffMs = Math.abs(diffMs);
            const hours = Math.floor(absDiffMs / (1000 * 60 * 60));
            const minutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));
            return {
                text: `Terlambat ${hours}j ${minutes}m`,
                isOverdue: true,
                isWarning: false,
            };
        }

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        let text = "";
        if (days > 0) {
            text = `${days}h ${hours}j`;
        } else if (hours > 0) {
            text = `${hours}j ${minutes}m`;
        } else {
            text = `${minutes} menit`;
        }

        return { text, isOverdue, isWarning };
    } catch {
        return { text: "-", isOverdue: false, isWarning: false };
    }
}

/**
 * Format file size to human readable
 * @param bytes - File size in bytes
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Format number to Indonesian locale
 * @param num - Number to format
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat("id-ID").format(num);
}

/**
 * Format currency to Indonesian Rupiah
 * @param amount - Amount to format
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format percentage
 * @param value - Value to format (0-100)
 * @param decimals - Number of decimal places
 */
export function formatPercentage(value: number, decimals: number = 1): string {
    return `${value.toFixed(decimals)}%`;
}

/**
 * Format phone number to Indonesian format
 * @param phone - Phone number string
 */
export function formatPhoneNumber(phone: string): string {
    // Remove non-digits
    const cleaned = phone.replace(/\D/g, "");

    // Handle Indonesian phone numbers
    if (cleaned.startsWith("62")) {
        const formatted = cleaned.slice(2);
        return `+62 ${formatted.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3")}`;
    }
    if (cleaned.startsWith("0")) {
        return cleaned.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");
    }
    return phone;
}

/**
 * Slugify text
 * @param text - Text to slugify
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim();
}

/**
 * Strip HTML tags from string
 * @param html - HTML string
 */
export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "");
}
