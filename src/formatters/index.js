import _ from 'lodash';
import stylishRender from './stylish-formatter';
import plainRender from './plain-formatter';
import jsonRender from './json-formatter';

const renders = {
  stylish: stylishRender,
  plain: plainRender,
  json: jsonRender,
};

const render = (data, outputFormat) => {
  if (_.has(renders, outputFormat)) return renders[outputFormat](data);
  return renders.stylish(data);
};
export default render;
