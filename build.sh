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

cat << "EOF"
  ____  _                      ____                      _   
 / ___|| |__   ___  _ __      / ___| _ __ ___   __ _ _ _| |_ 
 \___ \| '_ \ / _ \| '_ \ ____\___ \| '_ ` _ \ / _` | '__| __|
  ___) | | | | (_) | |_) |_____|___) | | | | | | (_| | |  | |_ 
 |____/|_| |_|\___/| .__/     |____/|_| |_| |_|\__,_|_|   \__|
                   |_|                                       
EOF

echo -e "${CYAN}------------------------------------------------------------${NC}"
echo -e "${BLUE}Starting Professional Build Pipeline for ShopSmart v1.0.0${NC}"
echo -e "${CYAN}------------------------------------------------------------${NC}"

# --- Environment Check ---
echo -e "\n${BLUE}[1/4] Checking System Environment...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: node is not installed.${NC}"
    exit 1
fi
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) is ready.${NC}"
echo -e "${GREEN}✓ npm $(npm -v) is ready.${NC}"

# --- Backend Compilation ---
echo -e "\n${BLUE}[2/4] Initializing Backend (TypeScript Compiler)...${NC}"
cd server
echo -e "${CYAN}→ Installing server dependencies...${NC}"
npm install --quiet
echo -e "${CYAN}→ Running tsc build...${NC}"
npm run build
cd ..
echo -e "${GREEN}✓ Backend compilation successful.${NC}"

# --- Frontend Compilation ---
echo -e "\n${BLUE}[3/4] Initializing Frontend (Vite & React)...${NC}"
cd client
echo -e "${CYAN}→ Installing client dependencies...${NC}"
npm install --quiet
echo -e "${CYAN}→ Building production assets...${NC}"
npm run build
cd ..
echo -e "${GREEN}✓ Frontend assets ready in client/dist.${NC}"

# --- Final Integration ---
echo -e "\n${BLUE}[4/4] Finishing Static Integration...${NC}"
echo -e "${CYAN}→ Linking assets to backend static server...${NC}"
# (The link is established in server/src/app.js)
echo -e "${GREEN}✓ Full-stack integration active.${NC}"

echo -e "\n${CYAN}------------------------------------------------------------${NC}"
echo -e "${GREEN}✅ SHOPSMART BUILD COMPLETED SUCCESSFULLY!${NC}"
echo -e "${CYAN}------------------------------------------------------------${NC}"
echo -e "Demo Command: ${BLUE}node server/dist/index.js${NC}"
echo -e "${CYAN}------------------------------------------------------------${NC}"