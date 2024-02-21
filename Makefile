# Inspired by Supabase's documenation spec Makefile.
# Just run `make`.

LIB_DIR=$(shell cd handshake && pwd)
ROOT_DIR=$(shell pwd)

run: download format

###############################################################################
# Init - prepare the environment
###############################################################################

init:
	echo "nothing"

###############################################################################
# Generate the PROVIDERS.md file
###############################################################################
providers-md: typedoc-providers typedoc-to-md

typedoc-providers:
	cd $(LIB_DIR) && npx typedoc --json $(ROOT_DIR)/typedoc.json $(LIB_DIR)/src/providers/index.ts

typedoc-to-md:
	echo "javascript or typescript" > $(ROOT_DIR)/fuck.md

###############################################################################
# Format everything - easier for git to track changes.
###############################################################################
format:
	npx prettier --write .
