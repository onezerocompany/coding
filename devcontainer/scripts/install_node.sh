#!/bin/bash

INSTALL=$(printenv INSTALL_NODE)
DEFAULT_VERSION=$(printenv NODE_VERSION)

# Stop gracefull if INSTALL_NODE is not true
if [ "$INSTALL" != "true" ]; then
  echo "Skipping Node.js installation"
  exit 0
fi

. /home/vscode/.nvm/nvm.sh

# Install Node.js 14, 16, 18, lts and default version
for version in 14 16 18 $DEFAULT_VERSION; do
  echo "Installing Node.js $version..."
  nvm install $version
done

# Install lts
nvm install --lts

# Set default version
nvm alias default "$DEFAULT_VERSION"