#!/bin/bash
echo "Stopping process on port 3000..."
# Find and kill process running on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "No process found on port 3000."
