const express = require("express");
const app = express();
const moment = require("moment");
const nowDate = moment();
const PORT = 3000;

const memos = [
  {
    id: 1,
    title: "샘플 메모1",
    content: "오늘 점심 뭐 먹지? 너무 더운데",
    createdAt: "2025-06-19",
  },
  {
    id: 2,
    title: "샘플 메모2",
    content: "내일 부터는 장마 시작, 주말마다 비가 오네",
    createdAt: "2025-06-19",
  },
];

// creatAt: new Date() 혹은 모먼트 인코딩 필요(moment().format("YYYY-MM-DD"))

app.use(express.json()); // 요청 본문에 json포맷인식 및 처

// 메모 목록 반환
app.get("/memos", (req, res) => {
  res.status(200).json(memos);
});

// 메모 1개 반환
app.get("/memos/:id", (req, res) => {
  const id = req.params.id;
  const memo = memos.find((m) => m.id === parseInt(id));
  if (!memo) {
    return res.status(404).json({ message: "메모를 찾을 수 없어요." });
  }
  res.json(200).json(memo);
});

// 메모 쓰기
app.post("/memos", (req, res) => {
  const { title, content } = req.body;
  const memo = {
    id: memos.length + 1,
    title,
    content,
    createdAt: moment().format("YYYY-MM-DD"),
  };
  memos.push(memo);
  res.status(200).json(memo);
});

// 메모 수정
app.put("/memos/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.memo;
  const memo = memos.find((m) => m.id === parseInt(id));
  if (!memo) {
    return res.status(404).json({ message: "메모를 찾을 수 없어요." });
  }
  memo.title = title;
  memo.content = content;
  memo.createdAt = moment().format("YYYY-MM-DD");
  res.json(200).json(memo);
});

// 메모 삭제
app.delete("/memos/:id", (req, res) => {
  const id = req.params.id;
  const index = memos.findIndex((memo) => memo.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "책을 찾을 수 없어요." });
  }
  memos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중`);
});
