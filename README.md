# ⚡ FlashDrop – Limited-Time Flash Sale E-Commerce Platform

## 📌 Project Overview

**FlashDrop** is a flash-sale-based e-commerce platform where products are available only for a limited time window and in limited stock.

Once the sale time expires or stock runs out, the product becomes unavailable for purchase.

This project focuses on implementing real-world e-commerce business logic such as:

* Time-based product availability
* Stock consistency
* Order validation

It is designed to demonstrate full-stack development skills with a strong emphasis on backend logic and API design.

---

## ❗ Problem Statement

Traditional e-commerce platforms allow products to remain available indefinitely, reducing urgency and not reflecting real-world flash sale scenarios.

Handling flash sales introduces challenges such as:

* Time-based product visibility
* Preventing purchases after sale expiry
* Avoiding overselling during high demand

**FlashDrop** solves these problems by enforcing strict time-bound access and atomic stock handling at the backend level.

---

## 🚀 Key Features

### 1️⃣ User Roles

**Admin**

* Creates and manages flash sale products

**User**

* Browses products
* Places orders during active sale windows

---

### 2️⃣ Flash Sale Products

Each product includes:

* Name & description
* Price
* Limited stock
* Sale start time
* Sale end time
* Active status

**Business Rules**

* Products are visible only during the sale window
* Orders are blocked if:

  * Sale has expired
  * Stock is exhausted

---

### 3️⃣ Order Management

* Users can place orders only for active products
* Stock is reduced inside a database transaction
* Prevents race conditions and overselling

---

### 4️⃣ Auto Expiry System

* Background job automatically marks products inactive after sale end time
* Ensures expired products cannot be purchased even if the frontend fails

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Prisma ORM
* JWT Authentication
* RESTful API Architecture

### Frontend

* React
* Countdown timer for flash sale products

### Deployment

* Backend: Render
* Frontend: Vercel

---

## 🗄 Database Design

### User Model

```
id
email
password
role (ADMIN / USER)
```

### Product Model

```
id
name
description
price
stock
saleStartTime
saleEndTime
isActive
```

### Order Model

```
id
userId
productId
quantity
totalAmount
createdAt
```

---

## 🔌 API Design

### Product APIs

| Method | Endpoint          | Description               |
| ------ | ----------------- | ------------------------- |
| POST   | /api/products     | Create flash sale product |
| GET    | /api/products     | Get active products       |
| GET    | /api/products/:id | Get product details       |
| PUT    | /api/products/:id | Update product            |
| DELETE | /api/products/:id | Delete product            |

---

### Order APIs

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| POST   | /api/orders | Place an order  |
| GET    | /api/orders | Get user orders |

---

## 🎯 Learning Outcomes

* Implemented time-based business logic at API level
* Handled stock consistency using database transactions
* Designed RESTful APIs with proper validation
* Managed role-based access control
* Deployed full-stack application to production

---

## 🔮 Future Improvements

* Payment gateway integration
* Admin analytics dashboard
* Product categories
* Rate limiting for high-traffic scenarios

---

## 📚 Conclusion

**FlashDrop** is a practical full-stack project that simulates real-world flash sale e-commerce systems and demonstrates strong backend problem-solving skills suitable for full-stack developer interviews.

---

## 👨‍💻 Author

**Nandan Acharya**

If you like this project, feel free to ⭐ the repo and contribute!
