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

app.use((req, res, next) => {
  console.log("나의 첫번째 미들웨이");
  next();
});

// 1. post.db 게시판 전용 테이블을 만들어야 합니다.
const create_sql = `
    create table if not exists posts (
    id integer primary key autoincrement,
    title varchar(255),
    content text,
    author varchar(100),
    createdAt datetime default current_timestamp,
    count integer default 0
    );

    create table if not exists comments (
      id integer primary key autoincrement,
      content text,
      author text,
      createdAt datetime default current_timestamp,
      postId integer,
      foreign key(postId) references posts(id) on delete cascade
    );
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
  const result = stmt.run(title, content, author); // 각 물음에 들어갈 말 순서대로 적기
  // stmt.run: UPDATE, INSERT, DELETE 실행 시 사용
  // stmt.all: SELECT * FROM TABLE or SELECT * FROM TABLE WHERE --> [] 배열로 값을 반환
  // stmt.get: SELECT * FROM TABLE LIMIT 1 ---> {} 객체로 값을 반환..
  const newPost = db
    .prepare(`select * from posts where id =?`)
    .get(result.lastInsertRowid);
  // insert into posts를 쓰면 자동 증가 된 id가 반환: lastinsertRowid
  res.status(201).json({ message: "ok", data: newPost });
});

// 전체 테이블 내용 검색
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `
        select id, title, author, createdAt, count
        from posts order by createdAt desc limit ? offset ?
    `;
  const stmt = db.prepare(sql); // 쿼리를 준비하세요
  const rows = stmt.all(limit, offset); // 쿼리를 실행하고 결과는 배열로 반환해 주세요.
  // 전체 게시글 수 조회
  const totalCount = db
    .prepare(`select count(*) as count from posts`)
    .get().count;
  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json({
    data: rows,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalCoun: totalCount,
      limit: limit,
    },
  }); // JSON.stringify({data:rows})
  // stringify: 객체를 JSON 문자열로 반환
});

// id를 통해 하나의 게시글을 검색
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let ac_sql = `update posts set count = count + 1 where id =?`; // 조회수 증가 쿼리문
  db.prepare(ac_sql).run(id);
  let sql = `
        select id, title, content, author, createdAt, count
        from posts where id = ?
    `;
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
  const updatedPost = db.prepare(`select * from posts where id =?`);
  if (!updatedPost) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }
  res.status(200).json({ message: "ok", data: updatedPost });
  // res.redirect("/posts");
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
// 답변 추가
app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { content, author } = req.body;
  // 게시글 있는 지 확인
  const post = db.prepare(`select id from posts where id =?`).get(postId); // 엉뚱한 게시글 번호인지 확인
  if (!post) {
    return res.status(404).json({ message: "게시글 찾을 수 없어요" });
  }
  // 답변 추가
  const sql = `insert into comments(postId, author, content) values(?,?,?)`;
  const result = db.prepare(sql).run(postId, author, content);
  // 신규 답변 조회 및 반환
  const newComment = db
    .prepare(`select * from comments where id =?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "ok", data: newComment });
});

//답변 목록 가져오기
app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const post = db.prepare(`select * from posts where id =?`).get(postId);
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없어요." });
  }
  const sql = `
    select id, author, content, createdAt from comments where postId = ?
    order by id desc
  `;
  const comments = db.prepare(sql).all(postId);
  res.status(200).json({
    data: comments,
    message: "ok",
  });
});

app.delete("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const comment = db
    .prepare(`select id from comments where postId =? and id=?`)
    .get(postId, commentId);
  if (!comment) {
    return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
  }
  const sql = `delete from comments where id =?`;
  db.prepare(sql).run(commentId);
  res.status(204).end();
});

// 답글 수정(부분 업데이트)
app.put("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const { author, content } = req.body;

  const comment = db
    .prepare(`select * from comments where postId =? and id=?`)
    .get(postId, commentId);
  if (!comment) {
    return res.status(404).json({ message: "댓글이 없어용" });
  }
  const newAuthor = author !== undefined ? author : comment.author;
  const newContent = content !== undefined ? content : comment.content;

  const result = db
    .prepare(`update comments set author =?, content=? where id =?`)
    .run(newAuthor, newContent, commentId);
  const updatedComment = db
    .prepare(`select * from comments where id=?`)
    .get(commentId);
  res.status(200).json({ message: "ok", data: updatedComment });
});

app.listen(PORT, () => {});
