import _ from 'lodash';
import parseContentOf from './modules/parsers';

const isObject = (obj) => obj === Object(obj);

const getDiffs = (obj1, obj2) => {
  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);
  const allUniqKeys = _.union(keysOfObj1, keysOfObj2);

  return allUniqKeys.reduce((acc, key) => {
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return [...acc, { type: 'inner', name: key, children: getDiffs(obj1[key], obj2[key]) }];
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

const renderObject = (obj, offset, deep) => {
  const output2 = ['{\n'];
  const keys = Object.keys(obj);
  keys.map((key) => output2.push(`${offset.repeat(deep)}  ${key}: ${stringify(obj[key], deep + 2)}\n`));
  output2.push(`${offset.repeat(deep - 1)}}`);
  return output2.join('');
};

const stringify = (arg, deep) => isObject(arg) ? renderObject(arg, '  ', deep) : arg;

const render = (diffs, offset = '  ', deep = 1) => {
  const output = ['{\n'];
  diffs.map((diff) => {
    const {
      type,
      name,
      value,
      children,
      oldValue,
      newValue,
    } = diff;

    if (type === 'inner') {
      return output.push(`${offset.repeat(deep)}  ${name}: ${render(children, '  ', deep + 2)}\n`);
    }
    if (type === 'unchanged') {
      return output.push(`${offset.repeat(deep)}  ${name}: ${stringify(value, deep + 2)}\n`);
    }
    if (type === 'changed') {
      output.push(`${offset.repeat(deep)}- ${name}: ${stringify(oldValue, deep + 2)}\n`);
      return output.push(`${offset.repeat(deep)}+ ${name}: ${stringify(newValue, deep + 2)}\n`);
    }
    if (type === 'removed') {
      return output.push(`${offset.repeat(deep)}- ${name}: ${stringify(value, deep + 2)}\n`);
    }
    if (type === 'added') {
      return output.push(`${offset.repeat(deep)}+ ${name}: ${stringify(value, deep + 2)}\n`);
    }
  });
  output.push(`${offset.repeat(deep - 1)}}`);
  return output.join('');
};

export default (pathToFile1, pathToFile2) => {
  const fileContents1 = parseContentOf(pathToFile1);
  const fileContents2 = parseContentOf(pathToFile2);
  const data = getDiffs(fileContents1, fileContents2);
  return render(data);
};
