const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addProductToCart = (req, res) => {
  const userId = req.userId;
  const { book_id, amount } = req.body;

  const sql = `INSERT INTO cart_items (book_id, amount, user_id) VALUES (?, ?, ?)`;
  const params = [book_id, amount, userId];
  conn.query(sql, params, (err, results) => {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
      return;
    }
    res.status(StatusCodes.CREATED).send(results);
  });
};

const getCartItems = (req, res) => {
  const userId = req.userId;
  const { selected } = req.body;

  const sql = `SELECT cart_items.id, book_id, title, summary, amount, price 
               FROM cart_items 
               LEFT JOIN books ON cart_items.book_id = books.id 
               WHERE user_id = ? AND cart_items.id IN (?)`;

  conn.query(sql, [userId, selected], (err, results) => {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
      return;
    }

    if (results.length === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    res.status(StatusCodes.OK).send(results);
  });
};

const deleteCartItemByCartItemsId = (req, res) => {
  const { cart_items_id } = req.params;
  const sql = `DELETE FROM cart_items WHERE id = ?`;

  conn.query(sql, [cart_items_id], (err, results) => {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
      return;
    }

    if (results.affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    res.status(StatusCodes.NO_CONTENT).end();
  });
};

module.exports = {
  addProductToCart,
  getCartItems,
  deleteCartItemByCartItemsId,
};
