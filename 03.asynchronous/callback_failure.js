import sqlite3 from "sqlite3";
import {
  createTableSQL,
  insertTableSQLIncorrect,
  selectTableSQLIncorrect,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

db.run(createTableSQL, () => {
  console.log("テーブルが作成されました。");

  db.run(insertTableSQLIncorrect, ["TestBook"], (err) => {
    if (err) {
      console.error(err.message);
    }

    db.all(selectTableSQLIncorrect, (err) => {
      if (err) {
        console.error(err.message);
      }

      db.run(dropTableSQL, () => {
        console.log("テーブルが削除されました。");

        db.close();
      });
    });
  });
});
