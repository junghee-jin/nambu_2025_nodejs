const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  { id: 1, title: "Node.js 교과서", author: "정희진" },
  { id: 2, title: "한눈에 보는 Node.js", author: "정희진" },
  { id: 3, title: "Node.js 디자인 패턴", author: "정희진" },
];

app.use(express.json()); // 미들웨어, 응답과 요청 시에 Json을 처리 담당
// 책 목록 반환
app.get("/books", (req, res) => {
  res.json(books);
});
// http://localhost:3000/books/1, http://localhost:3000/books/2
app.get("/books/:id", (req, res) => {
  // id 가 바뀌는 게 가능하기 때문에 동적 라우팅이라고 함
  const id = req.params.id; // 문자열
  const book = books.find((b) => b.id === parseInt(id)); // 타입이랑 값이 동일해야 함
  if (!book) {
    return res.status(404).json({ message: "책을 찾을 수 없어요." });
  }
  res.json(book); // status200 응답코드는 정상 코드라는 의미
});

app.post("/books", (req, res) => {
  const { title, author } = req.body; // 요청 본문에서 title, author를 추출
  const book = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(book); // 배열에 book 객체 추가
  res.status(201).json(book);
});

// http://locahost:3000/books/1
app.put("/books/:id", (req, res) => {
  // 통신 시작
  const id = req.params.id; // 해당 정보를 어떻게 가져올 지 설정
  const { title, author } = req.body; // 어떤 식(속성 수정)으로 수정해야 하는 지 형식
  const book = books.find((book) => book.id === parseInt(id));
  if (!book) {
    return res.status(404).json({ error: "책을 찾을 수 없습니다." });
  }
  book.title = title;
  book.author = author;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "책을 찾을 수 없어요." });
  }
  books.splice(index, 1);
  res.status(204).send();
  // 204 의미는 No Content 요청은 성공했지만 너에게 줄 컨텐츠는 없어
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중`);
});
