import sqlite3 from "sqlite3";
import { runSQL, allSQL } from "./sql_utils.js";
import {
  createTableSQL,
  insertTableSQLCorrect,
  selectTableSQLCorrect,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

await runSQL(db, createTableSQL);
console.log("テーブルが作成されました。");

const result = await runSQL(db, insertTableSQLCorrect, ["TestBook"]);
console.log(`レコードが追加されました。自動採番されたID: ${result.lastID}`);

const books = await allSQL(db, selectTableSQLCorrect);
console.log("取得したレコード:", books);

await runSQL(db, dropTableSQL);
console.log("テーブルが削除されました。");
db.close();
