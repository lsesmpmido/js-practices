import sqlite3 from "sqlite3";
import { executeDb, fetchDb, closeDb } from "./db_operations.js";
import {
  creationTableSQL,
  insertionTableSQL,
  selectionTableSQL,
  droppingTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

await executeDb(db, creationTableSQL);
console.log("テーブルが作成されました。");

const result = await executeDb(db, insertionTableSQL, ["TestBook"]);
console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);

const books = await fetchDb(db, selectionTableSQL);
console.log("取得したレコード:", books);

await executeDb(db, droppingTableSQL);
console.log("テーブルが削除されました。");

await closeDb(db);
