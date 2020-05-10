import _ from 'lodash';
import parse from './modules/parsers';
import renders from './formatters/index';
import readFile from './modules/utils';

const path = require('path');

const buildDiffs = (obj1, obj2) => {
  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);
  const allUniqKeys = _.union(keysOfObj1, keysOfObj2);

  return allUniqKeys.reduce((acc, key) => {
    // inner - когда и 1 и 2 значения являются объектами
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return [...acc, { name: key, type: 'inner', children: buildDiffs(obj1[key], obj2[key]) }];
    }
    if (keysOfObj1.includes(key) && !keysOfObj2.includes(key)) {
      return [...acc, { name: key, type: 'removed', value: obj1[key] }];
    }
    if (!keysOfObj1.includes(key) && keysOfObj2.includes(key)) {
      return [...acc, { name: key, type: 'added', value: obj2[key] }];
    }
    if (obj1[key] === obj2[key]) {
      return [...acc, { name: key, type: 'unchanged', value: obj1[key] }];
    }
    return [...acc, { name: key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] }];
  }, []);
};

const parseContentOf = (pathToFile) => {
  const contentOfFile = readFile(pathToFile);
  const typeOfFile = path.extname(pathToFile).toLowerCase();
  return parse(contentOfFile, typeOfFile);
};

export default (pathToFile1, pathToFile2, format = 'tree') => {
  const parsedContentOfFile1 = parseContentOf(pathToFile1);
  const parsedContentOfFile2 = parseContentOf(pathToFile2);
  const data = buildDiffs(parsedContentOfFile1, parsedContentOfFile2);
  return renders[format](data);
};
