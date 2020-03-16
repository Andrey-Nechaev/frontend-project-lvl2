import _ from 'lodash';
import parseContentOf from './modules/parsers';
import renders from './formaters/index';
import jsonRender from './formatters/json-formatter';
import plainRender from './formatters/plain-formatter';

const buildDiffs = (obj1, obj2) => {
  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);
  const allUniqKeys = _.union(keysOfObj1, keysOfObj2);

  return allUniqKeys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return [...acc, { type: 'inner', name: key, children: buildDiffs(obj1[key], obj2[key]) }];
    }
    if (keysOfObj1.includes(key) && !keysOfObj2.includes(key)) {
      return [...acc, { type: 'removed', name: key, value: obj1[key] }];
    }
    if (!keysOfObj1.includes(key) && keysOfObj2.includes(key)) {
      return [...acc, { type: 'added', name: key, value: obj2[key] }];
    }
    if (obj1[key] === obj2[key]) {
      return [...acc, { type: 'unchanged', name: key, value: obj1[key] }];
    }
    return [...acc, {
      type: 'changed',
      name: key,
      oldValue: obj1[key],
      newValue: obj2[key],
    }];
  }, []);
};

export default (pathToFile1, pathToFile2, format = 'json') => {
  const fileContents1 = parseContentOf(pathToFile1);
  const fileContents2 = parseContentOf(pathToFile2);
  const data = buildDiffs(fileContents1, fileContents2);
  return renders[format](data);
};
