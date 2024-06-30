#!make
include ../../.env.local

.PHONY: run build stop restart kill clean-all
.DEFAULT_GOAL := run

COMPOSE_FILES := -f docker-compose.yml

run:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) up -d
	@echo "Open http://localhost or http://zkusebna.local if you have a proxy"

build:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) build

stop:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) stop

restart:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) restart

kill:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) kill

clean-all:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) down --rmi all --remove-orphans --volumes
