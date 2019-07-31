.PHONY: scheme

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

nodejs:
	whereis nodejs

submodules:
	git submodule update --init

init: submodules ## Initialize the repository and spawn a shell with the correct environment variables
	@echo "\033[36mRunning your favorite shell...\033[0m"
	./env.sh

check:  submodules nodejs ## run the tests
	./env.sh ./make-check.sh
	@echo "\033[36mwin\033[0m"

run: ## compile `in.scm` to javascript to `out.js`
	./env.sh scheme --script rusec.scm javascript in.scm > program.js
	cat prelude.js program.js postlude.js > out.js
	nodejs out.js

debug: ## debug output
	./env.sh scheme --script rusec.scm javascript in.scm

scheme: ## show the translation to scheme
	./env.sh scheme --script rusec.scm scheme in.scm

javascript: ## show javascript
	whereis prettier # npm install -g prettier
	./env.sh scheme --script rusec.scm javascript in.scm > program.js
	cat prelude.js program.js postlude.js > out.js
	prettier out.js > out.pretty.js

serve:
	python3 -m http.server
