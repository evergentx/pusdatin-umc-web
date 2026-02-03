import * as React from "react";
import { cn } from "@/lib/utils";
import { Inbox, FileX, Search, AlertCircle } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const EmptyState = ({
    className,
    icon,
    title,
    description,
    action,
    ...props
}: EmptyStateProps) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-12 px-4 text-center",
                className
            )}
            {...props}
        >
            <div className="mb-4 text-muted-foreground">
                {icon || <Inbox className="h-12 w-12" />}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground max-w-md mb-4">
                    {description}
                </p>
            )}
            {action && (
                <Button onClick={action.onClick}>{action.label}</Button>
            )}
        </div>
    );
};

// Pre-configured empty states
const NoDataState = ({
    title = "Tidak ada data",
    description = "Belum ada data yang tersedia",
    ...props
}: Partial<EmptyStateProps>) => (
    <EmptyState
        icon={<Inbox className="h-12 w-12" />}
        title={title}
        description={description}
        {...props}
    />
);

const NoSearchResultsState = ({
    title = "Tidak ditemukan",
    description = "Tidak ada hasil yang cocok dengan pencarian Anda",
    ...props
}: Partial<EmptyStateProps>) => (
    <EmptyState
        icon={<Search className="h-12 w-12" />}
        title={title}
        description={description}
        {...props}
    />
);

const ErrorState = ({
    title = "Terjadi kesalahan",
    description = "Maaf, terjadi kesalahan saat memuat data. Silakan coba lagi.",
    action,
    ...props
}: Partial<EmptyStateProps>) => (
    <EmptyState
        icon={<AlertCircle className="h-12 w-12 text-destructive" />}
        title={title}
        description={description}
        action={action || { label: "Coba Lagi", onClick: () => window.location.reload() }}
        {...props}
    />
);

const NotFoundState = ({
    title = "Halaman tidak ditemukan",
    description = "Halaman yang Anda cari tidak ada atau sudah dipindahkan.",
    ...props
}: Partial<EmptyStateProps>) => (
    <EmptyState
        icon={<FileX className="h-12 w-12" />}
        title={title}
        description={description}
        {...props}
    />
);

export {
    EmptyState,
    NoDataState,
    NoSearchResultsState,
    ErrorState,
    NotFoundState,
};
