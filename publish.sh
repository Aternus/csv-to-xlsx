#!/bin/bash

##
# Publish the Library to npmjs.com
###########################################################

VERSION=$1

##
# Helper Functions
##
print_info() {
    # blue
    echo -e "\e[96m-=> $1\e[39m"
}

print_success() {
    echo -e "\e[92m-=> $1\e[39m"
}

##
# Functions
##
version () {
    print_info "Updating version..."
    # must be run on a clean git directory
    # see package.json for preversion, version and postversion scripts
    # git: auto commit
    # git: auto tag
    npm version --force "${VERSION}"
}

publish() {
    print_info "Publishing to npmjs.com..."
    npm publish
}

##
# Run
##
version && publish && print_success "Complete."
