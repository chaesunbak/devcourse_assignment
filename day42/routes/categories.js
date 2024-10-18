const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
} = require("../controller/CategoryController");

router.use(express.json());

router.get("/", getAllCategories);

router.get("/:category_id", getCategoryById);

module.exports = router;
