#!/usr/bin/env node

import minimist from "minimist";
import { endOfMonth } from "date-fns";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const YEAR = argv.y || today.getFullYear();
const MONTH = argv.m || today.getMonth() + 1;
const firstDay = new Date(YEAR, MONTH - 1, 1);
const END_OF_MONTH = endOfMonth(firstDay).getDate();

console.log(`      ${MONTH}月 ${YEAR}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(firstDay.getDay()));
for (let day = 1; day <= END_OF_MONTH; day++) {
  process.stdout.write(day.toString().padStart(2) + " ");
  if ((firstDay.getDay() + day - 1) % 7 === 6) {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n\n");
