#!make
include ../../.env.local

.PHONY: run pull stop kill clean-all remove-image
.DEFAULT_GOAL := run

COMPOSE_FILES := -f docker-compose.yml

run:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) up -d

pull:
	docker-compose -p $(PROJECT_NAME) pull app

stop:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) stop

restart:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) restart

kill:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) kill

remove-image:
	docker rmi -f relli/$(PROJECT_NAME):latest

clean-all:
	docker-compose -p $(PROJECT_NAME) $(COMPOSE_FILES) down --rmi all --remove-orphans --volumes
