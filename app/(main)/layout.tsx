import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-[80px] w-full">{children}</main>
            <Footer />
        </div>
    );
}
