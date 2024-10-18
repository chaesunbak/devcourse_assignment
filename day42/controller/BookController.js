const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const getBooks = (req, res) => {
  let { category_id, page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);
  const offset = (page - 1) * limit;

  // 총 책 수를 계산하는 쿼리
  const paginationQuery = `
    SELECT COUNT(*) as total 
    FROM books 
    ${category_id ? "WHERE category_id = ?" : ""}
  `;

  // 책 목록을 조회하는 쿼리
  const booksQuery = `
    SELECT books.*, category_name 
    FROM books 
    LEFT JOIN categories ON books.category_id = categories.id
    ${category_id ? "WHERE books.category_id = ?" : ""}
    LIMIT ? OFFSET ?;
  `;

  const queryParams = category_id
    ? [category_id, limit, offset]
    : [limit, offset];

  // 총 책 수를 계산하는 쿼리 실행
  conn.query(
    paginationQuery,
    category_id ? [category_id] : [],
    (err, countResults) => {
      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
        return;
      }

      const totalBooks = countResults[0].total;
      const totalPages = Math.ceil(totalBooks / limit);

      // 책 목록을 조회하는 쿼리 실행
      conn.query(booksQuery, queryParams, (err, results) => {
        if (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
          return;
        }

        if (results.length === 0) {
          res.status(StatusCodes.NOT_FOUND).end();
          return;
        }

        res.status(StatusCodes.OK).send({
          books: results,
          pagination: {
            totalBooks,
            totalPages,
            currentPage: page,
            pageSize: limit,
          },
        });
      });
    }
  );
};

const getBookById = (req, res) => {
  let { book_id } = req.params;
  const token = req.cookies.token;

  let userId = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      userId = decoded.id;
    } catch (err) {
      // 토큰이 유효하지 않은 경우, userId를 null로 설정
      userId = null;
    }
  }

  const sql = `
    SELECT 
      books.*, 
      (SELECT count(*) FROM likes WHERE likes.book_id = ?) AS like_count,
      (SELECT EXISTS (SELECT * FROM likes WHERE likes.book_id = ? AND user_id = ?)) AS liked
    FROM books
    LEFT JOIN categories ON books.category_id = categories.id
    WHERE books.id = ?
  `;

  conn.query(sql, [book_id, book_id, userId, book_id], (err, results) => {
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
