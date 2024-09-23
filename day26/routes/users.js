const express = require("express");
const router = express.Router();
const conn = require("../mariadb");

router.use(express.json()); // JSON 타입의 데이터를 받기 위한 설정

// 사용자 정보를 저장할 데이터베이스
// key: id, value: { id, password, name }
const db = new Map();

/**
 * 로그인
 */
router.post("/auth", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      errorMessage: "이메일과 비밀번호를 모두 입력해 주세요.",
    });
    return;
  }

  conn.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results, fields) => {
      let loginUser = results[0];
      if (!loginUser || loginUser.password !== password) {
        res.status(404).json({
          errorMessage: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
        return;
      }

      res.status(200).json(loginUser);
    }
  );
});

/**
 * 회원가입
 */
router.post("/", (req, res) => {
  const { email, password, name, contact } = req.body;

  if (!email || !password || !name || !contact) {
    res.status(400).json({
      errorMessage: "이메일 패스워드 이름 연락처를 모두 입력해주세요.",
    });
    return;
  }

  try {
    conn.query(
      "INSERT INTO users (email, password, name, contact) VALUES (?, ?, ?, ?)",
      [email, password, name, contact],
      (err, results, fields) => {
        res.status(201).json({
          message: `${name}님 환영합니다.`,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errorMessage: "서버 에러가 발생했습니다",
    });
  }
});

router.get("/", (req, res) => {
  conn.query("SELECT * FROM users", (err, results, fields) => {
    res.status(200).json(results);
  });
});

router.get("/:email", (req, res) => {
  let { email } = req.params;

  try {
    const user = conn.query(
      `SELECT * FROM users WHERE email = ${email}`,
      (err, results, fields) => {
        if (results.length === 0) {
          res.status(404).json({
            errorMessage: "사용자 정보가 없습니다.",
          });
          return;
        }
        res.status(200).json(results);
      }
    );
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errorMessage: "서버 에러가 발생했습니다.",
    });
  }
});

router.delete("/:email", (req, res) => {
  let { email } = req.params;

  conn.query(
    `DELETE FROM users WHERE id = ?`,
    email,
    (err, results, fields) => {
      res.status(200).json({
        results,
      });
    }
  );
});

module.exports = router;
