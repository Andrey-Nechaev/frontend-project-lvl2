import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plainRender = (diffs, names = []) => {
  const diffToString = (diff, previousNames) => {
    const {
      name,
      type,
      value,
      oldValue,
      newValue,
      children,
    } = diff;

    const pathFragments = [...previousNames, name];
    switch (type) {
      case 'inner': return plainRender(children, pathFragments);
      case 'removed': return `Property '${pathFragments.join('.')}' was deleted`;
      case 'added': return `Property '${pathFragments.join('.')}' was added with value: '${stringify(value)}'`;
      case 'changed': return `Property '${pathFragments.join('.')}' was changed from '${stringify(oldValue)}' to '${stringify(newValue)}'`;
      case 'unchanged': return null;
      default: throw new Error(`Unknown type of difference: '${type}'!`);
    }
  };
  return diffs
    .map((diff) => diffToString(diff, names))
    .filter((str) => str !== null)
    .join('\n');
};

export default plainRender;
