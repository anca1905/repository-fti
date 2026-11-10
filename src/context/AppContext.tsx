'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { RepositoryItem, UserRole, Department, UserProfile } from '@/data/types';
import { mockRepositories } from '@/data/mockData';

export const PRESET_USERS: Record<Exclude<UserRole, 'Public'>, UserProfile> = {
  Mahasiswa: {
    name: 'Muh Arsyad Ramsi',
    idNumber: '2021081045',
    role: 'Mahasiswa',
    email: 'arsyad.ramsi@fti.ac.id',
    department: 'Sistem Informasi',
    unit: 'Program Studi S1 Sistem Informasi',
  },
  Dosen: {
    name: 'Dr. Ridwan Arifin, S.Kom., M.Kom.',
    idNumber: '198204122008121002',
    role: 'Dosen',
    email: 'ridwan.arifin@fti.ac.id',
    department: 'Sistem Informasi',
    unit: 'Kelompok Bidang Keahlian Enterprise Systems',
  },
  Admin: {
    name: 'Dra. Endang Wahyuni, M.Hum.',
    idNumber: '197903152005012003',
    role: 'Admin',
    email: 'perpus.fti@universitas.ac.id',
    unit: 'Kepala UPT Perpustakaan FTI',
  },
};

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  repositories: RepositoryItem[];
  addRepository: (item: RepositoryItem) => void;
  updateRepositoryStatus: (id: string, status: RepositoryItem['status']) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDepartment: 'All' | Department;
  setSelectedDepartment: (dept: 'All' | Department) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>('Public');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [repositories, setRepositories] = useState<RepositoryItem[]>(mockRepositories);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<'All' | Department>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (role === 'Public') {
      setCurrentUser(null);
    } else {
      setCurrentUser(PRESET_USERS[role]);
    }
  };

  const login = (profile: UserProfile) => {
    setCurrentRoleState(profile.role);
    setCurrentUser(profile);
    setIsLoginModalOpen(false);
    showToast(`Berhasil masuk sebagai ${profile.name} (${profile.role})`);
  };

  const logout = () => {
    setCurrentRoleState('Public');
    setCurrentUser(null);
    showToast('Anda telah keluar dari sesi SSO Kampus FTI.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addRepository = (item: RepositoryItem) => {
    setRepositories((prev) => [item, ...prev]);
    showToast('Karya ilmiah berhasil diunggah dan masuk antrean verifikasi!');
  };

  const updateRepositoryStatus = (id: string, status: RepositoryItem['status']) => {
    setRepositories((prev) =>
      prev.map((repo) => (repo.id === id ? { ...repo, status } : repo))
    );
    showToast(`Status karya berhasil diperbarui menjadi "${status}"`);
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen,
        repositories,
        addRepository,
        updateRepositoryStatus,
        bookmarks,
        toggleBookmark,
        searchQuery,
        setSearchQuery,
        selectedDepartment,
        setSelectedDepartment,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 animate-bounce duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-fti-500 animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
