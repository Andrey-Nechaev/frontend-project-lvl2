import yaml from 'js-yaml';

const ini = require('ini');

export default (content, type) => {
  let parser;
  if (type === '.yml' || type === '.yaml') parser = yaml.safeLoad;
  if (type === '.json') parser = JSON.parse;
  if (type === '.ini') parser = ini.parse;
  // Если внутренняя структура файла не соответствует формату, и возникнет ошибка парсинга,
  // вернуть пустой объект
  try {
    return parser(content);
  } catch (err) {
    return {};
  }
};
