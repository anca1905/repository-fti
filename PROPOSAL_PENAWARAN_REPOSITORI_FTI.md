# PROPOSAL PENGAJUAN DAN PENAWARAN IMPLEMENTASI
## SISTEM REPOSITORI DIGITAL INSTITUSI KARYA ILMIAH
### FAKULTAS TEKNOLOGI INFORMASI (FTI)
**Program Studi S1 Sistem Informasi & Program Studi S1 Ilmu Komputer**

---

**Nomor Dokumen** : 01/PROP-REPO/FTI/XI/2026  
**Lampiran** : 1 (Satu) Berkas Desain Sistem & Dokumentasi Fitur  
**Perihal** : Penawaran dan Permohonan Audiensi/Demo Implementasi Sistem Repositori Digital FTI  

---

### KEPADA YTH.
1. **Wakil Dekan II (Bidang Umum, Keuangan, Sarana Prasarana & Sistem Informasi)**  
   Fakultas Teknologi Informasi  
2. **Ketua Program Studi S1 Sistem Informasi**  
   Fakultas Teknologi Informasi  
3. **Ketua Program Studi S1 Ilmu Komputer**  
   Fakultas Teknologi Informasi  

Di Tempat

---

## 1. SURAT PENGANTAR AUDIENSI

Dengan hormat,

Sehubungan dengan upaya peningkatan mutu tata kelola akademik, efisiensi administrasi kelulusan mahasiswa, serta percepatan diseminasi karya ilmiah sivitas akademika Fakultas Teknologi Informasi menuju pemenuhan standar **Akreditasi LAM-INFOKOM (Kriteria 7: Penelitian dan Kriteria 9: Luaran & Capaian Tridharma)**, bersama ini kami mengajukan dokumen penawaran implementasi:

> **"Sistem Repositori Digital Institusi Fakultas Teknologi Informasi (FTI Repository)"**

Aplikasi ini telah selesai dikembangkan dalam versi fungsional penuh (*ready-to-deploy prototype*) yang mencakup alur penyerahan mandiri naskah tugas akhir mahasiswa, verifikasi dosen pembimbing, pengecekan ambang plagiarisme Turnitin, hingga penerbitan otomatis Surat Keterangan Bebas Perpustakaan secara digital.

Melalui proposal ini, kami memohon kesediaan waktu Bapak/Ibu Wakil Dekan II beserta Ketua Program Studi Sistem Informasi dan Ketua Program Studi Ilmu Komputer untuk berkenan memberikan kesempatan **Audiensi dan Demonstrasi Langsung (*Live System Demo*)** pada waktu yang Bapak/Ibu tentukan.

Sebagai bahan pertimbangan, rincian urgensi, arsitektur sistem, fitur, serta manfaat strategis kami uraikan pada bagian berikut.

---

## 2. LATAR BELAKANG, RUMUSAN MASALAH & TUJUAN PENGEMBANGAN

### 2.1 Latar Belakang & Urgensi Khusus FTI
Fakultas Teknologi Informasi (FTI) menaungi dua program studi strategis, yaitu **S1 Sistem Informasi** dan **S1 Ilmu Komputer**, dengan rata-rata kelulusan mencapai ratusan sarjana per tahun akademik. Selama ini, institusi perguruan tinggi umumnya telah memiliki Repositori Perpustakaan Pusat Universitas (seperti EPrints / DSpace sentral). Namun, dalam tataran operasional fakultas teknologi, repositori sentral tersebut memiliki keterbatasan mendasar yang tidak mampu memenuhi kebutuhan spesifik sivitas akademika FTI:

