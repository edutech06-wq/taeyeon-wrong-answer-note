'use client';

import { Subject } from '@/types';

// 네잎클로버 SVG - 과목별 색상
export function SubjectClover({ subject, className = '' }: { subject: Subject; className?: string }) {
  const colors: Record<Subject, { leaf: string; center: string }> = {
    '국어': { leaf: '#f9a8d4', center: '#ec4899' },
    '영어': { leaf: '#93c5fd', center: '#3b82f6' },
    '수학': { leaf: '#fca5a5', center: '#ef4444' },
    '과학': { leaf: '#6ee7b7', center: '#10b981' },
    '역사': { leaf: '#fcd34d', center: '#f59e0b' },
  };
  const c = colors[subject];
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 왼쪽 잎 */}
      <ellipse cx="28" cy="40" rx="16" ry="12" fill={c.leaf} transform="rotate(0 28 40)" opacity="0.9" />
      {/* 오른쪽 잎 */}
      <ellipse cx="52" cy="40" rx="16" ry="12" fill={c.leaf} transform="rotate(0 52 40)" opacity="0.9" />
      {/* 위쪽 잎 */}
      <ellipse cx="40" cy="28" rx="12" ry="16" fill={c.leaf} opacity="0.9" />
      {/* 아래쪽 잎 */}
      <ellipse cx="40" cy="52" rx="12" ry="16" fill={c.leaf} opacity="0.9" />
      {/* 가운데 원 */}
      <circle cx="40" cy="40" r="8" fill={c.center} />
      {/* 줄기 */}
      <path d="M40 60 Q38 68 35 74" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
      {/* 빛 반사 */}
      <circle cx="36" cy="35" r="3" fill="white" opacity="0.4" />
    </svg>
  );
}

// 로딩용 클로버 (초록색)
export function LoadingClover({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="28" cy="40" rx="16" ry="12" fill="#4ade80" opacity="0.9" />
      <ellipse cx="52" cy="40" rx="16" ry="12" fill="#4ade80" opacity="0.9" />
      <ellipse cx="40" cy="28" rx="12" ry="16" fill="#4ade80" opacity="0.9" />
      <ellipse cx="40" cy="52" rx="12" ry="16" fill="#4ade80" opacity="0.9" />
      <circle cx="40" cy="40" r="8" fill="#16a34a" />
      <path d="M40 60 Q38 68 35 74" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="35" r="3" fill="white" opacity="0.4" />
    </svg>
  );
}

// 배경 클로버 장식 (흐릿한 여러 개)
export function BackgroundClovers() {
  const positions = [
    { x: 5, y: 8, size: 40, opacity: 0.08, rotate: 15 },
    { x: 85, y: 12, size: 55, opacity: 0.06, rotate: -20 },
    { x: 15, y: 75, size: 45, opacity: 0.07, rotate: 30 },
    { x: 80, y: 70, size: 50, opacity: 0.06, rotate: -10 },
    { x: 50, y: 5, size: 35, opacity: 0.05, rotate: 45 },
    { x: 92, y: 45, size: 40, opacity: 0.07, rotate: -35 },
    { x: 3, y: 45, size: 30, opacity: 0.06, rotate: 20 },
    { x: 60, y: 90, size: 45, opacity: 0.05, rotate: -25 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {positions.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="28" cy="40" rx="16" ry="12" fill="#15803d" />
            <ellipse cx="52" cy="40" rx="16" ry="12" fill="#15803d" />
            <ellipse cx="40" cy="28" rx="12" ry="16" fill="#15803d" />
            <ellipse cx="40" cy="52" rx="12" ry="16" fill="#15803d" />
            <circle cx="40" cy="40" r="8" fill="#166534" />
          </svg>
        </div>
      ))}
    </div>
  );
}
