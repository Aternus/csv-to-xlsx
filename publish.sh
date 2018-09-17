#!/bin/bash

##
# Publish the Library to npmjs.com
###########################################################

GIT_ROOT=$(git rev-parse --show-toplevel)
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
update_version () {
    print_info "Updating version..."
    # must be run on a clean git directory
    # automatically adds a git tag
    npm version "${VERSION}"
}

publish() {
    print_info "Publishing to npmjs.com..."
    npm publish
}

git_add() {
    print_info "Adding files to git, committing changes..."
    cd ${GIT_ROOT}
    git add .
    git commit -m "version ${VERSION}"
}

git_push() {
    print_info "Pushing to remote..."
    cd ${GIT_ROOT}
    git push
}

git_push_tags() {
    print_info "Pushing tags to remote..."
    cd ${GIT_ROOT}
    git push --prune --tags
}

##
# Run
##
build
git_add
update_version && publish && git_push && git_push_tags && print_success "Complete."