1. **Karya Skripsi IT Bersifat Multi-Artefak**: Skripsi mahasiswa FTI tidak hanya berupa naskah teks (PDF), melainkan menghasilkan artefak teknologi seperti kode program (*source code*), model kecerdasan buatan (*AI weights*), arsitektur sistem enterprise (TOGAF/BPMN), serta dataset terkurasi. Repositori universitas umum hanya menampung PDF statis, sehingga artefak perangkat lunak mahasiswa sering kali hilang, usang, atau tidak dapat diverifikasi (*software reproducibility crisis*).
2. **Tingginya Frustrasi Mahasiswa dalam Menemukan Ide Judul Skripsi**: Mahasiswa tingkat akhir menghabiskan waktu berbulan-bulan hanya untuk merumuskan judul tugas akhir. Mereka kesulitan memetakan penelitian apa saja yang sudah dikerjakan kakak tingkat, mana topik yang sudah jenuh/usang, dan di mana letak **celah riset (*research gap*)** yang dapat dilanjutkan.
3. **Mismatch Minat Mahasiswa dengan Kepakaran Dosen Pembimbing**: Banyak pengajuan proposal skripsi ditolak oleh Ketua Program Studi karena topik yang diajukan tidak linier dengan *roadmap* penelitian laboratorium FTI atau kepakaran dosen pembimbing yang dituju.
4. **Alur Validasi Kelulusan Lokal FTI Belum Terotomasi**: Persyaratan yudisium FTI mewajibkan pemeriksaan ambang batas Turnitin (< 20%), pengecekan keabsahan kode program, dan penerbitan Surat Bebas Perpustakaan Fakultas. Repositori universitas umum tidak melayani alur verifikasi spesifik tingkat fakultas ini.

---

### 2.2 Rumusan Masalah
Berdasarkan latar belakang di atas, rumusan masalah dalam perancangan dan implementasi Repositori FTI ini dirumuskan sebagai berikut:

1. **Bagaimana membangun sistem repositori yang mempermudah mahasiswa FTI menemukan ide judul skripsi yang orisinal, relevan, dan memiliki celah riset (*research gap*) yang jelas berdasarkan taksonomi keilmuan Sistem Informasi dan Ilmu Komputer?**
2. **Bagaimana mendokumentasikan dan mempreservasi luaran skripsi FTI yang mencakup naskah ilmiah sekaligus artefak perangkat lunak (*software artifacts*, repositori kode, dan dataset)?**
3. **Bagaimana memfasilitasi pencocokan (*advisor matching*) antara topik skripsi mahasiswa dengan kepakaran serta peta riset dosen pembimbing di lingkungan FTI?**
4. **Bagaimana mengamankan karya intelektual sivitas akademika FTI dari ancaman plagiarisme dan kebocoran naskah yang berpotensi paten/HKI dengan mengadopsi standar keamanan repositori modern (seperti standar Universitas Airlangga - UNAIR / ADLN)?**
5. **Bagaimana mengotomatisasi alur penyerahan mandiri naskah (*self-archiving*) hingga penerbitan Surat Keterangan Bebas Perpustakaan FTI digital untuk mempercepat masa studi dan yudisium mahasiswa?**

---

### 2.3 Tujuan Pengembangan Sistem
Tujuan dari pengembangan Sistem Repositori Digital FTI ini terbagi menjadi dua aspek:

#### A. Tujuan Umum:
Mewujudkan pangkalan data institusi digital mandiri bagi Fakultas Teknologi Informasi yang mampu mendokumentasikan, mengamankan, dan mendiseminasikan seluruh hasil karya ilmiah serta artefak teknologi sivitas akademika secara terstruktur, terpercaya, dan berstandar internasional.

