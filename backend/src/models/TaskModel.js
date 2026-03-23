import db from "../config/database.js";

class Task {
  async create(userId, title, type, status, description, priority) {
    const query =
      "INSERT INTO tasks (user_id, title, type, status, description, priority) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

    const values = [userId, title, type, status, description, priority];
    const result = await db.query(query, values);

    return result.rows[0];
  }

  async findByUserId(id) {
    const result = await db.query("SELECT * FROM tasks WHERE user_id = $1", [id]); 
    return result.rows;
  }

  async findTaskById(id) {
    const result = await db.query("SELECT * FROM tasks WHERE id = $1", [id]); 
    return result.rows[0];
  }

  async delete(id) {
    const result = await db.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]); 
    return result.rows[0];
  }

  async updateStatus(status, idTask) {
    const query = "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *";
    const values = [status, idTask];

    const result = await db.query(query, values);
    
    return result.rows[0];
  }
}

export default Task;