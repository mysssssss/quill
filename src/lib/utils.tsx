import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  //pdx-2 py-2 == p-2 or makes css work more intuitively
  return twMerge(clsx(inputs));
}
