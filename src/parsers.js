import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

export default (content, type) => {
  const parsers = {
    yml: yaml.safeLoad,
    yaml: yaml.safeLoad,
    json: JSON.parse,
    ini: ini.parse,
  };
  if (!_.has(parsers, type)) throw new Error(`The Gendiff does not support comparison ${type}-files`);
  return parsers[type](content);
};
