# ShopSmart – Modern E-Commerce Platform

## Project Overview

ShopSmart is a full-stack e-commerce platform designed to deliver a seamless and scalable online shopping experience. It enables users to browse products, manage carts, and place orders, while providing administrators with tools to manage inventory and product listings.

The system is built with a focus on clean architecture, scalability, and robust backend logic, ensuring reliable order processing and efficient data handling.

## Core Features

- **User Authentication & Authorization**
  - Secure login and registration using JWT
  - Role-based access control (Admin & User)
- **Product Management**
  - Admins can create, update, and delete products
  - Dynamic product listings with real-time availability
- **Shopping Cart System**
  - Add, remove, and update product quantities
  - Persistent cart handling
- **Order Processing**
  - Seamless checkout experience
  - Atomic stock updates to prevent inconsistencies
- **Order History**
  - Users can view past orders and track status

## Technology Stack

### Backend
- **Node.js & Express.js**
- **TypeScript**
- **Prisma ORM**
- **MongoDB**
- **JWT Authentication**

### Frontend
- **React.js**
- **Tailwind CSS**
- **Framer Motion** (for animations & UI transitions)

## Architecture

The application follows a **Layered Architecture**:
- **Controllers** → Handle API requests
- **Services** → Business logic
- **Repositories** → Database abstraction

### Order Flow (Transaction Safe)
1. Validate product availability
2. Check stock levels
3. Deduct stock atomically
4. Create order record

> [!NOTE]
> If any step fails, the transaction is rolled back to maintain consistency.

## Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd shopsmart
```

### 2. Backend Setup
```bash
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET
npm run prisma:generate
npm run prisma:dbpush
npm run dev
```
Backend: `http://localhost:3001`

### 3. Frontend Setup
```bash
npm install
npm run dev
```
Frontend: `http://localhost:3000`

## Future Enhancements
- **Payment Integration** (Stripe)
- **Recommendation System**
- **Real-time Inventory Updates**
- **Admin Analytics Dashboard**

## Conclusion

ShopSmart demonstrates scalable backend architecture combined with a modern frontend experience, making it a strong portfolio project for full-stack development.
