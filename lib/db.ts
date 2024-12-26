import mysql from 'mysql2/promise'
import { RowDataPacket } from 'mysql2'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export async function query<T extends RowDataPacket[]>(
  sql: string, 
  params: (string | number)[] = []
): Promise<T> {
  const [rows] = await pool.execute<T>(sql, params)
  return rows
}

export default pool 