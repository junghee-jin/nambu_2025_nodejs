const express = require("express"); // express 모듈 임포트
const moment = require("moment"); // 날짜 모듈 임포트
const Database = require("better-sqlite3"); // sqllite3 모듈 임포트
const path = require("path"); // 경로 모듈 임포트

// DB setting
const db_name = path.join(__dirname, "post.db"); // sqllite 용 데이터베이스 파일
const db = new Database(db_name); // better-sqllite3의 데이터베이스를 생성(with db파일)

// express 설정
const app = express(); // app 이란 변수에 express 함수를 담습니다. app변수를 이용해서 express 기능 사용
const PORT = 3000; // 포트 설정
app.use(express.json()); // app.use 미들웨어를 설정. 모든 요청과 응답에 json포맷을 사용

// 1. post.db 게시판 전용 테이블을 만들어야 합니다.
const create_sql = `
    create table if not exists posts (
    id integer primary key autoincrement,
    title varchar(255),
    content text,
    author varchar(100),
    createAt datetime default current_timestamp,
    count integer default 0
    )
`;
db.exec(create_sql); // exec sql을 실행.

// 게시글 하나 입력 // app post 요청을 처리 http://my-url/posts Post로 처리 핸들러 함수 실행
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body; // 요청 본문에서 title, content, author을 꺼낸다: json 포맷
  let sql = `
        insert into posts(title, content, author)
        values(?, ?, ?)
    `;
  // let sql2 = `insert into posts(title, content, author) values(`${})`;
  const stmt = db.prepare(sql);
  // 문자열 sql 실제 쿼리문으로 파싱. // 재활용성 극대화
  stmt.run(title, content, author); // 각 물음에 들어갈 말 순서대로 적기
  // stmt.run: UPDATE, INSERT, DELETE 실행 시 사용
  // stmt.all: SELECt * FROM TABLE or SELECT * FROM TABLE WHERE --> [] 배열로 값을 반환
  // stmt.get: SELECT * FROM TABLE LIMIT 1 ---> {} 객체로 값을 반환..
  res.status(201).json({ message: "ok" });
});

// 전체 테이블 내용 검색
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `
        select id, title, author, createAt, count
        from posts order by createAt desc limit ? offset ?
    `;
  const stmt = db.prepare(sql); // 쿼리를 준비하세요
  const rows = stmt.all(limit, offset); // 쿼리를 실행하고 결과는 배열로 반환해 주세요.
  console.log(rows);
  res.status(200).json({ data: rows }); // JSON.stringify({data:rows})
  // stringify: 객체를 JSON 문자열로 반환
});

// id를 통해 하나의 게시글을 검색
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createAt, count
        from posts where id = ?
    `;
  let ac_sql = `update posts set count = count + 1 where id =?`; // 조회수 증가 쿼리문
  db.prepare(ac_sql).run(id);
  const stmt = db.prepare(sql); // select 쿼리문이 준비 완료
  const post = stmt.get(id); // {} 게시글 객체로 반환
  res.status(200).json({ data: post }); // 제이슨 문자열로 리턴
});

// 게시글 수정
// http://localhost:3000/posts?key=
app.put("/posts/:id", (req, res) => {
  const id = req.params.id; // 수정할 게시글 파람에서 가져오기
  const { title, content } = req.body; // 수정할 내용 본문에서 가져오기
  let sql = `
    update posts set title =?, content =? where id =?
  `;
  const stmt = db.prepare(sql);
  stmt.run(title, content, id); // 실제 쿼리문 데이터베이스 실행
  res.redirect("/posts");
  // res.status(201).json({ message: "ok" }); 원래는 이것 사용
});

// http://localhost:3000/posts/2 DELETE
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; // 삭제할 게시글 아이디 가지고오고
  let sql = `               
    delete from posts where id = ?
  `; // 쿼리문을 만들어서
  const stmt = db.prepare(sql); // 쿼리문을 준비시키고
  stmt.run(id); // 쿼리문을 실행합니다.
  res.json({ message: "ok" }); // 응답을 줍니다.
});

// server start
// 실행: npx nodemon api.js
app.listen(PORT, () => {});
