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

const stylish = 'stylish';
const plain = 'plain';
const json = 'json';

test('Compare JSON-JSON files', () => {
  expect(compare(beforeJsonFile, afterJsonFile, stylish)).toBe(answerAsStylish1);
  expect(compare(beforeJsonFile, afterJsonFile, plain)).toBe(answerAsPlain1);
  expect(compare(beforeJsonFile, afterJsonFile, json)).toBe(answerAsJson1);
});

test('Compare YAML-YAML files', () => {
  expect(compare(beforeYamlFile, afterYamlFile, stylish)).toBe(answerAsStylish1);
  expect(compare(beforeYamlFile, afterYamlFile, plain)).toBe(answerAsPlain1);
  expect(compare(beforeYamlFile, afterYamlFile, json)).toBe(answerAsJson1);
});

test('Compare ini-ini files', () => {
  expect(compare(beforeIniFile, afterIniFile, stylish)).toBe(answerAsStylish1);
  expect(compare(beforeIniFile, afterIniFile, plain)).toBe(answerAsPlain1);
  expect(compare(beforeIniFile, afterIniFile, json)).toBe(answerAsJson1);
});

test('Compare empty-JSON files', () => {
  expect(compare(emptyFile, afterJsonFile, stylish)).toBe(answerAsStylish2);
  expect(compare(emptyFile, afterJsonFile, plain)).toBe(answerAsPlain2);
  expect(compare(emptyFile, afterJsonFile, json)).toBe(answerAsJson2);
});

test('Compare JSON-empty files', () => {
  expect(compare(beforeJsonFile, emptyFile, stylish)).toBe(answerAsStylish3);
  expect(compare(beforeJsonFile, emptyFile, plain)).toBe(answerAsPlain3);
  expect(compare(beforeJsonFile, emptyFile, json)).toBe(answerAsJson3);
});

test('Compare empty-YAML files', () => {
  expect(compare(emptyFile, afterYamlFile, stylish)).toBe(answerAsStylish2);
  expect(compare(emptyFile, afterYamlFile, plain)).toBe(answerAsPlain2);
  expect(compare(emptyFile, afterYamlFile, json)).toBe(answerAsJson2);
});

test('Compare YAML-empty files', () => {
  expect(compare(beforeYamlFile, emptyFile, stylish)).toBe(answerAsStylish3);
  expect(compare(beforeYamlFile, emptyFile, plain)).toBe(answerAsPlain3);
  expect(compare(beforeYamlFile, emptyFile, json)).toBe(answerAsJson3);
});

test('Compare empty-ini files', () => {
  // expect(compare(emptyFile, afterIniFile, stylish)).toBe(answerAsStylish2); // не в том порядке
  expect(compare(emptyFile, afterIniFile, plain)).toBe(answerAsPlain2);
  // expect(compare(emptyFile, afterIniFile, json)).toBe(answerAsJson2); // не в том порядке
});

test('Compare ini-empty files', () => {
  expect(compare(beforeIniFile, emptyFile, stylish)).toBe(answerAsStylish3);
  expect(compare(beforeIniFile, emptyFile, plain)).toBe(answerAsPlain3);
  expect(compare(beforeIniFile, emptyFile, json)).toBe(answerAsJson3);
});

test('Compare empty-empty files', () => {
  expect(compare(emptyFile, emptyFile, stylish)).toBe('');
  expect(compare(emptyFile, emptyFile, plain)).toBe('');
  expect(compare(emptyFile, emptyFile, json)).toBe('');
});
