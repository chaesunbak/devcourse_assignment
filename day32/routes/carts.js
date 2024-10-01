const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/", (req, res) => {
  res.send("장바구니 담기");
});

router.get("/", (req, res) => {
  res.send("장바구니 조회");
});

router.delete("/:book_id", (req, res) => {
  res.send("장바구니 삭제");
});

// 장바구니에서 선택한 아이템 조회
// router.get("/:book_id", (req, res) => {
//   res.send("장바구니 수정");
// });

module.exports = router;
