export type Subject = '국어' | '영어' | '수학' | '과학' | '역사';

export interface AnalysisResult {
  subject: Subject;
  topic: string;
  concepts: string[];
  summary: string;
}

export interface GeneratedProblem {
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface BlankProblem {
  sentence: string;
  blank: string;
  answer: string;
}

export interface GenerateResult {
  problems: GeneratedProblem[];
  blankProblems: BlankProblem[];
}

export type AppStep = 'subject' | 'upload' | 'analyze' | 'result';
