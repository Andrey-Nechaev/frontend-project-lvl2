import _ from 'lodash';

const calculateOffset = (deep) => {
  const shift = '    ';
  return shift.repeat(deep);
};

const stringify = (value, currentDeep) => {
  const offset = calculateOffset(currentDeep);
  const childrenOffset = calculateOffset(currentDeep + 1);
  if (_.isObject(value)) {
    const keys = _.keys(value);
    const renderedStrings = keys.map((key) => `${childrenOffset}    ${[key]}: ${stringify(value[key], currentDeep + 1)}`);
    return `{\n${renderedStrings.join('\n')}\n${offset}    }`;
  }
  return value;
};

const diffsToString = (diffs, deep = 0) => {
  const diffToString = (diff, currentDeep) => {
    const {
      name,
      type,
      value,
      oldValue,
      newValue,
      children,
    } = diff;
    const offset = calculateOffset(currentDeep);

    if (type === 'inner') {
      return `${offset}    ${name}: {\n${diffsToString(children, currentDeep + 1)}\n${offset}    }`;
    }
    if (type === 'unchanged') {
      return `${offset}    ${name}: ${stringify(value, currentDeep)}`;
    }
    if (type === 'changed') {
      return `${offset}  - ${name}: ${stringify(oldValue, currentDeep)}\n${offset}  + ${name}: ${stringify(newValue, currentDeep)}`;
    }
    if (type === 'removed') {
      return `${offset}  - ${name}: ${stringify(value, currentDeep)}`;
    }
    // когда type === 'added'
    return `${offset}  + ${name}: ${stringify(value, currentDeep)}`;
  };

  return `${diffs.map((diff) => diffToString(diff, deep)).join('\n')}`;
};

const stylishRender = (diffs) => {
  if (diffs.length !== 0) return `{\n${diffsToString(diffs)}\n}`;
  return '';
};
export default stylishRender;
