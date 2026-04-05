# ShopSmart: Limited-Time Flash Sale E-Commerce Platform

## Project Overview
ShopSmart is a full-stack web application designed to handle high-urgency flash sale scenarios. Products are available for purchase only during specific time windows and with strictly limited stock quantities.

The backend enforces robust business rules for availability, stock management, and order validation using database transactions to prevent overselling. This project demonstrates advanced software engineering practices, including Object-Oriented Programming (OOP) principles, layered architecture, and design patterns.

## Features
- **Role-Based Access Control (RBAC)**: Secure authentication for Admin and User roles.
- **Flash Sale Management**: Admin tools to create, update, and delete products with specific start and end times.
- **Real-time Availability**: Product visibility is restricted to active sales only.
- **Atomic Transactions**: Order placement with strict stock deduction to ensure data integrity.
- **Dynamic Frontend**: Countdown timers for active sales and automatic product expiry.
- **Order History**: Users can track their past purchases and order status.

## Technology Stack

### Backend
- **Runtime**: Node.js & Express.js
- **Language**: TypeScript (Full-stack type safety)
- **ORM**: Prisma ORM
- **Database**: MongoDB
- **Auth**: JWT (JSON Web Tokens)

### Frontend
- **Library**: React.js
- **Styling**: Tailwind CSS

### Deployment
- **Backend**: Render
- **Frontend**: Vercel

## Architecture & Design Patterns
ShopSmart follows a **Layered Architecture** to ensure separation of concerns:
- **Controllers**: Handle HTTP requests and responses.
- **Services**: House the core business logic.
- **Repositories**: Abstract database operations via Prisma.

### Design Patterns Used
- **Strategy Pattern**: Utilized for product validation logic, specifically for time-window and stock-level checks.
- **Observer Pattern**: (Extensible) Used for triggering notifications regarding stock changes or product expiration.

## Database Schema

### Users
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Primary Key | Unique user ID |
| email | String | Unique user email |
| password | String | Hashed/Encrypted password |
| role | Enum | ADMIN or USER |

### Products
| Field | Type | Description |
| :--- | :--- | :--- |
| id | Primary Key | Product ID |
| name | String | Product Name |
| stock | Integer | Available quantity |
| saleStartTime | DateTime | Sale start window |
| saleEndTime | DateTime | Sale end window |
| isActive | Boolean | Manual toggle for status |

## Business Logic: Order Transaction Flow
To prevent overselling during high-traffic bursts, ShopSmart utilizes **Prisma Transactions**:
1. Read current stock levels.
2. Validate availability (Time check + Stock > 0).
3. Deduct stock atomistically.
4. Create the order record.

> [!NOTE]
> If any step in the flow fails, the entire transaction is rolled back to maintain database consistency.

## Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repository-url>
cd shopsmart
```

### 2. Backend Setup
```bash
# Install dependencies
npm install

# Configure Environment
cp .env.example .env
# Add your DATABASE_URL and JWT_SECRET to .env

# Initialize Prisma and Start
npm run prisma:generate
npm run prisma:dbpush
npm run dev
```
Backend runs on: `http://localhost:3001`

### 3. Frontend Setup
```bash
npm install
npm run dev
```
Frontend runs on: `http://localhost:3000`

## Future Enhancements
- **Payments**: Stripe gateway integration.
- **Real-time**: WebSocket support for live stock updates.
- **Analytics**: Admin dashboard for sales metrics and traffic trends.
- **Security**: API Rate limiting to protect against bot-driven checkout attempts.

## Conclusion
ShopSmart serves as a high-performance portfolio piece showcasing how to manage concurrency and transaction safety in a modern e-commerce environment.
