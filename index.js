const app = require("./app");
const dotenv = require("dotenv");

const db = require("./models");
dotenv.config({ path: "./config.env" });

db.sequelize.sync();
const PORT = process.env.PORT;
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));
