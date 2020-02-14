import { has, hasIn } from 'lodash'; 
const fs = require('fs');
const encoding = 'utf8';

const readFile = (path) => {
	try {
    return fs.readFileSync(path, encoding);
  } catch (err) {
    console.error(err);
  }
};

export default (pathToFile1, pathToFile2) => {
  const fileContents1 = JSON.parse(readFile(pathToFile1));
  const fileContents2 = JSON.parse(readFile(pathToFile2));

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