#!/bin/bash
echo "Stopping any existing server on port 3000..."
./stop.sh

echo "Installing dependencies..."
npm install

echo "Starting Next.js development server..."
npm run dev
