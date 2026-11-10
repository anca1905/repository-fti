'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ftiStats, departmentStats } from '@/data/mockData';
import {
  BarChart3,
  TrendingUp,
  Download,
  Eye,
  Quote,
  ShieldCheck,
  Layers,
  Cpu,
  BookOpen,
  ArrowRight,
  PieChart,
} from 'lucide-react';

export default function AnalyticsPage() {
  const { repositories } = useApp();

  const siCount = repositories.filter((r) => r.department === 'Sistem Informasi').length;
  const csCount = repositories.filter((r) => r.department === 'Ilmu Komputer').length;

  const topDownloaded = [...repositories].sort((a, b) => b.downloads - a.downloads).slice(0, 5);
  const topCited = [...repositories].sort((a, b) => b.citations - a.citations).slice(0, 5);

  const yearlyData = [
    { year: '2020', total: 240, si: 125, ilkom: 115 },
    { year: '2021', total: 310, si: 160, ilkom: 150 },
    { year: '2022', total: 390, si: 200, ilkom: 190 },
    { year: '2023', total: 435, si: 230, ilkom: 205 },
    { year: '2024', total: 470, si: 245, ilkom: 225 },
  ];

  const topicsRanking = [
    { name: 'Artificial Intelligence & Machine Learning', count: 342, dept: 'Ilmu Komputer' },
    { name: 'Enterprise Architecture & TOGAF ADM', count: 285, dept: 'Sistem Informasi' },
    { name: 'Data Analytics & Business Intelligence', count: 260, dept: 'Sistem Informasi' },
    { name: 'Cyber Security & Cryptography', count: 224, dept: 'Ilmu Komputer' },
    { name: 'UI/UX Design & Human-Computer Interaction', count: 215, dept: 'Sistem Informasi' },
    { name: 'Computer Vision & UAV Image Processing', count: 184, dept: 'Ilmu Komputer' },
    { name: 'IT Governance (COBIT & ISO 27001)', count: 168, dept: 'Sistem Informasi' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
        <Link href="/" className="hover:text-orange-700">Beranda</Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">Laporan Statistik &amp; Kinerja Publikasi FTI</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Statistik &amp; Kinerja Repositori Fakultas Teknologi Informasi
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Laporan diseminasi keterbukaan akses karya ilmiah, perbandingan produktivitas prodi, dan indeksasi sitasi
        </p>
      </div>

      {/* Top 4 Impact KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Koleksi Terbit</div>
          <div className="text-2xl font-black font-mono text-slate-900 mt-1">
            {ftiStats.totalPublications.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Tugas Akhir, Jurnal &amp; Riset</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Unduhan Dokumen</div>
          <div className="text-2xl font-black font-mono text-orange-700 mt-1">
            {ftiStats.totalDownloads.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Akses Terbuka Sivitas &amp; Publik</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Sitasi Google Scholar</div>
          <div className="text-2xl font-black font-mono text-emerald-700 mt-1">
            4.820+
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Dikutip Akademisi Eksternal</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Rata-rata Similitas Turnitin</div>
          <div className="text-2xl font-black font-mono text-slate-800 mt-1">
            {ftiStats.averagePlagiarismScore}
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Di bawah ambang batas (20%)</div>
        </div>
      </div>

      {/* Department Comparison & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Ratio */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">
            Perbandingan Produktivitas Antar Program Studi
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between font-semibold mb-1">
                <span className="text-blue-800">S1 Sistem Informasi ({ftiStats.totalSistemInformasi} Naskah)</span>
                <span className="font-mono">52%</span>
              </div>
              <div className="h-3 rounded bg-slate-100 overflow-hidden">
                <div className="h-full bg-blue-700 rounded" style={{ width: '52%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between font-semibold mb-1">
                <span className="text-emerald-800">S1 Ilmu Komputer ({ftiStats.totalIlmuKomputer} Naskah)</span>
                <span className="font-mono">48%</span>
              </div>
              <div className="h-3 rounded bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-700 rounded" style={{ width: '48%' }} />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
            Distribusi naskah akhir kedua jurusan berimbang dengan fokus riset Sistem Informasi pada tata kelola
            organisasi dan analitik bisnis, sementara Ilmu Komputer terkonsentrasi pada algoritma cerdas, visi komputer, dan sistem terdistribusi.
          </p>
        </div>

        {/* 5-Year Growth Table */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">
            Tren Pertumbuhan Naskah Terpublikasi (5 Tahun Terakhir)
          </h3>

          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="p-2 text-left">Tahun Akademik</th>
                <th className="p-2 text-center">S1 Sistem Informasi</th>
                <th className="p-2 text-center">S1 Ilmu Komputer</th>
                <th className="p-2 text-right">Total Naskah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {yearlyData.map((d) => (
                <tr key={d.year} className="hover:bg-slate-50">
                  <td className="p-2 font-semibold text-slate-800">{d.year}</td>
                  <td className="p-2 text-center font-mono text-blue-700">{d.si}</td>
                  <td className="p-2 text-center font-mono text-emerald-700">{d.ilkom}</td>
                  <td className="p-2 text-right font-mono font-bold text-slate-900">{d.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rumpun Peminatan Terpopuler */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">
          Peringkat Bidang Keahlian / Rumpun Riset Paling Banyak Diteliti
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="p-2.5 text-center w-12">No</th>
                <th className="p-2.5 text-left">Bidang Peminatan / Rumpun Ilmu</th>
                <th className="p-2.5 text-left">Program Studi</th>
                <th className="p-2.5 text-right">Jumlah Naskah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {topicsRanking.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 text-center font-mono font-semibold text-slate-500">{idx + 1}</td>
                  <td className="p-2.5 font-bold text-slate-800">{t.name}</td>
                  <td className="p-2.5 text-slate-600">{t.dept}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-orange-700">{t.count} Naskah</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Downloaded & Top Cited */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">
            Top 5 Naskah Paling Banyak Diunduh
          </h3>
          <div className="divide-y divide-slate-100">
            {topDownloaded.map((item, idx) => (
              <div key={item.id} className="py-2.5 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>#{idx + 1} • {item.department}</span>
                  <span className="font-mono font-bold text-orange-700">{item.downloads.toLocaleString()} Unduhan</span>
                </div>
                <Link href={`/repository/${item.id}`} className="font-semibold text-slate-900 hover:text-orange-700 hover:underline block leading-snug">
                  {item.title}
                </Link>
                <div className="text-[10px] text-slate-400">Penulis: {item.author.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">
            Top 5 Naskah Paling Banyak Dikutip (Sitasi)
          </h3>
          <div className="divide-y divide-slate-100">
            {topCited.map((item, idx) => (
              <div key={item.id} className="py-2.5 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>#{idx + 1} • {item.department}</span>
                  <span className="font-mono font-bold text-emerald-700">{item.citations} Sitasi</span>
                </div>
                <Link href={`/repository/${item.id}`} className="font-semibold text-slate-900 hover:text-emerald-700 hover:underline block leading-snug">
                  {item.title}
                </Link>
                <div className="text-[10px] text-slate-400">Penulis: {item.author.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
