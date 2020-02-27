import yaml from 'js-yaml';

const path = require('path');
const fs = require('fs');

const encoding = 'utf8';
const readFile = (pathToFile) => fs.readFileSync(pathToFile, encoding);
let parser;

export default (pathToFile) => {
  const format = path.extname(pathToFile).toLowerCase();

  if (format.includes('.')) {
    if (format === '.yml' || format === '.yaml') parser = yaml.safeLoad;
    if (format === '.json') parser = JSON.parse;
  } else {
    return {};
  }

  try {
    return parser(readFile(pathToFile));
  } catch (err) {
    return {};
  }
};
