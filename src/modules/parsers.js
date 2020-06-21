import yaml from 'js-yaml';

const ini = require('ini');

export default (content, type) => {
  let parser;
  if (type === '.yml' || type === '.yaml') parser = yaml.safeLoad;
  if (type === '.json') parser = JSON.parse;
  if (type === '.ini') parser = ini.parse;

  try {
    return parser(content);
  } catch (err) {
    return {};
  }
};
