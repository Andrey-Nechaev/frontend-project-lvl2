import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

export default (content, type) => {
  const parse = {
    yml: yaml.safeLoad,
    yaml: yaml.safeLoad,
    json: JSON.parse,
    ini: ini.parse,
  };
  if (!_.has(parse, type)) throw new Error(`Gendiff не поддерживает сравнение ${type}-файлов`); 
  return parse[type](content);
};
