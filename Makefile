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
	# check that the tests did not change results files
	git diff --quiet ./tests/
	@echo "\033[36mwin\033[0m"

run: ruse.scm in.scm  ## compile `in.scm` to javascript to `out.js`
	./env.sh scheme --script ruse.scm javascript in.scm > program.js
	cat prelude.js program.js postlude.js > out.js
	nodejs out.js
