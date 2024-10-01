const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/:book_id", (req, res) => {
  res.send("Likes rotue");
});

router.delete("/:book_id", (req, res) => {
  res.send("Likes route");
});

module.exports = router;
