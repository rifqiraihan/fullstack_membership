import { pool } from "../db";

export const getArticles = async (limit?: number) => {
  const res = await pool.query(
    `SELECT * FROM articles ORDER BY created_at DESC ${limit ? "LIMIT $1" : ""}`,
    limit ? [limit] : []
  );
  return res.rows;
};
