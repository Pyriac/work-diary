require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const schema = path.join(__dirname, "..", "database", "schema.sql");

const mysql = require("mysql2/promise");

const migrate = async () => {
  try {
    const sql = fs.readFileSync(schema, "utf8");

    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });

    await database.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);
    await database.query(`CREATE DATABASE ${DB_NAME}`);
    await database.query(`USE ${DB_NAME}`);
    await database.query(sql);

    database.end();

    console.info(`${DB_NAME} updated from '${path.normalize(schema)}' 🕵️‍♂️`);
  } catch (err) {
    console.error(`⛔ Error updating the database`, err.message, err.stack);
  }
};

migrate();
