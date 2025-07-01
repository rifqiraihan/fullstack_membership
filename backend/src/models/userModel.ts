import { pool } from "../db";

export const findUserByEmail = async (email: string) => {
  const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
};

export const createUser = async (
    name: string,
    email: string,
    hashedPassword: string,
    provider = "local",
    membership_type = "A"
  ) => {
    const res = await pool.query(
      `INSERT INTO users (name, email, password, provider, membership_type)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, hashedPassword, provider, membership_type]
    );
    return res.rows[0];
  };
  