#!/bin/bash

# Workspace directory is either 'WORKSPACE_DIR' or the first directory in the workspaces folder
WORKSPACE_DIRECTORY=${WORKSPACE_DIR:-$(ls -d /workspaces/* | head -n 1)}

PROJECT="$(basename "${WORKSPACE_DIRECTORY}")"
CURRENT_DIRECTORY="$(pwd)"

# Replace the occurences of the workspace directory with a tilde
PROMPT="%F{blue}$PROJECT%f"

# If the current directory is the workspace directory then just show the project name
if [ "${CURRENT_DIRECTORY}" != "${WORKSPACE_DIRECTORY}" ]; then
    # Replace the occurences of the workspace directory with nothing
    SANITIZED_DIRECTORY="${CURRENT_DIRECTORY/$WORKSPACE_DIRECTORY\//}"
    PROMPT="$PROMPT %F{black}$SANITIZED_DIRECTORY%f"
fi

echo "${PROMPT} → "