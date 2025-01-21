export const creationTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
export const insertionTableSQL = "INSERT INTO books (title) VALUES (?)";
export const insertionTableSQLWithError =
  "INSERT INTO boooks (title) VALUES (?)";
export const selectionTableSQL = "SELECT * FROM books";
export const selectionTableSQLWithError = "SELECT book_id FROM books";
export const droppingTableSQL = "DROP TABLE books";
