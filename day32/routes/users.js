const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/join", (req, res) => {
  res.send("Login route");
});

router.post("/login", (req, res) => {
  res.send("Login route");
});

router.post("/reset", (req, res) => {
  res.send("Reset route");
});

router.put("/reset", (req, res) => {
  res.send("Reset route");
});

module.exports = router;
