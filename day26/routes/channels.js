const express = require("express");
const router = express.Router();
const conn = require("../mariadb");

router.use(express.json()); // JSON 타입의 데이터를 받기 위한 설정

router
  .route("/")
  //채널 전체 조회
  .get((req, res) => {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({
        errorMessage: "로그인이 필요한 페이지입니다.",
      });
      return;
    }

    conn.query("SELECT * FROM channels", (err, results, fields) => {
      res.status(200).json(results);
    });
  })
  //채널 개별 생성
  .post((req, res) => {
    const { name, user_id } = req.body;

    if (!name || !user_id) {
      res.status(400).json({
        errorMessage: "채널 이름과 유저 아이디를 모두 입력해 주세요.",
      });
      return;
    }

    conn.query(
      "INSERT INTO channels (name, user_id) VALUES (?, ?)",
      [name, user_id],
      (err, results, fields) => {
        res.status(201).json({
          message: `${name} 채널이 생성되었습니다.`,
        });
      }
    );
  });

router
  .route("/:id")
  //채널 개별 조회
  .get((req, res) => {
    let { id } = req.params;

    conn.query(
      "SELECT * FROM channels WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (results.length === 0) {
          res.status(400).json({
            errorMessage: "일치하는 채널이 없습니다.",
          });
          return;
        }

        res.status(200).json(results[0]);
      }
    );
  })
  //채널 개별 수정
  .put((req, res) => {
    let { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        errorMessage: "채널 이름을 입력해주세요.",
      });
      return;
    }

    conn.query(
      "UPDATE channels SET name = ? WHERE id = ?",
      [name, id],
      (err, results, fields) => {
        res.status(200).json({
          message: `${name} 채널이 수정되었습니다.`,
        });
      }
    );
  })
  //채널 개별 삭제
  .delete((req, res) => {
    let { id } = req.params;

    conn.query(
      "DELETE FROM channels WHERE id = ?",
      [id],
      (err, results, fields) => {
        res.status(200).json({
          message: `채널이 삭제되었습니다.`,
        });
      }
    );
  });

module.exports = router;
