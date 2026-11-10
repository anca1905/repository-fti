'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/data/types';
import { User, Shield, GraduationCap, BookOpen, KeyRound } from 'lucide-react';

export const RoleBanner: React.FC = () => {
  const { currentRole, setCurrentRole } = useApp();

  const roles: { role: UserRole; label: string; icon: React.ReactNode }[] = [
    {
      role: 'Public',
      label: 'Tamu / Umum',
      icon: <User className="w-3 h-3" />,
    },
    {
      role: 'Mahasiswa',
      label: 'Mahasiswa (Penyerahan TA)',
      icon: <GraduationCap className="w-3 h-3" />,
    },
    {
      role: 'Dosen',
      label: 'Dosen (Pembimbing / Reviewer)',
      icon: <BookOpen className="w-3 h-3" />,
    },
    {
      role: 'Admin',
      label: 'Pustakawan / Pengelola FTI',
      icon: <Shield className="w-3 h-3" />,
    },
  ];

  return (
    <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 py-1.5 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold tracking-wide text-orange-400 uppercase flex items-center gap-1.5">
            <KeyRound className="w-3 h-3" />
            <span>Simulasi Akses SSO Kampus FTI:</span>
          </span>
          <span className="hidden lg:inline text-[11px] text-slate-400">
            Pilih hak akses pengguna untuk menguji formulir penyerahan mandiri &amp; verifikasi pustakawan
          </span>
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {roles.map((item) => {
            const isActive = currentRole === item.role;
            return (
              <button
                key={item.role}
                onClick={() => setCurrentRole(item.role)}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive && <span className="text-[9px] bg-orange-800 px-1 rounded ml-1">Aktif</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
