const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  res.send("Books route");
});

router.get("/:book_id", (req, res) => {
  res.send("Books route");
});

module.exports = router;
