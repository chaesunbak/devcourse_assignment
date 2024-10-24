const express = require("express");
const router = express.Router();
const {
  join,
  login,
  passwordResetRequest,
  passwordReset,
} = require("../controller/UserController");

router.post("/join", join);

router.post("/login", login);

router.post("/reset", passwordResetRequest);

router.put("/reset", passwordReset);

module.exports = router;
