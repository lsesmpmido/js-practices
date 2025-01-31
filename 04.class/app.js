#!/usr/bin/env node

import minimist from "minimist";
import readline from "readline";
import enquirer from "enquirer";
const { Select } = enquirer;
import MemoDb from "./memo_db.js";

class App {
  constructor() {
    this.memoDb = new MemoDb();
  }

  async execute() {
    const args = minimist(process.argv.slice(2));

    if (args.l) {
      await this.#listMemos();
    } else if (args.r) {
      await this.#readMemo();
    } else if (args.d) {
      await this.#deleteMemo();
    } else if (args._.length === 0) {
      await this.#createMemo();
    }
  }

  async #listMemos() {
    const memos = await this.memoDb.loadMemos();
    if (memos.length === 0) console.log("No note");
    memos.forEach((memo, index) =>
      console.log(`${index + 1}: ${memo.firstLine()}`),
    );
  }

  async #readMemo() {
    await this.#chooseAction("Choose a note you want to see:", async (id) => {
      const memo = await this.memoDb.selectMemo(id);
      if (memo) {
        console.log(memo.content);
      }
    });
  }

  async #deleteMemo() {
    await this.#chooseAction(
      "Choose a note you want to delete:",
      async (id) => {
        await this.memoDb.deleteMemo(id);
        console.log("Note has been deleted");
      },
    );
  }

  async #createMemo() {
    console.log("Write a note:");
    const memoContent = await this.#fetchMemoContent();
    await this.memoDb.insertMemo(memoContent.trim());
    console.log("Note has been saved");
  }

  #fetchMemoContent() {
    return new Promise((resolve) => {
      let allInput = "";
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.on("line", (input) => (allInput += input + "\n"));
      rl.on("close", () => resolve(allInput));
    });
  }

  async #chooseAction(message, callback) {
    const memos = await this.memoDb.loadMemos();
    if (memos.length === 0) {
      console.log("No note");
      return;
    }

    const choices = memos.map((memo) => ({
      name: memo.firstLine(),
      value: memo.id,
    }));

    const prompt = new Select({
      message: message,
      choices: choices,
      result() {
        return this.focused.value;
      },
    });

    const id = await prompt.run();
    await callback(id);
  }
}

const app = new App();
app.execute();
