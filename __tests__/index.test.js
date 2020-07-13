import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import compare from '../src';

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

test.each`
  inputType | outputType
  ${'json'} | ${'stylish'}
  ${'json'} | ${'plain'}
  ${'json'} | ${'json'}
  ${'yml'}  | ${'stylish'}
  ${'yml'}  | ${'plain'}
  ${'yml'}  | ${'json'}
  ${'ini'}  | ${'stylish'}
  ${'ini'}  | ${'plain'}
  ${'ini'}  | ${'json'}
`('Compare $inputType, $outputType output', ({ inputType, outputType }) => {
  const path1 = getFixturePath(`before.${inputType}`);
  const path2 = getFixturePath(`after.${inputType}`);
  const expected = readFile(getFixturePath(`answerAs${_.capitalize(outputType)}`));
  expect(compare(path1, path2, outputType)).toBe(expected);
});
