const { Sequelize } = require("sequelize");
const dbconfig = require("../db.config");

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
});

sequelize
  .authenticate()
  .then(() => console.log("database connected"))
  .catch((e) => console.log(e));

const db = {};

db.sequelize = sequelize;

db.Order = require("./Order")(sequelize);
db.User = require("./User")(sequelize);
db.Menu = require("./Menu")(sequelize);
db.OrderItem = require("./OrderItem")(sequelize);
db.User.hasMany(db.Order);
db.Order.hasMany(db.OrderItem);
module.exports = db;
