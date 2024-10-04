const express = require("express");
const router = express.Router();

router.use(express.json());

const { getBooks, getBookById } = require("../controller/BookController");

router.get("/", getBooks);

router.get("/:book_id", getBookById);

module.exports = router;
