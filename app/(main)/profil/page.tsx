"use client";

import { useState } from "react";
import Link from "next/link";
import {
    User,
    Mail,
    Phone,
    Building,
    Key,
    Shield,
    Bell,
    ArrowLeft,
    Save,
    Camera,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";

interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    unit: string;
    role: string;
    nim?: string;
    nip?: string;
    avatar?: string;
    createdAt: string;
}

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock user data
    const [profile, setProfile] = useState<UserProfile>({
        id: "1",
        name: "Ahmad Fauzi",
        email: "ahmad.fauzi@student.umc.ac.id",
        phone: "081234567890",
        unit: "Fakultas Teknik",
        role: "Mahasiswa",
        nim: "20210101234",
        createdAt: "2021-08-15T00:00:00.000Z",
    });

    const [formData, setFormData] = useState({
        name: profile.name,
        phone: profile.phone,
        unit: profile.unit,
    });

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setProfile((prev) => ({
            ...prev,
            ...formData,
        }));

        setIsSaving(false);
        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleCancel = () => {
        setFormData({
            name: profile.name,
            phone: profile.phone,
            unit: profile.unit,
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-muted/30 py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Kembali ke Dashboard
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        Profil Saya
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Kelola informasi profil dan preferensi akun Anda
                    </p>
                </div>

                {/* Success Alert */}
                {showSuccess && (
                    <Alert variant="success" dismissible className="mb-6">
                        Profil berhasil diperbarui!
                    </Alert>
                )}

                {/* Profile Card */}
                <Card className="mb-6">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Informasi Pribadi</CardTitle>
                        {!isEditing && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profil
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        {/* Avatar Section */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-10 w-10 text-primary" />
                                </div>
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full text-white hover:bg-primary/90">
                                        <Camera size={14} />
                                    </button>
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{profile.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="info">{profile.role}</Badge>
                                    {profile.nim && (
                                        <span className="text-sm text-muted-foreground">
                                            NIM: {profile.nim}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Nama Lengkap"
                                    value={isEditing ? formData.name : profile.name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    disabled={!isEditing}
                                    leftIcon={<User size={18} />}
                                />
                                <Input
                                    label="Email"
                                    value={profile.email}
                                    disabled
                                    leftIcon={<Mail size={18} />}
                                    hint="Email tidak dapat diubah"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="No. Telepon"
                                    value={isEditing ? formData.phone : profile.phone}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, phone: e.target.value }))
                                    }
                                    disabled={!isEditing}
                                    leftIcon={<Phone size={18} />}
                                />
                                <Input
                                    label="Unit / Fakultas"
                                    value={isEditing ? formData.unit : profile.unit}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, unit: e.target.value }))
                                    }
                                    disabled={!isEditing}
                                    leftIcon={<Building size={18} />}
                                />
                            </div>
                        </div>

                        {/* Edit Actions */}
                        {isEditing && (
                            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                                <Button variant="outline" onClick={handleCancel}>
                                    Batal
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    isLoading={isSaving}
                                    leftIcon={<Save size={18} />}
                                >
                                    Simpan Perubahan
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Security Settings */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Shield size={20} />
                            Keamanan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Key className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Password</p>
                                    <p className="text-sm text-muted-foreground">
                                        Terakhir diubah 3 bulan yang lalu
                                    </p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                Ubah Password
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Two-Factor Authentication</p>
                                    <p className="text-sm text-muted-foreground">
                                        Belum diaktifkan
                                    </p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                Aktifkan
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Bell size={20} />
                            Notifikasi
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="font-medium">Email Notifikasi</p>
                                    <p className="text-sm text-muted-foreground">
                                        Terima update tiket via email
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="font-medium">WhatsApp Notifikasi</p>
                                    <p className="text-sm text-muted-foreground">
                                        Terima notifikasi penting via WhatsApp
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                                />
                            </label>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
