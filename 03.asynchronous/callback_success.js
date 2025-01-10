import sqlite3 from "sqlite3";
import {
  createTableSQL,
  insertTableSQLCorrect,
  selectTableSQLCorrect,
  dropTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

db.run(createTableSQL, () => {
  console.log("テーブルが作成されました。");

  db.run(insertTableSQLCorrect, ["TestBook"], function () {
    console.log(`レコードが追加されました。自動採番されたID: ${this.lastID}`);

    db.all(selectTableSQLCorrect, (_, books) => {
      console.log("取得したレコード:", books);

      db.run(dropTableSQL, () => {
        console.log("テーブルが削除されました。");
        db.close();
      });
    });
  });
});
