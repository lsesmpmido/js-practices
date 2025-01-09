import sqlite3 from "sqlite3";
import { runSQL, allSQL } from "./sql_utils.js";

const db = new sqlite3.Database(":memory:");
const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertTableSQL = "INSERT INTO books (title) VALUES (?)";
const selectTableSQL = "SELECT * FROM books";
const dropTableSQL = "DROP TABLE books";

await runSQL(db, createTableSQL);
console.log("テーブルが作成されました。");

const result = await runSQL(db, insertTableSQL, ["book_title"]);
console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);

const books = await allSQL(db, selectTableSQL);
console.log("取得したレコード:", books);

await runSQL(db, dropTableSQL);
console.log("テーブルが削除されました。");
db.close();
