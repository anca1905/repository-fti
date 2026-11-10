'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { RepositoryCard } from '@/components/RepositoryCard';
import { CitationModal } from '@/components/CitationModal';
import { PdfPreviewModal } from '@/components/PdfPreviewModal';
import { RepositoryItem } from '@/data/types';
import {
  Layers,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Database,
  BarChart3,
  Shield,
  Layout,
} from 'lucide-react';
import { departmentStats } from '@/data/mockData';

export default function SistemInformasiPage() {
  const { repositories } = useApp();
  const siData = departmentStats.sistemInformasi;

  const [activeModalItem, setActiveModalItem] = useState<RepositoryItem | null>(null);
  const [activePdfItem, setActivePdfItem] = useState<RepositoryItem | null>(null);

  const siRepositories = repositories.filter(
    (item) => item.department === 'Sistem Informasi'
  );

  const labs = [
    {
      title: 'Lab Enterprise Architecture & ERP',
      desc: 'Pengembangan blueprint arsitektur SI enterprise (TOGAF ADM 9.2), integrasi SAP/Odoo ERP, dan pemodelan proses bisnis BPMN.',
      icon: <Layers className="w-5 h-5 text-blue-700" />,
    },
    {
      title: 'Lab Data Analytics & Business Intelligence',
      desc: 'Pembangunan data warehouse, ETL pipeline, predictive analytics, dan executive dashboard pendukung keputusan korporat.',
      icon: <BarChart3 className="w-5 h-5 text-blue-700" />,
    },
    {
      title: 'Lab UI/UX & Human-Computer Interaction',
      desc: 'Riset pengalaman pengguna, design sprint, evaluasi usabilitas (SUS & SEQ), serta desain antarmuka aplikasi inklusif.',
      icon: <Layout className="w-5 h-5 text-blue-700" />,
    },
    {
      title: 'Lab IT Governance, Risk & Compliance (GRC)',
      desc: 'Audit tata kelola TI berstandar COBIT 2019, ISO/IEC 27001, serta manajemen risiko kepatuhan digital regulasi UU PDP.',
      icon: <Shield className="w-5 h-5 text-blue-700" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
        <Link href="/" className="hover:text-orange-700">Beranda</Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">Program Studi S1 Sistem Informasi</span>
      </div>

      {/* Header Profile Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
              <Layers className="w-3.5 h-3.5" />
              <span>Program Studi Sarjana (S1)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Program Studi Sistem Informasi
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              {siData.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Gelar Lulusan</span>
                <strong className="text-slate-900">S.Kom</strong>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Akreditasi</span>
                <strong className="text-emerald-700">UNGGUL</strong>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Ketua Jurusan</span>
                <strong className="text-slate-900">{siData.headOfDepartment}</strong>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Arsip Naskah</span>
                <strong className="text-blue-700">{siRepositories.length} Naskah</strong>
              </div>
            </div>
          </div>

          <div className="shrink-0 p-4 bg-blue-50/60 border border-blue-200 rounded-lg text-center space-y-2 md:w-56">
            <div className="text-xs font-bold text-blue-900">Koleksi E-Repositori SI</div>
            <div className="text-2xl font-black font-mono text-blue-700">{siData.totalWorks}</div>
            <p className="text-[11px] text-slate-500">Karya akhir terindeks perpustakaan</p>
            <Link
              href="/repository?dept=Sistem+Informasi"
              className="mt-2 block py-1.5 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-bold transition-colors"
            >
              Lihat Katalog SI
            </Link>
          </div>
        </div>
      </div>

      {/* Laboratorium Riset */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">
          Kelompok Keahlian &amp; Laboratorium Riset Sistem Informasi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labs.map((lab, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white border border-slate-200 rounded">{lab.icon}</div>
                <h3 className="font-bold text-xs text-slate-900">{lab.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">{lab.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daftar Koleksi Terbaru SI */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Koleksi Karya Ilmiah Terbaru — Program Studi Sistem Informasi</span>
          </h2>
          <Link
            href="/repository?dept=Sistem+Informasi"
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            Lihat Semua Koleksi SI &raquo;
          </Link>
        </div>

        <div className="space-y-3">
          {siRepositories.map((item) => (
            <RepositoryCard
              key={item.id}
              item={item}
              onCite={(it) => setActiveModalItem(it)}
              onPreviewPdf={(it) => setActivePdfItem(it)}
            />
          ))}
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
