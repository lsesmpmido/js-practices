import sqlite3 from "sqlite3";
import { executeDb, fetchDb, closeDb } from "./db_operations.js";
import {
  createTableSQL,
  insertTableSQL,
  selectTableSQL,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

await executeDb(db, createTableSQL);
console.log("テーブルが作成されました。");

const result = await executeDb(db, insertTableSQL, ["TestBook"]);
console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);

const books = await fetchDb(db, selectTableSQL);
console.log("取得したレコード:", books);

await executeDb(db, dropTableSQL);
console.log("テーブルが削除されました。");

await closeDb(db);
