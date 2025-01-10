import sqlite3 from "sqlite3";
import { runQuery, fetchAll, closeDb } from "./db_operations.js";
import {
  createTableSQL,
  insertTableSQLIncorrect,
  selectTableSQLIncorrect,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

runQuery(db, createTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return runQuery(db, insertTableSQLIncorrect, ["TestBook"]);
  })
  .catch((err) => {
    console.error(err.message);
    return fetchAll(db, selectTableSQLIncorrect);
  })
  .catch((err) => {
    console.error(err.message);
    return runQuery(db, dropTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    return closeDb(db);
  });
