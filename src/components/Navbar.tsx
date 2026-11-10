'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  BookOpen,
  Upload,
  ChevronDown,
  Layers,
  Cpu,
  LayoutDashboard,
  Menu,
  X,
  ExternalLink,
  Search,
  FileCheck,
  Building2,
  Clock,
  Phone,
  Lock,
  LogOut,
  User,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentRole, currentUser, logout, setIsLoginModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [browseDropdownOpen, setBrowseDropdownOpen] = useState(false);
  const [prodiDropdownOpen, setProdiDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white">
      {/* 1. Top Utility Header Bar (Khas Website Kampus) */}
      <div className="bg-slate-100 border-b border-slate-200 text-slate-600 text-[11px] py-1 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3 h-3 text-orange-600" />
              <span>Jam Layanan Pustaka: Senin - Jumat 08.00 - 16.00 WIB</span>
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-500">
              <Phone className="w-3 h-3 text-orange-600" />
              <span>Helpdesk: (021) 7890-FTI ext. 104</span>
            </span>
          </div>

          <div className="flex items-center gap-3 font-medium">
            <a
              href="#portal"
              onClick={(e) => {
                e.preventDefault();
                alert('Tautan ke Portal Utama Kampus');
              }}
              className="hover:text-orange-600 transition-colors"
            >
              Portal Universitas
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="#siakad"
              onClick={(e) => {
                e.preventDefault();
                alert('Tautan ke SIAKAD (Sistem Informasi Akademik)');
              }}
              className="hover:text-orange-600 transition-colors"
            >
              SIAKAD
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="#perpus"
              onClick={(e) => {
                e.preventDefault();
                alert('Tautan ke UPT Perpustakaan Pusat');
              }}
              className="hover:text-orange-600 transition-colors"
            >
              Perpustakaan Pusat
            </a>
            <span className="text-slate-300">•</span>
            <Link href="/about#pedoman" className="text-orange-700 font-semibold hover:underline">
              Pedoman Penulisan Skripsi
            </Link>
            <span className="text-slate-300">•</span>
            {currentRole === 'Public' ? (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="text-orange-700 font-bold hover:underline flex items-center gap-1"
              >
                <Lock className="w-3 h-3 text-orange-600" />
                <span>Masuk SSO</span>
              </button>
            ) : (
              <span className="text-emerald-800 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="truncate max-w-[120px]">{currentUser?.name}</span>
                <span className="text-slate-400 font-normal">({currentUser?.role})</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Identity & Crest Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3.5 group">
          {/* Official University / Faculty Logo Seal */}
          <div className="w-12 h-12 rounded-lg bg-orange-600 text-white flex flex-col items-center justify-center border-2 border-orange-700 shadow-xs shrink-0">
            <BookOpen className="w-6 h-6" />
            <span className="text-[8px] font-black tracking-widest mt-0.5">FTI</span>
          </div>

          <div>
            <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              KEMENTERIAN PENDIDIKAN TINGGI, RISET, DAN TEKNOLOGI
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none group-hover:text-orange-700 transition-colors">
              FAKULTAS TEKNOLOGI INFORMASI
            </h1>
            <div className="text-[11px] font-semibold text-orange-700 tracking-tight flex items-center gap-2 mt-0.5">
              <span>Repositori Institusi Digital</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-normal">
                S1 Sistem Informasi &amp; S1 Ilmu Komputer
              </span>
            </div>
          </div>
        </Link>

        {/* Right Info Badges */}
        <div className="hidden lg:flex items-center gap-4 text-right">
          <div className="border-r border-slate-200 pr-4">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Status Akreditasi
            </div>
            <div className="text-xs font-bold text-slate-800">
              Terakreditasi <span className="text-emerald-700">UNGGUL</span> (LAM-INFOKOM)
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Standar Metadata
            </div>
            <div className="text-xs font-semibold text-slate-700 font-mono">
              OAI-PMH 2.0 / Dublin Core
            </div>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-slate-200 rounded text-slate-700 hover:bg-slate-50"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Formal Academic Navigation Menu Bar (FTI Orange Bar) */}
      <nav className="bg-orange-600 text-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="hidden lg:flex items-center space-x-0.5 text-xs font-semibold">
            <Link
              href="/"
              className={`px-3.5 py-2.5 transition-colors border-b-2 ${
                pathname === '/'
                  ? 'bg-orange-700 text-white border-white font-bold'
                  : 'hover:bg-orange-700/80 border-transparent text-orange-50'
              }`}
            >
              Beranda
            </Link>

            {/* Jelajah Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBrowseDropdownOpen(true)}
              onMouseLeave={() => setBrowseDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-3.5 py-2.5 transition-colors border-b-2 ${
                  pathname.startsWith('/repository')
                    ? 'bg-orange-700 text-white border-white font-bold'
                    : 'hover:bg-orange-700/80 border-transparent text-orange-50'
                }`}
              >
                <span>Jelajah Koleksi</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {browseDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-white text-slate-800 border border-slate-200 shadow-lg py-1 z-50 text-xs">
                  <Link
                    href="/repository"
                    onClick={() => setBrowseDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-700 border-b border-slate-100 font-semibold"
                  >
                    Semua Koleksi Repositori
                  </Link>
                  <Link
                    href="/repository?type=Skripsi"
                    onClick={() => setBrowseDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-700"
                  >
                    • Skripsi / Tugas Akhir S1
                  </Link>
                  <Link
                    href="/repository?type=Jurnal"
                    onClick={() => setBrowseDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-700"
                  >
                    • Artikel Jurnal Ilmiah
                  </Link>
                  <Link
                    href="/repository?type=Riset"
                    onClick={() => setBrowseDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-700"
                  >
                    • Penelitian &amp; Riset Dosen
                  </Link>
                </div>
              )}
            </div>

            {/* Program Studi Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProdiDropdownOpen(true)}
              onMouseLeave={() => setProdiDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-3.5 py-2.5 transition-colors border-b-2 ${
                  pathname.startsWith('/departments')
                    ? 'bg-orange-700 text-white border-white font-bold'
                    : 'hover:bg-orange-700/80 border-transparent text-orange-50'
                }`}
              >
                <span>Program Studi</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {prodiDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white text-slate-800 border border-slate-200 shadow-lg py-1 z-50 text-xs">
                  <Link
                    href="/departments/sistem-informasi"
                    onClick={() => setProdiDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 border-b border-slate-100"
                  >
                    <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold">S1 Sistem Informasi</div>
                      <div className="text-[10px] text-slate-400">Enterprise Systems, BI &amp; GRC</div>
                    </div>
                  </Link>
                  <Link
                    href="/departments/ilmu-komputer"
                    onClick={() => setProdiDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Cpu className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">S1 Ilmu Komputer</div>
                      <div className="text-[10px] text-slate-400">AI &amp; ML, Cyber Security, Cloud</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/topics"
              className={`px-3.5 py-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
                pathname === '/topics'
                  ? 'bg-orange-700 text-white border-white font-bold'
                  : 'hover:bg-orange-700/80 border-transparent text-orange-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse"></span>
              <span>Cari Ide Judul &amp; Celah Riset</span>
            </Link>

            <Link
              href="/submit"
              className={`px-3.5 py-2.5 transition-colors border-b-2 ${
                pathname === '/submit'
                  ? 'bg-orange-700 text-white border-white font-bold'
                  : 'hover:bg-orange-700/80 border-transparent text-orange-50'
              }`}
            >
              Penyerahan Mandiri Skripsi
            </Link>

            <Link
              href="/analytics"
              className={`px-3.5 py-2.5 transition-colors border-b-2 ${
                pathname === '/analytics'
                  ? 'bg-orange-700 text-white border-white font-bold'
                  : 'hover:bg-orange-700/80 border-transparent text-orange-50'
              }`}
            >
              Statistik Publikasi
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2.5 transition-colors border-b-2 ${
                pathname === '/about'
                  ? 'bg-orange-700 text-white border-white font-bold'
                  : 'hover:bg-orange-700/80 border-transparent text-orange-50'
              }`}
            >
              Panduan &amp; Kebijakan Plagiasi
            </Link>
          </div>

          {/* Right Action: Official SSO Auth State */}
          <div className="py-1.5 flex items-center gap-2">
            {currentRole === 'Public' ? (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-orange-50 text-orange-800 text-xs font-bold rounded shadow-xs border border-orange-200 transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-orange-600" />
                <span>Masuk SSO Sivitas</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1 bg-orange-700 hover:bg-orange-800 text-white text-xs font-semibold rounded border border-orange-400/50 transition-colors shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-white text-orange-700 flex items-center justify-center text-[10px] font-black">
                    {currentUser?.name.charAt(0) || 'U'}
                  </div>
                  <div className="text-left leading-tight hidden sm:block">
                    <div className="font-bold text-[11px] truncate max-w-[120px]">
                      {currentUser?.name}
                    </div>
                    <div className="text-[9px] text-orange-200 font-normal">
                      {currentUser?.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-orange-200" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-60 bg-white text-slate-800 border border-slate-200 shadow-xl rounded-lg py-1 z-50 text-xs">
                    <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50">
                      <div className="font-bold text-slate-900 text-xs">{currentUser?.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        No. Induk: {currentUser?.idNumber}
                      </div>
                      <div className="text-[10px] text-orange-700 font-semibold mt-0.5">
                        {currentUser?.unit || currentUser?.department}
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 hover:bg-orange-50 hover:text-orange-700 font-medium"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-orange-600" />
                      <span>Portal Dasbor Saya</span>
                    </Link>
                    {currentRole === 'Mahasiswa' && (
                      <Link
                        href="/submit"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 hover:bg-orange-50 hover:text-orange-700 font-medium"
                      >
                        <Upload className="w-3.5 h-3.5 text-blue-600" />
                        <span>Penyerahan Mandiri Skripsi</span>
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 border-t border-slate-100 font-semibold text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar (Logout SSO)</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 text-xs">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 font-semibold text-slate-800 hover:text-orange-600"
          >
            Beranda
          </Link>
          <Link
            href="/repository"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 font-semibold text-slate-800 hover:text-orange-600"
          >
            Jelajah Koleksi Repositori
          </Link>
          <div className="pl-3 py-1 space-y-1 text-slate-600">
            <Link
              href="/departments/sistem-informasi"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-blue-600"
            >
              • S1 Sistem Informasi
            </Link>
            <Link
              href="/departments/ilmu-komputer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-emerald-600"
            >
              • S1 Ilmu Komputer
            </Link>
          </div>
          <Link
            href="/topics"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 font-bold text-orange-700 hover:text-orange-800 flex items-center gap-1.5 bg-orange-50 px-2 rounded"
          >
            <span>💡 Cari Ide Judul &amp; Celah Riset Skripsi</span>
          </Link>
          <Link
            href="/submit"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 font-semibold text-slate-800 hover:text-orange-600"
          >
            Penyerahan Mandiri Skripsi
          </Link>
          <Link
            href="/analytics"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 font-semibold text-slate-800 hover:text-orange-600"
          >
            Statistik Publikasi
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 font-semibold text-slate-800 hover:text-orange-600"
          >
            Panduan &amp; Kebijakan
          </Link>

          <div className="pt-2 border-t border-slate-100">
            {currentRole === 'Public' ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-orange-600 text-white rounded font-bold shadow-xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Masuk SSO Sivitas FTI</span>
              </button>
            ) : (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{currentUser?.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {currentUser?.idNumber} • {currentUser?.role}
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2 py-1 bg-orange-600 text-white font-bold rounded text-[10px]"
                  >
                    Buka Dasbor
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-1 text-rose-600 border border-rose-200 rounded text-[11px] font-semibold hover:bg-rose-50"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Keluar Sesi SSO</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
