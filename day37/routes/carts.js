const express = require("express");
const router = express.Router();

const {
  addProductToCart,
  getCartItems,
  deleteCartItemByCartItemsId,
} = require("../controller/CartController");

router.use(express.json());

router.post("/", addProductToCart);

router.get("/", getCartItems);

router.delete("/:cart_items_id", deleteCartItemByCartItemsId);

// 장바구니에서 선택한 아이템 조회
// router.get("/:book_id", (req, res) => {
//   res.send("장바구니 수정");
// });

module.exports = router;
