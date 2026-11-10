'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Cpu, ArrowRight, BookOpen, Users, Award, CheckCircle } from 'lucide-react';
import { departmentStats } from '@/data/mockData';

export const DepartmentCard: React.FC = () => {
  const { sistemInformasi, ilmuKomputer } = departmentStats;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-fti-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Dua Jurusan Unggulan FTI
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Pusat Pengetahuan Berdasarkan Program Studi
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Pilih jurusan untuk menelusuri repositori skripsi dan riset dengan peminatan spesifik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Sistem Informasi */}
          <div className="rounded-3xl border-2 border-blue-100 hover:border-blue-300 bg-gradient-to-br from-blue-50/40 via-white to-orange-50/20 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group">
            <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-blue-100/70 text-blue-700 flex items-center justify-center font-black text-lg">
              SI
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                    {sistemInformasi.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Gelar: {sistemInformasi.degrees}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {sistemInformasi.description}
              </p>

              {/* Topics pills */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Rumpun Keahlian & Peminatan:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sistemInformasi.topics.map((t, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-100"
                    >
                      <CheckCircle className="w-3 h-3 text-blue-500" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Head & Work count */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-100 mb-6 flex items-center justify-between text-xs">
                <div>
                  <div className="text-slate-400">Ketua Jurusan</div>
                  <div className="font-bold text-slate-800">{sistemInformasi.headOfDepartment}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400">Total Koleksi</div>
                  <div className="font-black text-blue-700 text-base">
                    {sistemInformasi.totalWorks} Karya
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/departments/sistem-informasi"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Profil & Kurikulum SI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/repository?dept=Sistem+Informasi"
                className="px-4 py-2.5 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm transition-all"
              >
                Koleksi SI
              </Link>
            </div>
          </div>

          {/* Card Ilmu Komputer */}
          <div className="rounded-3xl border-2 border-emerald-100 hover:border-emerald-300 bg-gradient-to-br from-emerald-50/40 via-white to-orange-50/20 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group">
            <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center font-black text-lg">
              IK
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {ilmuKomputer.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Gelar: {ilmuKomputer.degrees}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {ilmuKomputer.description}
              </p>

              {/* Topics pills */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Rumpun Keahlian & Peminatan:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ilmuKomputer.topics.map((t, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100"
                    >
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Head & Work count */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-100 mb-6 flex items-center justify-between text-xs">
                <div>
                  <div className="text-slate-400">Ketua Jurusan</div>
                  <div className="font-bold text-slate-800">{ilmuKomputer.headOfDepartment}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400">Total Koleksi</div>
                  <div className="font-black text-emerald-700 text-base">
                    {ilmuKomputer.totalWorks} Karya
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/departments/ilmu-komputer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Profil & Lab Ilkom</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/repository?dept=Ilmu+Komputer"
                className="px-4 py-2.5 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold text-xs sm:text-sm transition-all"
              >
                Koleksi Ilkom
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
