import CompareFlattenJSON from '../src/index.js'
const path = require('path');

const answear1 = '{\n  host: hexlet.io\n- timeout: 50\n+ timeout: 20\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true\n}';
const answear2 = '{\n+ timeout: 20\n+ verbose: true\n+ host: hexlet.io\n}';
const answear3 = '{\n- host: hexlet.io\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n}';
const path1 = path.join(__dirname, `/../__fixtures__/before.json`);
const path2 = path.join(__dirname, `/../__fixtures__/after.json`);
const emptyFile = path.join(__dirname, `/../__fixtures__/empty.json`);

test('CompareFlattenJSON', () => {
	expect(CompareFlattenJSON(path1, path2)).toBe(answear1);
	expect(CompareFlattenJSON(emptyFile, path2)).toBe(answear2);
	expect(CompareFlattenJSON(path1, emptyFile)).toBe(answear3);
	expect(CompareFlattenJSON(emptyFile, emptyFile)).toBe('{\n}');
});

 
