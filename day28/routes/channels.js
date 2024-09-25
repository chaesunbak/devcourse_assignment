const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { param, body, validationResult } = require("express-validator");

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
  .route("/")
  // user_id를 받아서 해당 유저가 생성한 채널 전체 조회
  .get(
    [
      body("userId")
        .notEmpty()
        .isInt()
        .withMessage("유저 아이디를 숫자로 입력해주세요."),
      validate,
    ],
    (req, res) => {
      let { userId } = req.body;
      parseInt(userId);

      const sql = "SELECT * FROM channels WHERE user_id = ?";

      conn.query(sql, [userId], (err, results, fields) => {
        if (err) {
          res.status(500).json({
            errorMessage: "채널 전체 조회 중 데이터베이스 에러가 발생했습니다",
          });
          return;
        }

        if (results.length === 0) {
          res.status(404).json({
            errorMessage: "채널이 없습니다.",
          });
          return;
        }

        res.status(200).json(results);
      });
    }
  )
  //채널 개별 생성
  .post(
    [
      body("name")
        .notEmpty()
        .isString()
        .withMessage("채널 이름을 문자열로 입력해주세요"),
      body("user_id")
        .notEmpty()
        .isInt()
        .withMessage("유저 아이디를 숫자로 입력해주세요."),
      validate,
    ],
    (req, res) => {
      const { name, user_id } = req.body;

      const sql = "INSERT INTO channels (name, user_id) VALUES (?, ?)";

      conn.query(sql, [name, user_id], (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            errorMessage: "채널 생성 중 데이터베이스 에러가 발생했습니다",
          });
        }
        res.status(201).json({
          message: `${name} 채널이 생성되었습니다.`,
        });
      });
    }
  );

router
  .route("/:id")
  //채널 개별 조회
  .get(
    [
      param("id").notEmpty().withMessage("채널 아이디를 입력해주세요."),
      validate,
    ],
    (req, res) => {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        console.log(err.array());
        return res.status(400).json(err.array());
      }

      let { id } = req.params;
      id = parseInt(id);

      const sql = "SELECT * FROM channels WHERE id = ?";

      conn.query(sql, [id], (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            errorMessage: "채널 개별 조회 중 데이터베이스 에러가 발생했습니다",
          });
        }

        if (results.length === 0) {
          return res.status(400).json({
            errorMessage: "일치하는 채널이 없습니다.",
          });
        }

        res.status(200).json(results[0]);
      });
    }
  )
  //채널 개별 수정
  .put(
    [
      param("id").notEmpty().withMessage("채널 아이디를 입력해주세요."),
      body("name")
        .notEmpty()
        .isString()
        .withMessage("채널이름을 문자열로 입력해주세요"),
      validate,
    ],
    (req, res) => {
      let { id } = req.params;
      id = parseInt(id);
      const { name } = req.body;

      const sql = "UPDATE channels SET name = ? WHERE id = ?";
      conn.query(sql, [name, id], (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            errorMessage: "채널 수정 중 데이터베이스 에러가 발생했습니다",
          });
        }

        if (results.affectedRows === 0) {
          return res.status(400).json({
            errorMessage: "일치하는 채널이 없습니다.",
          });
        }

        res.status(200).json(results);
      });
    }
  )
  //채널 개별 삭제
  .delete(
    [param("id").notEmpty().withMessage("아이디를 입력해주세요."), validate],
    (req, res) => {
      let { id } = req.params;
      id = parseInt(id);

      const sql = "DELETE FROM channels WHERE id = ?";

      conn.query(sql, [id], (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            errorMessage: "채널 삭제 중 데이터베이스 에러가 발생했습니다",
          });
        }

        if (results.affectedRows === 0) {
          return res.status(400).json({
            errorMessage: "일치하는 채널이 없습니다.",
          });
        }

        res.status(200).json(results);
      });
    }
  );

module.exports = router;
