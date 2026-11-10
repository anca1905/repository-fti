'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-orange-600 pt-12 pb-8 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Identitas Kampus */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-orange-600 text-white flex items-center justify-center font-bold text-lg border border-orange-500">
                FTI
              </div>
              <div>
                <span className="font-bold text-white text-sm block">
                  FAKULTAS TEKNOLOGI INFORMASI
                </span>
                <span className="text-[11px] text-orange-400 font-medium">
                  Repositori Institusi Digital (E-Repository)
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-[11px]">
              Sistem repositori institusi terintegrasi untuk penyimpanan, pengarsipan, dan
              diseminasi karya ilmiah sivitas akademika Fakultas Teknologi Informasi (Program Studi
              Sistem Informasi dan Program Studi Ilmu Komputer).
            </p>

            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <div>Akreditasi LAM-INFOKOM: <strong className="text-emerald-400">UNGGUL</strong></div>
              <div>Standar Interoperabilitas: <strong className="text-white">OAI-PMH 2.0 / Dublin Core</strong></div>
            </div>
          </div>

          {/* Program Studi FTI */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-orange-400 border-b border-slate-800 pb-1.5">
              Program Studi Fakultas
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link
                  href="/departments/sistem-informasi"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>S1 Sistem Informasi (S.Kom)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/departments/ilmu-komputer"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>S1 Ilmu Komputer (S.Kom)</span>
                </Link>
              </li>
              <li>
                <Link href="/repository?type=Skripsi" className="hover:text-orange-400 transition-colors text-slate-400">
                  • Arsip Tugas Akhir / Skripsi S1
                </Link>
              </li>
              <li>
                <Link href="/repository?type=Jurnal" className="hover:text-orange-400 transition-colors text-slate-400">
                  • Publikasi Jurnal Nasional &amp; Internasional
                </Link>
              </li>
              <li>
                <Link href="/repository?type=Riset" className="hover:text-orange-400 transition-colors text-slate-400">
                  • Laporan Riset &amp; Pengabdian Dosen
                </Link>
              </li>
            </ul>
          </div>

          {/* Jaringan Repositori Nasional */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-orange-400 border-b border-slate-800 pb-1.5">
              Indeksasi &amp; Jaringan Nasional
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>
                <a href="#rama" onClick={(e) => { e.preventDefault(); alert('Terhubung dengan portal RAMA Ristekdikti'); }} className="hover:text-orange-400 flex items-center gap-1">
                  <span>RAMA (Repositori Tugas Akhir Mahasiswa)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="#garuda" onClick={(e) => { e.preventDefault(); alert('Terhubung dengan GARUDA'); }} className="hover:text-orange-400 flex items-center gap-1">
                  <span>GARUDA (Garba Rujukan Digital Kemdikbud)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="#sinta" onClick={(e) => { e.preventDefault(); alert('Terhubung dengan SINTA'); }} className="hover:text-orange-400 flex items-center gap-1">
                  <span>SINTA (Science and Technology Index)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="#onesearch" onClick={(e) => { e.preventDefault(); alert('Terhubung dengan IOS Perpusnas'); }} className="hover:text-orange-400 flex items-center gap-1">
                  <span>Indonesia OneSearch (IOS Perpusnas RI)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="#pddikti" onClick={(e) => { e.preventDefault(); alert('Terhubung dengan PDDikti'); }} className="hover:text-orange-400 flex items-center gap-1">
                  <span>Pangkalan Data Pendidikan Tinggi (PDDikti)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Sekretariat & Helpdesk */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-orange-400 border-b border-slate-800 pb-1.5">
              Layanan Perpustakaan FTI
            </h4>
            <div className="space-y-2 text-slate-400 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <span>Gedung B Fakultas Teknologi Informasi Lt. 2, Kampus Terpadu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>(021) 7890-FTI ext. 104</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>repo-fti@universitas.ac.id</span>
              </div>
              <div className="pt-2">
                <span className="block text-slate-300 font-semibold mb-1">Jam Operasional:</span>
                <span>Senin - Jumat: 08.00 - 16.00 WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            Hak Cipta © {new Date().getFullYear()} Fakultas Teknologi Informasi. Seluruh Hak Dilindungi.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about#lisensi" className="hover:underline">Lisensi CC BY-NC 4.0</Link>
            <span>•</span>
            <Link href="/about#plagiasi" className="hover:underline">Ketentuan Plagiasi</Link>
            <span>•</span>
            <Link href="/about" className="hover:underline">SOP Bebas Perpustakaan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
