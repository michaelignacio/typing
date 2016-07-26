#!/bin/bash
set -o errexit

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"
GIT_USER_EMAIL="admin@travis-ci.org"
GIT_USER_NAME="Travis CI"
BUILD_PATH="build"
TEST_REPO_SLUG="goldylucks/typing-test"
SHA=$(git rev-parse --verify HEAD) # reference to commit deployed to TARGET_BRANCH
COMMIT_MSG="Deploy to Github Pages: ${SHA}"

# Don't deploy if
# 1. Pull request
# 2. Not target branch
if [[ ("$TRAVIS_PULL_REQUEST" != "false") || ("$TRAVIS_BRANCH" != "$SOURCE_BRANCH") ]]; then
    echo 'Not deploying';
    exit 0
fi

# config
git config --global user.email "$GIT_USER_EMAIL"
git config --global user.name "$GIT_USER_NAME"

# deploy
cd $BUILD_PATH
git init
git add .
git commit -m "$COMMIT_MSG"

# no tags, deploy to test app
if [ -z "$TRAVIS_TAG"]; then
  echo "No tag detected"
  echo "deploying to test: ${TEST_REPO_SLUG}"
  git push -f --quiet "https://${GITHUB_TOKEN}@github.com/${TEST_REPO_SLUG}.git" $SOURCE_BRANCH:$TARGET_BRANCH > /dev/null 2>&1
  exit 0
fi

# tags, release baby! deploy to LIVE app
echo "Tag detected: ${TRAVIS_TAG}"
echo "deploying to production: ${TRAVIS_REPO_SLUG}"
git push -f --quiet "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" $SOURCE_BRANCH:$TARGET_BRANCH > /dev/null 2>&1
