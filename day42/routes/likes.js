const express = require("express");
const router = express.Router();
const { addLike, removeLike } = require("../controller/LikeController");
const verifyToken = require("../utils/verifyToken");

router.post("/:book_id", verifyToken, addLike);

router.delete("/:book_id", verifyToken, removeLike);

module.exports = router;
