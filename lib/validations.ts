import { z } from "zod";
import { TicketCategory, TicketPriority } from "@/types/ticket";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "./constants";

// Login Schema
export const loginSchema = z.object({
    username: z
        .string()
        .min(1, "Username wajib diisi")
        .min(3, "Username minimal 3 karakter"),
    password: z
        .string()
        .min(1, "Password wajib diisi")
        .min(6, "Password minimal 6 karakter"),
    rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(1, "Password baru wajib diisi")
            .min(8, "Password minimal 8 karakter")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password harus mengandung huruf besar, huruf kecil, dan angka"
            ),
        passwordConfirmation: z.string().min(1, "Konfirmasi password wajib diisi"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Konfirmasi password tidak cocok",
        path: ["passwordConfirmation"],
    });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Create Ticket Schema
export const createTicketSchema = z.object({
    category: z.nativeEnum(TicketCategory, {
        errorMap: () => ({ message: "Kategori wajib dipilih" }),
    }),
    subject: z
        .string()
        .min(1, "Subjek wajib diisi")
        .min(10, "Subjek minimal 10 karakter")
        .max(200, "Subjek maksimal 200 karakter"),
    description: z
        .string()
        .min(1, "Deskripsi wajib diisi")
        .min(20, "Deskripsi minimal 20 karakter")
        .max(5000, "Deskripsi maksimal 5000 karakter"),
    priority: z.nativeEnum(TicketPriority).optional().default(TicketPriority.MEDIUM),
    reporterName: z
        .string()
        .min(1, "Nama wajib diisi")
        .min(3, "Nama minimal 3 karakter")
        .max(100, "Nama maksimal 100 karakter"),
    reporterEmail: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),
    reporterPhone: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^(\+62|62|0)[0-9]{9,13}$/.test(val.replace(/[\s-]/g, "")),
            "Format nomor telepon tidak valid"
        ),
    reporterUnit: z.string().optional(),
});

export type CreateTicketFormData = z.infer<typeof createTicketSchema>;

// Check Ticket Status Schema
export const checkTicketStatusSchema = z.object({
    ticketNumber: z
        .string()
        .min(1, "Nomor tiket wajib diisi")
        .regex(/^TKT-\d{8}-\d{4}$/, "Format nomor tiket tidak valid (contoh: TKT-20240203-1234)"),
    email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),
});

export type CheckTicketStatusFormData = z.infer<typeof checkTicketStatusSchema>;

// Borrow Asset Schema
export const borrowAssetSchema = z.object({
    assetId: z.string().min(1, "Aset wajib dipilih"),
    borrowerName: z
        .string()
        .min(1, "Nama peminjam wajib diisi")
        .min(3, "Nama minimal 3 karakter"),
    borrowerEmail: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),
    borrowerPhone: z
        .string()
        .min(1, "Nomor telepon wajib diisi")
        .regex(/^(\+62|62|0)[0-9]{9,13}$/, "Format nomor telepon tidak valid"),
    borrowerUnit: z.string().min(1, "Unit/Fakultas wajib diisi"),
    borrowerNIM: z.string().optional(),
    purpose: z
        .string()
        .min(1, "Tujuan peminjaman wajib diisi")
        .min(10, "Tujuan minimal 10 karakter")
        .max(500, "Tujuan maksimal 500 karakter"),
    borrowDate: z.string().min(1, "Tanggal peminjaman wajib diisi"),
    expectedReturnDate: z.string().min(1, "Tanggal pengembalian wajib diisi"),
});

export type BorrowAssetFormData = z.infer<typeof borrowAssetSchema>;

// Contact Form Schema
export const contactSchema = z.object({
    name: z
        .string()
        .min(1, "Nama wajib diisi")
        .min(3, "Nama minimal 3 karakter"),
    email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),
    subject: z
        .string()
        .min(1, "Subjek wajib diisi")
        .min(5, "Subjek minimal 5 karakter"),
    message: z
        .string()
        .min(1, "Pesan wajib diisi")
        .min(20, "Pesan minimal 20 karakter")
        .max(2000, "Pesan maksimal 2000 karakter"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// File validation helper
export function validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > MAX_FILE_SIZE) {
        return { valid: false, error: `Ukuran file maksimal ${MAX_FILE_SIZE / 1024 / 1024}MB` };
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return { valid: false, error: "Tipe file tidak diizinkan" };
    }

    return { valid: true };
}

// Multiple files validation
export function validateFiles(files: File[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (files.length > 5) {
        errors.push("Maksimal 5 file yang dapat diunggah");
    }

    files.forEach((file, index) => {
        const result = validateFile(file);
        if (!result.valid) {
            errors.push(`File ${index + 1} (${file.name}): ${result.error}`);
        }
    });

    return { valid: errors.length === 0, errors };
}
