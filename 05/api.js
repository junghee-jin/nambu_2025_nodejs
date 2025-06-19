const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

// DB setting
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);

// express 설정
const app = express();
const PORT = 3000;
app.use(express.json());

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
db.exec(create_sql);

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `
        insert into posts(title, content, author)
        values(?, ?, ?)
    `;
  db.prepare(sql).run(title, content, author); // 각 물음에 들어갈 말
  res.status(201).json({ message: "ok" });
});

app.get("/posts", (req, res) => {
  let sql = `
        select id, title, content, author, createAt
        from posts order by createAt desc    
    `;
  const stmt = db.prepare(sql); // 쿼리를 준비하세요
  const rows = stmt.all(); // 쿼리를 날려주세요
  console.log(rows);
  res.status(200).json({ data: rows });
});

// server start
app.listen(PORT, () => {});