#### B. Tujuan Khusus:
1. **Mempercepat Kelulusan Mahasiswa (Lulus Tepat Waktu)**: Menyediakan modul *Research Gap & Topic Finder* agar mahasiswa dapat menemukan topik riset tugas akhir dalam hitungan hari, bukan berbulan-bulan.
2. **Mendokumentasikan Artefak Perangkat Lunak Lengkap**: Menyimpan naskah ilmiah bersama repositori kode (*source code* GitHub/GitLab), bobot model AI, dan dataset uji coba guna mendukung integritas akademik dan replikasi riset.
3. **Meningkatkan Nilai Akreditasi LAM-INFOKOM**: Memenuhi instrumen akreditasi program studi pada Kriteria 7 (Penelitian Mahasiswa dan Dosen) serta Kriteria 9 (Luaran dan Capaian Tridharma Perguruan Tinggi).
4. **Menerapkan Standar Keamanan UNAIR (ADLN)**: Mengimplementasikan kontrol akses bertingkat (*multi-tiered access*), stempel *watermarking* dinamis ber-audit trail identitas pengunduh, dan sidik jari kriptografi SHA-256 untuk perlindungan hak cipta digital.
5. **Efisiensi Administrasi Fakultas (Paperless & Self-Service)**: Mengeliminasi antrean fisik pengumpulan CD/naskah hardcopy dan menerbitkan Surat Bebas Perpustakaan FTI ber-QR Code secara instan setelah diverifikasi dosen dan admin.

---

### 2.4 Matriks Keunikan & Pembeda Utama (FTI Repository vs. Repositori Universitas)
Sebagai bahan pertimbangan Bapak/Ibu pimpinan fakultas, berikut adalah perbandingan komparatif antara Repositori Sentral Universitas yang telah ada dengan Repositori Digital FTI yang kami tawarkan:

| Indikator Perbandingan | Repositori Perpustakaan Sentral Universitas | Repositori Digital Khusus FTI (Sistem Ini) | Nilai Tambah bagi FTI |
| :--- | :--- | :--- | :--- |
| **Fokus & Taksonomi Bidang Ilmu** | Tercampur dengan seluruh fakultas (Hukum, Ekonomi, Kedokteran, Pertanian). Taksonomi menggunakan DDC umum. | **Spesifik Rumpun Keilmuan Komputasi** (Kurikulum ACM/IEEE & LAM-INFOKOM): SI (TOGAF, BI, UI/UX, COBIT) dan Ilkom (AI, Computer Vision, Cyber Security, Cloud). | Mahasiswa dan dosen langsung menemukan naskah yang linier tanpa terdistraksi karya disiplin ilmu lain. |
| **Fitur Pencarian Ide Topik & Celah Riset (*Topic & Research Gap Finder*)** | **Tidak Ada.** Pencarian hanya mengandalkan kata kunci teks bebas (*full-text query*). Mahasiswa harus membuka puluhan PDF secara manual untuk mencari saran penelitian lanjutan. | **Ada (Modul Khusus `/topics`).** Menyajikan 6 rumpun topik keilmuan FTI, 18+ ide celah riset (*research gap*), serta naskah skripsi rujukan terdahulu. | Mahasiswa semester 7/8 tidak lagi bingung mencari judul skripsi, menurunkan angka mahasiswa molor/drop-out. |
| **Dukungan Artefak Perangkat Lunak (*Software Artifacts*)** | **Hanya File PDF Statis.** Tidak ada metadata untuk kode sumber program, bobot model AI, atau dataset. | **Mendukung Multi-Artefak Teknologi.** Menyediakan tautan repositori kode resmi (GitHub/GitLab), dataset riset, dan model weights kecerdasan buatan. | Menjamin orisinalitas aplikasi dan keabsahan produk IT yang diujikan dalam sidang skripsi. |
| **Pencocokan Dosen Pembimbing (*Advisor Research Matching*)** | Nama dosen hanya tercantum sebagai teks metadata pasif. | **Pemetaan Kelompok Bidang Keahlian Dosen.** Mahasiswa dapat melihat bidang kepakaran dosen dan judul-judul apa saja yang aktif dibimbing oleh beliau. | Meminimalisir penolakan proposal di tingkat Kaprodi akibat dosen pembimbing yang tidak linier. |
| **Model Keamanan Dokumen** | Bersifat umum/biner (semua terbuka atau semua terkunci login perpusat). | **Mengadopsi Standar Universitas Airlangga (UNAIR / ADLN):** Pemisahan Bab Terbuka (Open Access) vs Naskah Penuh (SSO), *Dynamic Watermark* (Nama, NIM, IP, Timestamp), SHA-256 Checksum, dan fitur *Closed Embargo* untuk paten/HKI. | Melindungi karya mahasiswa dari pembajakan dan plagiasi oleh pihak luar yang tidak bertanggung jawab. |
| **Administrasi Surat Bebas Pustaka** | Hanya mengeluarkan bebas pustaka universitas umum; tidak memeriksa syarat kelulusan internal FTI. | **Penerbitan Otomatis Surat Bebas Perpustakaan FTI Digital.** Terintegrasi verifikasi Turnitin prodi (< 20%) dan validasi penyerahan kode program, lengkap dengan QR Code & TTE. | Menghemat waktu staf administrasi fakultas dan mempercepat proses pendaftaran yudisium mahasiswa. |

