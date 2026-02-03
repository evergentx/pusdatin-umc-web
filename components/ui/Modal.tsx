"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    footer?: React.ReactNode;
}

const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = "md",
    showCloseButton = true,
    closeOnOverlayClick = true,
    footer,
}: ModalProps) => {
    const modalRef = React.useRef<HTMLDivElement>(null);

    // Close on escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    // Focus trap
    React.useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-4xl",
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={description ? "modal-description" : undefined}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={handleOverlayClick}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                tabIndex={-1}
                className={cn(
                    "relative w-full bg-card rounded-xl shadow-xl animate-fade-in-up",
                    "max-h-[90vh] overflow-hidden flex flex-col",
                    sizes[size]
                )}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                        <div>
                            {title && (
                                <h2
                                    id="modal-title"
                                    className="text-lg font-semibold text-foreground"
                                >
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p
                                    id="modal-description"
                                    className="mt-1 text-sm text-muted-foreground"
                                >
                                    {description}
                                </p>
                            )}
                        </div>
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-muted transition-colors"
                                aria-label="Tutup"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-border bg-muted/30">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

// Confirm Modal
interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "primary" | "destructive";
    isLoading?: boolean;
}

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Konfirmasi",
    cancelText = "Batal",
    variant = "primary",
    isLoading = false,
}: ConfirmModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
            size="sm"
            footer={
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === "destructive" ? "destructive" : "primary"}
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        {confirmText}
                    </Button>
                </div>
            }
        >
            <p className="text-muted-foreground">{description}</p>
        </Modal>
    );
};

export { Modal, ConfirmModal };
