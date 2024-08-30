const database = require("../client");

class AbstractRepository {
  constructor({ table }) {
    if (this.constructor === AbstractRepository) {
      throw new TypeError(
        "Abstract class 'AbstractRepository' cannot be instantiated directly"
      );
    }

    this.table = table;
    this.database = database;
  }
}

module.exports = AbstractRepository;
