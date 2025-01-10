import sqlite3 from "sqlite3";
import { runQuery, fetchAll, closeDb } from "./db_operations.js";
import {
  createTableSQL,
  insertTableSQLCorrect,
  selectTableSQLCorrect,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

runQuery(db, createTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return runQuery(db, insertTableSQLCorrect, ["TestBook"]);
  })
  .then((result) => {
    console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);
    return fetchAll(db, selectTableSQLCorrect);
  })
  .then((books) => {
    console.log("取得したレコード:", books);
    return runQuery(db, dropTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    return closeDb(db);
  });
