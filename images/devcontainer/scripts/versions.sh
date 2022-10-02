#!/bin/bash

# If node is installed print the version
if command -v node > /dev/null 2>&1; then
    echo "Node $(node --version)"
fi

# If npm is installed print the version
if command -v npm > /dev/null 2>&1; then
    echo "NPM $(npm --version)"
fi

# If yarn is installed print the version
if command -v yarn > /dev/null 2>&1; then
    echo "Yarn $(yarn --version)"
fi

# If flutter is installed print the version
if command -v flutter > /dev/null 2>&1; then
    echo "Flutter $(flutter --version)"
fi

# If dart is installed print the version
if command -v dart > /dev/null 2>&1; then
    echo "Dart $(dart --version)"
fi

# If go is installed print the version
if command -v go > /dev/null 2>&1; then
    echo "Go $(go version)"
fi

# If python is installed print the version
if command -v python > /dev/null 2>&1; then
    echo "Python $(python --version)"
fi

# If pip is installed print the version
if command -v pip > /dev/null 2>&1; then
    echo "Pip $(pip --version)"
fi

# If docker is installed print the version
if command -v docker > /dev/null 2>&1; then
    echo "Docker $(docker --version)"
fi

# If docker-compose is installed print the version
if command -v docker-compose > /dev/null 2>&1; then
    echo "Docker Compose $(docker-compose --version)"
fi

# If go is installed print the version
if command -v go > /dev/null 2>&1; then
    echo "Go $(go version)"
fi