#!/bin/bash

if [ "$1" == "init" ]; then
  # start up docker containers
  docker compose -p chis-interop -f ./docker/docker-compose.yml up -d

  # configuring OpenHIM instance
  cd configurator && npm i && npm start && cd ..

  docker compose -p chis-interop -f ./mediator/docker-compose.yml up -d --build
elif [ "$1" == "up" ]; then
  docker compose -p chis-interop -f ./docker/docker-compose.yml -f ./mediator/docker-compose.yml up -d
elif [ "$1" == "up-dev" ]; then
  docker compose -p chis-interop -f ./docker/docker-compose.yml up -d
  docker compose -p chis-interop -f ./mediator/docker-compose.yml up -d --build
elif [ "$1" == "down" ]; then
  docker compose -p chis-interop -f ./docker/docker-compose.yml -f ./mediator/docker-compose.yml stop
elif [ "$1" == "destroy" ]; then
  docker compose -p chis-interop -f ./docker/docker-compose.yml -f ./mediator/docker-compose.yml down -v
else 
  echo "Invalid option $1
  
  Help:

  init      starts the docker containers and configures OpenHIM
  up        starts the docker containers
  down      stops the docker containers
  destroy   shutdown the docker containers and deletes volumes
  "
fi