---

## 3. SOLUSI YANG DITAWARKAN

Sistem yang kami bangun dirancang khusus untuk memecahkan permasalahan di atas dengan mengusung konsep **Portal Repositori Institusi Resmi Mandiri**:

* **Identitas Visual Resmi FTI**: Menggunakan palet warna identitas oranye FTI (`#EA580C` / `#C2410C`) dengan tata letak institusional formal berstandar kampus terakreditasi Unggul (mengadopsi tata kelola EPrints / DSpace UI, ITB, dan Undip).
* **Klasifikasi Terintegrasi Dua Jurusan**:
  * **S1 Sistem Informasi**: Fokus pada Enterprise Systems (TOGAF), Data Analytics & BI, UI/UX, dan Tata Kelola TI (COBIT/ISO).
  * **S1 Ilmu Komputer**: Fokus pada Artificial Intelligence, Computer Vision, Cyber Security, Cloud Computing, dan Embedded IoT.
* **Modern & Ringan**: Dibangun dengan *modern tech stack* (Next.js 14, React, TypeScript, dan Tailwind CSS) yang sangat cepat, aman, responsif diakses dari ponsel pintar maupun desktop, serta mudah di-hosting di server lokal kampus maupun *cloud*.
* **Model Keamanan Berlapis (Standar Universitas Airlangga - UNAIR / ADLN)**:
  * **Akses Bertingkat**: Abstrak dan Bab 1 terbuka (Open Access), sedangkan naskah lengkap (Full-Text) dilindungi autentikasi SSO kampus.
  * **Perlindungan Hak Cipta Digital (DRM & Dynamic Watermark)**: Setiap halaman naskah yang dibuka/diunduh dibubuhi stempel dinamis resmi identitas pengunduh, IP, dan timestamp guna mencegah pembajakan/plagiasi komersial.
  * **Integritas Kriptografi SHA-256**: Setiap berkas memiliki sidik jari digital (fingerprint) untuk menjamin berkas tidak pernah dimanipulasi sejak disahkan sidang.
  * **Fitur Closed Embargo**: Perlindungan khusus untuk naskah yang sedang dalam proses pendaftaran Hak Paten atau terikat NDA industri.

---

## 4. MATRIKS FITUR UTAMA & SPESIFIKASI SISTEM

