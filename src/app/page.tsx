'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { HeroSearch } from '@/components/HeroSearch';
import { RepositoryCard } from '@/components/RepositoryCard';
import { CitationModal } from '@/components/CitationModal';
import { PdfPreviewModal } from '@/components/PdfPreviewModal';
import { RepositoryItem } from '@/data/types';
import { ftiStats, departmentStats } from '@/data/mockData';
import {
  BookOpen,
  Upload,
  FileText,
  FileCheck,
  Download,
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { repositories, selectedDepartment, setSelectedDepartment } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'Sistem Informasi' | 'Ilmu Komputer' | 'Dosen'>('All');
  const [activeModalItem, setActiveModalItem] = useState<RepositoryItem | null>(null);
  const [activePdfItem, setActivePdfItem] = useState<RepositoryItem | null>(null);

  // Filter items for main column
  const displayedItems = repositories.filter((item) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Dosen') return item.author.role === 'Dosen';
    return item.department === activeTab;
  });

  return (
    <div>
      {/* 1. Official Institutional Search & Announcement */}
      <HeroSearch />

      {/* 2. Main Two-Column Campus Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Main Academic Catalog Stream (8 of 12 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Section Header with Tab Selection */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-600" />
                    <span>Koleksi Terbaru Repositori FTI</span>
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Deposit naskah skripsi mahasiswa dan publikasi riset sivitas akademika
                  </p>
                </div>

                <Link
                  href="/repository"
                  className="text-xs font-semibold text-orange-700 hover:underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>Katalog Lengkap ({repositories.length} Naskah)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-1 pt-3 overflow-x-auto text-xs font-medium">
                <button
                  onClick={() => setActiveTab('All')}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    activeTab === 'All'
                      ? 'bg-orange-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Semua Koleksi ({repositories.length})
                </button>
                <button
                  onClick={() => setActiveTab('Sistem Informasi')}
                  className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
                    activeTab === 'Sistem Informasi'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-3 h-3 text-blue-500" />
                  <span>S1 Sistem Informasi</span>
                </button>
                <button
                  onClick={() => setActiveTab('Ilmu Komputer')}
                  className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
                    activeTab === 'Ilmu Komputer'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Cpu className="w-3 h-3 text-emerald-500" />
                  <span>S1 Ilmu Komputer</span>
                </button>
                <button
                  onClick={() => setActiveTab('Dosen')}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    activeTab === 'Dosen'
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Publikasi Dosen
                </button>
              </div>
            </div>

            {/* List of Academic Repository Records */}
            <div className="space-y-3">
              {displayedItems.slice(0, 7).map((item) => (
                <RepositoryCard
                  key={item.id}
                  item={item}
                  onCite={(it) => setActiveModalItem(it)}
                  onPreviewPdf={(it) => setActivePdfItem(it)}
                />
              ))}
            </div>

            {/* View Full Catalog Button */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg text-center">
              <Link
                href="/repository"
                className="inline-flex items-center gap-2 px-5 py-2 bg-slate-800 hover:bg-orange-600 text-white text-xs font-bold rounded transition-colors"
              >
                <span>Buka Seluruh Direktori Repositori FTI</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Official Campus Sidebar Widgets (4 of 12 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* WIDGET 1: Layanan Penyerahan Mandiri Skripsi */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
              <div className="bg-orange-600 text-white px-4 py-3 flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wide">
                  Penyerahan Mandiri Tugas Akhir
                </h3>
              </div>
              <div className="p-4 space-y-3 text-xs">
                <p className="text-slate-600 leading-relaxed">
                  Mahasiswa yang telah lulus sidang tugas akhir wajib melakukan deposit naskah mandiri
                  sebagai syarat bebas perpustakaan dan kelulusan yudisium.
                </p>

                <div className="p-3 bg-orange-50 border border-orange-200 rounded space-y-2">
                  <div className="font-bold text-orange-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Ketentuan Plagiasi: Maksimal 20%</span>
                  </div>
                  <div className="text-[11px] text-orange-900">
                    Naskah diuji menggunakan akun resmi Turnitin Perpustakaan FTI.
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded text-xs transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Mulai Unggah Mandiri Skripsi</span>
                  </Link>
                </div>

                {/* Download links */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="font-semibold text-slate-700 block text-[11px]">
                    Unduh Berkas Pendukung:
                  </span>
                  <a
                    href="#template-doc"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Mengunduh Template_Skripsi_FTI_2024.docx');
                    }}
                    className="flex items-center justify-between text-slate-600 hover:text-orange-700 text-[11px] hover:underline"
                  >
                    <span>• Template Format Skripsi (.docx)</span>
                    <Download className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href="#lembar-pengesahan"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Mengunduh Format_Lembar_Pengesahan_FTI.docx');
                    }}
                    className="flex items-center justify-between text-slate-600 hover:text-orange-700 text-[11px] hover:underline"
                  >
                    <span>• Format Lembar Pengesahan Sidang</span>
                    <Download className="w-3 h-3 text-slate-400" />
                  </a>
                  <Link
                    href="/about#pedoman"
                    className="flex items-center justify-between text-slate-600 hover:text-orange-700 text-[11px] hover:underline"
                  >
                    <span>• SOP Bebas Perpustakaan FTI</span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>

            {/* WIDGET KHUSUS MAHASISWA: Eksplorasi Judul & Celah Riset */}
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent border border-orange-200 rounded-lg overflow-hidden shadow-xs">
              <div className="bg-orange-600 text-white px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-300" />
                  <span>BINGUNG CARI JUDUL SKRIPSI?</span>
                </div>
                <span className="text-[10px] bg-orange-700 font-semibold px-2 py-0.5 rounded text-amber-200">
                  Fitur Khusus FTI
                </span>
              </div>
              <div className="p-4 space-y-3 text-xs">
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Temukan topik skripsi dari <strong>celah riset (research gap)</strong> naskah sebelumnya, rekomendasi dosen pembimbing yang linier, dan repositori software artifacts (dataset &amp; source code).
                </p>
                <div className="space-y-1.5 text-[11px] text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span><strong>6 Rumpun Topik</strong> (TOGAF, BI, AI, Cyber Security, dll)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span><strong>18+ Ide Masalah Terkini</strong> siap diteliti</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span><strong>Pencocokan Dosen</strong> sesuai bidang keahlian</span>
                  </div>
                </div>
                <Link
                  href="/topics"
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded text-xs transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Jelajahi Celah Riset Skripsi &raquo;</span>
                </Link>
              </div>
            </div>

            {/* WIDGET 2: Dua Jurusan di FTI */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Program Studi Fakultas
                </h3>
              </div>
              <div className="p-4 space-y-3 text-xs">
                {/* SI */}
                <div className="p-3 border border-blue-100 rounded bg-blue-50/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <span>S1 Sistem Informasi</span>
                    </span>
                    <span className="text-[10px] bg-blue-200/60 text-blue-900 font-semibold px-1.5 py-0.5 rounded">
                      S.Kom
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Enterprise Architecture (TOGAF), Data Analytics, UI/UX, dan Tata Kelola TI (COBIT).
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-blue-800 font-semibold">
                      {departmentStats.sistemInformasi.totalWorks} Koleksi
                    </span>
                    <Link
                      href="/departments/sistem-informasi"
                      className="text-blue-700 font-semibold hover:underline"
                    >
                      Buka Profil &raquo;
                    </Link>
                  </div>
                </div>

                {/* Ilkom */}
                <div className="p-3 border border-emerald-100 rounded bg-emerald-50/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-emerald-600" />
                      <span>S1 Ilmu Komputer</span>
                    </span>
                    <span className="text-[10px] bg-emerald-200/60 text-emerald-900 font-semibold px-1.5 py-0.5 rounded">
                      S.Kom
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Artificial Intelligence, Computer Vision, Cyber Security, Cloud, dan Jaringan Terdistribusi.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-emerald-800 font-semibold">
                      {departmentStats.ilmuKomputer.totalWorks} Koleksi
                    </span>
                    <Link
                      href="/departments/ilmu-komputer"
                      className="text-emerald-700 font-semibold hover:underline"
                    >
                      Buka Profil &raquo;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* WIDGET 3: Statistik Koleksi (Formal Table) */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Statistik Koleksi FTI
                </h3>
                <Link href="/analytics" className="text-[11px] text-orange-700 font-semibold hover:underline">
                  Lihat Grafik
                </Link>
              </div>
              <div className="p-3">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-1.5 text-slate-600">Skripsi / Tugas Akhir S1</td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-900">
                        {ftiStats.totalTheses.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-slate-600">Artikel Jurnal Ilmiah</td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-900">
                        {ftiStats.totalJournals.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-slate-600">Laporan Riset &amp; PKM Dosen</td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-900">
                        {ftiStats.totalLecturerResearch.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-slate-600">Total Unduhan Naskah</td>
                      <td className="py-1.5 text-right font-mono font-bold text-orange-700">
                        {ftiStats.totalDownloads.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="py-2 text-slate-800">Total Karya Terverifikasi</td>
                      <td className="py-2 text-right font-mono text-slate-900">
                        {ftiStats.totalPublications.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* WIDGET 4: Layanan Pustakawan FTI */}
            <div className="bg-slate-900 text-slate-200 rounded-lg p-4 space-y-2.5 text-xs">
              <div className="font-bold text-sm text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span>Ruang Layanan Perpustakaan FTI</span>
              </div>
              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                  <span>Gedung B Fakultas Teknologi Informasi, Lantai 2, Kampus Terpadu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>Senin - Jumat: 08.00 - 16.00 WIB (Istirahat 12.00 - 13.00)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>repo-fti@universitas.ac.id</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CitationModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />
      <PdfPreviewModal
        item={activePdfItem}
        onClose={() => setActivePdfItem(null)}
      />
    </div>
  );
}
