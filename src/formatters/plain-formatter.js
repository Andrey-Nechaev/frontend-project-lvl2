import _ from 'lodash';

const stringify = (arg) => {
  if (_.isObject(arg)) return '[complex value]';
  return arg;
};

const plainRender = (diffs, path = []) => {
  const diffToString = (diff, fullPropertyName) => {
    const curentName = [...fullPropertyName, diff.name];
    const { type, value, oldValue, newValue } = diff;
    if (type === 'inner') {
      return plainRender(diff.children, curentName);
    }
    if (type === 'removed') {
      return `Property '${curentName.join('.')}' was deleted`;
    }
    if (type === 'added') {
      return `Property '${curentName.join('.')}' was added with value: '${stringify(value)}'`;
    }
    if (type === 'changed') {
      return `Prooerty '${curentName.join('.')}' was changed from '${stringify(oldValue)}' to '${stringify(newValue)}'`;
    }
    return null;
  };
  return diffs.map((diff) => diffToString(diff, path)).filter((str) => str !== null).join('\n');
};

export default plainRender;
