const AbstractRepository = require("./AbstractRepository");

class TaskRepository extends AbstractRepository {
  constructor() {
    super({ table: "task" });
  }

  async readAll(userID) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where user_id = ?`,
      [userID]
    );

    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async create(task, userID) {
    const [result] = await this.database.query(
      `insert into ${this.table} (id, task, client, estimation, description, short_term, estimated_day, deadline, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        task.id,
        task.task,
        task.client,
        task.estimation,
        task.description,
        task.short_term,
        task.estimated_day,
        task.deadline,
        userID,
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
    console.info(task)
    const [result] = await this.database.query(
      `update ${this.table} set task = ?, client = ?, estimation = ?, description = ?, short_term = ?, estimated_day = ?, deadline = ? where id = ?`,

      [
        task.task,
        task.client,
        task.estimation,
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
