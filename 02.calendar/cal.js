#!/usr/bin/env node

import minimist from "minimist";
import * as dateFns from "date-fns";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const year = argv.y ?? today.getFullYear();
const month = argv.m ?? today.getMonth() + 1;
const firstDay = new Date(year, month - 1, 1);
const lastDay = dateFns.endOfMonth(firstDay);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(firstDay.getDay()));
for (let day = 1; day <= lastDay.getDate(); day++) {
  process.stdout.write(day.toString().padStart(2));
  if ((firstDay.getDay() + day - 1) % 7 === 6) {
    process.stdout.write("\n");
  } else if (day !== lastDay.getDate()) {
    process.stdout.write(" ");
  }
}
process.stdout.write("\n\n");
