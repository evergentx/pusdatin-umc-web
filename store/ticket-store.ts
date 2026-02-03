import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TicketCategory, TicketPriority } from "@/types/ticket";

interface TicketDraft {
    category?: TicketCategory;
    subject: string;
    description: string;
    priority?: TicketPriority;
    reporterName: string;
    reporterEmail: string;
    reporterPhone: string;
    reporterUnit: string;
}

interface TicketState {
    draft: TicketDraft;
    lastSaved: string | null;

    // Actions
    setDraft: (draft: Partial<TicketDraft>) => void;
    clearDraft: () => void;
    saveDraft: () => void;
}

const initialDraft: TicketDraft = {
    category: undefined,
    subject: "",
    description: "",
    priority: TicketPriority.MEDIUM,
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    reporterUnit: "",
};

export const useTicketStore = create<TicketState>()(
    persist(
        (set, get) => ({
            draft: initialDraft,
            lastSaved: null,

            setDraft: (updates) =>
                set((state) => ({
                    draft: { ...state.draft, ...updates },
                })),

            clearDraft: () =>
                set({
                    draft: initialDraft,
                    lastSaved: null,
                }),

            saveDraft: () =>
                set({
                    lastSaved: new Date().toISOString(),
                }),
        }),
        {
            name: "ticket-draft-storage",
            partialize: (state) => ({
                draft: state.draft,
                lastSaved: state.lastSaved,
            }),
        }
    )
);

// Selector hooks
export const useTicketDraft = () => useTicketStore((state) => state.draft);
export const useTicketLastSaved = () => useTicketStore((state) => state.lastSaved);
