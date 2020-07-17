import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import render from './formatters/index';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const buildDiffs = (content1, content2) => {
  const keysOfcontent1 = Object.keys(content1);
  const keysOfcontent2 = Object.keys(content2);
  const allUniqueKeys = _.union(keysOfcontent1, keysOfcontent2);

  return allUniqueKeys.map((key) => {
    if (_.has(content1, key) && !_.has(content2, key)) {
      return {
        name: key,
        type: 'removed',
        value: content1[key],
      };
    }
    if (!_.has(content1, key) && _.has(content2, key)) {
      return {
        name: key,
        type: 'added',
        value: content2[key],
      };
    }
    if (content1[key] === content2[key]) {
      return {
        name: key,
        type: 'unchanged',
        value: content1[key],
      };
    }
    if (_.isObject(content1[key]) && _.isObject(content2[key])) {
      return {
        name: key,
        type: 'inner',
        children: buildDiffs(content1[key], content2[key]),
      };
    }
    return {
      name: key,
      type: 'changed',
      oldValue: content1[key],
      newValue: content2[key],
    };
  });
};

export default (pathToFile1, pathToFile2, outputFormat) => {
  const contentOfFile1 = readFile(pathToFile1);
  const contentOfFile2 = readFile(pathToFile2);
  const typeOfFile1 = path.extname(pathToFile1).slice(1).toLowerCase();
  const typeOfFile2 = path.extname(pathToFile2).slice(1).toLowerCase();
  const parsedContent1 = parse(contentOfFile1, typeOfFile1);
  const parsedContent2 = parse(contentOfFile2, typeOfFile2);
  const data = buildDiffs(parsedContent1, parsedContent2);
  return render(data, outputFormat);
};
