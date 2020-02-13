#!/usr/bin/env node
console.log('gendiff.js was runed');

const program = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    console.log('firstConfig = ' + firstConfig);
    console.log('secondConfig = ' + secondConfig);
  });

program.parse(process.argv);