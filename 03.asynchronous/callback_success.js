import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertBookSQL = "INSERT INTO books (title) VALUES (?)";
const selectBooksSQL = "SELECT * FROM books";
const dropBookSQL = "DROP TABLE books";

db.run(createTableSQL, () => {
  console.log("テーブルが作成されました。");

  db.run(insertBookSQL, ["book_title"], function () {
    console.log(`レコードが追加されました。自動採番されたID: ${this.lastID}`);

    db.all(selectBooksSQL, (_, books) => {
      console.log("取得したレコード:", books);

      db.run(dropBookSQL, () => {
        console.log("テーブルが削除されました。");
        db.close();
      });
    });
  });
});
