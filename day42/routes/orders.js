const express = require("express");
const router = express.Router();
const {
  makeOrder,
  getOrders,
  getOrderDetail,
} = require("../controller/OrderController");
const verifyToken = require("../utils/verifyToken");

router.post("/", verifyToken, makeOrder);

router.get("/", verifyToken, getOrders);

router.get("/:order_id", verifyToken, getOrderDetail);

module.exports = router;
