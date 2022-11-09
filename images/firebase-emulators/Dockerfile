FROM node:16

# Set the working directory
WORKDIR /workspace

# Expose emulator ports
EXPOSE 9000
EXPOSE 9001 
EXPOSE 9002
EXPOSE 9003
EXPOSE 9004
EXPOSE 9005
EXPOSE 9006

# Install the firebase cli
RUN npm install -g firebase-tools
RUN mkdir -p /emulators
RUN chown -R node:node /emulators

# Install latest jre on debian
RUN apt-get update && apt-get install -y openjdk-11-jre-headless bash

# Cleanup apt-get
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Setup emulators
RUN firebase setup:emulators:firestore && \
    firebase setup:emulators:pubsub && \
    firebase setup:emulators:storage && \
    firebase setup:emulators:ui

USER node
VOLUME ["/emulators/data"]