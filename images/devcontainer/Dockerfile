ARG VARIANT=bullseye
FROM debian:${VARIANT}

ARG INSTALL_ZSH="true"
ARG UPGRADE_PACKAGES="true"

# Users & Groups
ARG USERNAME=codespace
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Setup install scripts
ENV SCRIPTS_FOLDER=/root/scripts
COPY scripts $SCRIPTS_FOLDER
RUN chmod +x -R $SCRIPTS_FOLDER

# Install dependencies 
RUN $SCRIPTS_FOLDER/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" "true" "true"

# Node
ARG INSTALL_NODE="false"
ARG NODE_VERSION="16"
ARG NVM_VERSION="0.38.0"
ARG NVM_DIR="/usr/local/share/nvm"
RUN $SCRIPTS_FOLDER/node-debian.sh "${INSTALL_NODE}" "${NVM_DIR}" "${NVM_VERSION}" "${NODE_VERSION}" "${USERNAME}" "true" "true" "${SCRIPTS_FOLDER}"

# Docker
ARG INSTALL_DOCKER="false"
ARG DOCKER_VERSION="latest"
ENV DOCKER_BUILDKIT=1
RUN $SCRIPTS_FOLDER/docker-in-docker-debian.sh "${INSTALL_DOCKER}" "true" "${USERNAME}" "true" "${DOCKER_VERSION}" "v2"

# Flutter & Dart
ARG INSTALL_FLUTTER="false"
ARG FLUTTER_CHANNEL="stable"
ARG FLUTTER_VERSION="2.10.5"
RUN ~/scripts/flutter-debian.sh "${INSTALL_FLUTTER}" "${FLUTTER_CHANNEL}" "${FLUTTER_VERSION}" "${USERNAME}"

# Cleanup
RUN apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*
RUN rm -rf "$SCRIPTS_FOLDER"

VOLUME [ "/var/lib/docker" ]

# Default shell to use
ENV SHELL=/bin/zsh

ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]
