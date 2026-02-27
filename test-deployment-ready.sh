#!/bin/bash
# PhonePe Wallet - Local Deployment Test Script
# This script helps verify your application is ready for cloud deployment

echo "======================================"
echo "PhonePe Wallet - Deployment Test"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
PASSED=0
FAILED=0

# Function to print test results
test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
        ((FAILED++))
    fi
}

echo "Checking project structure..."
echo ""

# Check backend files
echo "Backend Checks:"
[ -f "backend/Dockerfile" ] && test_result 0 "Dockerfile exists" || test_result 1 "Dockerfile not found"
[ -f "backend/pom.xml" ] && test_result 0 "Maven configuration exists" || test_result 1 "Maven configuration not found"
[ -f "backend/src/main/resources/application.properties" ] && test_result 0 "Spring Boot config exists" || test_result 1 "Spring Boot config not found"

echo ""
echo "Frontend Checks:"
# Check frontend files
[ -f "frontend/package.json" ] && test_result 0 "Frontend package.json exists" || test_result 1 "Frontend package.json not found"
[ -f "frontend/vite.config.js" ] && test_result 0 "Vite config exists" || test_result 1 "Vite config not found"
[ -f "frontend/src/services/api.js" ] && test_result 0 "API service exists" || test_result 1 "API service not found"

echo ""
echo "Deployment Configuration Files:"
# Check deployment config files
[ -f "vercel.json" ] && test_result 0 "Vercel config (root) exists" || test_result 1 "Vercel config (root) not found"
[ -f "frontend/vercel.json" ] && test_result 0 "Vercel config (frontend) exists" || test_result 1 "Vercel config (frontend) not found"
[ -f "render.yaml" ] && test_result 0 "Render config exists" || test_result 1 "Render config not found"
[ -f "railway.json" ] && test_result 0 "Railway config exists" || test_result 1 "Railway config not found"

echo ""
echo "Environment Files:"
# Check environment templates
[ -f "backend/.env.example" ] && test_result 0 "Backend .env.example exists" || test_result 1 "Backend .env.example not found"
[ -f "frontend/.env.example" ] && test_result 0 "Frontend .env.example exists" || test_result 1 "Frontend .env.example not found"

echo ""
echo "Documentation:"
# Check documentation
[ -f "DEPLOYMENT-README.md" ] && test_result 0 "Deployment README exists" || test_result 1 "Deployment README not found"
[ -f "DEPLOYMENT-CHANGES.md" ] && test_result 0 "Deployment changes summary exists" || test_result 1 "Deployment changes summary not found"

echo ""
echo "======================================"
echo "Code Configuration Checks:"
echo "======================================"
echo ""

# Check if backend uses environment variables
echo "Backend Configuration:"
grep -q 'server.port=${PORT:' backend/src/main/resources/application.properties && \
    test_result 0 "Backend uses dynamic PORT configuration" || \
    test_result 1 "Backend PORT not using environment variable"

grep -q 'CORS_ALLOWED_ORIGINS' backend/src/main/resources/application.properties && \
    test_result 0 "Backend uses dynamic CORS configuration" || \
    test_result 1 "Backend CORS not using environment variable"

echo ""
echo "Frontend Configuration:"
# Check if frontend uses dynamic API endpoint
grep -q 'VITE_API_BASE_URL' frontend/src/services/api.js && \
    test_result 0 "Frontend uses dynamic API endpoint" || \
    test_result 1 "Frontend API endpoint not dynamic"

echo ""
echo "======================================"
echo "Git Configuration:"
echo "======================================"
echo ""

# Check if .gitignore exists and includes .env
if [ -f ".gitignore" ]; then
    grep -q "\.env" .gitignore && \
        test_result 0 ".env files are in .gitignore" || \
        test_result 1 ".env files should be in .gitignore (security)"
else
    echo -e "${YELLOW}⚠ WARNING${NC}: .gitignore file not found"
fi

echo ""
echo "======================================"
echo "Summary"
echo "======================================"
echo -e "Tests Passed: ${GREEN}$PASSED${NC}"
echo -e "Tests Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Ready for deployment.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Commit changes to Git: git add . && git commit -m 'Add deployment configs'"
    echo "2. Push to GitHub: git push origin main"
    echo "3. Follow instructions in DEPLOYMENT-README.md"
    exit 0
else
    echo -e "${RED}✗ Some checks failed. Please review the issues above.${NC}"
    exit 1
fi
