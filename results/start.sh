#!/bin/bash
echo "Stopping any existing server on port 3000..."
./stop.sh

echo "Checking if Ollama is running..."
if ! curl -s -f http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "Starting Ollama server in the background..."
    # Start ollama serve in the background and redirect output
    ollama serve > ollama.log 2>&1 &
    
    # Wait a few seconds to let the server spin up
    echo "Waiting for Ollama to initialize..."
    sleep 3
    
    if ! curl -s -f http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo "Warning: Could not verify Ollama is running. The app might not be able to assess prompts."
    else
        echo "Ollama started successfully!"
    fi
else
    echo "Ollama is already running."
fi

echo "Installing dependencies..."
npm install

echo "Starting Next.js application..."
npm run dev
