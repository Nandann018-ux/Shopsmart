Project Title
FlashDrop - Limited-Time Flash Sale E-Commerce Platform

Description
FlashDrop is a full-stack web application that implements a flash sale e-commerce system. Products are available for purchase only during specified time windows with limited stock quantities. The backend enforces strict business rules for availability, stock management, and order validation using database transactions to prevent overselling. This demonstrates software engineering practices including OOP principles, layered architecture, and design patterns.

Features
User authentication with role-based access control (admin and regular user roles).
Admin functionality to create, update, and delete flash sale products with start/end times and stock limits.
Product visibility restricted to active sales only (current time between saleStartTime and saleEndTime, stock greater than zero).
Order placement with atomic stock deduction to handle concurrent requests.
User order history viewing.
Frontend countdown timers for active flash sales.
Automatic product expiry logic through backend validation.

Technology Stack
Backend: Node.js with Express.js, TypeScript, Prisma ORM, MongoDB database, JWT for authentication.
Frontend: React.js with Tailwind CSS or similar styling.
Deployment: Backend on Render, Frontend on Vercel.
Additional: RESTful API design, WebSocket support for real-time notifications if extended.

Database Schema
Users table: id (PK), email (unique), password (hashed), role (ADMIN or USER), createdAt.
Products table: id (PK), name, description, price, stock (integer), saleStartTime (datetime), saleEndTime (datetime), isActive (boolean), createdAt.
Orders table: id (PK), userId (FK to Users), productId (FK to Products), quantity (integer), totalAmount (decimal), status (enum: PENDING, COMPLETED), createdAt.

API Endpoints
GET /api/products - Retrieve list of currently active flash sale products.
GET /api/products/:id - Get details of a specific product.
POST /api/products - Create new flash sale product (admin only).
PUT /api/products/:id - Update product details (admin only).
DELETE /api/products/:id - Delete product (admin only).
POST /api/orders - Place order for active product (validates stock and time window).
GET /api/orders - Get user's order history.
POST /api/auth/register - User registration.
POST /api/auth/login - User login returning JWT.

Architecture
Controllers handle HTTP requests and orchestrate services.
Services contain business logic (ProductService for availability checks, OrderService for transactions) following encapsulation and single responsibility.
Repositories abstract database operations using Prisma.
Strategy pattern used for product validation (time check, stock check).
Observer pattern for potential notifications on expiry or stock changes.

Setup Instructions
Clone the repository.
Backend: npm install, copy .env.example to .env and configure DATABASE_URL and JWT_SECRET, npm run prisma:generate, npm run prisma:dbpush, npm run dev.
Frontend: npm install, npm run dev.
Access backend at http://localhost:3001, frontend at http://localhost:3000.

Business Logic Implementation
Product availability determined by: Date.now() >= saleStartTime AND Date.now() <= saleEndTime AND stock > 0.
Order creation wrapped in Prisma transaction: read current stock, validate, deduct stock, create order record atomically.
Admin endpoints protected by role middleware checking JWT claims.

Future Enhancements
Integrate payment gateway like Stripe.
Add product categories and search functionality.
Implement admin analytics dashboard with sales metrics.
Add WebSocket real-time stock updates and expiry notifications.
Rate limiting for high-traffic protection.
Email notifications for order confirmations.

Learning Demonstrated
OOP principles through service classes.
Clean code structure with separation of concerns.
Database transaction handling for consistency.
RESTful API design with proper HTTP status codes and validation.
Role-based authorization middleware.
TypeScript for type safety across full stack.
