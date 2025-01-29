import sqlite3 from "sqlite3";
import Memo from "./memo.js";

class MemoDb {
  constructor() {
    this.db = new sqlite3.Database("memo.db");
    this.changeDb(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)",
    );
  }

  loadMemos() {
    return this.fetchAll("SELECT * FROM memos").then((rows) => {
      if (rows.length === 0) console.log("No note");
      return rows.map((row) => new Memo(row.id, row.content));
    });
  }

  fetchAll(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  fetchOne(query, params) {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          const memo = new Memo(row.id, row.content);
          resolve(memo);
        }
      });
    });
  }

  changeDb(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  selectMemo(id) {
    return this.fetchOne("SELECT * FROM memos WHERE id = ?", [id]).then(
      (memo) => memo,
    );
  }

  insertMemo(content) {
    return this.changeDb("INSERT INTO memos (content) VALUES (?)", [
      content,
    ]).then(() => {
      console.log("Note has been saved");
    });
  }

  deleteMemo(id) {
    return this.changeDb("DELETE FROM memos WHERE id = ?", [id]).then(() => {
      console.log("Note has been deleted");
    });
  }
}

export default MemoDb;
