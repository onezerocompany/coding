#!/usr/bin/env bash

INSTALL=${1:-"false"}
CHANNEL=${2:-"stable"}
VERSION=${3:-"3.3.3"}
USERNAME=${4:-"automatic"}
export FLUTTER_HOME=/opt/flutter
export FLUTTER_WEB="enable"
export PATH=${PATH}:${FLUTTER_HOME}/bin

set -e

if [ "$(id -u)" -ne 0 ]; then
    echo -e 'Script must be run as root. Use sudo, su, or add "USER root" to your Dockerfile before running this script.'
    exit 1
fi

# Stop gracefull if INSTALL_NODE is not true
if [ "$INSTALL" != "true" ]; then
    echo "Skipping Flutter & Dart installation"
    exit 0
fi

# Determine the appropriate non-root user
if [ "${USERNAME}" = "auto" ] || [ "${USERNAME}" = "automatic" ]; then
    USERNAME=""
    POSSIBLE_USERS=("vscode" "node" "codespace" "$(awk -v val=1000 -F ":" '$3==val{print $1}' /etc/passwd)")
    for CURRENT_USER in ${POSSIBLE_USERS[@]}; do
        if id -u ${CURRENT_USER} > /dev/null 2>&1; then
            USERNAME=${CURRENT_USER}
            break
        fi
    done
    if [ "${USERNAME}" = "" ]; then
        USERNAME=root
    fi
elif [ "${USERNAME}" = "none" ] || ! id -u ${USERNAME} > /dev/null 2>&1; then
    USERNAME=root
fi

# Function to run apt-get if needed
apt_get_update_if_needed()
{
    if [ ! -d "/var/lib/apt/lists" ] || [ "$(ls /var/lib/apt/lists/ | wc -l)" = "0" ]; then
        echo "Running apt-get update..."
        apt-get update
    else
        echo "Skipping apt-get update."
    fi
}

# Checks if packages are installed and installs them if not
check_packages() {
    if ! dpkg -s "$@" > /dev/null 2>&1; then
        apt_get_update_if_needed
        apt-get -y install --no-install-recommends "$@"
    fi
}

# Ensure apt is in non-interactive to avoid prompts
export DEBIAN_FRONTEND=noninteractive

# Install dependencies
check_packages curl xz-utils

cd /opt

# Download the release
curl -C - --output flutter.tar.xz "https://storage.googleapis.com/flutter_infra_release/releases/$CHANNEL/linux/flutter_linux_$VERSION-stable.tar.xz"
tar xf flutter.tar.xz -C .
rm flutter.tar.xz

# Set permissions
chown -R ${USERNAME} ${FLUTTER_HOME}

# Accept the Android SDK licenses 
# yes | flutter doctor --android-licenses

# Disable analytics, run command as codespace
# flutter config --no-analytics
su ${USERNAME} -c "flutter config --no-analytics"

# Enable web support
if [ "$FLUTTER_WEB" = "enable" ]; then su ${USERNAME} -c "flutter config --enable-web"; fi

# Pre-download development binaries
su ${USERNAME} -c "flutter precache"