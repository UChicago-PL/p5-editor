#!/bin/sh
docker compose -f docker-compose-development.yml exec app node server/scripts/add-course-edition.mjs "$@"
