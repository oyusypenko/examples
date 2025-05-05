import { executeQuery } from '@/lib/db';
import { NumberRecord } from "../numbers.types";
import { NumberPair } from "../numbers.types";

export const NumbersRepository = {
  async findNumberPairs(): Promise<NumberPair[]> {
    const query = `
      SELECT
        n1.id AS id_1,
        n1.value AS value_1,
        n2.id AS id_2,
        n2.value AS value_2,
        n1.value + n2.value AS sum
      FROM
        numbers n1
      JOIN
        numbers n2 ON n1.id + 1 = n2.id
      ORDER BY
        n1.id
    `;

    return await executeQuery<NumberPair>(query);
  },

  async addNumber(value: number): Promise<NumberRecord> {
    const query = `
      INSERT INTO numbers (value)
      VALUES ($1)
      RETURNING id, value
    `;

    const result = await executeQuery<NumberRecord>(query, [value]);
    return result[0];
  }
};