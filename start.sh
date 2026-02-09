#!/bin/bash

# Quick Start Script for Full-Stack Application
# This script helps you get started quickly

set -e

echo "🚀 Full-Stack Application Quick Start"
echo "====================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file and update your configuration"
    echo "   Especially change MONGO_ROOT_PASSWORD to a secure password!"
    echo ""
    read -p "Press enter to continue or Ctrl+C to edit .env first..."
fi

echo "🔍 Choose deployment mode:"
echo "1) Development (with hot reload) - Recommended for development"
echo "2) Production (optimized build) - For production deployment"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "🔧 Starting in DEVELOPMENT mode..."
        echo ""
        docker-compose -f docker-compose.dev.yml up --build
        ;;
    2)
        echo ""
        echo "🏭 Starting in PRODUCTION mode..."
        echo ""
        docker-compose up --build -d
        echo ""
        echo "✅ Services started successfully!"
        echo ""
        echo "📊 Service URLs:"
        echo "   Frontend: http://localhost:80"
        echo "   Backend:  http://localhost:3000"
        echo "   Health:   http://localhost:3000/health"
        echo ""
        echo "📝 View logs with: docker-compose logs -f"
        echo "🛑 Stop services with: docker-compose down"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac
