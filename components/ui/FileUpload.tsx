"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload, X, FileText, Image as ImageIcon, File } from "lucide-react";
import { formatFileSize } from "@/lib/format";
import { validateFile } from "@/lib/validations";
import { ALLOWED_FILE_EXTENSIONS, MAX_FILE_SIZE } from "@/lib/constants";
import { Button } from "./Button";

interface FileUploadProps {
    label?: string;
    hint?: string;
    error?: string;
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    value?: File[];
    onChange?: (files: File[]) => void;
    disabled?: boolean;
}

const FileUpload = ({
    label,
    hint,
    error,
    accept,
    multiple = false,
    maxFiles = 5,
    value = [],
    onChange,
    disabled = false,
}: FileUploadProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [fileErrors, setFileErrors] = React.useState<string[]>([]);

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList || disabled) return;

        const newFiles: File[] = [];
        const errors: string[] = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];

            // Check max files
            if (value.length + newFiles.length >= maxFiles) {
                errors.push(`Maksimal ${maxFiles} file`);
                break;
            }

            // Validate file
            const validation = validateFile(file);
            if (!validation.valid) {
                errors.push(`${file.name}: ${validation.error}`);
                continue;
            }

            // Check for duplicates
            if (value.some((f) => f.name === file.name && f.size === file.size)) {
                errors.push(`${file.name}: File sudah ada`);
                continue;
            }

            newFiles.push(file);
        }

        setFileErrors(errors);
        if (newFiles.length > 0) {
            onChange?.([...value, ...newFiles]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        // Reset input
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const removeFile = (index: number) => {
        const newFiles = value.filter((_, i) => i !== index);
        onChange?.(newFiles);
        setFileErrors([]);
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) {
            return <ImageIcon className="h-5 w-5" />;
        }
        if (file.type === "application/pdf") {
            return <FileText className="h-5 w-5" />;
        }
        return <File className="h-5 w-5" />;
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-foreground mb-1.5">
                    {label}
                </label>
            )}

            {/* Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={cn(
                    "relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                    isDragging
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50",
                    disabled && "opacity-50 cursor-not-allowed",
                    error && "border-destructive"
                )}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept || ALLOWED_FILE_EXTENSIONS.join(",")}
                    multiple={multiple}
                    onChange={handleInputChange}
                    disabled={disabled}
                    className="hidden"
                />

                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-foreground">
                    <span className="font-medium text-primary">Klik untuk upload</span>{" "}
                    atau drag & drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    Maks. {formatFileSize(MAX_FILE_SIZE)} per file • {maxFiles} file
                </p>
            </div>

            {/* File List */}
            {value.length > 0 && (
                <div className="mt-3 space-y-2">
                    {value.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg"
                        >
                            <span className="text-muted-foreground">
                                {getFileIcon(file)}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                }}
                                className="h-8 w-8"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* Errors */}
            {(error || fileErrors.length > 0) && (
                <div className="mt-2 space-y-1">
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {fileErrors.map((err, i) => (
                        <p key={i} className="text-sm text-destructive">
                            {err}
                        </p>
                    ))}
                </div>
            )}

            {/* Hint */}
            {hint && !error && fileErrors.length === 0 && (
                <p className="mt-1.5 text-sm text-muted-foreground">{hint}</p>
            )}
        </div>
    );
};

export { FileUpload };
