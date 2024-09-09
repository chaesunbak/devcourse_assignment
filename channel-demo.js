const express = require("express");
const app = express();

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});

app.use(express.json()); // JSON 타입의 데이터를 받기 위한 설정

// 채널 정보를 저장할 데이터베이스
// key: id, value: { channelTitle }
const db = new Map();

app
  .route("/api/channels")
  //채널 전체 조회
  .get((req, res) => {
    const channelList = Array.from(db.values());

    res.status(200).json(channelList);
  })
  //채널 개별 생성
  .post((req, res) => {
    const { channelTitle } = req.body;

    if (!channelTitle) {
      res.status(400).json({
        errorMessage: "채널 이름을 입력해 주세요.",
      });
      return;
    }

    db.set(db.size + 1, {
      id: db.size + 1,
      channelTitle,
    });

    res.status(200).json({
      message: `${channelTitle} 채널이 생성되었습니다.`,
    });
  });

app
  .route("/api/channels/:id")
  //채널 개별 조회
  .get((req, res) => {
    let { id } = req.params;

    const channel = db.get(Number(id));

    if (!channel) {
      res.status(400).json({
        errorMessage: "일치하는 채널이 없습니다.",
      });
      return;
    }

    res.status(200).json(channel);
  })
  //채널 개별 수정
  .put((req, res) => {
    let { id } = req.params;
    const { channelTitle } = req.body;

    const channel = db.get(Number(id));

    if (!channel) {
      res.status(400).json({
        errorMessage: "채널 정보를 찾을 수 없습니다.",
      });
      return;
    }

    db.set(Number(id), {
      ...channel,
      channelTitle,
    });

    res.status(200).json({
      message: `${channel.channelTitle}이 ${channelTitle}으로 수정되었습니다.`,
    });
  })
  //채널 개별 삭제
  .delete((req, res) => {
    let { id } = req.params;

    const channel = db.get(Number(id));

    if (!channel) {
      res.status(400).json({
        errorMessage: "일치하는 채널이 없습니다.",
      });
      return;
    }

    db.delete(Number(id));

    res.status(200).json({
      message: `${channel.channelTitle} 채널이 삭제되었습니다.`,
    });
  });
