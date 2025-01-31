export const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
export const insertBooksSQL = "INSERT INTO books (title) VALUES (?)";
export const insertBooksSQLWithError = "INSERT INTO boooks (title) VALUES (?)";
export const selectBooksSQL = "SELECT * FROM books";
export const selectBooksSQLWithError = "SELECT book_id FROM books";
export const dropTableSQL = "DROP TABLE books";
