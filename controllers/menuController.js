const { Menu } = require("../models");

exports.getAll = async (req, res) => {
  const menu = await Menu.findAll();

  res.status(200).json({ menu });
};
