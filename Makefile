
test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter spec

build: index.js components
	@component build --dev

components:
	@component install --dev

clean:
	rm -fr build components pixcha.js

build-standalone:
	@component build --standalone pixcha --out . --name pixcha


.PHONY: test