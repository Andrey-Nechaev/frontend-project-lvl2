install:
	npm ci # Устанавливает npm-пакет ci - пакет для более быстрой непрерывной инеграции

start:
	make pb
	gendiff before.json after.json

build:
	rm -rf dist # Удалаяет директорию dist и все вложенные принудительно
	npm run build # Запуск скрипта build из package.json ("NODE_ENV=production babel src --out-dir dist --source-maps inline")

pb:
	npm publish --dry-run # Делает все то же самое что и npm publish, но без публикации в npm хранилище

lint:
	npx eslint . # Запуск линтера для всех файлов проекта в том числе скрытых

test:
	npm test # Запуск скрипта test из package.json ("jest")

test-coverage:
	npm test -- --coverage # Что значит -- и --coverage?

# Отвязывает от файловой структуры проекта команду test
.PHONY: test 
