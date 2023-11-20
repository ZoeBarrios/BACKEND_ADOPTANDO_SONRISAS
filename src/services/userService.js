import { client } from "../db/db.js";
export const getAll = async () => {};

export const getByUsername = async (nombre) => {
  const query = `SELECT * FROM users WHERE name = $1`;
  const { rows } = await client.query(query, [nombre]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

export const create = async (createDTO) => {};
