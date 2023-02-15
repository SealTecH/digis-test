import { FormControl } from '@angular/forms';

export interface Stock {
  enterDate: number;
  exitDate: number;
  enterPrice: number;
  exitPrice: number;
  id: string | null;
  shareId: number;
}

export interface Share {
  id: number;
  name: string;
}
export interface Balance {
  time: number,
  value: number
}

export type FormEntity<T> = {
  [K in keyof T]: FormControl<T[K] | null >
}
