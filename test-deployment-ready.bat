@echo off
REM PhonePe Wallet - Local Deployment Test Script (Windows)
REM This script helps verify your application is ready for cloud deployment

setlocal enabledelayedexpansion

echo.
echo ======================================
echo PhonePe Wallet - Deployment Test
echo ======================================
echo.

set PASSED=0
set FAILED=0

REM Function to test file existence
setlocal enabledelayedexpansion

echo Checking project structure...
echo.

echo Backend Checks:
if exist "backend\Dockerfile" (
    echo [PASS] Dockerfile exists
    set /a PASSED+=1
) else (
    echo [FAIL] Dockerfile not found
    set /a FAILED+=1
)

if exist "backend\pom.xml" (
    echo [PASS] Maven configuration exists
    set /a PASSED+=1
) else (
    echo [FAIL] Maven configuration not found
    set /a FAILED+=1
)

if exist "backend\src\main\resources\application.properties" (
    echo [PASS] Spring Boot config exists
    set /a PASSED+=1
) else (
    echo [FAIL] Spring Boot config not found
    set /a FAILED+=1
)

echo.
echo Frontend Checks:
if exist "frontend\package.json" (
    echo [PASS] Frontend package.json exists
    set /a PASSED+=1
) else (
    echo [FAIL] Frontend package.json not found
    set /a FAILED+=1
)

if exist "frontend\vite.config.js" (
    echo [PASS] Vite config exists
    set /a PASSED+=1
) else (
    echo [FAIL] Vite config not found
    set /a FAILED+=1
)

if exist "frontend\src\services\api.js" (
    echo [PASS] API service exists
    set /a PASSED+=1
) else (
    echo [FAIL] API service not found
    set /a FAILED+=1
)

echo.
echo Deployment Configuration Files:
if exist "vercel.json" (
    echo [PASS] Vercel config (root) exists
    set /a PASSED+=1
) else (
    echo [FAIL] Vercel config (root) not found
    set /a FAILED+=1
)

if exist "frontend\vercel.json" (
    echo [PASS] Vercel config (frontend) exists
    set /a PASSED+=1
) else (
    echo [FAIL] Vercel config (frontend) not found
    set /a FAILED+=1
)

if exist "render.yaml" (
    echo [PASS] Render config exists
    set /a PASSED+=1
) else (
    echo [FAIL] Render config not found
    set /a FAILED+=1
)

if exist "railway.json" (
    echo [PASS] Railway config exists
    set /a PASSED+=1
) else (
    echo [FAIL] Railway config not found
    set /a FAILED+=1
)

echo.
echo Environment Files:
if exist "backend\.env.example" (
    echo [PASS] Backend .env.example exists
    set /a PASSED+=1
) else (
    echo [FAIL] Backend .env.example not found
    set /a FAILED+=1
)

if exist "frontend\.env.example" (
    echo [PASS] Frontend .env.example exists
    set /a PASSED+=1
) else (
    echo [FAIL] Frontend .env.example not found
    set /a FAILED+=1
)

echo.
echo Documentation:
if exist "DEPLOYMENT-README.md" (
    echo [PASS] Deployment README exists
    set /a PASSED+=1
) else (
    echo [FAIL] Deployment README not found
    set /a FAILED+=1
)

if exist "DEPLOYMENT-CHANGES.md" (
    echo [PASS] Deployment changes summary exists
    set /a PASSED+=1
) else (
    echo [FAIL] Deployment changes summary not found
    set /a FAILED+=1
)

echo.
echo ======================================
echo Summary
echo ======================================
echo Tests Passed: %PASSED%
echo Tests Failed: %FAILED%
echo.

if %FAILED% equ 0 (
    echo [SUCCESS] All checks passed! Ready for deployment.
    echo.
    echo Next steps:
    echo 1. Commit changes to Git: git add . && git commit -m "Add deployment configs"
    echo 2. Push to GitHub: git push origin main
    echo 3. Follow instructions in DEPLOYMENT-README.md
    exit /b 0
) else (
    echo [ERROR] Some checks failed. Please review the issues above.
    exit /b 1
)

endlocal
