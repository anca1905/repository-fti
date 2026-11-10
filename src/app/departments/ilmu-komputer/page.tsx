'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { RepositoryCard } from '@/components/RepositoryCard';
import { CitationModal } from '@/components/CitationModal';
import { PdfPreviewModal } from '@/components/PdfPreviewModal';
import { RepositoryItem } from '@/data/types';
import {
  Cpu,
  Award,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Binary,
  Eye,
  Server,
} from 'lucide-react';
import { departmentStats } from '@/data/mockData';

export default function IlmuKomputerPage() {
  const { repositories } = useApp();
  const csData = departmentStats.ilmuKomputer;

  const [activeModalItem, setActiveModalItem] = useState<RepositoryItem | null>(null);
  const [activePdfItem, setActivePdfItem] = useState<RepositoryItem | null>(null);

  const csRepositories = repositories.filter(
    (item) => item.department === 'Ilmu Komputer'
  );

  const labs = [
    {
      title: 'Lab Artificial Intelligence & Deep Learning',
      desc: 'Penelitian Large Language Models (LLM), Natural Language Processing untuk Bahasa Indonesia, Reinforcement Learning, dan AutoML.',
      icon: <Binary className="w-5 h-5 text-emerald-700" />,
    },
    {
      title: 'Lab Computer Vision & Biometrics',
      desc: 'Pemrosesan citra multispektral UAV/Drone, deteksi objek real-time YOLO/CNN, biomedical image segmentation, serta pengenalan pola.',
      icon: <Eye className="w-5 h-5 text-emerald-700" />,
    },
    {
      title: 'Lab Cyber Security, Forensic & Cryptography',
      desc: 'Kriptografi pasca-kuantum, analisis celah keamanan smart contract blockchain, penetration testing, serta Intrusion Detection Systems (IDS).',
      icon: <ShieldAlert className="w-5 h-5 text-emerald-700" />,
    },
    {
      title: 'Lab Cloud Computing & High-Performance Networks',
      desc: 'Arsitektur microservices performa tinggi, orkestrasi Kubernetes, event streaming Apache Kafka, serta edge computing node sensor IoT.',
      icon: <Server className="w-5 h-5 text-emerald-700" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
        <Link href="/" className="hover:text-orange-700">Beranda</Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">Program Studi S1 Ilmu Komputer</span>
      </div>

      {/* Header Profile Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Cpu className="w-3.5 h-3.5" />
              <span>Program Studi Sarjana (S1)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Program Studi Ilmu Komputer
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              {csData.description}
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
                <strong className="text-slate-900">{csData.headOfDepartment}</strong>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Arsip Naskah</span>
                <strong className="text-emerald-700">{csRepositories.length} Naskah</strong>
              </div>
            </div>
          </div>

          <div className="shrink-0 p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg text-center space-y-2 md:w-56">
            <div className="text-xs font-bold text-emerald-900">Koleksi E-Repositori IK</div>
            <div className="text-2xl font-black font-mono text-emerald-700">{csData.totalWorks}</div>
            <p className="text-[11px] text-slate-500">Karya akhir terindeks perpustakaan</p>
            <Link
              href="/repository?dept=Ilmu+Komputer"
              className="mt-2 block py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold transition-colors"
            >
              Lihat Katalog Ilkom
            </Link>
          </div>
        </div>
      </div>

      {/* Laboratorium Riset */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">
          Kelompok Riset &amp; Laboratorium Ilmu Komputer
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

      {/* Daftar Koleksi Terbaru Ilkom */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Koleksi Karya Ilmiah Terbaru — Program Studi Ilmu Komputer</span>
          </h2>
          <Link
            href="/repository?dept=Ilmu+Komputer"
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            Lihat Semua Koleksi Ilkom &raquo;
          </Link>
        </div>

        <div className="space-y-3">
          {csRepositories.map((item) => (
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
