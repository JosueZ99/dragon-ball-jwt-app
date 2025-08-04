import pool from "@/lib/database";
import { hashPassword, comparePassword } from "@/utils/password";

export class User {
  static async create({ username, email, password }) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Verificar si el usuario ya existe
      const existingUser = await client.query(
        "SELECT id FROM users WHERE email = $1 OR username = $2",
        [email, username]
      );

      if (existingUser.rows.length > 0) {
        throw new Error("El usuario o email ya existe");
      }

      // Hash de la contraseña
      const hashedPassword = await hashPassword(password);

      // Insertar nuevo usuario
      const query = `
        INSERT INTO users (username, email, password, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING id, username, email, created_at
      `;

      const values = [username, email, hashedPassword];
      const result = await client.query(query, values);

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findByUsername(username) {
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }

  static async findById(id) {
    const query =
      "SELECT id, username, email, created_at FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await comparePassword(plainPassword, hashedPassword);
  }

  static async updateLastLogin(id) {
    const query = "UPDATE users SET updated_at = NOW() WHERE id = $1";
    await pool.query(query, [id]);
  }
}
