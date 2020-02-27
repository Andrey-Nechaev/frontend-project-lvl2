// import hasIn from 'lodash';

const fs = require('fs');

const encoding = 'utf8';

const readFile = (path) => fs.readFileSync(path, encoding);

const isJSON = (str) => str.includes('{');

export default (pathToFile1, pathToFile2) => {
  let fileContents1 = {};
  let fileContents2 = {};

  if (isJSON(readFile(pathToFile1))) fileContents1 = JSON.parse(readFile(pathToFile1));
  if (isJSON(readFile(pathToFile2))) fileContents2 = JSON.parse(readFile(pathToFile2));

  const keysOfContent1 = Object.keys(fileContents1);
  const keysOfContent2 = Object.keys(fileContents2);

  const stayedKeys = keysOfContent1.filter((k) => keysOfContent2.includes(k));
  const deletedKeys = keysOfContent1.filter((k) => !keysOfContent2.includes(k));
  const addedKeys = keysOfContent2.filter((k) => !keysOfContent1.includes(k));
  const unchangedProperties = stayedKeys.filter((k) => fileContents1[k] === fileContents2[k]);
  const changedProperties = stayedKeys.filter((k) => fileContents1[k] !== fileContents2[k]);

  const result = ['{\n'];
  unchangedProperties.map((k) => result.push(`    ${k}: ${fileContents1[k]}\n`));
  changedProperties.map((k) => {
    result.push(`  - ${k}: ${fileContents1[k]}\n`);
    return result.push(`  + ${k}: ${fileContents2[k]}\n`);
  });
  deletedKeys.map((k) => result.push(`  - ${k}: ${fileContents1[k]}\n`));
  addedKeys.map((k) => result.push(`  + ${k}: ${fileContents2[k]}\n`));
  result.push('}');
  return result.join('');
};
