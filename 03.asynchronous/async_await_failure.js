import sqlite3 from "sqlite3";
import { runDb, fetchAllDb, closeDb } from "./db_operations.js";
import {
  createTableSQL,
  insertTableSQLWithError,
  selectTableSQLWithError,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

await runDb(db, createTableSQL);
console.log("テーブルが作成されました。");

try {
  await runDb(db, insertTableSQLWithError, ["TestBook"]);
} catch (err) {
  if (err instanceof Error && err.message.startsWith("SQLITE_ERROR:")) {
    console.error(err.message);
  } else {
    throw err;
  }
}

try {
  await fetchAllDb(db, selectTableSQLWithError);
} catch (err) {
  if (err instanceof Error && err.message.startsWith("SQLITE_ERROR:")) {
    console.error(err.message);
  } else {
    throw err;
  }
}

await runDb(db, dropTableSQL);
console.log("テーブルが削除されました。");

await closeDb(db);
