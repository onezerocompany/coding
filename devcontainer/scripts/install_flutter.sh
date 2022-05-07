#!/bin/bash

INSTALL=$(printenv INSTALL_FLUTTER)

# Stop gracefull if INSTALL_NODE is not true
if [ "$INSTALL" != "true" ]; then
  echo "Skipping Flutter & Dart installation"
  exit 0
fi

VERSION=$(printenv FLUTTER_VERSION)
CHANNEL=$(printenv FLUTTER_CHANNEL)

cd /home/vscode

# Download the release
curl -L -o flutter.tar.xz "https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_$VERSION-stable.tar.xz"
tar -xf flutter.tar.xz
rm flutter.tar.xz
mv flutter .flutter

# Add path to bash and zsh
echo "export PATH=\"$HOME/.flutter/bin:\$PATH\"\\n" >> ~/.bashrc
echo "export PATH=\"$HOME/.flutter/bin:\$PATH\"\\n" >> ~/.zshrc

# Pre-download development binaries
/home/vscode/.flutter/bin/flutter precache

# Return to home folder
cd ~