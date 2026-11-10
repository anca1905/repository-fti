'use client';

import React from 'react';
import Link from 'next/link';
import { RepositoryItem } from '@/data/types';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Download,
  Eye,
  Quote,
  Bookmark,
  Layers,
  Cpu,
  Lock,
  Globe2,
  Calendar,
  User,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

interface RepositoryCardProps {
  item: RepositoryItem;
  onPreviewPdf?: (item: RepositoryItem) => void;
  onCite?: (item: RepositoryItem) => void;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  item,
  onPreviewPdf,
  onCite,
}) => {
  const { bookmarks, toggleBookmark } = useApp();
  const isBookmarked = bookmarks.includes(item.id);
  const isSI = item.department === 'Sistem Informasi';

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-orange-300 hover:shadow-xs transition-all">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Document Icon / Badge */}
        <div className="hidden sm:flex flex-col items-center justify-center w-14 h-16 bg-slate-50 border border-slate-200 rounded shrink-0 p-1 text-center">
          <FileText className="w-6 h-6 text-orange-600" />
          <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight mt-0.5">
            {item.type.includes('Skripsi') ? 'SKRIPSI' : 'JURNAL'}
          </span>
          <span className="text-[8px] text-slate-400 font-mono">PDF</span>
        </div>

        {/* Content Details */}
        <div className="flex-1 space-y-2">
          {/* Header Row: Prodi & ID */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                  isSI
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {isSI ? <Layers className="w-3 h-3 text-blue-600" /> : <Cpu className="w-3 h-3 text-emerald-600" />}
                {item.department}
              </span>

              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                {item.type}
              </span>

              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  item.access === 'Open Access'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-amber-800 bg-amber-50'
                }`}
              >
                {item.access === 'Open Access' ? (
                  <Globe2 className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Lock className="w-3 h-3 text-amber-600" />
                )}
                {item.access}
              </span>
            </div>

            <span className="text-[11px] font-mono text-slate-400">Handle: {item.id}</span>
          </div>

          {/* Title */}
          <Link
            href={`/repository/${item.id}`}
            className="block text-slate-900 font-bold text-sm sm:text-base leading-snug hover:text-orange-700 hover:underline"
          >
            {item.title}
          </Link>

          {/* Academic Citation Style Details */}
          <div className="text-xs text-slate-600 space-y-1">
            <div>
              <span className="font-semibold text-slate-800">{item.author.name}</span>
              <span className="text-slate-500 font-mono"> (NIM: {item.author.nimOrNidn})</span>
              <span className="text-slate-400"> — </span>
              <span>Tahun {item.year} ({item.academicYear})</span>
            </div>

            {item.advisors.length > 0 && (
              <div className="text-[11px] text-slate-500">
                <span className="font-medium text-slate-700">Dosen Pembimbing: </span>
                {item.advisors.join('; ')}
              </div>
            )}
          </div>

          {/* Abstract Snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed text-justify">
            {item.abstract}
          </p>

          {/* Keywords & Subject */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
            <span className="text-slate-400 font-medium">Subjek/Peminatan:</span>
            <span className="font-semibold text-slate-700">{item.specialization}</span>
            <span className="text-slate-300">•</span>
            {item.keywords.slice(0, 3).map((kw, i) => (
              <span key={i} className="text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-[10px]">
                {kw}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Metrics */}
            <div className="flex items-center gap-4 text-slate-500 text-[11px]">
              <span title="Dilihat">
                <strong>{item.views.toLocaleString()}</strong> x dilihat
              </span>
              <span title="Diunduh">
                <strong>{item.downloads.toLocaleString()}</strong> x diunduh
              </span>
              <span
                className="text-emerald-700 font-semibold flex items-center gap-1"
                title="Skor Kemiripan Turnitin Resmi"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Turnitin: {item.plagiarismSimilarity}%
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-1.5">
              {onCite && (
                <button
                  onClick={() => onCite(item)}
                  className="px-2.5 py-1 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium flex items-center gap-1"
                >
                  <Quote className="w-3 h-3 text-orange-600" />
                  <span>Kutip</span>
                </button>
              )}

              {onPreviewPdf && (
                <button
                  onClick={() => onPreviewPdf(item)}
                  className="px-2.5 py-1 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium flex items-center gap-1"
                >
                  <FileText className="w-3 h-3 text-orange-600" />
                  <span>Pratinjau PDF</span>
                </button>
              )}

              <Link
                href={`/repository/${item.id}`}
                className="px-3 py-1 bg-slate-800 hover:bg-orange-600 text-white rounded text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <span>Lihat Detail</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
