import yaml from 'js-yaml';
import ini from 'ini';

export default (content, type) => {
  const parse = {
    yml: yaml.safeLoad,
    yaml: yaml.safeLoad,
    json: JSON.parse,
    ini: ini.parse,
  };
  try {
    return parse[type](content);
  } catch (err) {
    throw new Error('Неподдерживаемый формат входных данных');
  }
};
