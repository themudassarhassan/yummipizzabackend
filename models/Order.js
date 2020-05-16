const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Order = sequelize.define("Order", {
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Order;
};
