const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getAllCategories = (req, res) => {
  const sql = "SELECT * FROM categories";
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

const getCategoryById = (req, res) => {
  let { category_id } = req.params;
  category_id = parseInt(category_id);
  console.log(category_id);

  const sql = "SELECT * FROM categories WHERE id = ?";
  conn.query(sql, [category_id], (err, results) => {
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

module.exports = { getAllCategories, getCategoryById };
