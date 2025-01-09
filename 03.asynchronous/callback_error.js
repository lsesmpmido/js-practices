import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertTableSQL = "INSERT INTO boooks (title) VALUES (?)";
const selectTableSQL = "SELECT book_id FROM books";
const dropTableSQL = "DROP TABLE books";

db.run(createTableSQL, () => {
  console.log("テーブルが作成されました。");

  db.run(insertTableSQL, ["book_title"], (err) => {
    if (err) {
      console.error(err.message);
    }

    db.all(selectTableSQL, (err) => {
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
