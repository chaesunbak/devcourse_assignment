const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const makeOrder = (req, res) => {
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;

  let delivery_id;
  let order_id;

  let sql =
    "INSERT INTO delivery ( address, receiver, contact ) VALUES (?, ?, ?)";
  let values = [delivery.address, delivery.receiver, delivery.contact];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    delivery_id = result.insertId;

    sql = `INSERT INTO orders (book_title, total_count, total_price, user_id, delivery_id)
        VALUES (?, ?, ?, ?, ?)`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    conn.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        return;
      }

      order_id = result.insertId;

      sql = `INSERT INTO order_items (order_id, book_id, amount) VALUES ?`;
      values = [];
      items.forEach((item) => {
        values.push([order_id, item.book_id, item.amount]);
      });
      conn.query(sql, [values], (err, result) => {
        if (err) {
          console.log(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
          return;
        }

        return res.status(StatusCodes.CREATED).json(result);
      });
    });
  });
};

const getOrders = (req, res) => {};

const getOrderDetail = (req, res) => {};

module.exports = { makeOrder, getOrders, getOrderDetail };
