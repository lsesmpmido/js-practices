import sqlite3 from "sqlite3";
import { executeDb, fetchDb, closeDb } from "./db_operations.js";
import {
  createTableSQL,
  insertTableSQLIncorrect,
  selectTableSQLIncorrect,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

executeDb(db, createTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return executeDb(db, insertTableSQLIncorrect, ["TestBook"]);
  })
  .catch((err) => {
    console.error(err.message);
    return fetchDb(db, selectTableSQLIncorrect);
  })
  .catch((err) => {
    console.error(err.message);
    return executeDb(db, dropTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    return closeDb(db);
  });
