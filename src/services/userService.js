import { client } from "../config/db.js";
export const getAll = async () => {};

export const getByUsername = async (nombre) => {
  const query = `SELECT * FROM users WHERE name = $1`;
  const { rows } = await client.query(query, [nombre]);
  if (rows.length === 0) {
    return null;
  }
  const role = await client.query(`SELECT role_name FROM roles WHERE id = $1`, [
    rows[0].role,
  ]);
  rows[0].role = role.rows[0].role_name;
  return rows[0];
};

export const create = async (createDTO) => {};
