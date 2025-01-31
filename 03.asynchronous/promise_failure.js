import sqlite3 from "sqlite3";
import { runDb, fetchAllDb, closeDb } from "./db_operations.js";
import {
  createTableSQL,
  insertBooksSQLWithError,
  selectBooksSQLWithError,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

runDb(db, createTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return runDb(db, insertBooksSQLWithError, ["TestBook"]);
  })
  .catch((err) => {
    console.error(err.message);
    return fetchAllDb(db, selectBooksSQLWithError);
  })
  .catch((err) => {
    console.error(err.message);
    return runDb(db, dropTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    return closeDb(db);
  });
