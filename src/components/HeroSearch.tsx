'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Search,
  BookOpen,
  Layers,
  Cpu,
  ArrowRight,
  BellRing,
  Calendar,
  FileText,
  User,
  Filter,
  Lightbulb,
} from 'lucide-react';
import { ftiStats } from '@/data/mockData';

export const HeroSearch: React.FC = () => {
  const router = useRouter();
  const { searchQuery, setSearchQuery, selectedDepartment, setSelectedDepartment } = useApp();
  const [searchField, setSearchField] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/repository');
  };

  return (
    <section className="bg-slate-50 border-b border-slate-200">
      {/* 1. Official Faculty Announcement Bar (Khas Kampus) */}
      <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded text-[10px] shrink-0 uppercase tracking-wide">
              Pengumuman
            </span>
            <span className="truncate">
              Batas akhir penyerahan naskah skripsi mandiri dan penerbitan <strong>Surat Bebas Perpustakaan FTI</strong> periode wisuda semester genap adalah <strong>30 November</strong>.
            </span>
          </div>
          <a
            href="/about#syarat-yudisium"
            className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950 shrink-0"
          >
            Lihat Persyaratan &raquo;
          </a>
        </div>
      </div>

      {/* 2. Formal Institutional Search Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Box Header */}
          <div className="bg-white border border-slate-300 rounded-lg shadow-xs overflow-hidden">
            <div className="bg-slate-100/80 border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-orange-600" />
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Pencarian Koleksi Repositori FTI
                </h2>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Pangkalan Data Skripsi, Jurnal, dan Riset Dosen
              </div>
            </div>

            <div className="p-5">
              <form onSubmit={handleSearchSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  {/* Scope Selector */}
                  <select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    className="sm:w-48 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-700 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="all">Semua Bidang</option>
                    <option value="title">Judul Naskah</option>
                    <option value="author">Nama Penulis / Mahasiswa</option>
                    <option value="advisor">Dosen Pembimbing</option>
                    <option value="subject">Subjek / Kata Kunci</option>
                  </select>

                  {/* Search Input */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ketik kata kunci pencarian (misal: Deep Learning, TOGAF, Cyber Security)..."
                      className="w-full bg-white border border-slate-300 rounded text-xs sm:text-sm text-slate-900 px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-orange-500 placeholder-slate-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Search className="w-4 h-4" />
                    <span>Cari Naskah</span>
                  </button>
                </div>

                {/* Sub-links */}
                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-600">Pilihan Jurusan:</span>
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="prodi"
                        checked={selectedDepartment === 'All'}
                        onChange={() => setSelectedDepartment('All')}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span>Semua Jurusan</span>
                    </label>
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="prodi"
                        checked={selectedDepartment === 'Sistem Informasi'}
                        onChange={() => setSelectedDepartment('Sistem Informasi')}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-blue-800 font-medium">Sistem Informasi</span>
                    </label>
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="prodi"
                        checked={selectedDepartment === 'Ilmu Komputer'}
                        onChange={() => setSelectedDepartment('Ilmu Komputer')}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-emerald-800 font-medium">Ilmu Komputer</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2 font-medium pt-1 sm:pt-0">
                    <a
                      href="/repository"
                      className="text-orange-700 hover:underline"
                    >
                      Pencarian Lanjut (Advanced Search) &raquo;
                    </a>
                  </div>
                </div>
              </form>
            </div>

            {/* Quick Browse Bar */}
            <div className="bg-slate-50 border-t border-slate-200 px-5 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
              <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                Telusuri Menurut:
              </span>
              <button
                onClick={() => router.push('/repository')}
                className="hover:text-orange-700 hover:underline flex items-center gap-1 text-slate-700"
              >
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Tahun Terbit</span>
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => router.push('/departments/sistem-informasi')}
                className="hover:text-blue-700 hover:underline flex items-center gap-1 text-slate-700"
              >
                <Layers className="w-3 h-3 text-blue-500" />
                <span>Jurusan Sistem Informasi</span>
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => router.push('/departments/ilmu-komputer')}
                className="hover:text-emerald-700 hover:underline flex items-center gap-1 text-slate-700"
              >
                <Cpu className="w-3 h-3 text-emerald-500" />
                <span>Jurusan Ilmu Komputer</span>
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => router.push('/repository?type=Jurnal')}
                className="hover:text-orange-700 hover:underline flex items-center gap-1 text-slate-700"
              >
                <FileText className="w-3 h-3 text-slate-400" />
                <span>Artikel Jurnal</span>
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => router.push('/topics')}
                className="text-orange-800 font-bold hover:underline flex items-center gap-1.5 bg-orange-100 hover:bg-orange-200 border border-orange-300 px-2 py-0.5 rounded text-[11px] transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-orange-600" />
                <span>Cari Ide Judul &amp; Celah Riset Skripsi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
