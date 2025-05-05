'use server';

import { GradesRepository } from '@/features/grades/repository/grades.repository';
import { revalidatePath } from 'next/cache';
import { FormState } from '../grades.types';


export async function addGrade(prevState: FormState, formData: FormData): Promise<FormState> {
  const classType = formData.get('class') as string;
  const gradeValue = formData.get('grade') as string;

  if (!classType && !gradeValue) {
    return { message: '', error: false };
  }

  if (!classType || !['Math', 'Science', 'History'].includes(classType)) {
    return {
      message: 'Please select a valid class',
      error: true
    };
  }

  const parsedGrade = parseInt(gradeValue);
  if (isNaN(parsedGrade) || parsedGrade < 0 || parsedGrade > 100) {
    return {
      message: 'Please enter a valid grade (0-100)',
      error: true
    };
  }

  try {
    const newGrade = await GradesRepository.addGrade(classType, parsedGrade);
    revalidatePath('/grades');
    return {
      message: 'Grade added successfully',
      error: false,
      success: true,
      data: newGrade
    };
  } catch (err) {
    console.error('Error adding grade:', err);
    return {
      message: 'Failed to add grade',
      error: true
    };
  }
}