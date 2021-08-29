#!/bin/bash

# installing dependencies
printf "\nInstalling dependencies...\n"
sudo apt-get install -y python3-pyaudio
sudo apt-get install -y flac
npm install
pip3 install -r requirements.txt
printf "\nDone.\n"
