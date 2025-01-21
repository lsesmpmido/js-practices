import sqlite3 from "sqlite3";
import { executeDb, fetchDb, closeDb } from "./db_operations.js";
import {
  creationTableSQL,
  insertionTableSQLWithError,
  selectionTableSQLWithError,
  droppingTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

await executeDb(db, creationTableSQL);
console.log("テーブルが作成されました。");

try {
  await executeDb(db, insertionTableSQLWithError, ["TestBook"]);
} catch (err) {
  if (err instanceof Error && err.message.startsWith("SQLITE_ERROR:")) {
    console.error(err.message);
  } else {
    throw err;
  }
}

try {
  await fetchDb(db, selectionTableSQLWithError);
} catch (err) {
  if (err.message.startsWith("SQLITE_ERROR:")) {
    console.error(err.message);
  } else {
    throw err;
  }
}

await executeDb(db, droppingTableSQL);
console.log("テーブルが削除されました。");

await closeDb(db);
