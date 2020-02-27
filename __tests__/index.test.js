import CompareFlattenJSON from '../src';
import CompareFlattenYAML from '../src';

const path = require('path');

const answear1 = '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
const answear2 = '{\n  + timeout: 20\n  + verbose: true\n  + host: hexlet.io\n}';
const answear3 = '{\n  - host: hexlet.io\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n}';
const pathToJSON1 = path.join(__dirname, '/../__fixtures__/before.json');
const pathToJSON2 = path.join(__dirname, '/../__fixtures__/after.json');
const pathToYAML1 = path.join(__dirname, '/../__fixtures__/before.yml');
const pathToYAML2 = path.join(__dirname, '/../__fixtures__/after.yml');
const emptyFile = path.join(__dirname, '/../__fixtures__/empty');

test('CompareFlattenJSON', () => {
  expect(CompareFlattenJSON(pathToJSON1, pathToJSON2)).toBe(answear1);
  expect(CompareFlattenJSON(emptyFile, pathToJSON2)).toBe(answear2);
  expect(CompareFlattenJSON(pathToJSON1, emptyFile)).toBe(answear3);
  expect(CompareFlattenJSON(emptyFile, emptyFile)).toBe('{\n}');
});

test('CompareFlattenYAML', () => {
  expect(CompareFlattenYAML(pathToYAML1, pathToYAML2)).toBe(answear1);
  expect(CompareFlattenYAML(emptyFile, pathToYAML2)).toBe(answear2);
  expect(CompareFlattenYAML(pathToYAML1, emptyFile)).toBe(answear3);
  expect(CompareFlattenYAML(emptyFile, emptyFile)).toBe('{\n}');
});
