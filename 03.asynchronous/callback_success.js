import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertTableSQL = "INSERT INTO books (title) VALUES (?)";
const selectTableSQL = "SELECT * FROM books";
const dropTableSQL = "DROP TABLE books";

db.run(createTableSQL, () => {
  console.log("テーブルが作成されました。");

  db.run(insertTableSQL, ["book_title"], function () {
    console.log(`レコードが追加されました。自動採番されたID: ${this.lastID}`);

    db.all(selectTableSQL, (_, books) => {
      console.log("取得したレコード:", books);

      db.run(dropTableSQL, () => {
        console.log("テーブルが削除されました。");
        db.close();
      });
    });
  });
});
