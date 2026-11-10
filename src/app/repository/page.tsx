'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { FilterSidebar } from '@/components/FilterSidebar';
import { RepositoryCard } from '@/components/RepositoryCard';
import { CitationModal } from '@/components/CitationModal';
import { PdfPreviewModal } from '@/components/PdfPreviewModal';
import { RepositoryItem, Department } from '@/data/types';
import {
  Search,
  BookOpen,
  ArrowUpDown,
  Layers,
  Cpu,
  Inbox,
} from 'lucide-react';

function RepositoryContent() {
  const searchParams = useSearchParams();
  const initialDeptParam = searchParams.get('dept');
  const initialTypeParam = searchParams.get('type');

  const {
    repositories,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
  } = useApp();

  const [selectedType, setSelectedType] = useState<string>(
    initialTypeParam ? initialTypeParam : 'Semua'
  );
  const [selectedAccess, setSelectedAccess] = useState<string>('Semua Akses');
  const [selectedYear, setSelectedYear] = useState<string>('Semua Tahun');
  const [sortBy, setSortBy] = useState<'newest' | 'downloads' | 'views' | 'citations'>('newest');

  const [activeModalItem, setActiveModalItem] = useState<RepositoryItem | null>(null);
  const [activePdfItem, setActivePdfItem] = useState<RepositoryItem | null>(null);

  // Sync param if provided
  React.useEffect(() => {
    if (initialDeptParam === 'Sistem Informasi' || initialDeptParam === 'Ilmu Komputer') {
      setSelectedDepartment(initialDeptParam as Department);
    }
  }, [initialDeptParam, setSelectedDepartment]);

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return repositories.filter((item) => {
      // 1. Department filter
      if (selectedDepartment !== 'All' && item.department !== selectedDepartment) {
        return false;
      }
      // 2. Type filter
      if (selectedType !== 'Semua' && !item.type.toLowerCase().includes(selectedType.toLowerCase())) {
        return false;
      }
      // 3. Access filter
      if (selectedAccess !== 'Semua Akses' && item.access !== selectedAccess) {
        return false;
      }
      // 4. Year filter
      if (selectedYear !== 'Semua Tahun' && item.year.toString() !== selectedYear) {
        return false;
      }
      // 5. Query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inAuthor = item.author.name.toLowerCase().includes(q);
        const inKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
        const inAbstract = item.abstract.toLowerCase().includes(q);
        const inAdvisors = item.advisors.some((a) => a.toLowerCase().includes(q));
        if (!inTitle && !inAuthor && !inKeywords && !inAbstract && !inAdvisors) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'citations') return b.citations - a.citations;
      return b.year - a.year; // newest
    });
  }, [
    repositories,
    selectedDepartment,
    selectedType,
    selectedAccess,
    selectedYear,
    searchQuery,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedDepartment('All');
    setSelectedType('Semua');
    setSelectedAccess('Semua Akses');
    setSelectedYear('Semua Tahun');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb Path */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
        <Link href="/" className="hover:text-orange-700">Beranda</Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">Katalog Penelusuran Repositori</span>
      </div>

      {/* Header Info */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Katalog Penelusuran Naskah Karya Ilmiah FTI
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Arsip digital terindeks tugas akhir, tesis, prosiding seminar, dan riset sivitas akademika Fakultas Teknologi Informasi
        </p>
      </div>

      {/* Main Grid: Sidebar Filter + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
            selectedDept={selectedDepartment}
            onSelectDept={setSelectedDepartment}
            selectedType={selectedType}
            onSelectType={setSelectedType}
            selectedAccess={selectedAccess}
            onSelectAccess={setSelectedAccess}
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
            onReset={handleResetFilters}
            totalResults={filteredItems.length}
          />
        </div>

        {/* Right Column: Search bar, sorting, items */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top Search & Sort Row */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-auto flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan judul naskah, nama penulis, pembimbing, atau kata kunci..."
                className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-slate-50"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-600 font-semibold">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 text-xs font-medium text-slate-700 py-1.5 px-2.5 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="newest">Tahun Terbaru</option>
                <option value="downloads">Paling Banyak Diunduh</option>
                <option value="views">Paling Sering Dilihat</option>
                <option value="citations">Sitasi Terbanyak</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {(selectedDepartment !== 'All' || selectedType !== 'Semua' || searchQuery || selectedYear !== 'Semua Tahun') && (
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600 bg-orange-50 p-2.5 rounded border border-orange-200">
              <span className="font-bold text-orange-900">Filter Aktif:</span>
              {selectedDepartment !== 'All' && (
                <span className="px-2 py-0.5 rounded bg-white text-slate-800 font-semibold border border-orange-200 flex items-center gap-1">
                  Prodi: {selectedDepartment}
                  <button onClick={() => setSelectedDepartment('All')} className="text-slate-400 hover:text-red-500 ml-1">×</button>
                </span>
              )}
              {selectedType !== 'Semua' && (
                <span className="px-2 py-0.5 rounded bg-white text-slate-800 font-semibold border border-orange-200 flex items-center gap-1">
                  Tipe: {selectedType}
                  <button onClick={() => setSelectedType('Semua')} className="text-slate-400 hover:text-red-500 ml-1">×</button>
                </span>
              )}
              {selectedYear !== 'Semua Tahun' && (
                <span className="px-2 py-0.5 rounded bg-white text-slate-800 font-semibold border border-orange-200 flex items-center gap-1">
                  Tahun: {selectedYear}
                  <button onClick={() => setSelectedYear('Semua Tahun')} className="text-slate-400 hover:text-red-500 ml-1">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="px-2 py-0.5 rounded bg-white text-slate-800 font-semibold border border-orange-200 flex items-center gap-1">
                  Kata Kunci: &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-red-500 ml-1">×</button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-orange-700 font-bold hover:underline ml-auto"
              >
                Hapus Semua
              </button>
            </div>
          )}

          {/* Items List */}
          {filteredItems.length > 0 ? (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <RepositoryCard
                  key={item.id}
                  item={item}
                  onCite={(it) => setActiveModalItem(it)}
                  onPreviewPdf={(it) => setActivePdfItem(it)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200 p-6 space-y-3">
              <Inbox className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">
                Tidak ada naskah yang cocok dengan kriteria pencarian
              </h3>
              <p className="text-xs text-slate-500">
                Silakan ganti kata kunci atau reset filter untuk memperluas pencarian.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded text-xs font-semibold"
              >
                Reset Filter
              </button>
            </div>
          )}
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

export default function RepositoryPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-500 font-semibold">
          Memuat Katalog Repositori FTI...
        </div>
      }
    >
      <RepositoryContent />
    </Suspense>
  );
}
