# Project Idea: FlashDrop – Limited-Time Flash Sale E-Commerce Platform

## What we are going to build
FlashDrop is a full-stack e-commerce platform specialized in **flash sales**: products are available only during a strict time window (saleStartTime to saleEndTime) and with limited stock. Once time expires or stock reaches zero, the product becomes unavailable for purchase — creating urgency and simulating real flash-sale events (like Amazon Lightning Deals or Flipkart Flash Sales).

The project strongly emphasizes **backend logic**:
- Time-based availability enforcement
- Atomic stock deduction to prevent overselling (race conditions)
- Transactional order placement
- Automatic product expiry


## Scope
- User authentication & role-based access (Admin vs User)
- Admin: CRUD for flash-sale products
- User: Browse active flash products, place orders during active window
- Backend validation: block orders if expired / out of stock
- No payment gateway (simulate success), no cart (single-product orders for simplicity)
- Background auto-expiry (can be simulated via API check or cron-like logic)

## Key Features
1. **User Roles & Auth**
   - Register/Login (JWT)
   - Admin creates/manages flash products
   - Regular users browse & buy

2. **Flash Sale Product Management**
   - Fields: name, description, price, stock, saleStartTime, saleEndTime, isActive
   - Products auto-invisible after end time or zero stock

3. **Order Placement with Strong Backend Rules**
   - Check: is product active? stock > quantity? current time in window?
   - Deduct stock atomically (Prisma transaction)
   - Prevent overselling in concurrent requests

4. **Active Product Listing**
   - Only show currently active flash sales
   - Frontend countdown timer per product

5. **Order History**
   - Users view their past orders

This project demonstrates clean architecture, OOP principles (encapsulation in services, repository pattern), and proper error handling/validation — ideal for backend-focused evaluation.
