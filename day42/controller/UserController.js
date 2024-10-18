const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const join = (req, res) => {
  const { email, password } = req.body;

  const salt = crypto.randomBytes(10).toString("base64");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 10, "sha512")
    .toString("base64");

  const sql = `INSERT INTO users (email, password, salt ) VALUES (?, ?, ?)`;
  const values = [email, hashedPassword, salt];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
      return;
    }

    if (result.affectedRows === 0) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    res.status(StatusCodes.CREATED).json(result);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  const values = [email];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }

    if (result.length === 0) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
      return;
    }

    const loginUser = result[0];

    const hashedPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 100000, 10, "sha512")
      .toString("base64");

    if (hashedPassword !== loginUser.password) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
      return;
    }

    const token = jwt.sign(
      {
        id: loginUser.id,
        email: loginUser.email,
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "1h",
        issuer: "bookshop",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
    });
    console.log(token);

    res.status(StatusCodes.OK).json(result);
  });
};

const passwordResetRequest = (req, res) => {
  const { email } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  const values = [email];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }

    const user = result[0];

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    res.status(StatusCodes.OK).json({ email: user.email });
  });
};

const passwordReset = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  const values = [email];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }

    const user = result[0];

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    const salt = crypto.randomBytes(10).toString("base64");
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 100000, 10, "sha512")
      .toString("base64");

    const sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
    const values = [hashedPassword, salt, email];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
        return;
      }

      res.status(StatusCodes.OK).end();
    });
  });
};

module.exports = { join, login, passwordResetRequest, passwordReset };
