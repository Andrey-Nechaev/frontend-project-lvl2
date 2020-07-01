
import fs from 'fs';
import path from 'path';
import compare from '../src';

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (pathToFile) => {
  try {
    return fs.readFileSync(pathToFile, 'utf-8');
  } catch (err) {
    throw new Error(`Ошибка чтения файла\n${err.name}: ${err.message}`);
  }
};

const answerAsStylish = readFile(getFixturePath('answerAsStylish'));
const answerAsPlain = readFile(getFixturePath('answerAsPlain'));
const answerAsJson = readFile(getFixturePath('answerAsJson.json'));

test.each([
  ['JSON, stylish output', getFixturePath('before.json'), getFixturePath('after.json'), 'stylish', answerAsStylish],
  ['JSON, plain output', getFixturePath('before.json'), getFixturePath('after.json'), 'plain', answerAsPlain],
  ['JSON, json output', getFixturePath('before.json'), getFixturePath('after.json'), 'json', answerAsJson],
  ['YAML, stylish output', getFixturePath('before.yml'), getFixturePath('after.yml'), 'stylish', answerAsStylish],
  ['YAML, plain output', getFixturePath('before.yml'), getFixturePath('after.yml'), 'plain', answerAsPlain],
  ['YAML, json output', getFixturePath('before.yml'), getFixturePath('after.yml'), 'json', answerAsJson],
  ['ini, stylish output', getFixturePath('before.ini'), getFixturePath('after.ini'), 'stylish', answerAsStylish],
  ['ini, plain output', getFixturePath('before.ini'), getFixturePath('after.ini'), 'plain', answerAsPlain],
  ['ini, json output', getFixturePath('before.ini'), getFixturePath('after.ini'), 'json', answerAsJson],
])('Compare %o', (testName, path1, path2, outputFormat, expected) => {
  expect(compare(path1, path2, outputFormat)).toBe(expected);
});
