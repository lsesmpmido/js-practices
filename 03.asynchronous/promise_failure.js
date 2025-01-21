import sqlite3 from "sqlite3";
import { executeDb, fetchDb, closeDb } from "./db_operations.js";
import {
  creationTableSQL,
  insertionTableSQLWithError,
  selectionTableSQLWithError,
  droppingTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

executeDb(db, creationTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return executeDb(db, insertionTableSQLWithError, ["TestBook"]);
  })
  .catch((err) => {
    console.error(err.message);
    return fetchDb(db, selectionTableSQLWithError);
  })
  .catch((err) => {
    console.error(err.message);
    return executeDb(db, droppingTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    return closeDb(db);
  });
