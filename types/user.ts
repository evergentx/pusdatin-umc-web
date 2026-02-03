// User Role
export enum UserRole {
    GUEST = "guest",
    MAHASISWA = "mahasiswa",
    DOSEN = "dosen",
    TENDIK = "tendik",
    ADMIN_HELPDESK = "admin_helpdesk",
    ADMIN_ASSET = "admin_asset",
    ADMIN_NETWORK = "admin_network",
    SUPER_ADMIN = "super_admin",
}

export const UserRoleLabels: Record<UserRole, string> = {
    [UserRole.GUEST]: "Tamu",
    [UserRole.MAHASISWA]: "Mahasiswa",
    [UserRole.DOSEN]: "Dosen",
    [UserRole.TENDIK]: "Tenaga Kependidikan",
    [UserRole.ADMIN_HELPDESK]: "Admin Helpdesk",
    [UserRole.ADMIN_ASSET]: "Admin Aset",
    [UserRole.ADMIN_NETWORK]: "Admin Jaringan",
    [UserRole.SUPER_ADMIN]: "Super Admin",
};

// User Status
export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
}

// User Interface
export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    role: UserRole;
    status: UserStatus;
    unit?: string;
    phone?: string;
    avatar?: string;
    nim?: string; // For students
    nip?: string; // For staff
    lastLoginAt?: string;
    createdAt: string;
    updatedAt: string;
}

// Auth Session
export interface AuthSession {
    user: User;
    accessToken: string;
    refreshToken?: string;
    expiresAt: string;
}

// Login Input
export interface LoginInput {
    username: string;
    password: string;
    rememberMe?: boolean;
}

// Forgot Password Input
export interface ForgotPasswordInput {
    email: string;
}

// Reset Password Input
export interface ResetPasswordInput {
    token: string;
    password: string;
    passwordConfirmation: string;
}
