import sqlite3 from "sqlite3";
import { runSQL, allSQL } from "./sql_utils.js";

const db = new sqlite3.Database(":memory:");
const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertTableSQL = "INSERT INTO boooks (title) VALUES (?)";
const selectTableSQL = "SELECT book_id FROM books";
const dropTableSQL = "DROP TABLE books";

runSQL(db, createTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return runSQL(db, insertTableSQL, ["book_title"]);
  })
  .catch((err) => {
    console.error(err.message);
    return allSQL(db, selectTableSQL);
  })
  .catch((err) => {
    console.error(err.message);
    return runSQL(db, dropTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    db.close();
  });
