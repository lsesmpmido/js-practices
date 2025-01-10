import sqlite3 from "sqlite3";
import { runQuery, fetchAll, closeDb } from "./db_operations.js";
import {
  createTableSQL,
  insertTableSQLIncorrect,
  selectTableSQLIncorrect,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

await runQuery(db, createTableSQL);
console.log("テーブルが作成されました。");

try {
  await runQuery(db, insertTableSQLIncorrect, ["TestBook"]);
} catch (err) {
  console.error(err.message);
}

try {
  await fetchAll(db, selectTableSQLIncorrect);
} catch (err) {
  console.error(err.message);
}

await runQuery(db, dropTableSQL);
console.log("テーブルが削除されました。");

await closeDb(db);
