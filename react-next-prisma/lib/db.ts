import { Pool, PoolClient } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'postgres',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  // Pool configuration
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxUses: 7500,
});

pool.on('connect', () => {
  console.log('Database pool connection established');
});

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
});

/**
 * Execute a SQL query using a connection from the pool
 * @param query SQL query string
 * @param params Query parameters
 * @returns Query result
 */
export async function executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
  let client: PoolClient | null = null;

  try {
    client = await pool.connect();

    const result = await client.query(query, params);

    return result.rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

export { pool };