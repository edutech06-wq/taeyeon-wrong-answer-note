'use client';

import { useRef, useState } from 'react';
import { Subject } from '@/types';
import { SubjectClover } from './Clovers';

interface ImageUploaderProps {
  subject: Subject;
  problemCount: number;
  onProblemCountChange: (count: number) => void;
  onUpload: (file: File) => void;
  onBack: () => void;
}

const PROBLEM_COUNTS = [3, 5, 7, 10];

export default function ImageUploader({
  subject,
  problemCount,
  onProblemCountChange,
  onUpload,
  onBack,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) handleFile(f);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-green-600 hover:text-green-800 text-sm font-medium">
          ← 과목 변경
        </button>
        <div className="flex items-center gap-2">
          <SubjectClover subject={subject} className="w-10 h-8" />
          <span className="text-xl font-bold text-green-800">{subject} 오답노트</span>
        </div>
      </div>

      {/* 문제 개수 선택 */}
      <div className="bg-white/80 rounded-2xl p-5 shadow-sm border border-green-100 mb-4">
        <p className="text-sm font-semibold text-green-700 mb-3">🍀 생성할 문제 개수를 선택하세요</p>
        <div className="flex gap-2 flex-wrap">
          {PROBLEM_COUNTS.map((count) => (
            <button
              key={count}
              onClick={() => onProblemCountChange(count)}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all border-2 ${
                problemCount === count
                  ? 'bg-green-500 text-white border-green-500 shadow'
                  : 'bg-white text-green-600 border-green-200 hover:border-green-400'
              }`}
            >
              {count}개
            </button>
          ))}
        </div>
      </div>

      {/* 이미지 업로드 */}
      <div
        className={`relative bg-white/80 rounded-2xl border-2 border-dashed transition-all ${
          dragging ? 'border-green-400 bg-green-50' : 'border-green-200'
        } shadow-sm`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="p-4">
            <img src={preview} alt="업로드한 문제" className="w-full rounded-xl object-contain max-h-72" />
            <button
              onClick={() => { setPreview(null); setFile(null); }}
              className="mt-3 text-xs text-gray-400 hover:text-red-400 transition-colors"
            >
              다시 선택하기
            </button>
          </div>
        ) : (
          <button
            className="w-full p-10 flex flex-col items-center gap-3 text-green-400"
            onClick={() => inputRef.current?.click()}
          >
            <span className="text-5xl">🍀</span>
            <span className="font-semibold text-green-600">문제 사진을 올려주세요</span>
            <span className="text-xs text-green-300">클릭하거나 드래그 앤 드롭</span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      <button
        disabled={!file}
        onClick={() => file && onUpload(file)}
        className="mt-5 w-full py-4 rounded-2xl font-bold text-white text-lg transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 active:scale-95"
      >
        문제 생성하기 🍀
      </button>
    </div>
  );
}
