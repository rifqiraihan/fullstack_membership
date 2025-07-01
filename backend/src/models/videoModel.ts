import { pool } from "../db";

export const getVideos = async (limit?: number) => {
  const res = await pool.query(
    `SELECT * FROM videos ORDER BY created_at DESC ${limit ? "LIMIT $1" : ""}`,
    limit ? [limit] : []
  );
  return res.rows;
};
