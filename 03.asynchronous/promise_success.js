import sqlite3 from "sqlite3";
import { runDb, fetchAllDb, closeDb } from "./db_operations.js";
import {
  createTableSQL,
  insertTableSQL,
  selectTableSQL,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

runDb(db, createTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return runDb(db, insertTableSQL, ["TestBook"]);
  })
  .then((result) => {
    console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);
    return fetchAllDb(db, selectTableSQL);
  })
  .then((books) => {
    console.log("取得したレコード:", books);
    return runDb(db, dropTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    return closeDb(db);
  });
