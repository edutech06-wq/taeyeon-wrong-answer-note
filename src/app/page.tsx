'use client';

import { useState } from 'react';
import { AnalysisResult, AppStep, GenerateResult, Subject } from '@/types';
import SubjectSelector from '@/components/SubjectSelector';
import ImageUploader from '@/components/ImageUploader';
import ResultView from '@/components/ResultView';
import { LoadingClover, BackgroundClovers } from '@/components/Clovers';

export default function Home() {
  const [step, setStep] = useState<AppStep>('subject');
  const [subject, setSubject] = useState<Subject>('국어');
  const [problemCount, setProblemCount] = useState(5);
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [mimeType, setMimeType] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubjectSelect = (s: Subject) => {
    setSubject(s);
    setStep('upload');
  };

  const handleUpload = async (file: File) => {
    setError('');
    setLoading(true);
    setStep('analyze');

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    const bytes = await file.arrayBuffer();
    const b64 = Buffer.from(bytes).toString('base64');
    setImageBase64(b64);
    setMimeType(file.type);

    try {
      setLoadingMsg('문제를 분석하고 있어요 🍀');
      const formData = new FormData();
      formData.append('image', file);
      formData.append('subject', subject);

      const analyzeRes = await fetch('/api/analyze', { method: 'POST', body: formData });
      if (!analyzeRes.ok) throw new Error('분석 실패');
      const analysisData: AnalysisResult = await analyzeRes.json();
      setAnalysis(analysisData);

      setLoadingMsg(`유사 문제 ${problemCount}개를 만들고 있어요 ✏️`);
      const generateRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          topic: analysisData.topic,
          concepts: analysisData.concepts,
          summary: analysisData.summary,
          imageBase64: b64,
          mimeType: file.type,
          problemCount,
        }),
      });
      if (!generateRes.ok) throw new Error('문제 생성 실패');
      const generateData: GenerateResult = await generateRes.json();
      setResult(generateData);

      setStep('result');
    } catch {
      setError('오류가 발생했어요. 다시 시도해주세요.');
      setStep('upload');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('subject');
    setAnalysis(null);
    setResult(null);
    setImagePreview('');
    setImageBase64('');
    setError('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-200 via-green-100 to-emerald-50 relative">
      {/* 배경 클로버 장식 */}
      <BackgroundClovers />

      {/* 헤더 */}
      <header className="bg-white/70 backdrop-blur-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-2xl clover-float inline-block">🍀</span>
          <div>
            <h1 className="text-lg font-bold text-green-800 leading-tight">태연의 오답노트</h1>
            <p className="text-xs text-green-400">AI가 유사 문제를 만들어줘요</p>
          </div>
          <div className="ml-auto flex gap-1">
            <span className="text-lg sparkle inline-block" style={{ animationDelay: '0s' }}>✨</span>
            <span className="text-lg sparkle inline-block" style={{ animationDelay: '0.7s' }}>🌿</span>
          </div>
        </div>
      </header>

      {/* 단계 표시 */}
      {step !== 'analyze' && (
        <div className="max-w-2xl mx-auto px-4 py-3 flex gap-2 items-center relative z-1">
          {(['subject', 'upload', 'result'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === s ? 'bg-green-500 text-white' :
                (step === 'result' && s !== 'result') || (step === 'upload' && s === 'subject')
                  ? 'bg-green-200 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {i + 1}
              </div>
              <span className={`text-xs font-medium ${step === s ? 'text-green-700' : 'text-gray-400'}`}>
                {s === 'subject' ? '과목 선택' : s === 'upload' ? '사진 업로드' : '결과 확인'}
              </span>
              {i < 2 && <span className="text-gray-300 text-xs">›</span>}
            </div>
          ))}
        </div>
      )}

      {/* 콘텐츠 */}
      <div className="max-w-2xl mx-auto px-4 py-6 relative z-1">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {step === 'subject' && <SubjectSelector onSelect={handleSubjectSelect} />}

        {step === 'upload' && (
          <ImageUploader
            subject={subject}
            problemCount={problemCount}
            onProblemCountChange={setProblemCount}
            onUpload={handleUpload}
            onBack={() => setStep('subject')}
          />
        )}

        {step === 'analyze' && (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <LoadingClover className="w-32 h-32 clover-spin" />
            <p className="text-green-700 font-semibold text-lg">{loadingMsg}</p>
            <p className="text-green-400 text-sm">잠깐만 기다려주세요...</p>
            <div className="flex gap-2 mt-2">
              <span className="sparkle text-xl" style={{ animationDelay: '0s' }}>🍀</span>
              <span className="sparkle text-xl" style={{ animationDelay: '0.4s' }}>🌿</span>
              <span className="sparkle text-xl" style={{ animationDelay: '0.8s' }}>🍀</span>
            </div>
          </div>
        )}

        {step === 'result' && analysis && result && (
          <ResultView
            subject={subject}
            analysis={analysis}
            result={result}
            imagePreview={imagePreview}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}
