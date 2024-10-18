const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addLike = (req, res) => {
  const userId = req.userId;
  const { book_id } = req.params;

  const sql = "INSERT INTO likes (book_id, user_id) VALUES (?, ?)";

  conn.query(sql, [book_id, userId], (err, result) => {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    if (result.affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    res.status(StatusCodes.CREATED).end();
  });
};

const removeLike = (req, res) => {
  const userId = req.userId;
  const { book_id } = req.params;

  const sql = "DELETE FROM likes WHERE book_id = ? AND user_id = ?";

  conn.query(sql, [book_id, userId], (err, result) => {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    if (result.affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    res.status(StatusCodes.NO_CONTENT).end();
  });
};

module.exports = { addLike, removeLike };
