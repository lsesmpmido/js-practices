import sqlite3 from "sqlite3";
import {
  createTableSQL,
  insertRecordsSQLWithError,
  selectRecordsSQLWithError,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

db.run(createTableSQL, () => {
  console.log("テーブルが作成されました。");

  db.run(insertRecordsSQLWithError, ["TestBook"], (err) => {
    if (err) {
      console.error(err.message);
    }

    db.all(selectRecordsSQLWithError, (err) => {
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
