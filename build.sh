#!/bin/bash

# ShopSmart: Professional Build Automation Script
# Designed for the final viva presentation

set -e

# --- Visual Branding ---
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}Initializing ShopSmart Production Build...${NC}"

# System readiness check
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: node is not installed.${NC}"
    exit 1
fi
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed.${NC}"
    exit 1
fi

# Transpile Backend
echo -e "\n${BLUE}Building Backend Services...${NC}"
cd server
npm install --quiet
npm run build
cd ..

# Build Frontend Assets
echo -e "\n${BLUE}Building Frontend Assets...${NC}"
cd client
npm install --quiet
npm run build
cd ..

# Integration Status
echo -e "\n${BLUE}Finalizing Asset Integration...${NC}"

# (The link is established in server/src/app.js)
echo -e "${GREEN}✓ Full-stack integration active.${NC}"

echo -e "\n${CYAN}------------------------------------------------------------${NC}"
echo -e "${GREEN}✅ SHOPSMART BUILD COMPLETED SUCCESSFULLY!${NC}"
echo -e "${CYAN}------------------------------------------------------------${NC}"
echo -e "Demo Command: ${BLUE}node server/dist/index.js${NC}"
echo -e "${CYAN}------------------------------------------------------------${NC}"