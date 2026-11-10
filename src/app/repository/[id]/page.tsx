'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CitationModal } from '@/components/CitationModal';
import { PdfPreviewModal } from '@/components/PdfPreviewModal';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Download,
  Eye,
  FileText,
  Globe2,
  Lock,
  Layers,
  Cpu,
  Quote,
  ShieldCheck,
  User,
  Share2,
  Bookmark,
  ExternalLink,
  Printer,
  ChevronRight,
  ShieldAlert,
  Fingerprint,
  AlertTriangle,
  KeyRound,
  FileLock2,
} from 'lucide-react';

export default function RepositoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { repositories, bookmarks, toggleBookmark, currentRole, currentUser, setIsLoginModalOpen, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'abstract' | 'files' | 'security' | 'citation'>('abstract');
  const [citationModalOpen, setCitationModalOpen] = useState(false);
  const [pdfPreviewFile, setPdfPreviewFile] = useState<string | null>(null);
  const [authRequiredModal, setAuthRequiredModal] = useState<string | null>(null);

  const item = repositories.find((r) => r.id === params.id) || repositories[0];
  const isBookmarked = bookmarks.includes(item?.id || '');

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-base font-bold text-slate-800">Karya Ilmiah Tidak Ditemukan</h2>
        <Link href="/repository" className="mt-3 inline-block text-xs text-orange-700 underline">
          Kembali ke Katalog Repositori
        </Link>
      </div>
    );
  }

  const isSI = item.department === 'Sistem Informasi';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan naskah berhasil disalin ke clipboard');
    }
  };

  // UNAIR Security Access Verification
  const handleDownloadFile = (fileName: string, accessType: string) => {
    if (accessType === 'Closed Embargo (Paten / NDA)') {
      alert(`Akses Ditutup: Naskah ini terikat perlindungan Paten / Kerahasiaan Perusahaan (NDA) hingga tanggal ${item.embargoUntil || '2026-12-31'}. Dokumen tidak dapat diunduh publik.`);
      return;
    }

    if (accessType.includes('Ruang Pustaka')) {
      alert('Akses Terbatas Terminal: Sesuai regulasi repositori, naskah ini hanya dapat dibaca di komputer terminal khusus Ruang Perpustakaan FTI (On-Premise Intranet).');
      return;
    }

    if (accessType.includes('Sivitas') && currentRole === 'Public') {
      setAuthRequiredModal(fileName);
      return;
    }

    // Success download with watermark
    showToast(`Mengunduh berkas resmi dengan watermark lisensi institusi FTI: ${fileName}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      {/* Breadcrumb Path */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
        <Link href="/" className="hover:text-orange-700">Beranda</Link>
        <span>/</span>
        <Link href="/repository" className="hover:text-orange-700">Katalog Repositori</Link>
        <span>/</span>
        <Link
          href={isSI ? '/departments/sistem-informasi' : '/departments/ilmu-komputer'}
          className="hover:text-orange-700"
        >
          {item.department}
        </Link>
        <span>/</span>
        <span className="font-mono text-slate-400 truncate max-w-xs">{item.id}</span>
      </div>

      {/* UNAIR-Style Embargo Alert if Applicable */}
      {item.access === 'Closed Embargo (Paten / NDA)' && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded text-xs text-red-900 flex items-start gap-2.5">
          <FileLock2 className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
          <div>
            <strong>Status Dokumen: CLOSED EMBARGO (Perlindungan Paten / Hak Kekayaan Intelektual)</strong>
            <p className="text-[11px] text-red-800 mt-0.5">
              Naskah lengkap karya ini dibatasi aksesnya hingga <strong>{item.embargoUntil}</strong> atas dasar perlindungan
              klaim paten riset terapan dan perjanjian kerahasiaan industri. Hanya abstrak dan ringkasan yang dapat diakses publik.
            </p>
          </div>
        </div>
      )}

      {/* Main Record Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Header Title & Handle */}
        <div className="space-y-2 border-b border-slate-200 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  isSI
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {item.department}
              </span>
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-semibold border border-slate-200">
                {item.type}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${
                  item.access === 'Open Access'
                    ? 'bg-emerald-50 text-emerald-800'
                    : item.access.includes('Sivitas')
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-amber-50 text-amber-800'
                }`}
              >
                {item.access === 'Open Access' ? (
                  <Globe2 className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Lock className="w-3 h-3 text-amber-600" />
                )}
                {item.access}
              </span>
            </div>

            <span className="text-xs font-mono text-slate-500">
              URI Handle: <strong className="text-slate-800">http://repo.fti.ac.id/handle/{item.id}</strong>
            </span>
          </div>

          <h1 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
            {item.title}
          </h1>

          <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
            <span>
              Penulis: <strong>{item.author.name}</strong> ({item.author.nimOrNidn})
            </span>
            <span>•</span>
            <span>Tahun Akademik: <strong>{item.academicYear}</strong></span>
            <span>•</span>
            <span>
              Disahkan: <strong>{item.approvedAt || item.submittedAt}</strong>
            </span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded border border-slate-200 text-xs">
          <div className="flex items-center gap-4 text-slate-600 text-[11px]">
            <span>Dilihat: <strong>{item.views.toLocaleString()}</strong> x</span>
            <span>•</span>
            <span>Diunduh: <strong>{item.downloads.toLocaleString()}</strong> x</span>
            <span>•</span>
            <span className="text-emerald-800 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Turnitin: {item.plagiarismSimilarity}%
            </span>
            <span>•</span>
            <span className="text-slate-500 font-mono hidden md:inline">
              SHA-256 Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPdfPreviewFile(item.files[0]?.name || 'Naskah_Lengkap.pdf')}
              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded font-bold flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Pratinjau PDF (Protected)</span>
            </button>
            <button
              onClick={() => setCitationModalOpen(true)}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Quote className="w-3.5 h-3.5 text-orange-600" />
              <span>Kutip (APA/IEEE)</span>
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-600 rounded"
              title="Salin Tautan"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* UNAIR-Style Security Notice Box */}
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded text-xs text-blue-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-blue-700 shrink-0" />
            <span>Kebijakan Keamanan &amp; Hak Akses Berkas (Standar Repositori UNAIR / ADLN)</span>
          </div>
          <p className="text-[11px] text-blue-800 leading-relaxed">
            Abstrak dan Bab 1 (Pendahuluan) dapat diakses terbuka oleh publik. Untuk menjaga hak cipta dan orisinalitas riset, berkas naskah lengkap (Bab 2 hingga Bab 5) hanya dapat diunduh oleh sivitas akademika ber-akun <strong>SSO Kampus FTI</strong>. Setiap berkas digital yang diunduh dibubuhi <em>dynamic security watermark</em> dan stempel digital pengakses.
          </p>
        </div>

        {/* Tabel Berkas Dokumen dengan Akses Keamanan Berlapis */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-1">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Berkas Lampiran &amp; Tingkat Akses Keamanan
            </h3>
            <span className="text-[11px] text-slate-600">
              {currentRole === 'Public' ? (
                <span>
                  Sesi: <span className="font-semibold text-slate-500">Tamu / Umum</span> (Akses Terbatas)
                </span>
              ) : (
                <span>
                  Sesi Masuk: <strong className="text-orange-700">{currentUser?.name}</strong> ({currentUser?.role})
                </span>
              )}
            </span>
          </div>

          <div className="border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                <tr>
                  <th className="p-2.5 text-left">Nama Berkas PDF</th>
                  <th className="p-2.5 text-left">Kategori Dokumen</th>
                  <th className="p-2.5 text-center">Ukuran</th>
                  <th className="p-2.5 text-center">Kebijakan Akses</th>
                  <th className="p-2.5 text-right">Aksi Unduhan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {item.files.map((file, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-orange-600 shrink-0" />
                        <span>{file.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono pl-6">
                        SHA-256: {file.sha256Checksum.slice(0, 20)}...
                      </div>
                    </td>
                    <td className="p-2.5 text-slate-600">{file.category}</td>
                    <td className="p-2.5 text-center font-mono text-slate-500">{file.size}</td>
                    <td className="p-2.5 text-center">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold inline-flex items-center gap-1 ${
                          file.access === 'Open Access'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : file.access.includes('Sivitas')
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {file.access === 'Open Access' ? (
                          <Globe2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Lock className="w-3 h-3 text-blue-600" />
                        )}
                        {file.access}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPdfPreviewFile(file.name)}
                          className="px-2 py-1 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded text-[11px]"
                          title="Pratinjau dengan Watermark"
                        >
                          Pratinjau
                        </button>
                        <button
                          onClick={() => handleDownloadFile(file.name, file.access)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 ${
                            file.access === 'Open Access' || currentRole !== 'Public'
                              ? 'bg-orange-600 hover:bg-orange-700 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'
                          }`}
                        >
                          {file.access.includes('Sivitas') && currentRole === 'Public' ? (
                            <Lock className="w-3 h-3 text-slate-500" />
                          ) : (
                            <Download className="w-3 h-3" />
                          )}
                          <span>
                            {file.access.includes('Sivitas') && currentRole === 'Public'
                              ? 'Login SSO'
                              : 'Unduh'}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Metadata Table (Dublin Core Compliant) */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-1">
            Data Bibliografi &amp; Metadata Dokumen
          </h3>

          <div className="border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-xs">
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="w-44 p-2.5 bg-slate-50 font-semibold text-slate-700 border-r border-slate-200">
                    Judul Naskah
                  </td>
                  <td className="p-2.5 text-slate-900 font-medium">{item.title}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 bg-slate-50 font-semibold text-slate-700 border-r border-slate-200">
                    Tipe Publikasi
                  </td>
                  <td className="p-2.5 text-slate-900">{item.type}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 bg-slate-50 font-semibold text-slate-700 border-r border-slate-200">
                    Program Studi
                  </td>
                  <td className="p-2.5 text-slate-900">
                    Program Studi {item.department}, Fakultas Teknologi Informasi
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 bg-slate-50 font-semibold text-slate-700 border-r border-slate-200">
                    Penulis (NIM)
                  </td>
                  <td className="p-2.5 text-slate-900">
                    <strong>{item.author.name}</strong> (NIM: <span className="font-mono">{item.author.nimOrNidn}</span>) — {item.author.email}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 bg-slate-50 font-semibold text-slate-700 border-r border-slate-200">
                    Dosen Pembimbing
                  </td>
                  <td className="p-2.5 text-slate-900">
                    {item.advisors.length > 0 ? item.advisors.join('; ') : 'Riset Mandiri Dosen'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 bg-slate-50 font-semibold text-slate-700 border-r border-slate-200">
                    Subjek / Rumpun Ilmu
                  </td>
                  <td className="p-2.5 text-slate-900">{item.specialization}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 bg-slate-50 font-semibold text-slate-700 border-r border-slate-200">
                    Uji Kemiripan (Turnitin)
                  </td>
                  <td className="p-2.5 text-slate-900">
                    <span className="font-bold text-emerald-800">{item.plagiarismSimilarity}% Similarity</span> — Lolos verifikasi ambang batas Fakultas Teknologi Informasi (&lt; 20%).
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 bg-slate-50 font-semibold text-slate-700 border-r border-slate-200">
                    Fingerprint Kriptografi
                  </td>
                  <td className="p-2.5 text-slate-700 font-mono text-[11px]">
                    SHA-256: {item.sha256Fingerprint}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Abstrak Naskah */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-1">
            Abstrak Naskah (Abstract)
          </h3>

          <div className="space-y-4 text-xs leading-relaxed text-justify text-slate-700">
            <div>
              <span className="font-bold text-slate-900 block mb-1">Bahasa Indonesia:</span>
              <p>{item.abstract}</p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-900 block mb-1 italic">English Abstract:</span>
              <p className="italic text-slate-600">{item.abstractEn}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Login SSO Required (Model Cyber Campus UNAIR) */}
      {authRequiredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-300 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-orange-700 border-b border-slate-100 pb-3">
              <KeyRound className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-sm text-slate-900">
                Autentikasi Akun Sivitas FTI Diperlukan
              </h3>
            </div>

            <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <p>
                Sesuai <strong>Kebijakan Keamanan Repositori (Model UNAIR / ADLN)</strong>, berkas naskah lengkap
                (<em>{authRequiredModal}</em>) dilindungi hak cipta dan hanya dapat diunduh oleh sivitas akademika
                (Mahasiswa, Dosen, dan Tenaga Kependidikan) yang memiliki akun SSO kampus aktif.
              </p>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded text-orange-900 text-xs">
                Silakan masuk menggunakan akun <strong>Single Sign-On (SSO) FTI</strong> Anda untuk membuka proteksi unduhan berkas ini.
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setAuthRequiredModal(null)}
                className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 rounded text-slate-700 font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setAuthRequiredModal(null);
                  setIsLoginModalOpen(true);
                }}
                className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded font-bold shadow-xs flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Masuk SSO Kampus</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CitationModal
        item={citationModalOpen ? item : null}
        onClose={() => setCitationModalOpen(false)}
      />
      <PdfPreviewModal
        item={pdfPreviewFile ? item : null}
        fileName={pdfPreviewFile || undefined}
        onClose={() => setPdfPreviewFile(null)}
      />
    </div>
  );
}
