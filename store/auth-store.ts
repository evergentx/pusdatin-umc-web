import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, AuthSession } from "@/types/user";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setSession: (session: AuthSession | null) => void;
    login: (session: AuthSession) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                }),

            setSession: (session) =>
                set({
                    user: session?.user ?? null,
                    accessToken: session?.accessToken ?? null,
                    isAuthenticated: !!session,
                }),

            login: (session) =>
                set({
                    user: session.user,
                    accessToken: session.accessToken,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    user: null,
                    accessToken: null,
                    isAuthenticated: false,
                }),

            setLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

// Selector hooks for better performance
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
