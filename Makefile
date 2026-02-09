# Makefile for Full-Stack Application

.PHONY: help dev prod stop clean logs install backend-logs frontend-logs mongo-shell

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies for both frontend and backend
	@echo "Installing frontend dependencies..."
	npm install
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "✅ All dependencies installed"

dev: ## Start development environment with hot reload
	docker-compose -f docker-compose.dev.yml up --build

prod: ## Start production environment
	docker-compose up --build -d

stop: ## Stop all services
	docker-compose -f docker-compose.dev.yml down
	docker-compose down

clean: ## Stop services and remove volumes
	docker-compose -f docker-compose.dev.yml down -v
	docker-compose down -v
	@echo "✅ Cleaned up all containers and volumes"

logs: ## View logs from all services
	docker-compose logs -f

backend-logs: ## View backend logs only
	docker-compose logs -f backend

frontend-logs: ## View frontend logs only
	docker-compose logs -f frontend

mongo-logs: ## View MongoDB logs only
	docker-compose logs -f mongodb

mongo-shell: ## Access MongoDB shell
	docker-compose exec mongodb mongosh -u admin -p password

backend-shell: ## Access backend container shell
	docker-compose exec backend sh

health: ## Check backend health
	@curl -s http://localhost:3000/health | json_pp || echo "Backend not running"

test-api: ## Test API endpoints
	@echo "Testing health endpoint..."
	@curl -s http://localhost:3000/health
	@echo "\n\nGetting items..."
	@curl -s http://localhost:3000/api/items

rebuild: ## Rebuild specific service (usage: make rebuild SERVICE=backend)
	docker-compose build $(SERVICE)
	docker-compose up -d $(SERVICE)

ps: ## Show running containers
	docker-compose ps

restart: stop prod ## Restart production environment

dev-restart: ## Restart development environment
	docker-compose -f docker-compose.dev.yml restart

# Local development (without Docker)
local-backend: ## Run backend locally (requires MongoDB)
	cd backend && npm run dev

local-frontend: ## Run frontend locally
	npm run dev
