'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Department, DocumentType, AccessType, RepositoryItem } from '@/data/types';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Layers,
  Cpu,
  Info,
  Lock,
  KeyRound,
} from 'lucide-react';

export default function SubmitPage() {
  const router = useRouter();
  const { addRepository, currentRole, currentUser, setIsLoginModalOpen, showToast } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState<Department>('Sistem Informasi');
  const [specialization, setSpecialization] = useState('Data Analytics & Business Intelligence');
  const [docType, setDocType] = useState<DocumentType>('Skripsi / Tugas Akhir');
  const [academicYear, setAcademicYear] = useState('2023/2024 Genap');

  const [authorName, setAuthorName] = useState(currentUser?.name || 'Muh Arsyad Ramsi');
  const [nim, setNim] = useState(currentUser?.idNumber || '2021081045');
  const [email, setEmail] = useState(currentUser?.email || 'arsyad.ramsi@fti.ac.id');
  const [advisor1, setAdvisor1] = useState('Dr. Eng. Hendra Suwandi, S.Kom., M.T.');
  const [advisor2, setAdvisor2] = useState('Fitria Rahmawati, M.Kom.');

  useEffect(() => {
    if (currentUser) {
      setAuthorName(currentUser.name);
      setNim(currentUser.idNumber);
      setEmail(currentUser.email);
      if (currentUser.department === 'Sistem Informasi' || currentUser.department === 'Ilmu Komputer') {
        setDepartment(currentUser.department as Department);
      }
    }
  }, [currentUser]);

  const [abstractId, setAbstractId] = useState('');
  const [abstractEn, setAbstractEn] = useState('');
  const [keywords, setKeywords] = useState('');

  const [access, setAccess] = useState<AccessType>('Open Access');
  const [fullFileName, setFullFileName] = useState('Naskah_Lengkap_Tugas_Akhir.pdf');
  const [agreementChecked, setAgreementChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !abstractId) {
      alert('Mohon lengkapi judul dan abstrak terlebih dahulu.');
      return;
    }

    const newId = `fti-repo-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newItem: RepositoryItem = {
      id: newId,
      title: title.trim(),
      abstract: abstractId.trim(),
      abstractEn: abstractEn.trim() || abstractId.trim(),
      department: department,
      specialization: specialization,
      author: {
        name: authorName,
        nimOrNidn: nim,
        email: email,
        role: 'Mahasiswa',
      },
      advisors: [advisor1, advisor2].filter(Boolean),
      examiners: ['Dr. Ir. Dian Kusuma, M.M.S.I.'],
      year: new Date().getFullYear(),
      academicYear: academicYear,
      type: docType,
      access: access,
      keywords: keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean),
      pages: 118,
      fileSize: '7.8 MB',
      downloads: 1,
      views: 12,
      citations: 0,
      status: 'Under Review',
      plagiarismSimilarity: 8,
      submittedAt: new Date().toISOString().split('T')[0],
      sha256Fingerprint: 'c5d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8',
      files: [
        {
          name: fullFileName,
          category: 'Naskah Lengkap',
          size: '7.8 MB',
          access: access,
          sha256Checksum: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
          watermarkProtected: true,
        },
        {
          name: 'Bab_1_Pendahuluan.pdf',
          category: 'Bab 1 Pendahuluan',
          size: '620 KB',
          access: 'Open Access',
          sha256Checksum: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
          watermarkProtected: true,
        },
        {
          name: 'Lembar_Pengesahan_Signed.pdf',
          category: 'Lembar Pengesahan',
          size: '340 KB',
          access: 'Sivitas FTI (Wajib Login SSO)',
          sha256Checksum: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
          watermarkProtected: true,
        },
      ],
    };

    addRepository(newItem);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* SSO Notice if Public */}
      {currentRole === 'Public' && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-amber-900">
            <Lock className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold">Perhatian: Anda belum masuk sesi SSO Sivitas FTI.</span>
              <p className="text-[11px] text-amber-800">
                Untuk penyerahan mandiri skripsi dan penerbitan Surat Bebas Perpustakaan resmi, silakan masuk dengan akun SSO Anda.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded shadow-xs shrink-0 flex items-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Masuk SSO Mahasiswa</span>
          </button>
        </div>
      )}

      {/* Official Form Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="text-center space-y-1 pb-4 border-b border-slate-200">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            KEMENTERIAN PENDIDIKAN TINGGI, RISET, DAN TEKNOLOGI
          </span>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">
            FORMULIR PENYERAHAN MANDIRI KARYA ILMIAH (SELF-ARCHIVING)
          </h1>
          <p className="text-xs text-orange-700 font-semibold">
            Fakultas Teknologi Informasi — Syarat Bebas Perpustakaan &amp; Yudisium Kelulusan
          </p>
        </div>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
          <span>
            <strong>Perhatian:</strong> Pastikan seluruh data metadata diisi sesuai naskah final yang telah disahkan
            oleh dewan penguji. Toleransi nilai kemiripan plagiarisme (Turnitin) maksimal <strong>20%</strong>.
          </span>
        </div>

        {/* Form Step Indicator */}
        <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-slate-100 text-center text-xs">
          {[
            { num: 1, label: '1. Metadata Naskah' },
            { num: 2, label: '2. Data Penulis & Pembimbing' },
            { num: 3, label: '3. Abstrak & Keywords' },
            { num: 4, label: '4. Berkas PDF & Persetujuan' },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setStep(s.num)}
              className={`p-2 rounded border text-left text-xs font-semibold transition-colors ${
                step === s.num
                  ? 'border-orange-500 bg-orange-50 text-orange-800'
                  : step > s.num
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className="block">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
        {/* Step 1: Metadata */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-200 uppercase tracking-wide">
              Bagian I: Identitas Karya Akhir
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Judul Lengkap Naskah Skripsi / Tugas Akhir <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tuliskan judul lengkap skripsi sesuai lembar pengesahan dewan penguji..."
                className="w-full p-2.5 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Program Studi <span className="text-red-500">*</span>
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as any)}
                  className="w-full p-2.5 rounded border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-slate-50"
                >
                  <option value="Sistem Informasi">S1 Sistem Informasi (S.Kom)</option>
                  <option value="Ilmu Komputer">S1 Ilmu Komputer (S.Kom)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Jenis Dokumen / Publikasi <span className="text-red-500">*</span>
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full p-2.5 rounded border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-slate-50"
                >
                  <option value="Skripsi / Tugas Akhir">Skripsi / Tugas Akhir S1</option>
                  <option value="Artikel Jurnal">Artikel Jurnal Ringkas</option>
                  <option value="Prosiding Konferensi">Prosiding Konferensi Ilmiah</option>
                  <option value="Laporan Riset Dosen">Laporan Penelitian Dosen</option>
                  <option value="Modul Ajar">Buku Ajar / Modul Praktikum</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Bidang Peminatan / Rumpun Ilmu
                </label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tahun Akademik Kelulusan
                </label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Penulis & Pembimbing */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-200 uppercase tracking-wide">
              Bagian II: Data Penulis &amp; Dewan Pembimbing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Lengkap Penulis / Mahasiswa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nomor Induk Mahasiswa (NIM) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Alamat Email Mahasiswa (@fti-univ.ac.id) <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Dosen Pembimbing I (dengan Gelar) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={advisor1}
                  onChange={(e) => setAdvisor1(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Dosen Pembimbing II (dengan Gelar)
                </label>
                <input
                  type="text"
                  value={advisor2}
                  onChange={(e) => setAdvisor2(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Abstrak */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-200 uppercase tracking-wide">
              Bagian III: Ringkasan Abstrak &amp; Kata Kunci
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Abstrak (Bahasa Indonesia) <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={abstractId}
                onChange={(e) => setAbstractId(e.target.value)}
                placeholder="Tuliskan latar belakang, tujuan, metode penelitian, serta hasil/temuan dari tugas akhir..."
                className="w-full p-2.5 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Abstract (English Translation)
              </label>
              <textarea
                rows={4}
                value={abstractEn}
                onChange={(e) => setAbstractEn(e.target.value)}
                placeholder="Tuliskan terjemahan abstrak dalam Bahasa Inggris..."
                className="w-full p-2.5 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Kata Kunci (Keywords) — Pisahkan dengan tanda koma
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Contoh: TOGAF ADM, Enterprise Architecture, Sistem Informasi, BPMN"
                className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
        )}

        {/* Step 4: Berkas & Pernyataan */}
        {step === 4 && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-200 uppercase tracking-wide">
              Bagian IV: Unggah Berkas &amp; Pernyataan Integritas
            </h3>

            {/* File Upload Box */}
            <div className="border border-slate-300 bg-slate-50 rounded p-4 space-y-3">
              <div className="flex items-start gap-3">
                <FileText className="w-8 h-8 text-orange-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-slate-800">
                    Berkas Naskah Lengkap Skripsi (Format PDF)
                  </div>
                  <p className="text-slate-500">
                    Naskah lengkap dari Judul hingga Lampiran yang telah memuat Lembar Pengesahan bertandatangan dewan penguji. Maksimal ukuran berkas 25MB.
                  </p>
                  <div className="inline-block bg-white border border-slate-300 px-2.5 py-1 rounded font-mono text-[11px] text-slate-800">
                    {fullFileName}
                  </div>
                </div>
              </div>
            </div>

            {/* Hak Akses Radio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Pilihan Tingkat Akses Publikasi
              </label>
              <div className="space-y-2 text-xs">
                {[
                  {
                    acc: 'Open Access',
                    label: 'Open Access (Akses Terbuka)',
                    desc: 'Dapat diakses dan diunduh oleh publik untuk keperluan sitasi dan pengembangan ilmu pengetahuan.',
                  },
                  {
                    acc: 'Sivitas FTI (Wajib Login SSO)',
                    label: 'Sivitas FTI (Wajib Login SSO Kampus)',
                    desc: 'Hanya dapat diunduh oleh mahasiswa dan dosen ber-akun kampus. Naskah dilindungi watermark dinamis.',
                  },
                  {
                    acc: 'Closed Embargo (Paten / NDA)',
                    label: 'Closed Embargo (Paten / NDA Kerahasiaan)',
                    desc: 'Naskah dibatasi sementara untuk keperluan klaim hak paten atau perjanjian kerahasiaan industri.',
                  },
                ].map((item) => (
                  <label
                    key={item.acc}
                    className={`block p-3 rounded border cursor-pointer ${
                      access === item.acc
                        ? 'border-orange-500 bg-orange-50/60'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="access"
                        checked={access === item.acc}
                        onChange={() => setAccess(item.acc as AccessType)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="font-bold text-slate-900">{item.label}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 ml-5 mt-0.5">{item.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Pernyataan Etika Checkbox */}
            <div className="p-3 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreementChecked}
                  onChange={(e) => setAgreementChecked(e.target.checked)}
                  className="mt-0.5 text-orange-600 focus:ring-orange-500 rounded"
                />
                <span className="leading-relaxed">
                  <strong>Pernyataan Integritas Akademik:</strong> Saya menyatakan dengan sesungguhnya
                  bahwa karya ilmiah ini merupakan karya asli saya sendiri dan bebas dari praktik fabrikasi,
                  falsifikasi, maupun plagiarisme. Saya menyetujui naskah ini diarsipkan pada Repositori
                  Institusi Fakultas Teknologi Informasi sesuai lisensi yang dipilih.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded text-xs font-semibold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1 && !title) {
                  alert('Mohon isi judul naskah skripsi terlebih dahulu.');
                  return;
                }
                setStep((s) => s + 1);
              }}
              className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-xs font-bold flex items-center gap-1"
            >
              <span>Lanjut ke Langkah {step + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={!agreementChecked}
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Kirimkan Berkas Naskah Skripsi ke Pustakawan FTI</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
