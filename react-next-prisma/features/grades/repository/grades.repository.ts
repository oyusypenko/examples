import { executeQuery } from '@/lib/db';
import { Grade, ClassAverage } from "../grades.types";

export const GradesRepository = {
  async findAll(): Promise<Grade[]> {
    const query = `
      SELECT
        id,
        class::text as class,
        grade
      FROM
        grades
      ORDER BY
        id ASC
    `;

    return await executeQuery<Grade>(query);
  },

  async findClassAverages(): Promise<ClassAverage[]> {
    const query = `
      SELECT
        class::text as class,
        ROUND(AVG(grade)::numeric, 2) as average_grade
      FROM
        grades
      GROUP BY
        class
      ORDER BY
        class
    `;

    return await executeQuery<ClassAverage>(query);
  },

  async findPassingAverages(): Promise<ClassAverage[]> {
    const query = `
      SELECT
        class::text as class,
        ROUND(AVG(grade)::numeric, 2) as average_grade
      FROM
        grades
      WHERE
        grade > 55
      GROUP BY
        class
      ORDER BY
        class
    `;

    return await executeQuery<ClassAverage>(query);
  },

  async findHighPerforming(): Promise<ClassAverage[]> {
    const query = `
      SELECT
        class::text as class,
        ROUND(AVG(grade)::numeric, 2) as average_grade
      FROM
        grades
      GROUP BY
        class
      HAVING
        AVG(grade) > 70
      ORDER BY
        average_grade DESC
    `;

    return await executeQuery<ClassAverage>(query);
  },

  async addGrade(classType: string, grade: number): Promise<Grade> {
    const query = `
      INSERT INTO grades (class, grade)
      VALUES ($1::class_type, $2)
      RETURNING id, class::text as class, grade
    `;

    const result = await executeQuery<Grade>(query, [classType, grade]);
    return result[0];
  }
};