const mariadb = require("mysql2/promise");
const { StatusCodes } = require("http-status-codes");

const makeOrder = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Bookshop",
    dateStrings: true,
  });

  const userId = req.userId;
  const { items, delivery, totalQuantity, totalPrice, firstBookTitle } =
    req.body;

  try {
    const [rows, fields] = await conn.execute(
      "INSERT INTO delivery ( address, receiver, contact ) VALUES (?, ?, ?)",
      [delivery.address, delivery.receiver, delivery.contact]
    );

    const delivery_id = rows.insertId;

    const [rows2, fields2] = await conn.execute(
      `INSERT INTO orders (book_title, total_count, total_price, user_id, delivery_id)
      VALUES (?, ?, ?, ?, ?)`,
      [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id]
    );

    const order_id = rows2.insertId;

    // order_items 테이블에 여러 행 삽입
    const itemValues = items
      .map((item) => `(${order_id}, ${item.book_id}, ${item.amount})`)
      .join(", ");
    sql = `INSERT INTO order_items (order_id, book_id, amount) VALUES ${itemValues}`;
    const [row3, fields3] = await conn.execute(sql);

    // 카트 비우기
    const [rows4, fields4] = await conn.execute(
      `DELETE FROM cart_items WHERE user_id = ?`,
      [userId]
    );

    return res.status(StatusCodes.CREATED).json(rows4);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const getOrders = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Bookshop",
    dateStrings: true,
  });

  const { userId } = req.userId;

  try {
    const [rows, fields] = await conn.execute(
      `SELECT orders.id, book_title, total_count, total_price, created_at, address, receiver, contact FROM orders
       LEFT JOIN delivery ON orders.delivery_id = delivery.id
      WHERE user_id = ?`,
      [userId]
    );

    return res.status(StatusCodes.OK).json(rows);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const getOrderDetail = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Bookshop",
    dateStrings: true,
  });

  const { order_id } = req.params;

  try {
    const [rows, fields] = await conn.execute(
      `SELECT book_id, title, author, price, amount FROM order_items
      LEFT JOIN books ON order_items.book_id = books.id
      WHERE order_id = ?`,
      [order_id]
    );

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).end();
    }

    return res.status(StatusCodes.OK).json(rows);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = { makeOrder, getOrders, getOrderDetail };
