#!/usr/bin/env node

import minimist from "minimist";
import { endOfMonth } from "date-fns";

const ARGV = minimist(process.argv.slice(2));
const today = new Date();
const YEAR = ARGV.y || today.getFullYear();
const MONTH = ARGV.m - 1 || today.getMonth();
const first_day = new Date(YEAR, MONTH, 1);
const END_OF_MONTH = endOfMonth(first_day).getDate();

console.log("      " + (MONTH + 1) + "月 " + YEAR);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(first_day.getDay()));
for (let day = 1; day <= END_OF_MONTH; day++) {
  process.stdout.write(day.toString().padStart(2) + " ");
  if (new Date(YEAR, MONTH, day).getDay() === 6) {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n\n");
