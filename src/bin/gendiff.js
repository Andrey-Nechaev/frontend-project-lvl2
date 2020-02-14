#!/usr/bin/env node
import gendiff from '..';
//const gendiff = (a, b) => console.log(a, b);

const program = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
  	console.log(gendiff(firstConfig, secondConfig));
  });

program.parse(process.argv);
