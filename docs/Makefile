# Just run `make`.

PWD=$(shell pwd)
LIB_DIR=$(shell cd ../handshake && pwd)
ROOT_DIR=$(shell cd .. && pwd)

run: typedoc-providers parse

###############################################################################
# Generate the docs/providers.json file
###############################################################################
typedoc-providers:
	cd $(LIB_DIR) && npx typedoc --json $(PWD)/bin/providers-typedoc.json $(LIB_DIR)/src/providers/index.ts --options $(PWD)/bin/typedoc.json

parse:
	bun run bin/parse-typedocs.ts
	echo "done"

###############################################################################
# Format everything - easier for git to track changes.
###############################################################################
format:
	npx prettier --write .
