'use client';

import React, { useState } from 'react';
import { useApp, PRESET_USERS } from '@/context/AppContext';
import { UserRole } from '@/data/types';
import {
  X,
  Lock,
  User,
  GraduationCap,
  BookOpen,
  Shield,
  KeyRound,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const SsoLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useApp();

  const [activeTab, setActiveTab] = useState<'quick' | 'form'>('quick');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Mahasiswa');
  const [identifier, setIdentifier] = useState('2021081045');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('Muh Arsyad Ramsi');

  if (!isLoginModalOpen) return null;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'Public') return;

    login({
      name: fullName.trim() || 'Sivitas FTI',
      idNumber: identifier.trim() || '1234567890',
      role: selectedRole,
      email: `${identifier.toLowerCase()}@fti.ac.id`,
      department: selectedRole === 'Mahasiswa' ? 'S1 Sistem Informasi' : undefined,
      unit: selectedRole === 'Admin' ? 'UPT Perpustakaan FTI' : 'Fakultas Teknologi Informasi',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header (Official Campus Style) */}
        <div className="bg-slate-900 text-white p-5 border-b-4 border-orange-600">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-orange-600 text-white flex flex-col items-center justify-center font-bold border border-orange-500 shadow-xs shrink-0">
                <BookOpen className="w-5 h-5" />
                <span className="text-[7px] tracking-widest uppercase">FTI</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                  PORTAL OTENTIKASI TERPADU
                </div>
                <h3 className="text-base font-black text-white tracking-tight">
                  Single Sign-On (SSO) Sivitas FTI
                </h3>
                <p className="text-[11px] text-slate-300">
                  Layanan Akses Karya Ilmiah &amp; Bebas Perpustakaan
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="bg-slate-100 border-b border-slate-200 flex text-xs font-semibold">
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'quick'
                ? 'border-orange-600 bg-white text-orange-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Pilih Akun Sivitas (1-Klik Masuk)</span>
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'form'
                ? 'border-orange-600 bg-white text-orange-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-slate-500" />
            <span>Formulir Masuk Manual</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'quick' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Pilih profil akun sivitas akademika di bawah ini untuk langsung masuk dan menguji seluruh fungsi sistem secara nyata:
              </p>

              {/* 1. Mahasiswa */}
              <button
                type="button"
                onClick={() => login(PRESET_USERS.Mahasiswa)}
                className="w-full text-left p-3.5 border-2 border-slate-200 hover:border-orange-500 rounded-lg hover:bg-orange-50/40 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm group-hover:text-orange-700">
                        Muh Arsyad Ramsi
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                        Mahasiswa
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      NIM: <strong>2021081045</strong> • S1 Sistem Informasi
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Hak Akses: Unggah Mandiri Skripsi, Unduh Naskah Penuh, Cetak Bebas Pustaka
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>

              {/* 2. Dosen Pembimbing */}
              <button
                type="button"
                onClick={() => login(PRESET_USERS.Dosen)}
                className="w-full text-left p-3.5 border-2 border-slate-200 hover:border-orange-500 rounded-lg hover:bg-orange-50/40 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm group-hover:text-orange-700">
                        Dr. Ridwan Arifin, S.Kom., M.Kom.
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        Dosen Reviewer
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      NIP: <strong>198204122008121002</strong> • KBK Enterprise Systems
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Hak Akses: Validasi Skripsi Bimbingan, Cek Turnitin, Deposit Riset Dosen
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>

              {/* 3. Pustakawan Admin */}
              <button
                type="button"
                onClick={() => login(PRESET_USERS.Admin)}
                className="w-full text-left p-3.5 border-2 border-slate-200 hover:border-orange-500 rounded-lg hover:bg-orange-50/40 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm group-hover:text-orange-700">
                        Dra. Endang Wahyuni, M.Hum.
                      </span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                        Pustakawan Admin
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      NIP: <strong>197903152005012003</strong> • Kepala UPT Perpustakaan FTI
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Hak Akses: Kurasi Akhir, Verifikasi Integritas SHA-256, Pengesahan Yudisium
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Peran / Kategori Sivitas:
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                >
                  <option value="Mahasiswa">Mahasiswa (S1 SI / S1 Ilkom)</option>
                  <option value="Dosen">Dosen Pembimbing / Penguji</option>
                  <option value="Admin">Pustakawan / Pengelola Repositori</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Nama Lengkap:
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama Lengkap Beserta Gelar"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Nomor Induk (NIM / NIP / NIDN):
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Contoh: 2021081045"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Kata Sandi SSO:
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kata Sandi Akun Kampus"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded text-orange-600" />
                  <span>Ingat sesi masuk</span>
                </label>
                <span className="text-orange-700 font-semibold hover:underline cursor-pointer">
                  Bantuan SSO?
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 mt-2"
              >
                <Lock className="w-4 h-4" />
                <span>Masuk Sistem SSO FTI</span>
              </button>
            </form>
          )}

          {/* Security footnote */}
          <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-500 flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Sistem otentikasi terenkripsi SSL 256-bit dan diawasi oleh Pusat Teknologi Informasi &amp; Komunikasi Fakultas Teknologi Informasi.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};