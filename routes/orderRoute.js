const express = require("express");
const { create, getAll } = require("../controllers/orderController");
const { protect } = require("../controllers/authController");
const router = express.Router();

router.post("/", protect, create);
router.get("/", protect, getAll);
module.exports = router;
