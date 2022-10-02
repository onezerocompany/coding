#!/bin/bash

SCRIPTS_FOLDER=${1:-"/root/scripts"}
PERMANENT_SCRIPT_FOLDER="/opt/scripts"

mkdir -p $PERMANENT_SCRIPT_FOLDER

cp $SCRIPTS_FOLDER/motd.sh $PERMANENT_SCRIPT_FOLDER/motd.sh
chmod +x $PERMANENT_SCRIPT_FOLDER/motd.sh
echo "$PERMANENT_SCRIPT_FOLDER/motd.sh" >> /etc/zsh/zshrc
echo "$PERMANENT_SCRIPT_FOLDER/motd.sh" >> /etc/profile

# Add alias for cd to the first workspace folder
echo "alias cdw='cd /workspaces/\$(ls /workspaces | head -n 1)'" >> /etc/zsh/zshenv
echo "alias cdw='cd /workspaces/\$(ls /workspaces | head -n 1)'" >> /etc/profile

# Add alias for motd
echo "alias motd='$PERMANENT_SCRIPT_FOLDER/motd.sh'" >> /etc/zsh/zshenv
echo "alias motd='$PERMANENT_SCRIPT_FOLDER/motd.sh'" >> /etc/profile

# Add alias for versions print
cp $SCRIPTS_FOLDER/versions.sh $PERMANENT_SCRIPT_FOLDER/versions.sh
chmod +x $PERMANENT_SCRIPT_FOLDER/versions.sh
echo "alias versions='$PERMANENT_SCRIPT_FOLDER/versions.sh'" >> /etc/zsh/zshenv
echo "alias versions='$PERMANENT_SCRIPT_FOLDER/versions.sh'" >> /etc/profile

# Replace the project folder with a tilde
cp $SCRIPTS_FOLDER/prompt.sh $PERMANENT_SCRIPT_FOLDER/prompt.sh
chmod +x $PERMANENT_SCRIPT_FOLDER/prompt.sh

# Turn on prompt expansion
echo "setopt PROMPT_SUBST" >> /etc/zsh/zshrc

# Add the prompt to the zshenv
echo "export PROMPT='\$($PERMANENT_SCRIPT_FOLDER/prompt.sh)'" >> /home/codespace/.zshrc