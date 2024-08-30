require("dotenv").config();

const port = process.env.APP_PORT;

const app = require("./app/config");

app.listen(port, () => console.info(`server listening on port ${port}`));
