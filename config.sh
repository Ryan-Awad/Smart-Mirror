#!/bin/bash

# installing dependencies
printf "\nInstalling dependencies...\n"
sudo apt-get install -y python3-pyaudio
sudo apt-get install -y flac
npm install
pip3 install -r requirements.txt

# generating the API token
printf "Generating secret Smart Mirror token:\n"
printf "* We need a secret string of characters to factor in generating the token. *\n"
digits_space=$(shuf -i 10000-99999 -n 10)
digits=$(echo $digits_space | sed 's/ //g')
read -p "Secret string of characters (keeping this empty is NOT recommended): " secret
key=${digits}${secret}
token_unclean=$(echo $key | base64)
token=$(echo $token_unclean | sed 's/ //g')
mkdir auth
cd auth && echo '{"token":"'${token}'"}' > token.json
printf "\nHere is your token. KEEP IT SAFE! (required in any Smart Mirror app):\n"
printf $token
printf "\n\nTo regenerate another token, simply run this file again.\n"
