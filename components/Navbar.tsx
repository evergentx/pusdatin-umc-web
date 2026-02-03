"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Headphones,
  User,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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

const NAV_ITEMS: NavItem[] = [
  {
    label: "Beranda",
    href: "/",
  },
  {
    label: "Layanan",
    href: "/layanan",
  },
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
  {
    label: "Status Sistem",
    href: "/status",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isActive = (href: string | null): boolean => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const hasActiveChild = (children?: NavChild[]): boolean => {
    if (!children) return false;
    return children.some((child) => isActive(child.href));
  };

  const toggleSubmenu = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Logo Pusdatin UMC"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <h1 className="font-bold text-primary text-sm sm:text-base">
                Pusdatin
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Universitas Muhammadiyah Cirebon
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm
                        ${hasActiveChild(item.children) ||
                          activeDropdown === item.label
                          ? "text-primary bg-primary/5"
                          : "text-foreground hover:text-primary hover:bg-muted"
                        }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 w-64 z-50">
                        <div className="bg-white border border-border/70 rounded-xl shadow-xl py-2 ring-1 ring-black/5">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`group flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-lg mx-1.5
                                ${isActive(subItem.href)
                                  ? "bg-primary/10 text-primary font-semibold"
                                  : "text-foreground hover:bg-muted hover:text-primary"
                                }`}
                            >
                              <div>
                                <div className="font-medium text-sm">{subItem.label}</div>
                                {subItem.description && (
                                  <div className="text-xs text-muted-foreground group-hover:text-primary/70">
                                    {subItem.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm
                      ${isActive(item.href)
                        ? "text-primary bg-primary/5 font-semibold"
                        : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/helpdesk/tiket-baru">
              <Button size="sm" variant="outline" leftIcon={<Headphones size={16} />}>
                Buat Tiket
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" leftIcon={<LogIn size={16} />}>
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-border mt-1 animate-fade-in-up">
            <div className="py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between font-medium
                          ${hasActiveChild(item.children) ||
                            activeDropdown === item.label
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                          }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {activeDropdown === item.label && (
                        <div className="bg-muted/40 rounded-xl mx-3 mb-2 overflow-hidden">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={closeMobileMenu}
                              className={`flex items-center gap-3 px-5 py-3 border-b border-border/50 last:border-b-0 transition-colors
                                ${isActive(subItem.href)
                                  ? "bg-primary text-white font-medium"
                                  : "text-foreground hover:bg-white/60 hover:text-primary"
                                }`}
                            >
                              <div>
                                <div className="font-medium">{subItem.label}</div>
                                {subItem.description && (
                                  <div
                                    className={`text-xs mt-0.5 ${isActive(subItem.href)
                                      ? "text-white/80"
                                      : "text-muted-foreground"
                                      }`}
                                  >
                                    {subItem.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={closeMobileMenu}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all
                        ${isActive(item.href)
                          ? "bg-primary text-white font-semibold"
                          : "text-foreground hover:bg-muted"
                        }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA buttons */}
              <div className="pt-4 px-4 space-y-2 border-t border-border mt-4">
                <Link href="/helpdesk/tiket-baru" onClick={closeMobileMenu}>
                  <Button className="w-full" variant="outline" leftIcon={<Headphones size={16} />}>
                    Buat Tiket
                  </Button>
                </Link>
                <Link href="/login" onClick={closeMobileMenu}>
                  <Button className="w-full" leftIcon={<LogIn size={16} />}>
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
