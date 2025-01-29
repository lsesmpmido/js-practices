export const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
export const insertTableSQL = "INSERT INTO books (title) VALUES (?)";
export const insertTableSQLWithError = "INSERT INTO boooks (title) VALUES (?)";
export const selectTableSQL = "SELECT * FROM books";
export const selectTableSQLWithError = "SELECT book_id FROM books";
export const dropTableSQL = "DROP TABLE books";
