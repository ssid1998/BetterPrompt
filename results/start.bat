@echo off
echo Stopping any existing server on port 3000...
call stop.bat

echo Checking if Ollama is running...
curl -s -f http://localhost:11434/api/tags >nul 2>&1
if %errorlevel% neq 0 (
    echo Starting Ollama server in the background...
    start /B ollama serve > ollama.log 2>&1
    echo Waiting for Ollama to initialize...
    timeout /t 3 /nobreak >nul
    echo Ollama startup triggered.
) else (
    echo Ollama is already running.
)

echo Installing dependencies...
call npm install

echo Starting Next.js application...
npm run dev
