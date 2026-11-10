import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SsoLoginModal } from '@/components/SsoLoginModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FTI Repository — Fakultas Teknologi Informasi',
  description:
    'Portal Repositori Institusi Karya Ilmiah, Skripsi, Jurnal, dan Riset Dosen Fakultas Teknologi Informasi (Program Studi Sistem Informasi & Ilmu Komputer).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen flex flex-col bg-stone-50/50 text-slate-900`}>
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <SsoLoginModal />
        </AppProvider>
      </body>
    </html>
  );
}
