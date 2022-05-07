#!/bin/bash

INSTALL=$(printenv INSTALL_NODE)

# Stop gracefull if INSTALL_NODE is not true
if [ "$INSTALL" != "true" ]; then
  echo "Skipping NVM installation"
  exit 0
fi

# Install curl if needed
if ! command -v curl > /dev/null; then
  echo "Installing curl..."
  apt-get update
  apt-get install -y curl
fi

# Install using the script but do not touch the profiles
export PROFILE="/dev/null"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

SOURCE_STR="\\nexport NVM_DIR=\"${HOME}/.nvm\"\\n[ -s \"\$NVM_DIR/nvm.sh\" ] && \\. \"\$NVM_DIR/nvm.sh\"  # This loads nvm\\n"
COMPLETION_STR="[ -s \"\$NVM_DIR/bash_completion\" ] && \\. \"\$NVM_DIR/bash_completion\"  # This loads nvm bash_completion\\n"

# Install into bash profile if possible
if command -v bash > /dev/null; then
  echo "Installing nvm into bash profile..."
  command printf "$SOURCE_STR" >> ~/.bashrc
  command printf "$COMPLETION_STR" >> ~/.bashrc
  command cat /home/vscode/scripts/nvm-scripts/nvm-load-bash >> ~/.bashrc
fi

# Install into zsh if possible
if command -v zsh > /dev/null; then
  echo "Installing nvm into zsh..."
  command printf "$SOURCE_STR" >> ~/.zshrc
  command printf "$COMPLETION_STR" >> ~/.zshrc
  command cat /home/vscode/scripts/nvm-scripts/nvm-load-zsh >> ~/.zshrc
fi