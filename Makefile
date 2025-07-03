up:
	docker compose -f docker-compose.yml up -d --build

down:
	docker compose down

frontend-build:
	docker compose exec frontend npm run build

ls:
	@echo "process status:"; docker ps; echo;
	@echo "docker image ls"; docker image ls; echo;
	@echo "docker volume:"; docker volume ls; echo;
	@echo "docker network:"; docker network ls; echo;

logs:
	@for service in $$(docker compose config --services); do \
        echo "===== $$service ====="; \
        docker compose logs $$service; \
        echo; \
    done

log-%:
	@echo "logging service: $*"
	@docker compose logs $*

fclean:
	@echo "Deleting all the containers, images, volumes and networks..."; echo
	-docker stop $$(docker ps -qa)
	-docker rm $$(docker ps -qa)
	-docker rmi -f $$(docker images -qa)
	-docker volume rm $$(docker volume ls -q)
	-docker network rm $$(docker network ls -q) 2>/dev/null

re: down up

sh-%:
	@echo "Accessing container: $* interactive tty..."
	@docker exec -it $* sh

re-%:
	@echo "Restarting $* container..."
	@docker compose restart $*

help:
	@echo "CMD:"
	@printf "  %-20s - %s\n"	"up"				"builds and starts containers in detached mode"
	@printf "  %-20s - %s\n" 	"down"				"stops and removes containers"
	@printf "  %-20s - %s\n"	"ls"				"list process status, images, volumes and network"
	@printf "  %-20s - %s\n" 	"logs"				"logs for all containers."
	@printf "  %-20s - %s\n" 	"rm"				"rm containers, images, volumes, and network"
	@printf "  %-20s - %s\n" 	"re"				"down up"
	@printf "  %-20s - %s\n"	"sh-serviceName"	"access shell in the container"
	@printf "  %-20s - %s\n" 	"re-serviceName"	"restarts the container"
	@printf "  %-20s - %s\n" 	"log-serviceName"	"logs the service"


.PHONY: up down ls clean re help
