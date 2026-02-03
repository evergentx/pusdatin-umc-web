"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import styles from "./Header.module.css";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface NavChild {
    label: string;
    href: string;
    description?: string;
}

interface NavItem {
    label: string;
    href: string | null;
    children?: NavChild[];
}

const navLinks: NavItem[] = [
    { label: "Beranda", href: "/" },
    { label: "Layanan", href: "/layanan" },
    {
        label: "Helpdesk",
        href: null,
        children: [
            {
                label: "Buat Tiket",
                href: "/helpdesk/tiket-baru",
                description: "Laporkan masalah IT Anda",
            },
            {
                label: "Cek Status Tiket",
                href: "/helpdesk/status",
                description: "Pantau progress tiket",
            },
            {
                label: "Riwayat Tiket",
                href: "/helpdesk/riwayat",
                description: "Lihat semua tiket Anda",
            },
        ],
    },
    { label: "Status Sistem", href: "/status" },
    { label: "FAQ", href: "/faq" },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    const handleDropdownEnter = (label: string) => {
        setActiveDropdown(label);
    };

    const handleDropdownLeave = () => {
        setActiveDropdown(null);
    };

    const toggleMobileDropdown = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <img
                        src="/logo-umc.png"
                        alt="Logo UMC"
                        className={styles.logoImage}
                        width={40}
                        height={40}
                    />
                    <div className={styles.logoText}>
                        <span className={styles.logoPrimary}>PUSDATIN</span>
                        <span className={styles.logoSecondary}>Universitas Muhammadiyah Cirebon</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navLinks.map((link) => {
                                const hasChildren = link.children && link.children.length > 0;
                                const isActive = link.href === "/" ? pathname === "/" : (link.href && pathname.startsWith(link.href));

                                if (link.label === "Helpdesk" && hasChildren) {
                                    return (
                                        <NavigationMenuItem key={link.label}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        className={cn(
                                                            navigationMenuTriggerStyle(),
                                                            "bg-transparent text-base font-normal hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary focus:bg-transparent text-primary hover:underline underline-offset-4 decoration-2 decoration-primary px-2 h-auto cursor-pointer outline-none ring-0 focus:ring-0 w-max",
                                                            isActive && "font-bold underline"
                                                        )}
                                                    >
                                                        {link.label}
                                                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" className="w-[200px] bg-white p-2 rounded-xl shadow-lg border border-gray-100/50">
                                                    {link.children?.map((child) => (
                                                        <DropdownMenuItem key={child.href} asChild>
                                                            <Link
                                                                href={child.href}
                                                                className="w-full flex flex-col items-start px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors cursor-pointer outline-none focus:bg-gray-50 mb-1 last:mb-0"
                                                            >
                                                                <span className="font-medium">{child.label}</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </NavigationMenuItem>
                                    );
                                }

                                if (hasChildren) {
                                    return (
                                        <NavigationMenuItem key={link.label}>
                                            <NavigationMenuTrigger
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    "bg-transparent text-base font-normal hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary focus:bg-transparent text-primary hover:underline underline-offset-4 decoration-2 decoration-primary px-2 h-auto",
                                                    isActive && "font-bold underline"
                                                )}
                                            >
                                                {link.label}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                    {link.children?.map((child) => (
                                                        <li key={child.href}>
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    href={child.href}
                                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                                >
                                                                    <div className="text-sm font-medium leading-none text-primary">
                                                                        {child.label}
                                                                    </div>
                                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
                                                                        {child.description}
                                                                    </p>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    );
                                }

                                return (
                                    <NavigationMenuItem key={link.label}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={link.href || "#"}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    "bg-transparent text-base font-normal hover:bg-transparent hover:text-primary focus:bg-transparent text-primary hover:underline underline-offset-4 decoration-2 decoration-primary px-2 h-auto",
                                                    isActive && "font-bold underline"
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <Link
                        href="https://sso.umc.ac.id"
                        target="_blank"
                        className={cn(styles.ctaButton, "hover:underline ml-4")}
                    >
                        Login SSO
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={styles.menuButton}
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        layout
                        className={styles.mobileNav}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col p-4 space-y-2">
                            {navLinks.map((link) => {
                                const hasChildren = link.children && link.children.length > 0;
                                const isActive = link.href === "/" ? pathname === "/" : (link.href && pathname.startsWith(link.href));

                                return (
                                    <div key={link.label} className="border-b border-gray-100 last:border-0 pb-2">
                                        {hasChildren ? (
                                            <div>
                                                <button
                                                    onClick={() => toggleMobileDropdown(link.label)}
                                                    className={cn(
                                                        styles.mobileNavLink,
                                                        "w-full flex items-center justify-between text-left py-2",
                                                        isActive && "text-primary font-bold"
                                                    )}
                                                >
                                                    {link.label}
                                                    <ChevronDown size={16} className={cn("transition-transform", activeDropdown === link.label ? "rotate-180" : "")} />
                                                </button>
                                                <AnimatePresence>
                                                    {activeDropdown === link.label && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden bg-gray-50 rounded-md mt-1"
                                                        >
                                                            {link.children?.map((child) => (
                                                                <Link
                                                                    key={child.href}
                                                                    href={child.href}
                                                                    className="block px-6 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                                                                >
                                                                    <div className="font-medium">{child.label}</div>
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={link.href || "#"}
                                                className={cn(
                                                    styles.mobileNavLink,
                                                    "block py-2",
                                                    "hover:underline",
                                                    isActive && "text-primary font-bold"
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                            <div className="pt-4">
                                <Link
                                    href="https://sso.umc.ac.id"
                                    target="_blank"
                                    className={cn(styles.ctaButton, "w-full flex justify-center py-3 hover:underline")}
                                >
                                    Login SSO
                                </Link>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
