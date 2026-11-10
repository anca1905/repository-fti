'use client';

import React from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  FileCheck,
  ShieldAlert,
  BookOpen,
  Award,
  FileText,
  Upload,
  Mail,
  Phone,
  CheckCircle2,
  Lock,
  Stamp,
  Fingerprint,
  FileLock2,
  AlertOctagon,
} from 'lucide-react';

export default function AboutPage() {
  const faqs = [
    {
      q: 'Mengapa naskah lengkap (Full-Text) tidak dapat langsung diunduh tanpa login?',
      a: 'Mengadopsi model keamanan repositori Universitas Airlangga (UNAIR / ADLN), berkas Bab 1 (Pendahuluan) dan Abstrak dapat diakses bebas oleh publik, sedangkan berkas naskah lengkap (Bab 2 hingga Bab 5) dilindungi hak ciptanya dan hanya dapat diunduh oleh sivitas akademika ber-akun SSO kampus aktif.',
    },
    {
      q: 'Apa fungsi Watermark Dinamis pada dokumen PDF yang diunduh?',
      a: 'Setiap berkas PDF yang dibuka atau diunduh secara otomatis dibubuhi tanda air dinamis institusi FTI yang memuat identitas pengunduh, alamat IP, dan stempel waktu unduh. Ini berfungsi sebagai jejak audit (audit trail) resmi untuk mencegah plagiarisme komersial dan klaim sepihak.',
    },
    {
      q: 'Berapa batas maksimal nilai kemiripan (similarity) Turnitin yang diizinkan?',
      a: 'Fakultas Teknologi Informasi menetapkan ambang batas maksimal sebesar 20% (dengan filter exclude bibliography dan quotes diaktifkan). Jika melebihi 20%, naskah wajib diparafrase ulang sebelum disahkan pustakawan.',
    },
    {
      q: 'Kapan suatu karya dikategorikan sebagai "Closed Embargo"?',
      a: 'Status Closed Embargo (biasanya 1–3 tahun) diterapkan apabila karya sedang dalam proses pendaftaran Hak Paten / HaKI, terikat perjanjian kerahasiaan data industri/perusahaan magang (NDA), atau naskah sedang dalam peninjauan jurnal internasional bereputasi.',
    },
    {
      q: 'Bagaimana prosedur penarikan kembali naskah yang sudah terbit (Withdrawn Policy)?',
      a: 'Sesuai regulasi repositori UNAIR, naskah yang telah didepositkan pada dasarnya disimpan permanen. Namun naskah dapat dicabut (withdrawn) dari akses publik apabila terbukti terjadi pelanggaran hak cipta, plagiarisme berat, atau adanya penetapan hukum yang sah.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
        <Link href="/" className="hover:text-orange-700">Beranda</Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">Kebijakan Keamanan &amp; Hak Akses Repositori FTI</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Kebijakan Keamanan Dokumen &amp; Hak Akses Repositori FTI
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Standar Operasional Prosedur (SOP) repositori institusi yang mengadopsi model keamanan berlapis Universitas Airlangga (UNAIR / ADLN)
        </p>
      </div>

      {/* Security Model Framework UNAIR Grid */}
      <div className="bg-slate-50 border border-slate-300 rounded-lg p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
          <ShieldAlert className="w-4 h-4 text-orange-600" />
          <span>Kerangka Kerja Keamanan Repositori (Model UNAIR / ADLN)</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed text-justify">
          Repositori Fakultas Teknologi Informasi menerapkan sistem perlindungan hak cipta dan keamanan aset
          intelektual digital yang selaras dengan kebijakan <strong>Universitas Airlangga (UNAIR EPrints / ADLN)</strong>,
          yang mencakup pembatasan akses bertingkat, penandaan digital dinamis (*watermarking*), serta integritas berkas berbasis hash kriptografi.
        </p>
      </div>

      {/* 4 Official Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pilar 1: Access Policy Berlapis */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2.5" id="akses-berlapis">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>1. Kebijakan Akses Bertingkat (Access Policy)</span>
          </div>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
            <li><strong>Metadata &amp; Abstrak:</strong> Terbuka penuh (Open Access) untuk indeksasi global (Google Scholar, SINTA, RAMA).</li>
            <li><strong>Bab 1 (Pendahuluan):</strong> Dapat diunduh bebas untuk referensi penulisan akademik.</li>
            <li><strong>Naskah Lengkap (Full-Text):</strong> Dibatasi (Restricted). Hanya dapat diunduh oleh sivitas akademika yang telah terautentikasi login SSO kampus.</li>
            <li><strong>Closed Embargo:</strong> Naskah dengan potensi paten/NDA ditutup akses unduhnya selama periode embargo.</li>
          </ul>
        </div>

        {/* Pilar 2: DRM & Dynamic Watermark */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2.5" id="watermark">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
            <Stamp className="w-4 h-4 text-orange-600" />
            <span>2. Perlindungan Watermark &amp; Digital Rights (DRM)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed text-justify">
            Setiap dokumen naskah yang dibuka melalui viewer atau diunduh dibubuhi label institusi resmi:
            <em> &quot;ADLN - REPOSITORI PERPUSTAKAAN FTI. HAK CIPTA DILINDUNGI UNDANG-UNDANG. DIGUNAKAN HANYA UNTUK STUDI &amp; RISET NIRLABA&quot;</em>.
            Tanda air ini menyatu dengan halaman PDF secara dinamis dengan stempel waktu dan sesi pengakses.
          </p>
        </div>

        {/* Pilar 3: Hash Integritas SHA-256 */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2.5" id="integritas">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
            <Fingerprint className="w-4 h-4 text-emerald-600" />
            <span>3. Integritas Dokumen (Cryptographic SHA-256)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed text-justify">
            Untuk membuktikan bahwa dokumen digital yang tersimpan belum pernah dimanipulasi, diubah, atau rusak sejak tanggal pengesahan sidang, sistem menghitung dan mencatat nilai <em>fingerprint</em> SHA-256 secara permanen pada database repositori institusi.
          </p>
        </div>

        {/* Pilar 4: Withdrawn Policy */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2.5" id="withdrawn">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
            <AlertOctagon className="w-4 h-4 text-red-600" />
            <span>4. Kebijakan Pencabutan Naskah (Withdrawn Policy)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed text-justify">
            Sesuai standar EPrints UNAIR, seluruh karya yang diserahkan akan disimpan permanen (*retained indefinitely*). Namun, hak akses publik dapat ditarik (*withdrawn*) oleh dekanat apabila terbukti adanya pelanggaran hak cipta, pemalsuan data penelitian (*falsification*), atau adanya penetapan hukum pengadilan yang berkekuatan tetap.
          </p>
        </div>
      </div>

      {/* Ketentuan Penggunaan Kembali (Fair Use ala UNAIR) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-2.5">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1.5">
          Ketentuan Hak Cipta &amp; Penggunaan Kembali (Fair Use Policy)
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed text-justify">
          Hak cipta moral atas naskah tetap melekat penuh pada mahasiswa dan dosen penulis. Pengguna diperkenankan mengunduh dan mengutip sebagian isi naskah untuk keperluan studi pribadi, penelitian akademik nirlaba, dan pengembangan ilmu pengetahuan dengan mencantumkan sitasi yang layak. <strong>Dilarang keras memperbanyak, menyebarluaskan kembali, atau memperjualbelikan naskah dalam bentuk apa pun untuk keuntungan komersial tanpa izin tertulis dari pemegang hak cipta dan Fakultas Teknologi Informasi.</strong>
        </p>
      </div>

      {/* FAQ */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <HelpCircle className="w-4 h-4 text-orange-600" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Pertanyaan yang Sering Diajukan (FAQ Keamanan Repositori)
          </h2>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {faqs.map((f, i) => (
            <div key={i} className="py-3 space-y-1">
              <h4 className="font-bold text-slate-900">{f.q}</h4>
              <p className="text-slate-600 leading-relaxed text-justify">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Helpdesk Box */}
      <div className="p-5 bg-slate-100 border border-slate-300 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <h3 className="font-bold text-slate-900">Perlu Verifikasi Keamanan Akun atau Pengajuan Embargo?</h3>
          <p className="text-slate-600">Hubungi petugas administrator repositori FTI di Ruang Perpustakaan Gedung B Lantai 2.</p>
        </div>
        <Link
          href="/submit"
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded font-bold shrink-0 transition-colors"
        >
          Penyerahan Mandiri Skripsi
        </Link>
      </div>
    </div>
  );
}
