const express = require("express");
const path = require("path");
const moment = require("moment");

const Database = require("better-sqlite3");
const db_name = path.join(__dirname, "diary.db");
const db = new Database(db_name);

const create_sql = `
    create table if not exists diarys (
        id integer primary key autoincrement,
        title varchar(255),
        contetn text,
        createdAt datetime default current_timestamp
    );
`;
db.exec(create_sql);

const app = express();
const PORT = 3000;
app.use(express.json());

app.post("/diarys", (req, res) => {
  const { title, content } = req.body;
  let sql = `
        insert into diarys(title, content) values (?,?);
    `;
  db.prepare(sql).run(title, content);
  res.status(201).json({ message: "ok" });
});
