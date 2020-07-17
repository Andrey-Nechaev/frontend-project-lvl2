import _ from 'lodash';

const calculateOffset = (depth) => {
  const shift = '    ';
  return shift.repeat(depth);
};

const stringify = (value, currentdepth) => {
  const offset = calculateOffset(currentdepth);
  const childrenOffset = calculateOffset(currentdepth + 1);
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const renderedStrings = keys.map((key) => `${childrenOffset}    ${[key]}: ${stringify(value[key], currentdepth + 1)}`);
  return `{\n${renderedStrings.join('\n')}\n${offset}    }`;
};

const diffsToString = (diffs, depth = 0) => {
  const diffToString = (diff, currentdepth) => {
    const {
      name,
      type,
      value,
      oldValue,
      newValue,
      children,
    } = diff;
    const offset = calculateOffset(currentdepth);

    switch (type) {
      case 'inner': return `${offset}    ${name}: {\n${diffsToString(children, currentdepth + 1)}\n${offset}    }`;
      case 'unchanged': return `${offset}    ${name}: ${stringify(value, currentdepth)}`;
      case 'changed': return `${offset}  - ${name}: ${stringify(oldValue, currentdepth)}\n${offset}  + ${name}: ${stringify(newValue, currentdepth)}`;
      case 'removed': return `${offset}  - ${name}: ${stringify(value, currentdepth)}`;
      case 'added': return `${offset}  + ${name}: ${stringify(value, currentdepth)}`;
      default: throw new Error(`Unknown type of difference: '${type}'!`);
    }
  };

  return `${diffs.map((diff) => diffToString(diff, depth)).join('\n')}`;
};

const stylishRender = (diffs) => {
  if (diffs.length !== 0) return `{\n${diffsToString(diffs)}\n}`;
  return '';
};
export default stylishRender;
