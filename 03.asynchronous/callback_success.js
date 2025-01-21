import sqlite3 from "sqlite3";
import {
  creationTableSQL,
  insertionTableSQL,
  selectionTableSQL,
  droppingTableSQL,
} from "./book_sql.js";

const db = new sqlite3.Database(":memory:");

db.run(creationTableSQL, () => {
  console.log("テーブルが作成されました。");

  db.run(insertionTableSQL, ["TestBook"], function () {
    console.log(`レコードが追加されました。自動採番されたID: ${this.lastID}`);

    db.all(selectionTableSQL, (_, books) => {
      console.log("取得したレコード:", books);

      db.run(droppingTableSQL, () => {
        console.log("テーブルが削除されました。");

        db.close();
      });
    });
  });
});
