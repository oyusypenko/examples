import { NextRequest, NextResponse } from 'next/server';
import { NumbersRepository } from '@/features/numbers/repository/numbers.repository';

export async function GET(request: NextRequest) {
  try {
    const numberPairs = await NumbersRepository.findNumberPairs();

    return NextResponse.json({
      success: true,
      data: numberPairs
    });
  } catch (error) {
    console.error('Error processing numbers request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (typeof body.value !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid number value' },
        { status: 400 }
      );
    }

    const newNumber = await NumbersRepository.addNumber(body.value);

    return NextResponse.json(
      { success: true, data: newNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating number:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create number' },
      { status: 500 }
    );
  }
}