all:
	cp main.scm ../../in.scm
	cd ../../ && make javascript && cp out.pretty.js demo/musicism/out.js

serve:
	cd ../../ && make serve

update:
	npm update
	./node_modules/.bin/webpack
