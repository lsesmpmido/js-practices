export const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
export const insertRecordsSQL = "INSERT INTO books (title) VALUES (?)";
export const insertRecordsSQLWithError =
  "INSERT INTO boooks (title) VALUES (?)";
export const selectRecordsSQL = "SELECT * FROM books";
export const selectRecordsSQLWithError = "SELECT book_id FROM books";
export const dropTableSQL = "DROP TABLE books";
