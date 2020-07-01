install:
	npm ci

json:
	npx babel-node src/bin/gendiff __fixtures__/before.json __fixtures__/after.json
	
json-tree:
	npx babel-node src/bin/gendiff --format stylish __fixtures__/before.json __fixtures__/after.json

json-plain:
	npx babel-node src/bin/gendiff --format plain __fixtures__/before.json __fixtures__/after.json

json-json:
	npx babel-node src/bin/gendiff --format json __fixtures__/before.json __fixtures__/after.json

yaml:
	npx babel-node src/bin/gendiff __fixtures__/before.yml __fixtures__/after.yml	
	
yaml-tree:
	npx babel-node src/bin/gendiff --format stylish __fixtures__/before.yml __fixtures__/after.yml
	
yaml-plain:
	npx babel-node src/bin/gendiff --format plain __fixtures__/before.yml __fixtures__/after.yml

yaml-json:
	npx babel-node src/bin/gendiff --format json __fixtures__/before.yml __fixtures__/after.yml
	
ini:
	npx babel-node src/bin/gendiff __fixtures__/before.ini __fixtures__/after.ini

ini-tree:
	npx babel-node src/bin/gendiff --format stylish __fixtures__/before.ini __fixtures__/after.ini

ini-plain:
	npx babel-node src/bin/gendiff --format plain __fixtures__/before.ini __fixtures__/after.ini
	
ini-json:
	npx babel-node src/bin/gendiff --format json __fixtures__/before.ini __fixtures__/after.ini

build:
	rm -rf dist
	npm run build

pb:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: test 
