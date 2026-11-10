'use client';

import React from 'react';
import { Department, DocumentType } from '@/data/types';
import { Filter, RotateCcw, Check, Layers, Cpu } from 'lucide-react';

interface FilterSidebarProps {
  selectedDept: 'All' | Department;
  onSelectDept: (dept: 'All' | Department) => void;
  selectedType: string;
  onSelectType: (type: string) => void;
  selectedAccess: string;
  onSelectAccess: (access: string) => void;
  selectedYear: string;
  onSelectYear: (year: string) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedDept,
  onSelectDept,
  selectedType,
  onSelectType,
  selectedAccess,
  onSelectAccess,
  selectedYear,
  onSelectYear,
  onReset,
  totalResults,
}) => {
  const documentTypes: DocumentType[] = [
    'Skripsi / Tugas Akhir',
    'Artikel Jurnal',
    'Prosiding Konferensi',
    'Laporan Riset Dosen',
    'Modul Ajar',
  ];

  const years = ['Semua Tahun', '2024', '2023', '2022'];
  const accessTypes: string[] = ['Semua Akses', 'Open Access', 'Sivitas FTI (Wajib Login SSO)', 'Closed Embargo (Paten / NDA)'];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-orange-600" />
          <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
            Penyaringan (Faceted Filter)
          </h3>
        </div>
        <button
          onClick={onReset}
          className="text-[11px] text-slate-500 hover:text-orange-700 font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Program Studi */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
          Program Studi
        </label>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => onSelectDept('All')}
            className={`w-full text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
              selectedDept === 'All'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Semua Jurusan</span>
            {selectedDept === 'All' && <Check className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onSelectDept('Sistem Informasi')}
            className={`w-full text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
              selectedDept === 'Sistem Informasi'
                ? 'bg-blue-700 text-white font-bold'
                : 'text-blue-900 bg-blue-50/50 hover:bg-blue-50'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-blue-600" />
              <span>S1 Sistem Informasi</span>
            </span>
            {selectedDept === 'Sistem Informasi' && <Check className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onSelectDept('Ilmu Komputer')}
            className={`w-full text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between ${
              selectedDept === 'Ilmu Komputer'
                ? 'bg-emerald-700 text-white font-bold'
                : 'text-emerald-900 bg-emerald-50/50 hover:bg-emerald-50'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-emerald-600" />
              <span>S1 Ilmu Komputer</span>
            </span>
            {selectedDept === 'Ilmu Komputer' && <Check className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Tipe Dokumen */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
          Jenis Koleksi
        </label>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => onSelectType('Semua')}
            className={`w-full text-left px-2 py-1 rounded transition-colors ${
              selectedType === 'Semua'
                ? 'bg-orange-100 text-orange-900 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Jenis Koleksi
          </button>
          {documentTypes.map((type) => (
            <button
              key={type}
              onClick={() => onSelectType(type)}
              className={`w-full text-left px-2 py-1 rounded transition-colors ${
                selectedType === type
                  ? 'bg-orange-100 text-orange-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              • {type}
            </button>
          ))}
        </div>
      </div>

      {/* Tahun Terbit */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
          Tahun Publikasi
        </label>
        <select
          value={selectedYear}
          onChange={(e) => onSelectYear(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Aksesibilitas */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
          Tingkat Akses
        </label>
        <div className="space-y-1 text-xs">
          {accessTypes.map((acc) => (
            <button
              key={acc}
              onClick={() => onSelectAccess(acc)}
              className={`w-full text-left px-2 py-1 rounded transition-colors ${
                selectedAccess === acc
                  ? 'bg-orange-100 text-orange-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {acc}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="pt-2 border-t border-slate-200 text-center text-xs text-slate-500">
        Ditemukan <strong className="text-slate-900">{totalResults}</strong> naskah
      </div>
    </div>
  );
};
