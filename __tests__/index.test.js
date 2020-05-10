import compare from '../src';
import readFile from '../src/modules/utils';

const path = require('path');

const beforeJsonFile = path.join(__dirname, '/../__fixtures__/before.json');
const beforeYamlFile = path.join(__dirname, '/../__fixtures__/before.yml');
const beforeIniFile = path.join(__dirname, '/../__fixtures__/before.ini');

const afterJsonFile = path.join(__dirname, '/../__fixtures__/after.json');
const afterYamlFile = path.join(__dirname, '/../__fixtures__/after.yml');
const afterIniFile = path.join(__dirname, '/../__fixtures__/after.ini');

const emptyFile = path.join(__dirname, '/../__fixtures__/empty');

const answerAsStylish1 = readFile(path.join(__dirname, '/../__fixtures__/answerAsStylish1'));
const answerAsStylish2 = readFile(path.join(__dirname, '/../__fixtures__/answerAsStylish2'));
const answerAsStylish3 = readFile(path.join(__dirname, '/../__fixtures__/answerAsStylish3'));

const answerAsPlain1 = readFile(path.join(__dirname, '/../__fixtures__/answerAsPlain1'));
const answerAsPlain2 = readFile(path.join(__dirname, '/../__fixtures__/answerAsPlain2'));
const answerAsPlain3 = readFile(path.join(__dirname, '/../__fixtures__/answerAsPlain3'));

const answerAsJson1 = readFile(path.join(__dirname, '/../__fixtures__/answerAsJson1.json'));
const answerAsJson2 = readFile(path.join(__dirname, '/../__fixtures__/answerAsJson2.json'));
const answerAsJson3 = readFile(path.join(__dirname, '/../__fixtures__/answerAsJson3.json'));

test('Compare as stylish format', () => {
  const format = 'stylish';
  expect(compare(beforeJsonFile, afterJsonFile, format)).toBe(answerAsStylish1);
  expect(compare(beforeYamlFile, afterYamlFile, format)).toBe(answerAsStylish1);
  expect(compare(beforeIniFile, afterIniFile, format)).toBe(answerAsStylish1);
  expect(compare(emptyFile, afterJsonFile, format)).toBe(answerAsStylish2);
  expect(compare(emptyFile, afterYamlFile, format)).toBe(answerAsStylish2);
  // expect(compare(emptyFile, afterIniFile, format)).toBe(answerAsStylish2); // не тот порядок
  expect(compare(beforeJsonFile, emptyFile, format)).toBe(answerAsStylish3);
  expect(compare(beforeYamlFile, emptyFile, format)).toBe(answerAsStylish3);
  expect(compare(beforeIniFile, emptyFile, format)).toBe(answerAsStylish3);
  expect(compare(emptyFile, emptyFile, format)).toBe('');
});

test('Compare as plain format', () => {
  const format = 'plain';
  expect(compare(beforeJsonFile, afterJsonFile, format)).toBe(answerAsPlain1);
  expect(compare(beforeYamlFile, afterYamlFile, format)).toBe(answerAsPlain1);
  expect(compare(beforeIniFile, afterIniFile, format)).toBe(answerAsPlain1);
  expect(compare(emptyFile, afterJsonFile, format)).toBe(answerAsPlain2);
  expect(compare(emptyFile, afterYamlFile, format)).toBe(answerAsPlain2);
  expect(compare(emptyFile, afterIniFile, format)).toBe(answerAsPlain2);
  expect(compare(beforeJsonFile, emptyFile, format)).toBe(answerAsPlain3);
  expect(compare(beforeYamlFile, emptyFile, format)).toBe(answerAsPlain3);
  expect(compare(beforeIniFile, emptyFile, format)).toBe(answerAsPlain3);
  expect(compare(emptyFile, emptyFile, format)).toBe('');
});

test('Compare as json format', () => {
  const format = 'json';
  expect(compare(beforeJsonFile, afterJsonFile, format)).toBe(answerAsJson1);
  expect(compare(beforeYamlFile, afterYamlFile, format)).toBe(answerAsJson1);
  expect(compare(beforeIniFile, afterIniFile, format)).toBe(answerAsJson1);
  expect(compare(emptyFile, afterJsonFile, format)).toBe(answerAsJson2);
  expect(compare(emptyFile, afterYamlFile, format)).toBe(answerAsJson2);
  // expect(compare(emptyFile, afterIniFile, format)).toBe(answerAsJson2); // не тот порядок
  expect(compare(beforeJsonFile, emptyFile, format)).toBe(answerAsJson3);
  expect(compare(beforeYamlFile, emptyFile, format)).toBe(answerAsJson3);
  expect(compare(beforeIniFile, emptyFile, format)).toBe(answerAsJson3);
  expect(compare(emptyFile, emptyFile, format)).toBe('');
});
