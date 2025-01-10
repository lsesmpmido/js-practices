export const createTableSQL =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
export const insertTableSQLCorrect = "INSERT INTO books (title) VALUES (?)";
export const insertTableSQLIncorrect = "INSERT INTO boooks (title) VALUES (?)";
export const selectTableSQLCorrect = "SELECT * FROM books";
export const selectTableSQLIncorrect = "SELECT book_id FROM books";
export const dropTableSQL = "DROP TABLE books";
