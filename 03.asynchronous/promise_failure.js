import sqlite3 from "sqlite3";
import { runSQL, allSQL } from "./sql_utils.js";
import {
  createTableSQL,
  insertTableSQLIncorrect,
  selectTableSQLIncorrect,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

runSQL(db, createTableSQL)
  .then(() => {
    console.log("テーブルが作成されました。");
    return runSQL(db, insertTableSQLIncorrect, ["TestBook"]);
  })
  .catch((err) => {
    console.error(err.message);
    return allSQL(db, selectTableSQLIncorrect);
  })
  .catch((err) => {
    console.error(err.message);
    return runSQL(db, dropTableSQL);
  })
  .then(() => {
    console.log("テーブルが削除されました。");
    db.close();
  });