```
+-----------------------------------------------------------------------------------+
|                        ARSITEKTUR REPOSITORI DIGITAL FTI                          |
+-----------------------------------------------------------------------------------+
|  [ Mahasiswa ]        [ Dosen Reviewer ]       [ Pustakawan FTI ]    [ Publik ]   |
|   Unggah TA               Validasi TA             Kurasi Akhir        Open Access |
|   Cetak Bebas Perpus      Portofolio Riset        Stempel Digital     Kutip Sitasi|
+-----------------------------------------------------------------------------------+
|                  CORE ENGINE REPOSITORY (NEXT.JS 14 + REACT)                      |
|  * Faceted Search Engine (Filter Jurusan, Tahun, Tipe Naskah, Pembimbing)         |
|  * In-Browser PDF Document Previewer (Watermark Resmi & Navigasi Halaman)        |
|  * 1-Click Multi-Format Citation Generator (APA 7th, IEEE, Harvard, BibTeX)       |
|  * Standar Metadata Interoperabilitas OAI-PMH 2.0 & Dublin Core Compliant         |
+-----------------------------------------------------------------------------------+
|                   INFRASTRUKTUR & BASIS DATA FTI (ON-PREMISE/CLOUD)               |
+-----------------------------------------------------------------------------------+
```

### Rincian 4 Role Pengguna:

| Role Pengguna | Hak Akses & Fitur Utama | Manfaat Nyata |
| :--- | :--- | :--- |
| **Mahasiswa (Author)** | Formulir unggah mandiri 4 langkah (*Self-Archiving Wizard*), pantau status review real-time, cetak **Surat Bebas Perpustakaan FTI ber-QR Code**. | Menghilangkan antrean manual; syarat yudisium selesai dalam hitungan jam. |
| **Dosen (Reviewer)** | Dasbor dosen pembimbing untuk mereview naskah mahasiswa bimbingan, verifikasi Turnitin, tombol *Approve* / *Minta Revisi*, deposit riset dosen mandiri. | Transparansi bimbingan, akurasi naskah yang disahkan. |
| **Pustakawan (Admin FTI)** | Verifikasi integritas file, validasi ambang batas plagiasi (< 20%), penerbitan lisensi Open Access / Embargo, ekspor laporan berkala. | Tata kelola arsip digital tertib, otomatis, dan terpusat. |
| **Publik / Tamu** | Penelusuran katalog multi-kriteria, membaca abstrak bilingual (ID/EN), unduh naskah publik, salin format sitasi resmi. | Meningkatkan sitasi ilmiah dosen dan mahasiswa di Google Scholar. |

---

## 5. NILAI STRATEGIS UNTUK FAKULTAS, KAPRODI, DAN WAKIL DEKAN II

### A. Bagi Wakil Dekan II (Bidang Umum, Keuangan, Sarana & TI)
1. **Efisiensi Anggaran (Cost-Saving)**:
   * Tidak ada biaya royalti atau sewa lisensi tahunan per pengguna ke vendor luar (*zero license cost*).
   * Menghilangkan biaya operasional pencetakan lembar bukti bebas pustaka dan CD tugas akhir (*paperless office*).
2. **Kesiapan Infrastruktur (Deployment Ready)**:
   * Dapat langsung dijalankan pada server lokal (*on-premise*) kampus, lingkungan virtual machine (VM), atau server Laragon yang sudah tersedia di jaringan intranet fakultas.
3. **Penyimpanan Berkas Terpusat & Aman**:
   * Data naskah tersimpan rapi dengan penamaan baku (`NIM_Nama_NaskahLengkap.pdf`), terlindungi dari kehilangan fisik atau bencana.

### B. Bagi Ketua Program Studi (S1 Sistem Informasi & S1 Ilmu Komputer)
1. **Pendukung Utama Borang Akreditasi (LAM-INFOKOM)**:
   * **Kriteria 7 (Penelitian)**: Menyajikan data riil jumlah penelitian mahasiswa dan dosen per tahun akademik.
   * **Kriteria 9 (Luaran & Capaian)**: Menyajikan bukti publikasi tugas akhir, jurnal, prosiding, serta produk inovasi perangkat lunak siap unduh.
2. **Monitoring Produktivitas & Peminatan Mahasiswa**:
   * Kaprodi dapat memantau tren topik tugas akhir (contoh: proporsi peminatan TOGAF/BI pada SI vs Deep Learning/Cyber Security pada Ilkom) secara grafis melalui halaman analitik.
