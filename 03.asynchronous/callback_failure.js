import sqlite3 from "sqlite3";
import {
  creationTableSQL,
  insertionTableSQLWithError,
  selectionTableSQLWithError,
  droppingTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

db.run(creationTableSQL, () => {
  console.log("テーブルが作成されました。");

  db.run(insertionTableSQLWithError, ["TestBook"], (err) => {
    if (err) {
      console.error(err.message);
    }

    db.all(selectionTableSQLWithError, (err) => {
      if (err) {
        console.error(err.message);
      }

      db.run(droppingTableSQL, () => {
        console.log("テーブルが削除されました。");

        db.close();
      });
    });
  });
});
