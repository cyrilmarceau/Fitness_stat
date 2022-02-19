#!/bin/bash

# LOCAL
#-------------------------------------

# Export .env variables
echo -e "\n\n### 1) Export .env variables"
if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Remove node_modules folders - else DockerFile COPY is to long
# echo -e "\n\n### 2) Remove node_modules folder"
# find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Create and start containers
echo -e "\n\n### 3) BUILD then UP as daemon"
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build &&
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up