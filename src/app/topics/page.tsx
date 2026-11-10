'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Lightbulb,
  Search,
  BookOpen,
  Layers,
  Cpu,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  FileCode,
  CheckCircle,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

export default function TopicsFinderPage() {
  const { repositories } = useApp();

  const [selectedDept, setSelectedDept] = useState<'All' | 'Sistem Informasi' | 'Ilmu Komputer'>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('Semua');

  // Rumpun topik khas FTI
  const topicTaxonomy = [
    {
      name: 'Enterprise Architecture & TOGAF ADM',
      dept: 'Sistem Informasi',
      desc: 'Pemodelan blueprint arsitektur sistem informasi enterprise, perancangan TOGAF 9.2, keselarasan strategi bisnis & TI.',
      researchGaps: [
        'Integrasi TOGAF ADM dengan kerangka kerja Agile / DevOps pada instansi publik',
        'Penyusunan blueprint arsitektur Smart Health / Telemedicine pasca pandemi',
        'Model evaluasi kematangan arsitektur enterprise menggunakan ArchiMate & COBIT 2019',
      ],
      suitableAdvisors: ['Dr. Ridwan Arifin, S.Kom., M.Kom.', 'Siti Nurhaliza, S.T., M.T.'],
    },
    {
      name: 'Data Analytics & Business Intelligence',
      dept: 'Sistem Informasi',
      desc: 'Data warehousing, ETL pipeline, dashboard analitik eksekutif, customer churn prediction, dan data mining bisnis.',
      researchGaps: [
        'Prediksi customer lifetime value pada marketplace lokal berbasis hybrid ensemble learning',
        'Pembangunan data warehouse multidimensi data akademik terpadu fakultas',
        'Implementasi RFM (Recency, Frequency, Monetary) analytics pada industri retail regional',
      ],
      suitableAdvisors: ['Dr. Ir. Dian Kusuma, M.M.S.I.', 'Aulia Rahman, S.Kom., M.Sc.'],
    },
    {
      name: 'UI/UX & Human-Computer Interaction',
      dept: 'Sistem Informasi',
      desc: 'Riset pengalaman pengguna, Design Thinking, pengujian usabilitas (SUS, SEQ, UEQ), dan desain antarmuka aplikasi.',
      researchGaps: [
        'Evaluasi aksesibilitas aplikasi mobile pemerintah bagi penyandang disabilitas (WCAG 2.1)',
        'Eksplorasi Design Thinking untuk sistem pelaporan kekerasan seksual kampus (PPKS)',
        'Perbandingan SUS vs UEQ pada perancangan antarmuka e-learning interaktif mahasiswa',
      ],
      suitableAdvisors: ['Aulia Rahman, S.Kom., M.Sc.', 'Siti Nurhaliza, S.T., M.T.'],
    },
    {
      name: 'Artificial Intelligence & Deep Learning',
      dept: 'Ilmu Komputer',
      desc: 'Computer Vision, Convolutional Neural Network (CNN), YOLO, Natural Language Processing (LLM / IndoBERT), dan machine learning.',
      researchGaps: [
        'Fine-tuning IndoBERT untuk deteksi ujaran kebencian & cyberbullying pada media sosial lokal',
        'Klasifikasi penyakit tanaman berbasis citra multispektral UAV menggunakan EfficientNet edge-device',
        'Penerapan Retrieval-Augmented Generation (RAG) untuk chatbot asisten akademik FTI',
      ],
      suitableAdvisors: ['Dr. Eng. Hendra Suwandi, S.Kom., M.T.', 'Fitria Rahmawati, M.Kom.'],
    },
    {
      name: 'Cyber Security & Blockchain',
      dept: 'Ilmu Komputer',
      desc: 'Keamanan jaringan, deteksi celah smart contract, lightweight cryptography IoT, audit penetrasi, dan zero-trust architecture.',
      researchGaps: [
        'Deteksi kerentanan Reentrancy smart contract Ethereum menggunakan Graph Neural Network (GCN)',
        'Implementasi kriptografi berbobot ringan Ascon-128 pada jaringan sensor nirkabel IoT pertanian',
        'Pembangunan Intrusion Detection System (IDS) adaptif berbasis unsupervised anomaly detection',
      ],
      suitableAdvisors: ['Dr. Eng. Hendra Suwandi, S.Kom., M.T.', 'Budi Santoso, Ph.D.'],
    },
    {
      name: 'Cloud Computing & Microservices',
      dept: 'Ilmu Komputer',
      desc: 'Arsitektur microservices performa tinggi, orkestrasi Kubernetes, event streaming Apache Kafka, dan edge computing.',
      researchGaps: [
        'Refaktorisasi sistem monolitik akademik ke microservices berbasis event-driven Apache Kafka',
        'Optimasi auto-scaling cluster Kubernetes berbasis workload prediction machine learning',
        'Pengujian load testing concurrency 10.000 users pada sistem pembayaran SPP online kampus',
      ],
      suitableAdvisors: ['Ahmad Fauzi, M.Cs.', 'Budi Santoso, Ph.D.'],
    },
  ];

  const filteredTopics = topicTaxonomy.filter((t) => {
    if (selectedDept !== 'All' && t.dept !== selectedDept) return false;
    if (selectedTopic !== 'Semua' && t.name !== selectedTopic) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
        <Link href="/" className="hover:text-orange-700">Beranda</Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">Eksplorasi Ide Judul &amp; Celah Riset Skripsi FTI</span>
      </div>

      {/* Header Pengantar */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold bg-orange-100 text-orange-900 border border-orange-200">
          <Compass className="w-3.5 h-3.5 text-orange-700" />
          <span>Fitur Unggulan Mahasiswa Akhir FTI</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Pusat Eksplorasi Ide Judul, Rumpun Keilmuan &amp; Celah Riset (Research Gap)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          Berbeda dari repositori universitas umum yang hanya menampilkan dokumen PDF acak dari seluruh fakultas,
          Repositori FTI dirancang khusus untuk memandu mahasiswa tingkat akhir <strong>S1 Sistem Informasi</strong> dan <strong>S1 Ilmu Komputer</strong> dalam menemukan inspirasi judul tugas akhir, celah penelitian (*future works*), serta kecocokan kepakaran dengan calon Dosen Pembimbing.
        </p>

        {/* Filter Jurusan Bar */}
        <div className="pt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider mr-2">
            Pilih Program Studi:
          </span>
          <button
            onClick={() => setSelectedDept('All')}
            className={`px-3 py-1.5 rounded transition-colors font-semibold ${
              selectedDept === 'All'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua Program Studi
          </button>
          <button
            onClick={() => setSelectedDept('Sistem Informasi')}
            className={`px-3 py-1.5 rounded transition-colors font-semibold flex items-center gap-1.5 ${
              selectedDept === 'Sistem Informasi'
                ? 'bg-blue-700 text-white font-bold'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>S1 Sistem Informasi</span>
          </button>
          <button
            onClick={() => setSelectedDept('Ilmu Komputer')}
            className={`px-3 py-1.5 rounded transition-colors font-semibold flex items-center gap-1.5 ${
              selectedDept === 'Ilmu Komputer'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>S1 Ilmu Komputer</span>
          </button>
        </div>
      </div>

      {/* Grid Rumpun Peminatan & Ide Judul */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-orange-600" />
            <span>Peta Rumpun Riset &amp; Rekomendasi Celah Penelitian Lanjutan</span>
          </h2>
          <span className="text-xs text-slate-500">
            Ditemukan <strong>{filteredTopics.length}</strong> rumpun keilmuan aktif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTopics.map((topic, idx) => {
            const isSI = topic.dept === 'Sistem Informasi';
            const relatedTheses = repositories.filter(
              (r) => r.department === topic.dept && r.specialization.includes(topic.name.split(' ')[0])
            );

            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 hover:border-orange-300 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        isSI
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {topic.dept}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Kluster #{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {topic.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    {topic.desc}
                  </p>

                  {/* Research Gaps Box */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded space-y-2 text-xs">
                    <div className="font-bold text-amber-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                      <span>Peluang Kebaruan / Ide Judul Baru (Research Gaps):</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-700 text-[11px] list-disc pl-4">
                      {topic.researchGaps.map((gap, gi) => (
                        <li key={gi} className="leading-tight">
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pembimbing yang linier */}
                  <div className="pt-2 text-xs text-slate-600 space-y-1">
                    <span className="font-semibold text-slate-800 block text-[11px]">
                      Dosen Pembimbing yang Meneliti Topik Ini:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.suitableAdvisors.map((adv, ai) => (
                        <span key={ai} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] text-slate-800">
                          {adv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Contoh naskah acuan: <strong>{relatedTheses.length || 3}+ Naskah</strong>
                  </span>
                  <Link
                    href={`/repository?dept=${encodeURIComponent(topic.dept)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 hover:underline"
                  >
                    <span>Telusuri Skripsi Acuan</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Komparasi: Kenapa Harus Ada Repositori FTI Padahal Sudah Ada Repositori Univ? */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2">
          Perbandingan: Repositori Universitas (Umum) vs Repositori Digital FTI (Khusus)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="p-3 text-left w-1/4">Dimensi Penilaian</th>
                <th className="p-3 text-left w-1/3">Repositori Universitas (Umum)</th>
                <th className="p-3 text-left w-5/12 bg-orange-50/70 text-orange-950 font-bold">
                  Repositori Khusus FTI (Sistem Informasi &amp; Ilmu Komputer)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">Ruang Lingkup Pencarian</td>
                <td className="p-3 text-slate-600">
                  Campur aduk seluruh fakultas (Ekonomi, Hukum, Kedokteran, Pertanian). Kata kunci sistem informasi sering tertimbun karya non-teknis.
                </td>
                <td className="p-3 bg-orange-50/30 text-slate-900 font-medium">
                  Spesifik dan terisolasi untuk 2 Program Studi FTI (Sistem Informasi &amp; Ilmu Komputer) dengan filter peminatan keteknikan.
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">Tipe Aset yang Disimpan</td>
                <td className="p-3 text-slate-600">
                  Hanya naskah teks (PDF dokumen) tugas akhir dan skripsi biasa.
                </td>
                <td className="p-3 bg-orange-50/30 text-slate-900 font-medium">
                  Menyimpan dokumen PDF sekaligus <strong>Artefak Perangkat Lunak</strong> (Source Code, Dataset Riset, Bobot Model AI, dan Blueprint Arsitektur TOGAF).
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">Pencarian Ide &amp; Research Gap</td>
                <td className="p-3 text-slate-600">
                  Tidak ada. Mahasiswa harus membaca ratusan PDF satu per satu untuk mencari saran penelitian selanjutnya.
                </td>
                <td className="p-3 bg-orange-50/30 text-slate-900 font-medium">
                  Dilengkapi fitur <strong>Peta Rumpun Riset &amp; Research Gap Finder</strong> yang mengekstrak peluang topik baru dan mencocokkan kepakaran dosen pembimbing.
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">Keamanan Akses (Model UNAIR)</td>
                <td className="p-3 text-slate-600">
                  Umumnya biner: naskah dibuka penuh ke publik atau terkunci sama sekali.
                </td>
                <td className="p-3 bg-orange-50/30 text-slate-900 font-medium">
                  Berlapis ala UNAIR: Bab 1 terbuka untuk sitasi, naskah lengkap wajib SSO kampus, watermark dinamis pelacak IP, dan proteksi Closed Embargo paten.
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">Layanan Bebas Perpustakaan</td>
                <td className="p-3 text-slate-600">
                  Hanya untuk perpustakaan pusat universitas, tidak menangani bebas pustaka lokal fakultas.
                </td>
                <td className="p-3 bg-orange-50/30 text-slate-900 font-medium">
                  Menerbitkan <strong>Surat Keterangan Bebas Perpustakaan FTI resmi ber-QR Code</strong> yang langsung diverifikasi secara digital untuk syarat yudisium fakultas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
