install:
	npm ci

start:
	make pb
	gendiff before.json after.json

build:
	rm -rf dist
	npm run build

pb:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test -- --watch

test-coverage:
	npm test -- --coverage --watch

.PHONY: test 
