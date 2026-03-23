import db from "../config/database.js";

class User {
  async create(name, email, password) {
    const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, email, password];

    const result = await db.query(query, values);

    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    return result.rows[0];
  }

  async findById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    return result.rows[0];
  }
}

export default User;