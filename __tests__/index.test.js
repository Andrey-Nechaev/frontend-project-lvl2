import compare from '../src';
import readFile from '../src/modules/utils.js';

const path = require('path');

const answear1 = '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
const answear2 = '{\n  + timeout: 20\n  + verbose: true\n  + host: hexlet.io\n}';
const answear3 = '{\n  - host: hexlet.io\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n}';
const answear4 = readFile(path.join(__dirname, '/../__fixtures__/answear4'));
const answear5 = readFile(path.join(__dirname, '/../__fixtures__/answear5'));
const answear6 = readFile(path.join(__dirname, '/../__fixtures__/answear6'));
const pathToJSON1 = path.join(__dirname, '/../__fixtures__/before.json');
const pathToJSON2 = path.join(__dirname, '/../__fixtures__/after.json');

const pathToJSON3 = path.join(__dirname, '/../__fixtures__/before2.json');
const pathToJSON4 = path.join(__dirname, '/../__fixtures__/after2.json');

const pathToYAML1 = path.join(__dirname, '/../__fixtures__/before.yml');
const pathToYAML2 = path.join(__dirname, '/../__fixtures__/after.yml');
const pathToini1 = path.join(__dirname, '/../__fixtures__/before.ini');
const pathToini2 = path.join(__dirname, '/../__fixtures__/after.ini');
const emptyFile = path.join(__dirname, '/../__fixtures__/empty');

test('CompareFlattenJSON', () => {
  expect(compare(pathToJSON1, pathToJSON2)).toBe(answear1);
  expect(compare(emptyFile, pathToJSON2)).toBe(answear2);
  expect(compare(pathToJSON1, emptyFile)).toBe(answear3);
  expect(compare(emptyFile, emptyFile)).toBe('{\n}');
});

test('CompareFlattenYAML', () => {
  expect(compare(pathToYAML1, pathToYAML2)).toBe(answear1);
  expect(compare(emptyFile, pathToYAML2)).toBe(answear2);
  expect(compare(pathToYAML1, emptyFile)).toBe(answear3);
  expect(compare(emptyFile, emptyFile)).toBe('{\n}');
});

test('CompareFlattenini', () => {
  expect(compare(pathToini1, pathToini2)).toBe(answear1);
  expect(compare(emptyFile, pathToini2)).toBe(answear2);
  expect(compare(pathToini1, emptyFile)).toBe(answear3);
  expect(compare(emptyFile, emptyFile)).toBe('{\n}');
});

test('CompareTreeJSON', () => {
  expect(compare(pathToJSON3, pathToJSON4)).toBe(answear4);
  expect(compare(emptyFile, pathToJSON4)).toBe(answear5);
  expect(compare(pathToJSON3, emptyFile)).toBe(answear6);
  expect(compare(emptyFile, emptyFile)).toBe('{\n}');
});
