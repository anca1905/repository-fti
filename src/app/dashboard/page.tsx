'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Upload,
  UserCheck,
  Shield,
  Layers,
  Cpu,
  Eye,
  Download,
  Quote,
  Printer,
  ChevronRight,
  Info,
  QrCode,
  Lock,
  LogOut,
  KeyRound,
  User,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    currentRole,
    currentUser,
    setCurrentRole,
    repositories,
    updateRepositoryStatus,
    showToast,
    logout,
    setIsLoginModalOpen,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'Approved' | 'Under Review' | 'Revision Needed'>('all');
  const [printLetterModal, setPrintLetterModal] = useState(false);

  // Filter items by status
  const filteredSubmissions = repositories.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

  const studentSubmissions = repositories.slice(0, 3); // Sample student submissions

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Portal Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            PORTAL LAYANAN AKADEMIK &amp; PERPUSTAKAAN FTI
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900">
              {currentRole === 'Public' ? 'Portal Layanan Sivitas FTI' : `Dasbor ${currentUser?.role || currentRole}`}
            </h1>
            {currentRole !== 'Public' && (
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Terotentikasi SSO</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            {currentRole === 'Public'
              ? 'Silakan masuk menggunakan akun Single Sign-On (SSO) kampus untuk mengakses layanan akademik.'
              : `Selamat datang kembali, ${currentUser?.name}. Anda terhubung ke sistem repositori FTI.`}
          </p>
        </div>

        {/* User Account Controls */}
        <div className="flex items-center gap-2 text-xs">
          {currentRole === 'Public' ? (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <KeyRound className="w-4 h-4" />
              <span>Masuk Akun SSO Kampus</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded border border-slate-300 transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Ganti Akun SSO</span>
              </button>
              <button
                onClick={logout}
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded border border-rose-200 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* VIEW: MAHASISWA */}
      {currentRole === 'Mahasiswa' && (
        <div className="space-y-6">
          {/* Status Alert */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 space-y-1">
              <div className="font-bold">Naskah Skripsi Anda Telah Disetujui Pustakawan FTI!</div>
              <p>
                Naskah dengan judul <em>&quot;{studentSubmissions[0]?.title}&quot;</em> telah dinyatakan lolos
                uji Turnitin (9%) dan terverifikasi dewan penguji. Anda berhak mencetak <strong>Surat Keterangan Bebas Perpustakaan FTI</strong>.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setPrintLetterModal(true)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Surat Bebas Perpustakaan FTI (PDF Resmi)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Student Submissions Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
            <div className="bg-slate-100 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Daftar Penyerahan Naskah Mandiri Anda
                </h3>
              </div>
              <Link
                href="/submit"
                className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded text-xs font-semibold flex items-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Unggah Naskah Baru</span>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="p-3 text-left">Kode Naskah</th>
                    <th className="p-3 text-left">Judul Skripsi / Karya Akhir</th>
                    <th className="p-3 text-left">Program Studi</th>
                    <th className="p-3 text-center">Tgl Pengajuan</th>
                    <th className="p-3 text-center">Status Verifikasi</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {studentSubmissions.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-700">{item.id}</td>
                      <td className="p-3 max-w-md font-medium text-slate-900 leading-snug">
                        {item.title}
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Pembimbing: {item.advisors.join(', ')}
                        </div>
                      </td>
                      <td className="p-3 text-slate-700 font-semibold">{item.department}</td>
                      <td className="p-3 text-center font-mono text-slate-500">{item.submittedAt}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1 ${
                            item.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {item.status === 'Approved' ? 'Disetujui' : 'Dalam Review'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          href={`/repository/${item.id}`}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-orange-600 text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          Detail Naskah
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: DOSEN */}
      {currentRole === 'Dosen' && (
        <div className="space-y-6">
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-950">
            <strong>Panel Dosen Pembimbing FTI:</strong> Anda memiliki wewenang untuk memeriksa
            dan memberikan persetujuan penerbitan pada naskah skripsi mahasiswa bimbingan sebelum
            dipublikasikan secara resmi oleh perpustakaan.
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
            <div className="bg-slate-100 border-b border-slate-200 px-5 py-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Antrean Review Naskah Mahasiswa Bimbingan Anda
              </h3>
            </div>

            <div className="divide-y divide-slate-200">
              {repositories.slice(0, 4).map((item) => (
                <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.author.name}</span>
                      <span className="font-mono text-slate-500">(NIM: {item.author.nimOrNidn})</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                        {item.department}
                      </span>
                      <span className="font-mono text-slate-400">Handle: {item.id}</span>
                    </div>
                    <div className="font-semibold text-slate-800 leading-snug">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Uji Plagiasi: <strong className="text-emerald-700">{item.plagiarismSimilarity}% Similarity</strong> • Tanggal Masuk: {item.submittedAt}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/repository/${item.id}`}
                      className="px-2.5 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded text-xs font-semibold"
                    >
                      Buka Dokumen
                    </Link>
                    <button
                      onClick={() => updateRepositoryStatus(item.id, 'Approved')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold"
                    >
                      Setujui Naskah
                    </button>
                    <button
                      onClick={() => updateRepositoryStatus(item.id, 'Revision Needed')}
                      className="px-3 py-1.5 border border-amber-300 text-amber-800 hover:bg-amber-50 rounded text-xs font-semibold"
                    >
                      Minta Revisi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: ADMIN / PUSTAKAWAN */}
      {currentRole === 'Admin' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold font-mono text-slate-900">{repositories.length}</div>
              <div className="text-[11px] text-slate-500">Total Koleksi Naskah</div>
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-blue-700">
                {repositories.filter((r) => r.department === 'Sistem Informasi').length}
              </div>
              <div className="text-[11px] text-slate-500">Prodi Sistem Informasi</div>
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-emerald-700">
                {repositories.filter((r) => r.department === 'Ilmu Komputer').length}
              </div>
              <div className="text-[11px] text-slate-500">Prodi Ilmu Komputer</div>
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-orange-700">
                {repositories.filter((r) => r.status === 'Under Review').length}
              </div>
              <div className="text-[11px] text-slate-500">Antrean Verifikasi Pustaka</div>
            </div>
          </div>

          {/* Antrean Kurasi */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
            <div className="bg-slate-100 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Antrean Kurasi Akhir Repositori (Pustakawan FTI)
              </h3>

              <div className="flex items-center gap-1 text-xs">
                {(['all', 'Approved', 'Under Review', 'Revision Needed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setActiveFilter(st)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      activeFilter === st ? 'bg-orange-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'Semua' : st}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-200">
              {filteredSubmissions.map((item) => (
                <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-700">{item.id}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                        {item.department}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {item.author.name} ({item.author.nimOrNidn})
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 leading-snug">{item.title}</div>
                    <div className="text-[11px] text-slate-500">
                      Tipe: {item.type} • Status Akses: {item.access} • Turnitin: {item.plagiarismSimilarity}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/repository/${item.id}`}
                      className="px-2.5 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded text-xs font-semibold"
                    >
                      Periksa
                    </Link>
                    {item.status !== 'Approved' && (
                      <button
                        onClick={() => updateRepositoryStatus(item.id, 'Approved')}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold"
                      >
                        Setujui &amp; Terbitkan
                      </button>
                    )}
                    {item.status !== 'Revision Needed' && (
                      <button
                        onClick={() => updateRepositoryStatus(item.id, 'Revision Needed')}
                        className="px-3 py-1.5 border border-amber-300 text-amber-800 hover:bg-amber-50 rounded text-xs font-semibold"
                      >
                        Kembalikan Revisi
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: PUBLIC */}
      {currentRole === 'Public' && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-14 h-14 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Autentikasi SSO Sivitas Akademika FTI Diperlukan
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
              Portal dasbor ini memuat informasi penyerahan mandiri tugas akhir mahasiswa, catatan review dosen pembimbing, dan validasi bebas pustaka. Silakan masuk menggunakan akun resmi kampus.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2 mx-auto"
            >
              <KeyRound className="w-4 h-4" />
              <span>Masuk Single Sign-On (SSO) FTI</span>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400">
            Terbuka untuk Mahasiswa (S1 SI &amp; S1 Ilkom), Dosen, serta Staf Perpustakaan FTI
          </div>
        </div>
      )}

      {/* MODAL SURAT BEBAS PERPUSTAKAAN FTI */}
      {printLetterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-300 shadow-2xl max-w-2xl w-full p-8 relative space-y-6">
            {/* Kop Surat Resmi */}
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                KEMENTERIAN PENDIDIKAN TINGGI, RISET, DAN TEKNOLOGI
              </div>
              <div className="text-base font-black text-slate-900 uppercase">
                FAKULTAS TEKNOLOGI INFORMASI
              </div>
              <div className="text-xs text-slate-600">
                UPT PERPUSTAKAAN DAN ARSIP KARYA ILMIAH DIGITAL
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Gedung B Lantai 2, Kampus Terpadu • Email: repo-fti@universitas.ac.id
              </div>
            </div>

            {/* Judul Surat */}
            <div className="text-center space-y-1">
              <h3 className="font-bold text-sm text-slate-900 underline uppercase">
                SURAT KETERANGAN BEBAS PERPUSTAKAAN
              </h3>
              <p className="text-xs font-mono text-slate-500">
                Nomor: 482/UN.FTI/PERPUS/SKB/{new Date().getFullYear()}
              </p>
            </div>

            {/* Isi Surat */}
            <div className="text-xs text-slate-800 space-y-3 leading-relaxed">
              <p>
                Kepala UPT Perpustakaan Fakultas Teknologi Informasi menerangkan bahwa mahasiswa berikut:
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1 font-mono text-[11px]">
                <div>Nama Lengkap : <strong>{currentUser?.name || 'Muh Arsyad Ramsi'}</strong></div>
                <div>NIM : <strong>{currentUser?.idNumber || '2021081045'}</strong></div>
                <div>Program Studi : <strong>{currentUser?.department || 'S1 Sistem Informasi'}</strong></div>
                <div>Status Skripsi : <strong>Lengkap &amp; Terverifikasi Bebas Plagiasi (Turnitin 9%)</strong></div>
              </div>
              <p>
                Telah menyelesaikan seluruh kewajiban penyerahan mandiri naskah tugas akhir (Hardcopy &amp; Softcopy)
                serta tidak memiliki tanggungan pinjaman buku perpustakaan. Surat keterangan ini diterbitkan sebagai
                syarat <strong>Pendaftaran Wisuda &amp; Yudisium Kelulusan Sarjana Komputer (S.Kom)</strong>.
              </p>
            </div>

            {/* Tanda Tangan & QR Code */}
            <div className="pt-4 flex items-end justify-between text-xs">
              <div className="text-center space-y-1">
                <div className="w-16 h-16 border border-slate-300 p-1 flex items-center justify-center mx-auto bg-slate-50">
                  <QrCode className="w-14 h-14 text-slate-800" />
                </div>
                <div className="text-[9px] font-mono text-slate-400">Verifikasi Digital FTI</div>
              </div>

              <div className="text-right space-y-1">
                <div>Ditetapkan di: Kampus Terpadu</div>
                <div>Pada tanggal: {new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</div>
                <div className="pt-6 font-bold underline">Hj. Ratna Wulandari, S.Sos., M.Hum.</div>
                <div className="text-slate-500 font-mono text-[10px]">NIP. 19780512 200501 2 003</div>
                <div className="text-[10px] text-emerald-700 font-semibold">Telah Ditandatangani Secara Elektronik (TTE)</div>
              </div>
            </div>

            {/* Action modal */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Dokumen sah sesuai format baku akademik FTI</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPrintLetterModal(false)}
                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 rounded text-xs font-semibold"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    alert('Mencetak Surat Keterangan Bebas Pustaka FTI...');
                    setPrintLetterModal(false);
                  }}
                  className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
