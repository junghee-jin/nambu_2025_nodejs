const { ok } = require("assert");
const Database = require("better-sqlite3");
const express = require("express");
const moment = require("moment");
const path = require("path");

// db setting
const db_name = path.join(__dirname, "expense.db");
console.log(db_name);
const db = new Database(db_name);

// express setting
const app = express();
const PORT = 3000;
app.use(express.json()); // 미들웨어: 전체 엔드포인트에 특정 기능 일괄적용

const create_sql = `
    create table if not exists expenses (
    id integer primary key autoincrement,
    title text not null,
    amount integer not null,
    date text not null,
    memo text
    )
`;
db.exec(create_sql);

// 가게부 입력 PORT / expenses
app.post("/expenses", (req, res) => {
  const { title, amount, date, memo } = req.body;
  let sql = `
    insert into expenses(title, amount, date, memo)
    values(?, ?, ?, ?)
  `;
  const stmt = db.prepare(sql);
  stmt.run(title, amount, date, memo);
  res.status(200).json({ message: "ok" });
});

// 가게부 목록 조회 GET / expenses
app.get("/expenses", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `
        select id, title, amount, date, memo
        from expenses order by date desc limit ? offset ?
    `;
  const stmt = db.prepare(sql);
  const rows = stmt.all(limit, offset);
  console.log(rows);
  res.status(200).json({ data: rows });
});

// 가게부 목록 날짜별 조회 GET / expenses/2025-06-23 --> 해당 날짜의 내용만 가져오도록
app.get("/expenses/:date", (req, res) => {
  const date = req.params.date;
  let ac_sql = "update expenses set count = count + 1 where id = ?";
  db.prepare(ac_sql).run(id);
  let sql = `
        select id, title, amount, date, memo
        from expenses where date = ?
    `;
  const stmt = db.prepare(sql);
  const expense = stmt.get(date);
  res.status(200).json({ data: expense });
});

// 가게부 수정  PUT / expenses/id --> 금액 수정, 항목수정
app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const { title, amount, date, memo } = req.body;
  let sql = `
    update expenses set title =?, amount =?, date =?, memo =? 
    where id =?
  `;
  const stmt = db.prepare(sql);
  stmt.run(title, amount, date, memo, id);
  res.redirect("/expenses");
});

// 가게부 삭제 DELETE / expensesid --> 가게부의 해당 항목 삭제
app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        delete from expenses where id = ?
    `;
  const stmt = db.prepare(sql);
  stmt.run(id);
  res.json({ message: "ok" });
});

app.listen(PORT, () => {});
