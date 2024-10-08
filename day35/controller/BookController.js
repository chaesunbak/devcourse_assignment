const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getBooks = (req, res) => {
  let { category_id, isNew, limit, currentPage } = req.query;

  let sql = "SELECT * FROM books";
  let params = [];

  if (category_id && isNew) {
    sql +=
      " WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    params = [category_id, isNew];
  } else if (category_id) {
    sql += " WHERE category_id = ?";
    params = [category_id];
  } else if (isNew) {
    sql +=
      " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    params = [isNew];
  }

  limit = parseInt(limit) || 10; // 기본값 10
  currentPage = parseInt(currentPage) || 1; // 기본값 1
  const offset = (currentPage - 1) * limit;

  sql += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  conn.query(sql, params, (err, results) => {
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

const getBookById = (req, res) => {
  let { book_id } = req.params;
  book_id = parseInt(book_id);

  const sql =
    "SELECT * FROM books LEFT JOIN categories ON books.category_id = categories.id WHERE books.id = ?";
  conn.query(sql, [book_id], (err, results) => {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
      return;
    }

    if (results.length === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }
    res.status(StatusCodes.OK).send(results[0]);
  });
};

module.exports = { getBooks, getBookById };

