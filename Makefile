build:
	./node_modules/.bin/grunt

dev:
	./node_modules/.bin/grunt dev

publish: build
	./node_modules/.bin/grunt gh-pages
