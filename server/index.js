require("dotenv").config();

require("./database/client").checkConnection();

const port = process.env.APP_PORT;

const app = require("./app/config");

app
  .listen(port, () => console.info(`server listening on port ${port}`))
  .on("error", (err) => {
    console.error("Error :", err.message);
  });
