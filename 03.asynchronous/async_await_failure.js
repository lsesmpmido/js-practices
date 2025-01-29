import sqlite3 from "sqlite3";
import { executeDb, fetchDb, closeDb } from "./db_operations.js";
import {
  createTableSQL,
  insertTableSQLWithError,
  selectTableSQLWithError,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

await executeDb(db, createTableSQL);
console.log("テーブルが作成されました。");

try {
  await executeDb(db, insertTableSQLWithError, ["TestBook"]);
} catch (err) {
  if (err instanceof Error && err.message.startsWith("SQLITE_ERROR:")) {
    console.error(err.message);
  } else {
    throw err;
  }
}

try {
  await fetchDb(db, selectTableSQLWithError);
} catch (err) {
  if (err.message.startsWith("SQLITE_ERROR:")) {
    console.error(err.message);
  } else {
    throw err;
  }
}

await executeDb(db, dropTableSQL);
console.log("テーブルが削除されました。");

await closeDb(db);
