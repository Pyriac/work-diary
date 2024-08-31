/* ************************************************************************* */
// Import repository module
/* ************************************************************************* */
const TaskRepository = require("./models/TaskRepository");
/* ************************************************************************* */
const tables = {};
/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */
tables.task = new TaskRepository();
/* ************************************************************************* */

module.exports = new Proxy(tables, {
  get(obj, prop) {
    if (prop in obj) return obj[prop];
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
