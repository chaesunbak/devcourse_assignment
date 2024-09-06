// 유저정보 api 실습결과

const express = require("express");
const app = express();

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});

app.use(express.json()); // JSON 타입의 데이터를 받기 위한 설정

// 사용자 정보를 저장할 데이터베이스
// key: id, value: { id, password, name }
const db = new Map();

/**
 * 로그인
 */
app.post("/api/auth", (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    res.status(400).json({
      errorMessage: "아이디 또는 비밀번호가 입력되지 않았습니다.",
    });
    return;
  }

  try {
    const user = db.get(id);

    if (!user || user.password !== password) {
      res.status(400).json({
        errorMessage: "아이디 또는 비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    res.status(200).json({
      message: `${user.name}님 환영합니다.`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errorMessage: "서버 에러가 발생했습니다.",
    });
    return;
  }
});

/**
 * 회원가입
 */
app.post("/api/users", (req, res) => {
  const { id, password, name } = req.body;

  if (!id || !password || !name) {
    res.status(400).json({
      errorMessage: "아이디 패스워드 이름을 모두 입력해주세요.",
    });
    return;
  }

  if (db.has(id)) {
    res.status(400).json({
      errorMessage: "이미 존재하는 아이디입니다.",
    });
    return;
  }

  try {
    db.set(id, { id, password, name });
    res.status(201).json({
      message: `${name}님 환영합니다.`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errorMessage: "서버 에러가 발생했습니다",
    });
  }
});

app.get("/api/users", (req, res) => {
  try {
    if (db.size === 0) {
      res.status(404).send("사용자 정보가 없습니다.");
      return;
    }

    res.status(200).json(Array.from(db.values()));
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errorMessage: "서버 에러가 발생했습니다.",
    });
  }
});

app.get("/api/users/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);

  try {
    const user = db.get(id);
    console.log(user);

    if (!user) {
      res.status(404).json({
        errorMessage: "사용자 정보가 없습니다.",
      });
      return;
    }

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errorMessage: "서버 에러가 발생했습니다.",
    });
  }
});

app.delete("/api/users/:id", (req, res) => {
  let { id } = req.params;

  try {
    const user = db.get(id);

    if (!user) {
      res.status(404).json({
        errorMessage: "사용자 정보가 없습니다.",
      });
      return;
    }

    db.delete(id);
    res.status(200).json({
      message: `${user.name}님 다음에 또 만나요.`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errorMessage: "사용자 정보 삭제에 실패했습니다.",
    });
  }
});
