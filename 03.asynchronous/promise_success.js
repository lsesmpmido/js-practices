import sqlite3 from "sqlite3";
import { runSQL, allSQL } from "./sql_utils.js";

const db = new sqlite3.Database(":memory:");
const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertTableSQL = "INSERT INTO books (title) VALUES (?)";
const selectTableSQL = "SELECT * FROM books";
const dropTableSQL = "DROP TABLE books";

runSQL(db, createTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return runSQL(db, insertTableSQL, ["book_title"]);
  })
  .then((result) => {
    console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);
    return allSQL(db, selectTableSQL);
  })
  .then((books) => {
    console.log("取得したレコード:", books);
    return runSQL(db, dropTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    db.close();
  });
