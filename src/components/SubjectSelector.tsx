'use client';

import { Subject } from '@/types';
import { SubjectClover } from './Clovers';

interface SubjectSelectorProps {
  onSelect: (subject: Subject) => void;
}

const subjects: { name: Subject; color: string; bg: string; border: string; emoji: string }[] = [
  { name: '국어', color: 'text-pink-600', bg: 'bg-pink-50 hover:bg-pink-100', border: 'border-pink-300 hover:border-pink-400', emoji: '📖' },
  { name: '영어', color: 'text-blue-600', bg: 'bg-blue-50 hover:bg-blue-100', border: 'border-blue-300 hover:border-blue-400', emoji: '🔤' },
  { name: '수학', color: 'text-red-600', bg: 'bg-red-50 hover:bg-red-100', border: 'border-red-300 hover:border-red-400', emoji: '➗' },
  { name: '과학', color: 'text-teal-600', bg: 'bg-teal-50 hover:bg-teal-100', border: 'border-teal-300 hover:border-teal-400', emoji: '🔬' },
  { name: '역사', color: 'text-amber-600', bg: 'bg-amber-50 hover:bg-amber-100', border: 'border-amber-300 hover:border-amber-400', emoji: '🏺' },
];

export default function SubjectSelector({ onSelect }: SubjectSelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-4xl mb-2">🍀</p>
        <h2 className="text-2xl font-bold text-green-800">
          어떤 과목 문제를 풀었나요?
        </h2>
        <p className="text-sm text-green-500 mt-1">과목을 선택하면 시작돼요!</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
        {subjects.map((s) => (
          <button
            key={s.name}
            onClick={() => onSelect(s.name)}
            className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${s.bg} ${s.border}`}
          >
            <SubjectClover subject={s.name} className="w-20 h-16" />
            <div className="flex items-center gap-1">
              <span>{s.emoji}</span>
              <span className={`text-lg font-bold ${s.color}`}>{s.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
