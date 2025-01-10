import sqlite3 from "sqlite3";
import { runSQL, allSQL } from "./sql_utils.js";
import {
  createTableSQL,
  insertTableSQLCorrect,
  selectTableSQLCorrect,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

runSQL(db, createTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return runSQL(db, insertTableSQLCorrect, ["TestBook"]);
  })
  .then((result) => {
    console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);
    return allSQL(db, selectTableSQLCorrect);
  })
  .then((books) => {
    console.log("取得したレコード:", books);
    return runSQL(db, dropTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    db.close();
  });
