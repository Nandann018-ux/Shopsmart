#!/bin/bash

# Navigate to the project directory
cd /home/ubuntu/Shopsmart

# Pull the latest changes from GitHub
git pull origin main

# Idempotent steps: tear down old containers and build fresh ones
sudo docker-compose down
sudo docker-compose up --build -d

