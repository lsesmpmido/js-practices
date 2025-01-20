#!/usr/bin/env node

import minimist from "minimist";
import readline from "readline";
import enquirer from "enquirer";
const { Select } = enquirer;
import MemoDb from "./memo_db.js";

async function main() {
  const args = minimist(process.argv.slice(2));
  const memoDb = new MemoDb();

  if (args.l) {
    await listMemos(memoDb);
  } else if (args.r) {
    await readMemo(memoDb);
  } else if (args.d) {
    await deleteMemo(memoDb);
  } else if (args._.length === 0) {
    await createMemo(memoDb);
  }
}

async function listMemos(memoDb) {
  const memos = await memoDb.loadMemos();
  memos.forEach((memo, index) =>
    console.log(`${index + 1}: ${memo.firstLine()}`),
  );
}

async function readMemo(memoDb) {
  await chooseMemoAction(
    memoDb,
    "Choose a note you want to see:",
    async (memoDb, id) => {
      const memo = await memoDb.runDbGet("SELECT * FROM memos WHERE id = ?", [
        id,
      ]);
      console.log(memo.content);
    },
  );
}

async function deleteMemo(memoDb) {
  await chooseMemoAction(
    memoDb,
    "Choose a note you want to delete:",
    async (memoDb, id) => {
      await memoDb.deleteMemo(id);
    },
  );
}

async function createMemo(memoDb) {
  console.log("Write a note:");
  const memoContent = await inputMemoContent();
  await memoDb.insertMemo(memoContent.trim());
}

function inputMemoContent() {
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

async function chooseMemoAction(memoDb, actionMessage, actionCallback) {
  const memos = await memoDb.loadMemos();
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
  await actionCallback(memoDb, id);
}

main();
