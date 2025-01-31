import sqlite3 from "sqlite3";
import {
  createTableSQL,
  insertBooksSQLWithError,
  selectBooksSQLWithError,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

db.run(createTableSQL, () => {
  console.log("テーブルが作成されました。");

  db.run(insertBooksSQLWithError, ["TestBook"], (err) => {
    if (err) {
      console.error(err.message);
    }

    db.all(selectBooksSQLWithError, (err) => {
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
