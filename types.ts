export type QuizStepType = 'single' | 'multiple' | 'form' | 'info';

export interface Option {
  id: string;
  label: string;
  icon?: any; // Using any for Lucide icons components
}

export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  key: keyof QuizAnswers;
  type: QuizStepType;
  options?: Option[];
}

export interface QuizAnswers {
  transactionType: string;
  propertyType: string;
  bedrooms: string;
  budget: string;
  neighborhoods: string[];
  features: string[];
  timeline: string;
  name: string;
  email: string;
  phone: string;
}

// Initial state constant
export const INITIAL_ANSWERS: QuizAnswers = {
  transactionType: '',
  propertyType: '',
  bedrooms: '',
  budget: '',
  neighborhoods: [],
  features: [],
  timeline: '',
  name: '',
  email: '',
  phone: ''
};