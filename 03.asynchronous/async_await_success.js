import sqlite3 from "sqlite3";
import { runDb, fetchAllDb, closeDb } from "./db_operations.js";
import {
  createTableSQL,
  insertTableSQL,
  selectTableSQL,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

await runDb(db, createTableSQL);
console.log("テーブルが作成されました。");

const result = await runDb(db, insertTableSQL, ["TestBook"]);
console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);

const books = await fetchAllDb(db, selectTableSQL);
console.log("取得したレコード:", books);

await runDb(db, dropTableSQL);
console.log("テーブルが削除されました。");

await closeDb(db);
