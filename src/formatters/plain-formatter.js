import _ from 'lodash';

const stringify = (arg) => {
  if (_.isObject(arg)) return '[complex value]';
  return arg;
};

const plainRender = (diffs, path = []) => {
  const diffToString = (diff, pathToInerProperty) => {
    const { name, type, value, oldValue, newValue, children } = diff;
    const curentName = [...pathToInerProperty, name];
    if (type === 'inner') {
      return plainRender(children, curentName);
    }
    if (type === 'removed') {
      return `Property '${curentName.join('.')}' was deleted`;
    }
    if (type === 'added') {
      return `Property '${curentName.join('.')}' was added with value: '${stringify(value)}'`;
    }
    if (type === 'changed') {
      return `Property '${curentName.join('.')}' was changed from '${stringify(oldValue)}' to '${stringify(newValue)}'`;
    }
    return null; // когда тип unchanged
  };
  return diffs
    .map((diff) => diffToString(diff, path))
    .filter((str) => str !== null)
    .join('\n');
};

export default plainRender;
