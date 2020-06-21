install:
	npm ci

json:
	make pb
	gendiff __fixtures__/before.json __fixtures__/after.json
	
json-tree:
	make pb
	gendiff --format stylish __fixtures__/before.json __fixtures__/after.json

json-plain:
	make pb
	gendiff --format plain __fixtures__/before.json __fixtures__/after.json

json-json:
	make pb
	gendiff --format json __fixtures__/before.json __fixtures__/after.json

yaml:
	make pb
	gendiff __fixtures__/before.yml __fixtures__/after.yml	
	
yaml-tree:
	make pb
	gendiff --format stylish __fixtures__/before.yml __fixtures__/after.yml
	
yaml-plain:
	make pb
	gendiff --format plain __fixtures__/before.yml __fixtures__/after.yml

yaml-json:
	make pb
	gendiff --format json __fixtures__/before.yml __fixtures__/after.yml
	
ini:
	make pb
	gendiff __fixtures__/before.ini __fixtures__/after.ini

ini-tree:
	make pb
	gendiff --format stylish __fixtures__/before.ini __fixtures__/after.ini

ini-plain:
	make pb
	gendiff --format plain __fixtures__/before.ini __fixtures__/after.ini
	
ini-json:
	make pb
	gendiff --format json __fixtures__/before.ini __fixtures__/after.ini

build:
	rm -rf dist
	npm run build

pb:
	npm publish --dry-run

lint:
	npx eslint .

test:
	make pb
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: test 
