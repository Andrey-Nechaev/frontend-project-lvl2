// import hasIn from 'lodash';
import parseContentOf from './modules/parsers';

// const isJSON = (str) => str.includes('{');

export default (pathToFile1, pathToFile2) => {
  const fileContents1 = parseContentOf(pathToFile1);
  const fileContents2 = parseContentOf(pathToFile2);

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
