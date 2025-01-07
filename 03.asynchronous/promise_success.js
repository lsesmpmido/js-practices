import sqlite3 from "sqlite3";
import { runSQL, allSQL } from "./sql_utils.js";

const db = new sqlite3.Database(":memory:");
const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertBookSQL = "INSERT INTO books (title) VALUES (?)";
const selectBooksSQL = "SELECT * FROM books";
const dropBookSQL = "DROP TABLE books";

runSQL(db, createTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return runSQL(db, insertBookSQL, ["book_title"]);
  })
  .then((result) => {
    console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);
    return allSQL(db, selectBooksSQL);
  })
  .then((books) => {
    console.log("取得したレコード:", books);
    return runSQL(db, dropBookSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    db.close();
  });
