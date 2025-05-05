'use server';

import { revalidatePath } from 'next/cache';
import { NumbersRepository } from '@/features/numbers/repository/numbers.repository';
import { FormState } from '@/features/numbers/numbers.types';


export async function addNumber(prevState: FormState, formData: FormData): Promise<FormState> {
  const valueStr = formData.get('number') as string;
  const value = parseInt(valueStr);

  if (isNaN(value)) {
    return { message: 'Please enter a valid number', error: true };
  }

  try {
    await NumbersRepository.addNumber(value);
    revalidatePath('/numbers');
    return { message: 'Number added successfully', error: false };
  } catch (error) {
    console.error('Error adding number:', error);
    return { message: 'Error adding number', error: true };
  }
}