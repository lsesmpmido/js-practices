import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertBookSQL = "INSERT INTO boooks (title) VALUES (?)";
const selectBooksSQL = "SELECT book_id FROM books";
const dropBookSQL = "DROP TABLE books";

db.run(createTableSQL, () => {
  console.log("テーブルが作成されました。");

  db.run(insertBookSQL, ["book_title"], (err) => {
    if (err) {
      console.error(err.message);
    }

    db.all(selectBooksSQL, (err) => {
      if (err) {
        console.error(err.message);
      }

      db.run(dropBookSQL, () => {
        console.log("テーブルが削除されました。");
        db.close();
      });
    });
  });
});
