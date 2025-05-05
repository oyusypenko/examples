import { GradesRepository } from "@/features/grades/repository/grades.repository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') ?? 'all';

    let data;

    switch (filter) {
      case 'class-averages':
        data = await GradesRepository.findClassAverages();
        break;

      case 'passing-average':
        data = await GradesRepository.findPassingAverages();
        break;

      case 'high-performing':
        data = await GradesRepository.findHighPerforming();
        break;

      case 'all':
      default:
        data = await GradesRepository.findAll();
        break;
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching grades:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch grades' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.class || typeof body.grade !== 'number' || body.grade < 0 || body.grade > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid grade data. Class is required and grade must be a number between 0 and 100'
        },
        { status: 400 }
      );
    }

    const validClasses = ['MATH', 'SCIENCE', 'HISTORY'];
    const classUpperCase = body.class.toUpperCase();

    if (!validClasses.includes(classUpperCase)) {
      return NextResponse.json(
        { success: false, error: 'Invalid class type. Must be one of: Math, Science, History' },
        { status: 400 }
      );
    }

    const newGrade = await GradesRepository.addGrade(body.class, body.grade);

    return NextResponse.json(
      { success: true, data: newGrade },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating grade:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create grade' },
      { status: 500 }
    );
  }
}