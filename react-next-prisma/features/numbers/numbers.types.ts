export type FormState = {
  message: string;
  error: boolean;
  success?: boolean;
  data?: any;
};

export interface NumberPair {
  id_1: number;
  value_1: number;
  id_2: number;
  value_2: number;
  sum: number;
}

export interface NumberRecord {
  id: number;
  value: number;
}