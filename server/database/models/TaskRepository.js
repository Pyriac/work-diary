const AbstractRepository = require("./AbstractRepository");

class TaskRepository extends AbstractRepository {
  constructor() {
    super({ table: "task" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async create(task) {
    const [result] = await this.database.query(
      `insert into ${this.table} (task, client, description, short_term, estimated_day, deadline) values (?, ?, ?, ?, ?, ?)`,
      [
        task.task,
        task.client,
        task.description,
        task.short_term,
        task.estimated_day,
        task.deadline,
      ]
    );
    return result.insertId;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result.affectedRows;
  }

  async update(task) {
    const [result] = await this.database.query(
      `update ${this.table} set task = ?, client = ?, description = ?, short_term = ?, estimated_day = ?, deadline = ? where id = ?`,

      [
        task.task,
        task.client,
        task.description,
        task.short_term,
        task.estimated_day,
        task.deadline,
        task.id,
      ]
    );
    return result.affectedRows;
  }
}

module.exports = TaskRepository;
