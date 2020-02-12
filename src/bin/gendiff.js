#!/usr/bin/env node
console.log('gendiff.js was runed');

const program = require('commander');

program
  .version('1.0.0')
  .description('[en] Compares two configuration files and shows a difference.\n[ru] Сравнивает две конфигурации файлов и показвывает разницу.');

program.parse(process.argv);