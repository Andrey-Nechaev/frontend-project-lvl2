import _ from 'lodash';

// const isObject = (obj) => obj === Object(obj);

const shift = '  ';

const stringify = (arg, deep) => {
  const offset = shift.repeat(deep);
  const print = (obj) => _.keys(obj).map((key) => `${offset}  ${key}: ${stringify(obj[key], deep + 2)}`).join('\n');

  if (!_.isObject(arg)) return arg;
  return `{\n${print(arg)}\n${shift.repeat(deep - 2)}  }`;
};

const typeOfDifference = {
  inner: '  ',
  unchanged: '  ',
  removed: '- ',
  added: '+ ',
};


const jsonRender = (diffs, deep = 1) => {
  const diffToString = (diff, innerDeep) => {
    const offset = shift.repeat(innerDeep);
    const { name } = diff;
    if (diff.type === 'inner') {
      return `${offset}  ${name}: ${jsonRender(diff.children, innerDeep + 2)}`;
    }
    if (diff.type === 'changed') {
      return `${offset}- ${name}: ${stringify(diff.oldValue, innerDeep + 2)}\n${offset}+ ${name}: ${stringify(diff.newValue, innerDeep + 2)}`;
    }
    const type = typeOfDifference[diff.type];
    return `${offset}${type}${name}: ${stringify(diff.value, innerDeep + 2)}`;
  };

  if (diffs.length === 0) return '{\n}';
  const print = (arr) => arr.map((diff) => diffToString(diff, deep)).join('\n');
  return `{\n${print(diffs)}\n${shift.repeat(deep - 1)}}`;
};

export default jsonRender;
