import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import { CONTACT_INFO, FOOTER_LINKS, SOCIAL_MEDIA } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg p-1">
                <Image
                  src="/logo.svg"
                  alt="Logo Pusdatin UMC"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Pusdatin</h3>
                <p className="text-xs text-primary-foreground/70">
                  Universitas Muhammadiyah Cirebon
                </p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Pusat Data dan Teknologi Informasi - Melayani seluruh kebutuhan
              infrastruktur IT dan layanan digital kampus.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-all hover:translate-x-1"
              >
                <Mail size={16} />
                {CONTACT_INFO.email}
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-all hover:translate-x-1"
              >
                <Phone size={16} />
                {CONTACT_INFO.phone}
              </a>
              <a
                href={CONTACT_INFO.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-all hover:translate-x-1"
              >
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </a>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.layanan.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h4 className="font-semibold mb-4">Informasi</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.informasi.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Jam Operasional */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Clock size={16} />
                Jam Operasional
              </h4>
              <ul className="space-y-1 text-sm text-primary-foreground/80">
                <li>Senin - Jumat: 08:00 - 16:00</li>
                <li>Sabtu: 08:00 - 12:00</li>
                <li>Minggu & Libur: Tutup</li>
              </ul>
            </div>
          </div>

          {/* Tautan & Social */}
          <div>
            <h4 className="font-semibold mb-4">Tautan UMC</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.tautan.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-all hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Ikuti Kami</h4>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_MEDIA.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={SOCIAL_MEDIA.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={SOCIAL_MEDIA.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href={SOCIAL_MEDIA.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <p>
              © {currentYear} Pusdatin Universitas Muhammadiyah Cirebon. All
              rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/kebijakan-privasi" className="hover:text-primary-foreground transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/syarat-ketentuan" className="hover:text-primary-foreground transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
