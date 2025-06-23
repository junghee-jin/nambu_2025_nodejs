const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

const db_name = path.join(__dirname, "checkList.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;
app.use(express.json());

const create_sql = `
    create table if not exists checkLists(
    id integer primary key autoincrement,
    category text not null,
    item text not null,
    amount integer default 0, 
    checkYn boolean default false
    )
`;
db.exec(create_sql);
// POST / checklist -> 체크리스트 입력
app.post("/checkList", (req, res) => {
  const { category, item, amount } = req.body;
  let sql = `
    insert into checkLists (category, item, amount)
    values(?,?,?)
  `;
  const stmt = db.prepare(sql);
  const result = stmt.run(category, item, amount);
  const newPost = db
    .prepare(`select * from checkLists where id =?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "ok", data: newPost });
});

// GET / checklist?category -> 여름휴가 준비물
app.get("/checkList", (req, res) => {
  const { category } = req.query;
  let sql = `
        select * from checkLists where category =?
    `;
  const stmt = db.prepare(sql);
  const rows = stmt.all(category);
  res.status(200).json({ message: "ok", data: rows });
});

// PUT / checklist/:id -> 체크 여부를 toggle 0->1 1->0
app.put("/checkLists/:id", (req, res) => {
  const id = req.params.id;
  const row = db
    .prepare(
      `UPDATE checkList Set checkYn = CASE checkYn WHEN 1 THEN 0 ELSE 1 END WHERE id = ?`
    )
    .run(id);
  const item = db.prepare(`select * from checkList where id = ?`).get(id);
  res.status(200).json({ message: "ok", data: item });
});

// DELETE / checklist/:id
app.delete("/lcheckList/:id", (req, res) => {
  const id = req.params.id;
  const result = db.prepare(`delete from checkList where id =?`).run(id);
  if (result.changes == 0) {
    res.status(404).json({ message: "항목을 찾을 수 없어용" });
  }
  res.status(204).send();
});

app.listen(PORT, () => {});
