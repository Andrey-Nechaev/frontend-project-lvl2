import { has, hasIn } from 'lodash'; 
const fs = require('fs');
const encoding = 'utf8';

const readFile = (path) => {
	try {
    return fs.readFileSync(path, encoding);
  } catch (err) {
    console.error(err);
    console.log('Ошибка чтения, файл или путь не существует1');
  }
};

const isJSON = (str) => str.includes('{');

export default (pathToFile1, pathToFile2) => {
  let fileContents1 = {};
  let fileContents2 = {};

  if (isJSON(readFile(pathToFile1))) fileContents1 = JSON.parse(readFile(pathToFile1));
  if (isJSON(readFile(pathToFile2))) fileContents2 = JSON.parse(readFile(pathToFile2));

  const result = ['{\n'];
  for (const key in fileContents1) {
  	if (hasIn(fileContents2, key)) {
  		if (fileContents1[key] === fileContents2[key]) {
        result.push(`  ${key}: ${fileContents1[key]}\n`);
  		}
  		else {
  			result.push(`- ${key}: ${fileContents1[key]}\n`);
  			result.push(`+ ${key}: ${fileContents2[key]}\n`);
  		}
  	} else {
      result.push(`- ${key}: ${fileContents1[key]}\n`);
  	}
  }
  for (const key in fileContents2) {
  	if (!hasIn(fileContents1, key)) {
  		result.push(`+ ${key}: ${fileContents2[key]}\n`);
  	}
  }
  result.push('}');

	return result.join('');
};