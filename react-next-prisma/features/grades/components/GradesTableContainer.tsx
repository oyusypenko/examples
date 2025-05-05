'use server';

import { Suspense } from 'react';
import { GradesRepository } from '../repository/grades.repository';
import GradesTable from './GradesTable';
import { ClassAverage, EFilter, Grade } from '../grades.types';
import GradesTableSkeleton from './GradesTableSkeleton';

export default async function GradesTableContainer({ filter = EFilter.ALL }: { filter?: EFilter }) {
  let rawData;

  switch (filter) {
    case EFilter.CLASS_AVERAGES:
      rawData = await GradesRepository.findClassAverages();
      break;
    case EFilter.PASSING_AVERAGE:
      rawData = await GradesRepository.findPassingAverages();
      break;
    case EFilter.HIGH_PERFORMING:
      rawData = await GradesRepository.findHighPerforming();
      break;
    case EFilter.ALL:
    default:
      rawData = await GradesRepository.findAll();
      break;
  }

  const data = filter === EFilter.ALL
    ? rawData as Grade[]
    : (rawData as ClassAverage[]).map(item => ({
      class: item.class,
      average_grade: Number(item.average_grade)
    }));

  return (
    <Suspense fallback={<GradesTableSkeleton />}>
      <GradesTable data={data} filter={filter} />
    </Suspense>
  );
}