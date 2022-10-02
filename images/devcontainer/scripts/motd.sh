#!/bin/sh

set -e

RED="\e[0;31m"
BLUE="\e[0;34m"
GREEN="\e[0;32m"
YELLOW="\e[0;33m"
CYAN="\e[0;36m"
WHITE="\e[0;37m"
RESET="\e[0m"

# Generate a welcome message when a new shell is opened
echo "${YELLOW}"
echo "    ____             ______                "
echo "   / __ \           |___  /                "
echo "  | |  | |_ __   ___   / / ___ _ __ ___    "
echo "  | |  | | '_ \ / _ \ / / / _ \ '__/ _ \   "
echo "  | |__| | | | |  __// /_|  __/ | | (_) |  "
echo "   \____/|_| |_|\___/_____\___|_|  \___/   "
echo ""
echo "${RESET}"
echo "Welcome to the OneZero Dev Container!"
echo "This container is running as user: ${RED}$(whoami)${RESET}"
echo ""

TOOLS=""


# If Node is installed add it to the list of tools
if command -v node > /dev/null 2>&1; then
    # If tools is not empty add a comma and a space
    if [ "${TOOLS}" != "" ]; then
        TOOLS="${TOOLS}, "
    fi
    TOOLS="${TOOLS}Node"
fi

# If NPM is installed add it to the list of tools
if command -v npm > /dev/null 2>&1; then
    # If tools is not empty add a comma and a space
    if [ "${TOOLS}" != "" ]; then
        TOOLS="${TOOLS}, "
    fi
    TOOLS="${TOOLS}NPM"
fi

# If Yarn is installed add it to the list of tools
if command -v yarn > /dev/null 2>&1; then
    # If tools is not empty add a comma and a space
    if [ "${TOOLS}" != "" ]; then
        TOOLS="${TOOLS}, "
    fi
    TOOLS="${TOOLS}Yarn"
fi

# If Flutter is installed add it to the list of tools
if command -v flutter > /dev/null 2>&1; then
    # If tools is not empty add a comma and a space
    if [ "${TOOLS}" != "" ]; then
        TOOLS="${TOOLS}, "
    fi
    TOOLS="${TOOLS}Flutter"
fi

# If Dart is installed add it to the list of tools
if command -v dart > /dev/null 2>&1; then
    # If tools is not empty add a comma and a space
    if [ "${TOOLS}" != "" ]; then
        TOOLS="${TOOLS}, "
    fi
    TOOLS="${TOOLS}Dart"
fi

# If Go is installed add it to the list of tools
if command -v go > /dev/null 2>&1; then
    # If tools is not empty add a comma and a space
    if [ "${TOOLS}" != "" ]; then
        TOOLS="${TOOLS}, "
    fi
    TOOLS="${TOOLS}Go"
fi

# If Python is installed add it to the list of tools
if command -v python > /dev/null 2>&1; then
    # If tools is not empty add a comma and a space
    if [ "${TOOLS}" != "" ]; then
        TOOLS="${TOOLS}, "
    fi
    TOOLS="${TOOLS}Python"
fi

# If Docker is installed add it to the list of tools
if command -v docker > /dev/null 2>&1; then
    # If tools is not empty add a comma and a space
    if [ "${TOOLS}" != "" ]; then
        TOOLS="${TOOLS}, "
    fi
    TOOLS="${TOOLS}Docker"
fi

# If Docker Compose is installed add it to the list of tools
if command -v docker-compose > /dev/null 2>&1; then
    # If tools is not empty add a comma and a space
    if [ "${TOOLS}" != "" ]; then
        TOOLS="${TOOLS}, "
    fi
    TOOLS="${TOOLS}Docker Compose"
fi

WORKSPACE_DIRECTORY="/workspaces/$(ls /workspaces | head -n 1)"
PROJECT="$(basename "${WORKSPACE_DIRECTORY}")"
echo "Current Project:"
echo "${BLUE}$PROJECT${RESET} - ${CYAN}${WORKSPACE_DIRECTORY}${RESET}"

echo ""
echo "Installed Tools:"
echo $TOOLS

echo ""
echo "Commands:"
echo "cdw       - return to your project directory."
echo "versions  - print all versions of installed tools."
echo "motd      - print this message."
echo ""