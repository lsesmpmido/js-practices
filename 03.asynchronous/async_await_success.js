import sqlite3 from "sqlite3";
import { runSQL, allSQL } from "./sql_utils.js";

const db = new sqlite3.Database(":memory:");
const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertBookSQL = "INSERT INTO books (title) VALUES (?)";
const selectBooksSQL = "SELECT * FROM books";
const dropBookSQL = "DROP TABLE books";

await runSQL(db, createTableSQL);
console.log("テーブルが作成されました。");

const insertResult = await runSQL(db, insertBookSQL, ["book_title"]);
console.log(
  `レコードが追加されました。自動採番されたID: ${insertResult.lastID}`,
);

const selectResult = await allSQL(db, selectBooksSQL);
console.log("取得したレコード:", selectResult);

await runSQL(db, dropBookSQL);
console.log("テーブルが削除されました。");
db.close();
