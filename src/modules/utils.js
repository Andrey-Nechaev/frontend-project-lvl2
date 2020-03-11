const fs = require('fs');

const encoding = 'utf8';
export default (pathToFile) => fs.readFileSync(pathToFile, encoding);
