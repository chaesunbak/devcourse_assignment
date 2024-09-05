const express = require("express");
const app = express();

const db = new Map();

const youtuber1 = {
  channelTitle: "십오야",
  sub: "593만명",
  videoNum: "993개",
};

const youtuber2 = {
  channelTitle: "침착맨",
  sub: "227만명",
  videoNum: "6.6천개",
};

const youtuber3 = {
  channelTitle: "태오",
  sub: "54.8만명",
  videoNum: "726개",
};

db.set(1, youtuber1);
db.set(2, youtuber2);
db.set(3, youtuber3);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.json());

app.get("/youtubers/:id", (req, res) => {
  let { id } = req.params;

  id = parseInt(id);

  const youtuber = db.get(id);

  if (!youtuber) {
    res.status(404).json({
      errorMessage: "존재하지 않는 유튜버입니다.",
    });
    return;
  }

  youtuber.id = id;

  res.json(youtuber);
});

app.get("/youtubers", (req, res) => {
  if (db.size === 0) {
    res.status(404).json({
      errorMessage: "유튜버가 없습니다.",
    });
    return;
  }

  res.json(Array.from(db.values()));
});

app.post("/youtubers", (req, res) => {
  const { channelTitle, sub, videoNum } = req.body;

  if (!channelTitle) {
    res.status(400).json({
      errorMessage: "channelTitle은 입력해주세요.",
    });
    return;
  }

  const channelData = {
    channelTitle: channelTitle,
    sub: sub ?? "0명",
    videoNum: videoNum ?? "0개",
  };

  db.set(db.size + 1, channelData);

  res.status(201).json({
    message: `${req.body.channelTitle}님, 유튜버 생활을 응원합니다!`,
    data: channelData,
  });
});

app.post("/youtubers/:id", (req, res) => {
  let { id } = req.params;

  id = parseInt(id);

  const youtuber = db.get(id);
  const oldTitle = youtuber.channelTitle;

  if (!youtuber) {
    res.status(404).json({
      errorMessage: `요청하신 ${id}번은 없는 유튜버입니다.`,
    });
    return;
  }

  const newTitle = req.body.channelTitle;

  if (!newTitle) {
    res.status(400).json({
      errorMessage: "channelTitle을 입력해주세요.",
    });
    return;
  }

  db.set(id, {
    ...youtuber,
    channelTitle: newTitle,
  });

  res.status(200).json({
    message: `${oldTitle}님, 채널명이 ${newTitle}로변경되었습니다.`,
  });
});

app.delete("/youtubers/:id", (req, res) => {
  let { id } = req.params;

  id = parseInt(id);

  const youtuber = db.get(id);

  if (!youtuber) {
    res.status(404).json({
      errorMessage: `요청하신 ${id}번은 없는 유튜버입니다.`,
    });
    return;
  }

  db.delete(id);

  res.status(200).json({
    message: `${youtuber.channelTitle}님, 아쉽지만 우리 인연은 여기까지 인가요...`,
  });
});

app.delete("/youtubers", (req, res) => {
  if (db.size === 0) {
    res.status(404).json({
      errorMessage: "삭제할 유튜버가 없습니다.",
    });
    return;
  }

  db.clear();

  res.status(200).json({
    message: "전체 유튜버가 삭제되었습니다.",
  });
});