3. **Penegakan Integritas Akademik Tanpa Celah**:
   * Sistem mengunci verifikasi Turnitin (wajib di bawah 20%) sebelum naskah dapat disetujui, menjaga nama baik program studi dari plagiarisme.

---

## 6. RENCANA TAHAPAN IMPLEMENTASI (TIMELINE)

Aplikasi saat ini telah **100% selesai dibangun dan lulus kompilasi produksi**. Kami mengusulkan tahapan implementasi bertahap sebagai berikut:

```
+---------------------------------------------------------------------------------+
| MINGGU 1        | MINGGU 2         | MINGGU 3           | MINGGU 4              |
| Audiensi & Demo | Uji Coba Terbatas| Pelatihan Petugas  | Go-Live Resmi         |
| Bersama Dekanat | (Pilot Testing)  | & Dosen Pembimbing | Periode Wisuda FTI    |
+---------------------------------------------------------------------------------+
```

1. **Tahap 1: Audiensi & Live Demo (Minggu 1)**  
   Presentasi langsung kepada WD 2, Kaprodi SI, dan Kaprodi Ilkom untuk meninjau kecocokan alur operasional.
2. **Tahap 2: Uji Coba Terbatas / Pilot Testing (Minggu 2)**  
   Uji coba penyerahan mandiri pada 15–20 mahasiswa yang baru saja menyelesaikan sidang tugas akhir.
3. **Tahap 3: Pelatihan Singkat Operator / Pustakawan FTI (Minggu 3)**  
   Sosialisasi pengelolaan dasbor admin, validasi berkas, dan pencetakan surat bebas perpustakaan.
4. **Tahap 4: Peluncuran Resmi (Go-Live) (Minggu 4)**  
   Penerapan penuh sebagai sistem resmi deposit skripsi FTI untuk seluruh wisudawan periode berjalan.

---

## 7. SPESIFIKASI KEBUTUHAN SERVER (MINIMUM)

Sistem dirancang dengan arsitektur modern yang sangat hemat sumber daya:
* **Sistem Operasi**: Windows Server / Ubuntu Linux Server
* **Prosesor**: 2 Core CPU (atau lebih)
* **RAM**: Minimal 4 GB (Rekomendasi 8 GB)
* **Ruang Disk (Storage)**: Minimal 50 GB SSD (dapat diperluas seiring pertambahan berkas PDF skripsi)
* **Kebutuhan Jaringan**: IP Publik / Intranet Kampus FTI (Port 80/443 & 3000)

---

## 8. PENUTUP & TINDAK LANJUT

Demikian proposal penawaran implementasi Sistem Repositori Digital Fakultas Teknologi Informasi ini kami sampaikan. Kami meyakini bahwa penerapan sistem ini akan memberikan lompatan efisiensi administrasi bagi Fakultas Teknologi Informasi, mempermudah mahasiswa dan dosen, serta menjadi portofolio kebanggaan fakultas yang terbukti dibangun secara mandiri oleh potensi sivitas akademika sendiri.

Besar harapan kami agar Bapak/Ibu Wakil Dekan II, Ketua Program Studi Sistem Informasi, dan Ketua Program Studi Ilmu Komputer berkenan memberikan jadwal audiensi untuk menyaksikan demonstrasi langsung (*live demo*) sistem ini.

Atas perhatian, arahan, dan kesempatan yang diberikan, kami mengucapkan terima kasih.

---

**Hormat Kami,**  
**Skillance Digital Indonesia**  
*(Tim Pengembang Teknologi)*  

*(Tanda Tangan & Nama Terang)*  
**( Muh Arsyad Ramsi )**  
Founder / Lead Developer — Skillance Digital Indonesia  

---

**Tembusan:**
1. Dekan Fakultas Teknologi Informasi
2. Kepala Bagian Tata Usaha FTI
3. Pengelola UPT Perpustakaan FTI
4. Arsip
