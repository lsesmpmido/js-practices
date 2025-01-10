import sqlite3 from "sqlite3";
import { runSQL, allSQL } from "./sql_utils.js";
import {
  createTableSQL,
  insertTableSQLIncorrect,
  selectTableSQLIncorrect,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

await runSQL(db, createTableSQL);
console.log("テーブルが作成されました。");

try {
  await runSQL(db, insertTableSQLIncorrect, ["TestBook"]);
} catch (err) {
  console.error(err.message);
}

try {
  await allSQL(db, selectTableSQLIncorrect);
} catch (err) {
  console.error(err.message);
}

await runSQL(db, dropTableSQL);
console.log("テーブルが削除されました。");
db.close();
