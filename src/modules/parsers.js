import yaml from 'js-yaml';
import readFile from './utils';

const path = require('path');
const ini = require('ini');

let parser;

export default (pathToFile) => {
  const format = path.extname(pathToFile).toLowerCase();

  if (format.includes('.')) {
    if (format === '.yml' || format === '.yaml') parser = yaml.safeLoad;
    if (format === '.json') parser = JSON.parse;
    if (format === '.ini') parser = ini.parse;
  } else {
    return {};
  }

  // Если внутренняя структура файла не соответствует формату, и возникнет ошибка парсинга,
  // вернуть пустой объект
  try {
    return parser(readFile(pathToFile));
  } catch (err) {
    return {};
  }
};
