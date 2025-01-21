import sqlite3 from "sqlite3";
import { executeDb, fetchDb, closeDb } from "./db_operations.js";
import {
  creationTableSQL,
  insertionTableSQL,
  selectionTableSQL,
  droppingTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

executeDb(db, creationTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return executeDb(db, insertionTableSQL, ["TestBook"]);
  })
  .then((result) => {
    console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);
    return fetchDb(db, selectionTableSQL);
  })
  .then((books) => {
    console.log("取得したレコード:", books);
    return executeDb(db, droppingTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    return closeDb(db);
  });
