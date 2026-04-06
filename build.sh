#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting ShopSmart Unified Build Process..."

# Backend Build
echo "📦 Building Backend (TypeScript)..."
cd server
npm install
npm run build
cd ..

# Frontend Build
echo "🛒 Building Frontend (Vite)..."
cd client
npm install
npm run build
cd ..

echo "ShopSmart Unified Build Completed Successfully!"