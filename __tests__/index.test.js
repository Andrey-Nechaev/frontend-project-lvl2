import compare from '../src';
import readFile from '../src/modules/utils';

const path = require('path');

const emptyFile = path.join(__dirname, '/../__fixtures__/empty');
const beforeJsonFile = path.join(__dirname, '/../__fixtures__/before2.json');
const afterJsonFile = path.join(__dirname, '/../__fixtures__/after2.json');
const beforeYamlFile = path.join(__dirname, '/../__fixtures__/before.yml');
const afterYamlFile = path.join(__dirname, '/../__fixtures__/after.yml');
const beforeIniFile = path.join(__dirname, '/../__fixtures__/before.ini');
const afterIniFile = path.join(__dirname, '/../__fixtures__/after.ini');

const answerAsTree1 = readFile(path.join(__dirname, '/../__fixtures__/answerAsTree1'));
const answerAsTree2 = readFile(path.join(__dirname, '/../__fixtures__/answerAsTree2'));
const answerAsTree3 = readFile(path.join(__dirname, '/../__fixtures__/answerAsTree3'));
const answerForIni1 = readFile(path.join(__dirname, '/../__fixtures__/answerForIni1'));
const answerForIni2 = readFile(path.join(__dirname, '/../__fixtures__/answerForIni2'));
const answerForIni3 = readFile(path.join(__dirname, '/../__fixtures__/answerForIni3'));
const answerAsPlain1 = readFile(path.join(__dirname, '/../__fixtures__/answerAsPlain1'));
const answerAsPlain2 = readFile(path.join(__dirname, '/../__fixtures__/answerAsPlain2'));
const answerAsPlain3 = readFile(path.join(__dirname, '/../__fixtures__/answerAsPlain3'));
const answerForIniAsPlain1 = readFile(path.join(__dirname, '/../__fixtures__/answerForIniAsPlain1'));
const answerForIniAsPlain2 = readFile(path.join(__dirname, '/../__fixtures__/answerForIniAsPlain2'));
const answerForIniAsPlain3 = readFile(path.join(__dirname, '/../__fixtures__/answerForIniAsPlain3'));

test('CompareTreeJSON', () => {
  expect(compare(beforeJsonFile, afterJsonFile)).toBe(answerAsTree1);
  expect(compare(emptyFile, afterJsonFile)).toBe(answerAsTree2);
  expect(compare(beforeJsonFile, emptyFile)).toBe(answerAsTree3);
  expect(compare(emptyFile, emptyFile)).toBe('{\n}');
});

test('CompareTreeYAML', () => {
  expect(compare(beforeYamlFile, afterYamlFile)).toBe(answerAsTree1);
  expect(compare(emptyFile, afterYamlFile)).toBe(answerAsTree2);
  expect(compare(beforeYamlFile, emptyFile)).toBe(answerAsTree3);
  expect(compare(emptyFile, emptyFile)).toBe('{\n}');
});

test('CompareIni', () => {
  expect(compare(beforeIniFile, afterIniFile)).toBe(answerForIni1);
  expect(compare(emptyFile, afterIniFile)).toBe(answerForIni2);
  expect(compare(beforeIniFile, emptyFile)).toBe(answerForIni3);
  expect(compare(emptyFile, emptyFile)).toBe('{\n}');
});

test('CompareJsonTreeOutput', () => {
  expect(compare(beforeJsonFile, afterJsonFile, 'plain')).toBe(answerAsPlain1);
  expect(compare(emptyFile, afterJsonFile, 'plain')).toBe(answerAsPlain3);
  expect(compare(beforeJsonFile, emptyFile, 'plain')).toBe(answerAsPlain2);
  expect(compare(emptyFile, emptyFile, 'plain')).toBe('');
});

test('CompareYamlPlainOutput', () => {
  expect(compare(beforeYamlFile, afterYamlFile, 'plain')).toBe(answerAsPlain1);
  expect(compare(emptyFile, afterYamlFile, 'plain')).toBe(answerAsPlain3);
  expect(compare(beforeYamlFile, emptyFile, 'plain')).toBe(answerAsPlain2);
  expect(compare(emptyFile, emptyFile, 'plain')).toBe('');
});

test('CompareIniPlainOutput', () => {
  expect(compare(beforeIniFile, afterIniFile, 'plain')).toBe(answerForIniAsPlain1);
  expect(compare(emptyFile, afterIniFile, 'plain')).toBe(answerForIniAsPlain2);
  expect(compare(beforeIniFile, emptyFile, 'plain')).toBe(answerForIniAsPlain3);
  expect(compare(emptyFile, emptyFile, 'plain')).toBe('');
});
