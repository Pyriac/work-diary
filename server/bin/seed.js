require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");

const database = require("../database/client");

const fixtures = path.join(__dirname, "..", "database", "fixtures");

const seed = async () => {
  try {
    const dependencyMap = {};

    fs.readdirSync(fixtures)
      .filter((filePath) => !filePath.startsWith("Abstract"))
      .forEach((filePath) => {
        const SeederClass = require(path.join(fixtures, filePath));

        const seeder = new SeederClass();

        dependencyMap[SeederClass] = seeder;
      });

    const sortedSeeders = [];

    const solveDependencies = (n) => {
      n.dependencies.forEach((DependencyClass) => {
        const dependency = dependencyMap[DependencyClass];

        if (!sortedSeeders.includes(dependency)) {
          solveDependencies(dependency);
        }
      });

      if (!sortedSeeders.includes(n)) {
        sortedSeeders.push(n);
      }
    };

    Object.values(dependencyMap).forEach((seeder) => {
      solveDependencies(seeder);
    });

    const doTruncate = async (stack) => {
      if (stack.length === 0) {
        return;
      }

      const firstOut = stack.pop();

      await database.query(`delete from ${firstOut.table}`);

      await doTruncate(stack);
    };

    await doTruncate([...sortedSeeders]);

    const doRun = async (queue) => {
      if (queue.length === 0) {
        return;
      }

      const firstOut = queue.shift();

      firstOut.run();

      await Promise.all(firstOut.promises);

      await doRun(queue);
    };

    await doRun(sortedSeeders);

    database.end();

    console.info(
      `${database.databaseName} filled from '${path.normalize(fixtures)}' 🌱`
    );
  } catch (err) {
    console.error("Error filling the database:", err.message, err.stack);
  }
};

seed();
