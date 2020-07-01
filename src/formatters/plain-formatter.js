import _ from 'lodash';

const stringify = (arg) => {
  if (_.isObject(arg)) return '[complex value]';
  return arg;
};

const plainRender = (diffs, pathToInnerProperty = []) => {
  const diffToString = (diff, previousNames) => {
    const {
      name,
      type,
      value,
      oldValue,
      newValue,
      children,
    } = diff;
    const currentPathToInnerProperty = [...previousNames, name];
    if (type === 'inner') {
      return plainRender(children, currentPathToInnerProperty);
    }
    if (type === 'removed') {
      return `Property '${currentPathToInnerProperty.join('.')}' was deleted`;
    }
    if (type === 'added') {
      return `Property '${currentPathToInnerProperty.join('.')}' was added with value: '${stringify(value)}'`;
    }
    if (type === 'changed') {
      return `Property '${currentPathToInnerProperty.join('.')}' was changed from '${stringify(oldValue)}' to '${stringify(newValue)}'`;
    }
    return null; // когда тип unchanged
  };
  return diffs
    .map((diff) => diffToString(diff, pathToInnerProperty))
    .filter((str) => str !== null)
    .join('\n');
};

export default plainRender;
