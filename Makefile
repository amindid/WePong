.PHONY: all setup up down clean clean_all re

all: up setup

setup:
	bash ./elk_setup.sh

up:
	@docker compose -f ./docker-compose.yml up -d --build

down:
	@docker compose -f ./docker-compose.yml down

clean:
	@docker compose -f ./docker-compose.yml down -v

clean_all: clean
	@docker system prune -af

reset: clean_all all

re: down all