FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-22.04

# Define SDK versions to install
ARG INSTALL_NODE="true"
ARG NODE_VERSION="16"

ARG INSTALL_FLUTTER="true"
ARG FLUTTER_CHANNEL="stable"
ARG FLUTTER_VERSION="2.10.5"

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Use bash as the default shell
SHELL ["/bin/bash", "-c"]

# Setup scripts
COPY scripts /home/vscode/scripts
RUN chmod +x -R /home/vscode/scripts

USER vscode

# Install dependencies 
RUN ~/scripts/install_tools.sh
RUN ~/scripts/install_nvm.sh
RUN ~/scripts/install_node.sh
RUN ~/scripts/install_flutter.sh

# Cleanup
USER root
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN rm -rf /home/vscode/scripts

# Default shell to use while developing
USER vscode
ENV SHELL=/bin/zsh

