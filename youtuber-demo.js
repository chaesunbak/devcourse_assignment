const express = require('express')
const app = express()

const db = new Map();

const youtuber1 = {
    channelTitle : "십오야",
    sub : "593만명",
    videoNum: "993개"
};

const youtuber2 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum: "6.6천개"
};

const youtuber3 = {
    channelTitle : "태오",
    sub : "54.8만명",
    videoNum: "726개"
};

db.set(1, youtuber1);
db.set(2, youtuber2);
db.set(3, youtuber3);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use(express.json());

app.get('/youtubers/:id', function (req, res) {

  const id = req.params.id;

  id = parseInt(id);

  const youtuber = db.get(id);

  if (!youtuber){
    res.status(404).json({
      errorMessage: "존재하지 않는 유튜버입니다."
    });
    return;
  }

  youtuber.id = id;

  res.json(youtuber);

})

app.get('/youtubers', function (req, res) {

  res.json(Array.from(db.values()));
});

app.post('/youtubers', function (req, res) {

  if(req.body.channelTitle === undefined){
    res.status(400).json({
      errorMessage: "channelTitle은 입력해주세요."
    });
    return;
  }

  const channelData = {
    channelTitle : req.body.channelTitle,
    sub : req.body.sub ?? "0명",
    videoNum: req.body.videoNum ?? "0개"
  }

  db.set(db.size + 1, channelData);

  res.status(201).json({
    message: `${req.body.channelTitle}님, 유튜버 생활을 응원합니다!`,
    data: channelData
  });
})

