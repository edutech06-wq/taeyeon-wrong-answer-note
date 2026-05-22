'use client';

import { AnalysisResult, GenerateResult, Subject } from '@/types';
import { SubjectClover } from './Clovers';

interface ResultViewProps {
  subject: Subject;
  analysis: AnalysisResult;
  result: GenerateResult;
  imagePreview: string;
  onReset: () => void;
}

export default function ResultView({ subject, analysis, result, imagePreview, onReset }: ResultViewProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SubjectClover subject={subject} className="w-12 h-10" />
          <div>
            <h2 className="text-xl font-bold text-green-800">{subject} 분석 결과</h2>
            <p className="text-sm text-green-500">주제: {analysis.topic}</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-green-500 hover:text-green-700 font-medium border border-green-200 rounded-full px-4 py-1.5 bg-white/70"
        >
          처음으로
        </button>
      </div>

      {/* 업로드 이미지 */}
      <div className="bg-white/80 rounded-2xl p-4 shadow-sm border border-green-100">
        <p className="text-xs font-semibold text-green-500 mb-2 uppercase tracking-wide">업로드한 문제</p>
        <img src={imagePreview} alt="업로드한 문제" className="w-full rounded-xl object-contain max-h-48" />
      </div>

      {/* 개념 분석 */}
      <div className="bg-white/80 rounded-2xl p-5 shadow-sm border border-green-100">
        <p className="text-xs font-semibold text-green-600 mb-3 uppercase tracking-wide">📗 핵심 개념 분석</p>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{analysis.summary}</p>
        <div className="flex flex-wrap gap-2">
          {analysis.concepts.map((c, i) => (
            <span key={i} className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              🌿 {c}
            </span>
          ))}
        </div>
      </div>

      {/* 유사 문제 */}
      <div className="bg-white/80 rounded-2xl p-5 shadow-sm border border-green-100">
        <p className="text-xs font-semibold text-green-600 mb-4 uppercase tracking-wide">
          🍀 유사 문제 ({result.problems.length}개)
        </p>
        <div className="space-y-5">
          {result.problems.map((p, i) => (
            <div key={i} className="border border-green-100 rounded-xl p-4 bg-green-50/60">
              <p className="font-semibold text-gray-800 mb-3 text-sm leading-relaxed">
                Q{i + 1}. {p.question}
              </p>
              {p.options && (
                <ol className="space-y-1 mb-3">
                  {p.options.map((opt, j) => (
                    <li key={j} className="text-sm text-gray-600">
                      {j + 1}) {opt}
                    </li>
                  ))}
                </ol>
              )}
              <details className="mt-2">
                <summary className="text-xs text-green-600 cursor-pointer font-semibold hover:text-green-800">
                  정답 보기
                </summary>
                <div className="mt-2 p-3 bg-white rounded-lg border border-green-100">
                  <p className="text-sm font-bold text-green-700">정답: {p.answer}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.explanation}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* 빈칸 채우기 */}
      <div className="bg-white/80 rounded-2xl p-5 shadow-sm border border-green-100">
        <p className="text-xs font-semibold text-green-600 mb-4 uppercase tracking-wide">
          ✏️ 빈칸 채우기 문제 (10개)
        </p>
        <div className="space-y-3">
          {result.blankProblems.map((bp, i) => (
            <div key={i} className="border border-emerald-100 rounded-xl p-3 bg-emerald-50/60">
              <p className="text-sm text-gray-800 leading-relaxed">
                {i + 1}. {bp.sentence.replace('___', '______')}
              </p>
              <details className="mt-2">
                <summary className="text-xs text-emerald-600 cursor-pointer font-semibold hover:text-emerald-800">
                  정답 보기
                </summary>
                <p className="text-sm font-bold text-emerald-600 mt-1">{bp.answer}</p>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* 다시 시작 버튼 */}
      <button
        onClick={onReset}
        className="w-full py-3 rounded-2xl font-bold text-white bg-green-500 hover:bg-green-600 active:scale-95 transition-all shadow-md"
      >
        🍀 다른 문제 풀기
      </button>
    </div>
  );
}
