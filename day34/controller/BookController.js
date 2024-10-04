const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getBooks = (req, res) => {
  let { category_id } = req.query;

  if (category_id) {
    category_id = parseInt(category_id);
    const sql = `
      SELECT books.*, categories.name as category_name 
      FROM books 
      LEFT JOIN categories ON books.category_id = categories.id
      WHERE books.category_id = ?;
    `;
    conn.query(sql, [category_id], (err, results) => {
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
    return;
  }

  const sql = "SELECT * FROM books";
  conn.query(sql, (err, results) => {
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
  console.log(book_id);

  const sql = "SELECT * FROM books WHERE id = ?";
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
