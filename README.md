# Repositori Resmi Fakultas Teknologi Informasi (FTI Repository)

Portal Repositori Institusi Digital (Digital Institutional Repository) modern untuk Fakultas Teknologi Informasi (FTI) yang mengelola, mengarsipkan, dan mempublikasikan karya ilmiah, tugas akhir/skripsi, artikel jurnal, dan riset dosen dari dua program studi:
- **Sistem Informasi (SI)**
- **Ilmu Komputer (IK / CS)**

Aplikasi ini dirancang dengan identitas warna khas FTI (**FTI Vibrant Orange** `#EA580C` & `#F97316`) dipadukan dengan aksen khas masing-masing jurusan (Biru untuk Sistem Informasi, Hijau Zamrud untuk Ilmu Komputer).

---

## 🚀 Fitur Utama

1. **Pencarian Cepat & Filter Multi-Kriteria (Faceted Search)**
   - Filter instan berdasarkan Jurusan (Sistem Informasi / Ilmu Komputer).
   - Filter jenis dokumen (Skripsi, Artikel Jurnal, Prosiding Konferensi, Laporan Riset Dosen, Modul Ajar).
   - Filter tahun terbit dan tingkat akses (Open Access, Civitas FTI Only, Restricted).
   - Pengurutan berdasarkan: Terbaru, Unduhan Terbanyak, Terbanyak Dilihat, dan Sitasi Terbanyak.

2. **Detail Karya & Pratinjau Dokumen Interaktif (PDF Viewer)**
   - Pratinjau langsung naskah PDF di browser dengan navigasi halaman, zoom, dan watermark resmi FTI.
   - Metadata berstandar Dublin Core / OAI-PMH (Penulis, Dosen Pembimbing, Penguji, DOI, Halaman, Lisensi).
   - Abstrak bilingual (Bahasa Indonesia & Bahasa Inggris).

3. **Generator Sitasi Otomatis (1-Click Citation)**
   - Format standar sitasi ilmiah: **APA 7th Edition**, **IEEE**, **Harvard**, dan **BibTeX**.
   - Salin instan ke clipboard dengan konfirmasi visual.

4. **Formulir Unggah Mandiri (Submission Wizard)**
   - Alur 4 langkah bagi mahasiswa/dosen:
     1. Metadata Karya & Program Studi.
     2. Data Penulis, NIM, dan Dewan Pembimbing.
     3. Abstrak & Kata Kunci.
     4. Unggah Berkas PDF (Naskah Lengkap, Bab 1, Lembar Pengesahan) & Pernyataan Integritas Akademik.

5. **Sistem 4 Peran Pengguna (Multi-Role System)**
   - **Pengunjung Publik (Guest)**: Menelusuri, membaca abstrak, mengunduh karya Open Access, menyalin sitasi.
   - **Mahasiswa (Author)**: Mengunggah karya mandiri, memantau status verifikasi, dan mencetak Bukti Bebas Perpustakaan.
   - **Dosen (Reviewer/Pembimbing)**: Mereview naskah mahasiswa bimbingan, memberikan rekomendasi revisi/persetujuan.
   - **Admin / Pustakawan FTI**: Kurasi akhir dokumen, validasi skor Turnitin (< 20%), pengesahan, dan manajemen repositori.
   - *Dilengkapi Portal Otentikasi Terpadu Single Sign-On (SSO) Sivitas FTI (Mahasiswa, Dosen, dan Pustakawan Admin).*

6. **Eksplorasi Ide Judul & Celah Riset Skripsi (Research Gap Finder)**
   - Modul khusus mahasiswa untuk memetakan 6 rumpun keilmuan FTI (TOGAF, BI, UI/UX, AI, Cyber Security, Cloud).
   - 18+ ide celah riset (*research gap*) siap diteliti beserta pencocokan kepakaran Dosen Pembimbing (*Advisor Matching*).

7. **Statistik & Analisis Dampak Riset (Analytics Dashboard)**
   - Perbandingan produktivitas karya Sistem Informasi vs Ilmu Komputer.
   - Tren topik penelitian unggulan (AI/ML, TOGAF, Cyber Security, BI, Computer Vision, UI/UX).
   - Peringkat karya paling banyak diunduh dan dikutip.
   - Rata-rata skor kemiripan plagiasi Turnitin.

---

## 🛠️ Arsitektur & Teknologi

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan skema tema khusus `fti-50` hingga `fti-950`
- **Icon Pack**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`AppContext`) dengan simulated persistence & live updates

---

## 📁 Struktur Folder Proyek

```
repository_fti/
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Layout utama (RoleBanner, Navbar, Footer)
│   │   ├── page.tsx                     # Landing page & Hero Search
│   │   ├── globals.css                  # Custom styling & FTI Orange accents
│   │   ├── repository/
│   │   │   ├── page.tsx                 # Katalog koleksi dengan Filter Sidebar
│   │   │   └── [id]/page.tsx            # Detail karya, PDF viewer, generator sitasi
│   │   ├── departments/
│   │   │   ├── sistem-informasi/page.tsx # Profil, Lab & Koleksi Prodi SI
│   │   │   └── ilmu-komputer/page.tsx   # Profil, Lab & Koleksi Prodi Ilmu Komputer
│   │   ├── submit/page.tsx              # Wizard unggah mandiri skripsi
│   │   ├── dashboard/page.tsx           # Dashboard interaktif untuk 4 Roles
│   │   ├── analytics/page.tsx           # Statistik publikasi & topik riset FTI
│   │   └── about/page.tsx               # Kebijakan plagiasi, lisensi CC, SOP yudisium
│   ├── components/
│   │   ├── Navbar.tsx                   # Navigasi utama dengan branding FTI
│   │   ├── Footer.tsx                   # Footer institusi & kontak perpustakaan
│   │   ├── HeroSearch.tsx               # Hero banner dengan quick search & stats
│   │   ├── DepartmentCard.tsx           # Kartu komparasi prodi SI & Ilkom
│   │   ├── RepositoryCard.tsx           # Kartu karya ilmiah
│   │   ├── FilterSidebar.tsx            # Sidebar faceted filter
│   │   ├── CitationModal.tsx            # Modal kutipan APA, IEEE, Harvard, BibTeX
│   │   ├── PdfPreviewModal.tsx          # Viewer pratinjau dokumen PDF
│   │   └── RoleBanner.tsx               # Switcher role simulasi instan
│   ├── context/
│   │   └── AppContext.tsx               # Global State (Role, Repositories, Bookmarks)
│   └── data/
│       ├── types.ts                     # Definisi tipe TypeScript
│       └── mockData.ts                  # Koleksi data riset SI & Ilkom realistis
├── tailwind.config.ts                   # Konfigurasi warna identitas oranye FTI
└── package.json
```

---

## 💻 Cara Menjalankan Aplikasi Secara Lokal

Pastikan Anda berada di direktori project:
```bash
cd c:\laragon\www\repository_fti
```

Jalankan server pengembangan:
```bash
npm run dev
```

Buka peramban (browser) dan akses:
```
http://localhost:3000
```

Untuk membangun versi produksi (production build):
```bash
npm run build
npm run start
```
