'use client';

import React, { useState } from 'react';
import { RepositoryItem } from '@/data/types';
import { useApp } from '@/context/AppContext';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Stamp,
  Fingerprint,
} from 'lucide-react';

interface PdfPreviewModalProps {
  item: RepositoryItem | null;
  fileName?: string;
  onClose: () => void;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  item,
  fileName,
  onClose,
}) => {
  const { currentRole, currentUser, setIsLoginModalOpen, showToast } = useApp();
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  if (!item) return null;

  const currentFileName = fileName || item.files[0]?.name || 'Naskah_Lengkap.pdf';
  const totalSimulatedPages = item.pages || 120;
  const currentTimeStr = new Date().toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/90 backdrop-blur-xs animate-fade-in font-sans">
      {/* Top Security & Navigation Bar (Model UNAIR / ADLN) */}
      <div className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-1.5 rounded bg-orange-600/30 text-orange-400">
            <FileText className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-100 truncate max-w-sm">
                {currentFileName}
              </h4>
              <span className="text-[10px] bg-orange-950 text-orange-400 border border-orange-700/50 px-1.5 py-0.2 rounded font-mono">
                SECURE VIEWER
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">
              {item.title} — Repositori Institusi FTI
            </p>
          </div>
        </div>

        {/* Center Page & Zoom Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded text-xs">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-1 text-slate-300 hover:text-white disabled:opacity-30"
              title="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-slate-200 px-1 text-[11px]">
              {page} / {totalSimulatedPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalSimulatedPages, p + 1))}
              disabled={page >= totalSimulatedPages}
              className="p-1 text-slate-300 hover:text-white disabled:opacity-30"
              title="Halaman Selanjutnya"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-slate-800 px-2 py-1 rounded text-xs">
            <button
              onClick={() => setZoom((z) => Math.max(70, z - 15))}
              className="p-1 text-slate-300 hover:text-white"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-slate-200 w-8 text-center text-[11px]">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(130, z + 15))}
              className="p-1 text-slate-300 hover:text-white"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Controls & Close */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (currentRole === 'Public' && item.access.includes('Sivitas')) {
                setIsLoginModalOpen(true);
                showToast('Akses Dibatasi: Masuk akun SSO Sivitas FTI untuk mengunduh naskah lengkap ini.');
              } else {
                showToast(`Mengunduh berkas dengan watermark lisensi resmi: ${currentFileName}`);
              }
            }}
            className="flex items-center gap-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Unduh Berkas</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Tutup Pratinjau"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Security Info Banner ala UNAIR */}
      <div className="bg-amber-950/90 border-b border-amber-800 text-amber-200 px-4 py-1.5 text-[11px] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong>Perlindungan Hak Cipta Digital (Model Perpustakaan UNAIR / ADLN):</strong> Dokumen ini
            dibubuhi tanda air dinamis institusi. Dilarang memperbanyak sebagian atau seluruhnya untuk kepentingan komersial.
          </span>
        </div>
        <div className="font-mono text-[10px] text-amber-300 flex items-center gap-2">
          <span>
            Pengakses: {currentUser ? `${currentUser.name} (${currentUser.idNumber})` : 'Publik / Tamu (IP: 180.252.164.88)'}
          </span>
          <span>•</span>
          <span>Waktu Akses: {currentTimeStr}</span>
        </div>
      </div>

      {/* PDF Document Canvas View */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-900/60 select-none">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="bg-white text-slate-900 w-full max-w-3xl min-h-[960px] shadow-2xl rounded p-12 sm:p-16 border border-slate-300 relative transition-transform duration-150 flex flex-col justify-between"
        >
          {/* 1. UNAIR-STYLE DIAGONAL SECURITY WATERMARK */}
          <div className="absolute inset-0 flex flex-col items-center justify-around pointer-events-none select-none opacity-8 rotate-[-30deg]">
            <div className="text-center font-black text-2xl uppercase tracking-widest text-slate-900">
              REPOSITORI PERPUSTAKAAN FTI
              <br />
              <span className="text-sm font-semibold">HAK CIPTA DILINDUNGI UNDANG-UNDANG</span>
            </div>
            <div className="text-center font-mono text-xs text-slate-800">
              ADLN - FAKULTAS TEKNOLOGI INFORMASI
              <br />
              SESI AKSES: {item.id} • {currentUser ? `${currentUser.name} (${currentUser.idNumber})` : 'TAMU / UMUM'} • {currentTimeStr}
            </div>
            <div className="text-center font-black text-2xl uppercase tracking-widest text-slate-900">
              DIGUNAKAN HANYA UNTUK STUDI &amp; RISET NIRLABA
            </div>
          </div>

          {/* 2. Top Header Watermark (ADLN UNAIR Style) */}
          <div>
            <div className="text-center pb-6 border-b-2 border-orange-600 relative">
              <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase mb-1">
                ADLN — AIRLANGGA &amp; FTI DIGITAL LIBRARY NETWORK SYSTEM
              </div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                FAKULTAS TEKNOLOGI INFORMASI
              </div>
              <div className="text-[11px] font-bold text-orange-700 tracking-wide uppercase">
                PROGRAM STUDI {item.department.toUpperCase()}
              </div>
              <div className="text-[9px] font-mono text-slate-400 mt-1">
                ID Repositori: {item.id} | SHA-256: {item.sha256Fingerprint.slice(0, 24)}...
              </div>
            </div>

            {/* Document Title & Type */}
            <div className="my-8 text-center space-y-2">
              <span className="inline-block px-2.5 py-0.5 bg-orange-100 text-orange-800 rounded text-xs font-bold uppercase tracking-wider">
                {item.type}
              </span>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug max-w-xl mx-auto">
                {item.title}
              </h1>
              <p className="text-[11px] text-slate-500 font-mono">
                Rumpun Keilmuan: {item.specialization}
              </p>
            </div>

            {/* Author Information */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3.5 my-6 text-center text-xs space-y-1">
              <p className="font-bold text-slate-800">{item.author.name}</p>
              <p className="text-slate-500 font-mono">NIM: {item.author.nimOrNidn}</p>
              {item.advisors.length > 0 && (
                <div className="pt-1.5 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-800">Dosen Pembimbing: </span>
                  {item.advisors.join('; ')}
                </div>
              )}
            </div>

            {/* Abstract */}
            <div className="my-6 space-y-2.5 text-xs leading-relaxed text-justify text-slate-700">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-center text-xs pb-1 border-b border-slate-200">
                ABSTRAK
              </h3>
              <p>{item.abstract}</p>

              <div className="pt-2 text-[11px]">
                <span className="font-bold text-slate-900">Kata Kunci: </span>
                <span className="italic text-slate-600">{item.keywords.join(', ')}</span>
              </div>
            </div>

            {/* Turnitin & Integrity Verification Box */}
            <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-700 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verifikasi Keaslian Naskah (Turnitin Similarity Index): <strong>{item.plagiarismSimilarity}%</strong></span>
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  Tgl Verifikasi: {item.approvedAt || item.submittedAt}
                </span>
              </div>
              <div className="text-slate-500 text-[10px]">
                Dokumen telah lolos kurasi perpustakaan fakultas dan memenuhi standar etika akademik bebas plagiasi.
              </div>
            </div>
          </div>

          {/* 3. Bottom Security Footer Stamp */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-[10px] text-slate-400 font-mono">
            <div>
              <span>Repositori Institusi FTI — {item.academicYear}</span>
            </div>
            <div>
              <span>Stempel Keamanan: {currentTimeStr}</span>
            </div>
            <div>
              <span>Halaman {page} dari {totalSimulatedPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
