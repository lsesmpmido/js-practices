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
    memos.forEach((memo, index) =>
      console.log(`${index + 1}: ${memo.firstLine()}`),
    );
  }

  async #readMemo() {
    await this.#chooseMemoAction(
      "Choose a note you want to see:",
      async (id) => {
        const memo = await this.memoDb.selectMemo(id);
        if (memo) {
          console.log(memo.content);
        }
      },
    );
  }

  async #deleteMemo() {
    await this.#chooseMemoAction(
      "Choose a note you want to delete:",
      async (id) => {
        await this.memoDb.deleteMemo(id);
      },
    );
  }

  async #createMemo() {
    console.log("Write a note:");
    const memoContent = await this.#inputMemoContent();
    await this.memoDb.insertMemo(memoContent.trim());
  }

  #inputMemoContent() {
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

  async #chooseMemoAction(actionMessage, actionCallback) {
    const memos = await this.memoDb.loadMemos();
    if (memos.length === 0) return;

    const choices = memos.map((memo) => ({
      name: memo.firstLine(),
      value: memo.id,
    }));

    const prompt = new Select({
      message: actionMessage,
      choices: choices,
      result() {
        return this.focused.value;
      },
    });

    const id = await prompt.run();
    await actionCallback(id);
  }
}

const app = new App();
app.execute();
