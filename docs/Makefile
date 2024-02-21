# Inspired by Supabase's documenation spec Makefile.
# Just run `make`.

REPO_DIR=$(shell cd .. && pwd)

run: download format

###############################################################################
# Init - prepare the environment
###############################################################################

init:
	cd $(REPO_DIR)/parser && npm install

###############################################################################
# Download all the specs
###############################################################################
download: download.sources download.destinations download.api

download.api:
	curl -sS http://localhost:3001/swagger > $(REPO_DIR)/docs/api_v1_openapi.json

download.sources:
	curl -sS http://localhost:3001/catalog/sources?abc=135456183495185 > $(REPO_DIR)/catalog/sources.json

download.destinations:
	curl -sS http://localhost:3001/catalog/destinations?abc=135456183495185 > $(REPO_DIR)/catalog/destinations.json

###############################################################################
# Format everything - easier for git to track changes.
###############################################################################
format:
	npx prettier --write .
