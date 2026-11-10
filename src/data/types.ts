export type Department = 'Sistem Informasi' | 'Ilmu Komputer';

export type DocumentType =
  | 'Skripsi / Tugas Akhir'
  | 'Artikel Jurnal'
  | 'Prosiding Konferensi'
  | 'Laporan Kerja Praktik'
  | 'Laporan Riset Dosen'
  | 'Modul Ajar'
  | 'Hak Cipta & Paten';

// Kebijakan Hak Akses Dokumen Berlapis (Model Repositori UNAIR)
export type AccessType =
  | 'Open Access'
  | 'Sivitas FTI (Wajib Login SSO)'
  | 'Ruang Pustaka FTI Only (Terminal Perpustakaan)'
  | 'Closed Embargo (Paten / NDA)';

export type SubmissionStatus = 'Approved' | 'Under Review' | 'Revision Needed' | 'Draft';

export type UserRole = 'Public' | 'Mahasiswa' | 'Dosen' | 'Admin';

export interface UserProfile {
  name: string;
  idNumber: string; // NIM, NIP, or NIDN
  role: UserRole;
  email: string;
  department?: string;
  unit?: string;
}

export interface Author {
  name: string;
  nimOrNidn: string;
  email: string;
  role: 'Mahasiswa' | 'Dosen';
}

export interface DocumentFile {
  name: string;
  category: 'Naskah Lengkap' | 'Bab 1 Pendahuluan' | 'Jurnal Ringkas' | 'Lembar Pengesahan' | 'Source Code & Dataset';
  size: string;
  downloadUrl?: string;
  access: AccessType;
  sha256Checksum: string; // Hash kriptografi untuk verifikasi integritas file naskah
  watermarkProtected: boolean;
}

export interface SecurityAuditLog {
  timestamp: string;
  userName: string;
  userRole: UserRole;
  action: 'View' | 'Download' | 'Verify' | 'Cite';
  ipAddress: string;
  documentId: string;
}

export interface RepositoryItem {
  id: string;
  title: string;
  abstract: string;
  abstractEn: string;
  department: Department;
  specialization: string;
  author: Author;
  advisors: string[];
  examiners: string[];
  year: number;
  academicYear: string;
  type: DocumentType;
  access: AccessType;
  keywords: string[];
  doi?: string;
  pages: number;
  fileSize: string;
  downloads: number;
  views: number;
  citations: number;
  status: SubmissionStatus;
  plagiarismSimilarity: number; // in percentage, e.g. 9%
  submittedAt: string;
  approvedAt?: string;
  embargoUntil?: string; // Tanggal akhir embargo (jika status Closed Embargo)
  sha256Fingerprint: string;
  files: DocumentFile[];
}
