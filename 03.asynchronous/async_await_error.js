import sqlite3 from "sqlite3";
import { runSQL, allSQL } from "./sql_utils.js";

const db = new sqlite3.Database(":memory:");
const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertTableSQL = "INSERT INTO boooks (title) VALUES (?)";
const selectTableSQL = "SELECT book_id FROM books";
const dropTableSQL = "DROP TABLE books";

await runSQL(db, createTableSQL);
console.log("テーブルが作成されました。");

try {
  await runSQL(db, insertTableSQL, ["TestBook"]);
} catch (err) {
  console.error(err.message);
}

try {
  await allSQL(db, selectTableSQL);
} catch (err) {
  console.error(err.message);
}

await runSQL(db, dropTableSQL);
console.log("テーブルが削除されました。");
db.close();
