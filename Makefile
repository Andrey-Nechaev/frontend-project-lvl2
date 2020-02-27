install:
	npm ci

sj:
	make pb
	gendiff __fixtures__/before.json __fixtures__/after.json
sy:
	make pb
	gendiff __fixtures__/before.yml __fixtures__/after.yml

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
