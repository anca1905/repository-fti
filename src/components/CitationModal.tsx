'use client';

import React, { useState } from 'react';
import { RepositoryItem } from '@/data/types';
import { X, Check, Copy, BookMarked, Quote } from 'lucide-react';

interface CitationModalProps {
  item: RepositoryItem | null;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ item, onClose }) => {
  const [activeFormat, setActiveFormat] = useState<'APA' | 'IEEE' | 'Harvard' | 'BibTeX'>('APA');
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  // Format citations
  const apaCitation = `${item.author.name}. (${item.year}). ${item.title} (${item.type}, Fakultas Teknologi Informasi, Program Studi ${item.department}). Repositori Institusi FTI. ${item.doi ? `https://doi.org/${item.doi}` : ''}`;

  const ieeeCitation = `${item.author.name}, "${item.title}," ${item.type}, Program Studi ${item.department}, Fakultas Teknologi Informasi, ${item.year}. [Online]. Available: https://repo.fti.ac.id/item/${item.id}`;

  const harvardCitation = `${item.author.name}, ${item.year}. ${item.title}. ${item.type}. Program Studi ${item.department}, Fakultas Teknologi Informasi.`;

  const bibtexCitation = `@thesis{fti_${item.id.replace(/-/g, '_')},
  author    = {${item.author.name}},
  title     = {${item.title}},
  school    = {Fakultas Teknologi Informasi},
  department= {Program Studi ${item.department}},
  year      = {${item.year}},
  type      = {${item.type}},
  url       = {https://repo.fti.ac.id/item/${item.id}}
}`;

  const getCitationText = () => {
    switch (activeFormat) {
      case 'APA':
        return apaCitation;
      case 'IEEE':
        return ieeeCitation;
      case 'Harvard':
        return harvardCitation;
      case 'BibTeX':
        return bibtexCitation;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCitationText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-xl w-full p-6 relative">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-100 text-fti-600">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Kutip Karya Ilmiah</h3>
              <p className="text-xs text-slate-500">Salin format sitasi untuk referensi akademik</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex gap-2 my-4 border-b border-slate-100 pb-3">
          {(['APA', 'IEEE', 'Harvard', 'BibTeX'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setActiveFormat(fmt)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeFormat === fmt
                  ? 'bg-fti-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        {/* Citation Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap select-all">
          {getCitationText()}
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Standar sitasi resmi Perpustakaan FTI
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-fti-600 text-white hover:bg-fti-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Tersalin ke Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Sitasi</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
