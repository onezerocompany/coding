#!/bin/bash

INSTALL=$(printenv INSTALL_BUN)

# Stop gracefull if INSTALL_BUN is not true
if [ "$INSTALL" != "true" ]; then
  echo "Skipping Bun installation"
  exit 0
fi

# Install Bun
curl https://bun.sh/install | bash