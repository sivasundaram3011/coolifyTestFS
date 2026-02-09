#!/bin/bash

# Deployment Readiness Verification Script
# This script checks if your template is ready for Coolify deployment

echo "🔍 Verifying Deployment Readiness..."
echo "=================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1"
        return 0
    else
        echo -e "${RED}✗${NC} Missing: $1"
        ((ERRORS++))
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1/"
        return 0
    else
        echo -e "${RED}✗${NC} Missing: $1/"
        ((ERRORS++))
        return 1
    fi
}

echo "📦 Checking Core Files..."
echo "------------------------"
check_file "docker-compose.yml"
check_file "docker-compose.dev.yml"
check_file "Dockerfile"
check_file "backend/Dockerfile"
check_file ".env.example"
check_file "package.json"
check_file "backend/package.json"
echo ""

echo "🗂️  Checking Directory Structure..."
echo "-----------------------------------"
check_dir "src"
check_dir "backend/src"
check_dir "database"
check_dir "database/models"
check_dir "database/schemas"
check_dir "database/migrations"
check_dir "database/seeders"
check_dir "database/utils"
echo ""

echo "🤖 Checking AI Integration Files..."
echo "------------------------------------"
check_file ".bayer/config.json"
check_file ".bayer/prompt"
echo ""

echo "📚 Checking Documentation..."
echo "----------------------------"
check_file "DEPLOYMENT.md"
check_file "database/README.md"
check_file "backend/README.md"
check_file "QUICK_REFERENCE.md"
check_file "COOLIFY_AI_READY.md"
echo ""

echo "🔧 Checking Configuration..."
echo "---------------------------"

# Check if .env exists
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    
    # Check for default password
    if grep -q "MONGO_ROOT_PASSWORD=password" .env 2>/dev/null; then
        echo -e "${YELLOW}⚠${NC}  Warning: Using default MongoDB password"
        ((WARNINGS++))
    fi
else
    echo -e "${YELLOW}⚠${NC}  .env file not found (will use .env.example defaults)"
    ((WARNINGS++))
fi

# Check Docker is installed
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓${NC} Docker is installed"
else
    echo -e "${RED}✗${NC} Docker is not installed"
    ((ERRORS++))
fi

# Check Docker Compose is installed
if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✓${NC} Docker Compose is installed"
else
    echo -e "${RED}✗${NC} Docker Compose is not installed"
    ((ERRORS++))
fi

echo ""
echo "🧪 Testing Docker Configuration..."
echo "----------------------------------"

# Validate docker-compose.yml
if docker-compose config > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} docker-compose.yml is valid"
else
    echo -e "${RED}✗${NC} docker-compose.yml has errors"
    ((ERRORS++))
fi

# Check if start.sh is executable
if [ -x "start.sh" ]; then
    echo -e "${GREEN}✓${NC} start.sh is executable"
else
    echo -e "${YELLOW}⚠${NC}  start.sh is not executable (run: chmod +x start.sh)"
    ((WARNINGS++))
fi

echo ""
echo "=================================="
echo "📊 Verification Summary"
echo "=================================="
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "Your template is READY for:"
    echo "  🐳 Coolify Deployment"
    echo "  🤖 AI Integration"
    echo ""
    echo "Next steps:"
    echo "  1. Push to Git repository"
    echo "  2. Connect to Coolify"
    echo "  3. Set environment variables"
    echo "  4. Deploy!"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Verification completed with ${WARNINGS} warning(s)${NC}"
    echo ""
    echo "Your template is READY but has warnings."
    echo "Review warnings above and fix if needed."
    echo ""
    exit 0
else
    echo -e "${RED}❌ Verification failed with ${ERRORS} error(s) and ${WARNINGS} warning(s)${NC}"
    echo ""
    echo "Please fix the errors above before deploying."
    echo ""
    exit 1
fi
