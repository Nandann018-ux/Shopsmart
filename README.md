# FlashDrop Limited Time Flash Sale E Commerce Platform

## Project Overview

FlashDrop is a full stack web application that implements a flash sale e commerce system where products are available for purchase only during specified time windows and with limited stock quantities.

The backend enforces strict business rules for availability, stock management, and order validation using database transactions to prevent overselling. The project demonstrates software engineering practices including object oriented programming principles, layered architecture, and design patterns.

---

## Features

User authentication with role based access control for Admin and User roles.
Admin functionality to create, update, and delete flash sale products with start and end times and stock limits.
Product visibility restricted to active sales only.
Order placement with atomic stock deduction.
User order history viewing.
Frontend countdown timers for active flash sales.
Automatic product expiry through backend validation.

---

## Technology Stack

### Backend

Node.js
Express.js
TypeScript
Prisma ORM
MongoDB
JWT Authentication

### Frontend

React.js
Tailwind CSS or similar styling framework

### Deployment

Backend deployed on Render
Frontend deployed on Vercel

### Additional Extensions

RESTful API architecture
WebSocket support for real time notifications

---

## Database Schema

### Users Table

| Field     | Type          | Description           |
| --------- | ------------- | --------------------- |
| id        | Primary Key   | Unique user ID        |
| email     | String Unique | User email            |
| password  | String Hashed | Encrypted password    |
| role      | Enum          | ADMIN or USER         |
| createdAt | DateTime      | Account creation time |

---

### Products Table

| Field         | Type        | Description        |
| ------------- | ----------- | ------------------ |
| id            | Primary Key | Product ID         |
| name          | String      | Product name       |
| description   | String      | Product details    |
| price         | Decimal     | Product price      |
| stock         | Integer     | Available quantity |
| saleStartTime | DateTime    | Sale start time    |
| saleEndTime   | DateTime    | Sale end time      |
| isActive      | Boolean     | Active status      |
| createdAt     | DateTime    | Created timestamp  |

---

### Orders Table

| Field       | Type        | Description          |
| ----------- | ----------- | -------------------- |
| id          | Primary Key | Order ID             |
| userId      | Foreign Key | Linked user          |
| productId   | Foreign Key | Linked product       |
| quantity    | Integer     | Units ordered        |
| totalAmount | Decimal     | Total price          |
| status      | Enum        | PENDING or COMPLETED |
| createdAt   | DateTime    | Order creation time  |

---

## API Endpoints

### Products

GET /api/products
Retrieve active flash sale products

GET /api/products/:id
Retrieve product details

POST /api/products
Create product Admin only

PUT /api/products/:id
Update product Admin only

DELETE /api/products/:id
Delete product Admin only

---

### Orders

POST /api/orders
Place order

GET /api/orders
Retrieve user order history

---

### Authentication

POST /api/auth/register
Register user

POST /api/auth/login
Login and receive JWT

---

## Architecture

The project follows a layered architecture structure.

Controllers handle HTTP requests and responses.
Services contain business logic.
Repositories abstract database operations using Prisma.

### Design Patterns Used

Strategy Pattern used for product validation including time checks and stock checks.

Observer Pattern used for notifications on stock changes or product expiry if extended.

---

## Setup Instructions

### Clone Repository

```
git clone <your repository url>
cd flashdrop
```

---

### Backend Setup

```
npm install
cp .env.example .env
```

Configure environment variables:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Run the backend:

```
npm run prisma:generate
npm run prisma:dbpush
npm run dev
```

Backend runs on:

```
http://localhost:3001
```

---

### Frontend Setup

```
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## Business Logic Implementation

### Product Availability Rule

```
Date.now() >= saleStartTime
AND Date.now() <= saleEndTime
AND stock > 0
```

### Order Transaction Flow

1. Read current stock
2. Validate availability
3. Deduct stock
4. Create order record

All steps execute inside a Prisma transaction to ensure atomicity and prevent overselling.

---

## Authorization

JWT based authentication is implemented.
Role middleware restricts Admin endpoints.
Claims are verified on protected routes.

---

## Future Enhancements

Stripe payment gateway integration.
Product categories and search functionality.
Admin analytics dashboard with sales metrics.
Real time stock updates using WebSockets.
API rate limiting for high traffic protection.
Email notifications for order confirmations.

---

## Learning Outcomes

Object oriented programming through service classes.
Clean architecture with separation of concerns.
Database transaction handling for consistency.
RESTful API design with proper status codes.
Role based authorization middleware.
Type safety across the full stack using TypeScript.

---

## Conclusion

FlashDrop demonstrates how to build a scalable and transaction safe flash sale platform with real world backend constraints and modern full stack tooling. It serves as a strong portfolio project showcasing software engineering best practices.
