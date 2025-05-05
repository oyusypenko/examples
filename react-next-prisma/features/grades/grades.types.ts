export type FormState = {
  message: string;
  error: boolean;
  success?: boolean;
  data?: any;
};

export enum EFilter {
  ALL = 'all',
  CLASS_AVERAGES = 'class-averages',
  PASSING_AVERAGE = 'passing-average',
  HIGH_PERFORMING = 'high-performing'
}

export interface Grade {
  id: number;
  class: string;
  grade: number;
}

export interface ClassAverage {
  class: string;
  average_grade: number;
}