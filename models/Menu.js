const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Menu = sequelize.define("Menu", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
  });

  return Menu;
};
