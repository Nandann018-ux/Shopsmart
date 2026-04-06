# ShopSmart – Modern Full-Stack E-Commerce Platform

ShopSmart is a high-performance, full-stack e-commerce solution built with a focus on **scalability**, **clean architecture**, and **production-ready deployment**. It features a reactive React frontend and a robust TypeScript/Node.js backend, unified under a single-stage build system.

##  Presentation Highlights (Viva)

- **Unified Build Pipeline**: A custom-engineered shell automation that synchronizes frontend assets with backend static serving.
- **Multi-Stage Docker Architecture**: Optimized production images using Docker multi-stage builds to separate build-time dependencies from the final lean runtime.
- **Full-Stack Static Serving**: The backend is configured to serve the entire SPA autonomously, eliminating the need for complex proxy configurations in production.
- **CI/CD Integration**: Fully automated GitHub Actions pipeline for global build verification and recursive testing.

##  Quick Start (Demonstration Mode)

### 1. Simple Build & Run
The fastest way to demonstrate the project:
```bash
chmod +x ./build.sh
./build.sh
node server/dist/index.js
```
The application will be live at: `http://localhost:5000`

### 2. Docker Deployment
For a professional, containerized demonstration:
```bash
docker-compose up --build
```

## Architecture Overview

### Backend (Node.js & TypeScript)
- **Framework**: Express.js
- **ORM**: Prisma with MongoDB
- **Security**: JWT-based Authentication & BCrypt Hashing
- **Architecture**: Layered (Controllers → Services → Repository)

### Frontend (React & Vite)
- **Styling**: Tailwind CSS 
- **Animations**: Framer Motion (Premium HUD aesthetic)
- **State Management**: React Context (Cart & Auth)

## Project Structure

```text
├── client/          # Vite + React Frontend
├── server/          # TypeScript + Express Backend
├── build.sh         # Unified automation script
├── Dockerfile       # Multi-stage production build
└── docker-compose.yml
```

## CI/CD Status
The project includes a GitHub Actions workflow that executes a full project rebuild and sanity check on every commit to ensure 100% stability.

---

**ShopSmart** was developed to showcase modern web engineering practices, combining a tactile user experience with a scalable, professional-grade backend.
