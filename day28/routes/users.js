const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { param, body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.use(express.json()); // JSON 타입의 데이터를 받기 위한 설정

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    return next(); // 다음 할 일이 있으면 다음으로 넘어가고, 없으면 끝
  }
  console.log(err.array());
  return res.status(400).json(err.array());
};

router
  .route("/login")
  .post(
    [
      body("email")
        .notEmpty()
        .isString()
        .isEmail()
        .withMessage("이메일을 입력해주세요."),
      body("password")
        .notEmpty()
        .isString()
        .withMessage("비밀번호를 입력해주세요."),
      validate,
    ],
    (req, res) => {
      const { email, password } = req.body;

      const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

      conn.query(sql, [email, password], (err, results, fields) => {
        if (err) {
          res.status(500).json({
            errorMessage: "로그인 중 데이터베이스 에러가 발생했습니다.",
          });
          return;
        }
        let loginUser = results[0];
        if (!loginUser || loginUser.password !== password) {
          res.status(403).json({
            errorMessage: "이메일 또는 비밀번호가 일치하지 않습니다.",
          });
          return;
        }

        // 토큰 생성
        const token = jwt.sign(
          { email: loginUser.email, name: loginUser.name },
          process.env.PRIVATE_KEY,
          {
            expiresIn: "1h",
            issuer: "chae",
          }
        );

        res.cookie("token", token, {
          httpOnly: true,
        });

        res.status(200).json({
          message: `${loginUser.name}님 로그인이 완료되었습니다.`,
        });
      });
    }
  );

router
  .route("/")
  .post(
    [
      body("email")
        .notEmpty()
        .isString()
        .isEmail()
        .withMessage("이메일을 입력해주세요"),
      body("password")
        .notEmpty()
        .isString()
        .withMessage("비밀번호를 입력해주세요"),
      body("name").notEmpty().isString().withMessage("이름을 입력해주세요"),
      body("contact")
        .notEmpty()
        .isString()
        .withMessage("연락처를 입력해주세요"),
      validate,
    ],
    (req, res) => {
      const { email, password, name, contact } = req.body;

      const sql =
        "INSERT INTO users (email, password, name, contact) VALUES (?, ?, ?, ?)";

      conn.query(
        sql,
        [email, password, name, contact],
        (err, results, fields) => {
          if (err) {
            res.status(500).json({
              errorMessage: "회원가입 중 데이터베이스 에러가 발생했습니다.",
            });
            return;
          }

          res.status(201).json({
            message: `${name}님 회원가입이 완료되었습니다.`,
          });
        }
      );
    }
  )
  .get((req, res) => {
    const sql = "SELECT * FROM users";

    conn.query(sql, (err, results, fields) => {
      if (err) {
        res.status(500).json({
          errorMessage: "사용자 전체 조회 중 데이터베이스 에러가 발생했습니다.",
        });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({
          errorMessage: "사용자가 없습니다.",
        });
        return;
      }
      res.status(200).json(results);
    });
  });

router
  .route("/:email")
  .get(
    [param("email").notEmpty().isString().isEmail().withMessage(), validate],
    (req, res) => {
      const { email } = req.params;

      const sql = "SELECT * FROM users WHERE email = ?";

      conn.query(sql, email, (err, results, fields) => {
        if (err) {
          res.status(500).json({
            errorMessage:
              "사용자 개별 조회 중 데이터베이스 에러가 발생했습니다.",
          });
          return;
        }

        if (results.length === 0) {
          res.status(404).json({
            errorMessage: "사용자가 없습니다.",
          });
          return;
        }

        res.status(200).json(results[0]);
      });
    }
  )
  .delete(
    [
      param("email")
        .notEmpty()
        .isString()
        .isEmail()
        .withMessage("이메일을 입력해주세요"),
      validate,
    ],
    (req, res) => {
      const { email } = req.params;

      const sql = "DELETE FROM users WHERE email = ?";
      conn.query(sql, email, (err, results, fields) => {
        if (err) {
          res.status(500).json({
            errorMessage: "사용자 삭제 중 데이터베이스 에러가 발생했습니다.",
          });
          return;
        }
        if (results.affectedRows === 0) {
          res.status(404).json({
            errorMessage: "삭제할 사용자가 없습니다.",
          });
          return;
        }
        res.status(200).json({
          message: `${email}님의 회원정보가 삭제되었습니다.`,
        });
      });
    }
  );

module.exports = router;
