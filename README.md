# Urban Gear: Fashion for Men

Urban Gear is a high-performance, full-stack e-commerce solution engineered with a focus on scalability, clean architecture, and production-ready deployment. The platform features a reactive React frontend and a robust TypeScript-based Node.js backend, integrated via a unified build system.

## Project Highlights

- **Unified Build Pipeline**: Automated shell scripting synchronizes frontend assets with backend static serving for seamless deployment.
- **Multi-Stage Docker Architecture**: Optimized production images utilize Docker multi-stage builds to minimize runtime overhead.
- **Layered Backend Architecture**: Implementation of the Controller-Service-Repository pattern ensures separation of concerns and maintainability.
- **Type-Safe Development**: End-to-end type safety using TypeScript and Prisma ORM for reliable data handling.
- **Automated CI/CD**: Integrated GitHub Actions workflow for continuous build verification and automated testing.

## Tech Stack

### Frontend
- **Framework**: React 19 with Vite for rapid development and optimized builds.
- **Styling**: Tailwind CSS 4 for utility-first responsive design.
- **Animations**: Framer Motion for premium user interface transitions.
- **State Management**: React Context API for authentication and cart persistence.
- **Icons**: Lucide React for consistent vector iconography.

### Backend
- **Runtime**: Node.js with TypeScript.
- **Web Framework**: Express.js.
- **Database ORM**: Prisma with MongoDB integration.
- **Security**: JWT-based authentication and BCrypt hashing for sensitive data protection.
- **Testing**: Jest and Supertest for comprehensive unit and integration testing.

### DevOps and Infrastructure
- **Containerization**: Docker and Docker Compose for environment parity.
- **CI/CD**: GitHub Actions.
- **Deployment**: Render-compatible configuration for cloud hosting.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd UrbanGear
   ```

2. Configure environment variables:
   Create a `.env` file in the `server` directory based on `.env.example`:
   ```bash
   cp server/.env.example server/.env
   ```

3. Install dependencies:
   ```bash
   # Root level
   cd client && npm install
   cd ../server && npm install
   ```

### Development

To run the application in development mode:

1. Start the backend:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```

### Production Build

To build the entire project using the automated script:
```bash
chmod +x ./build.sh
./build.sh
```
After the build completes, start the production server:
```bash
node server/dist/index.js
```

## Docker Deployment

The project includes a multi-stage Dockerfile and a Docker Compose configuration for professional deployment.

To start the services:
```bash
docker-compose up --build
```

## Directory Structure

```text
├── client/              # React + Vite frontend application
├── server/              # TypeScript + Express backend application
│   ├── prisma/          # Database schema and migrations
│   ├── src/             # Backend source code
│   └── tests/           # Backend test suites
├── .github/             # GitHub Actions workflows
├── build.sh             # Unified build automation script
├── Dockerfile           # Multi-stage production Dockerfile
└── docker-compose.yml   # Container orchestration config
```

## Status

The project is currently configured with a full CI/CD pipeline that validates builds and executes tests on every push, ensuring system stability and code quality.
