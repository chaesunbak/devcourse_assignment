const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/:category_id", (req, res) => {
  res.send("Categories route");
});

module.exports = router;
