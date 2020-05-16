const { Order, OrderItem } = require("../models");
const { catchAsync } = require("../utils/catchAsync");

exports.create = catchAsync(async (req, res) => {
  const { price, userId, items } = req.body;
  let order = await Order.create({
    price,
    UserId: userId,
  });
  order = order.toJSON();
  for (const item of items) {
    await OrderItem.create({
      name: item.name,
      quantity: item.quantity,
      OrderId: order.id,
    });
  }
  res.status(201).json({ status: "success", order });
});

exports.getAll = catchAsync(async (req, res) => {
  const orders = await Order.findAll({ include: OrderItem });
  res.status(200).json({ status: "success", orders });
});
