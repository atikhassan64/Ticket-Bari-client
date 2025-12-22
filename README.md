# 🎟️ TicketBari – Online Ticket Booking Platform

## 📌 Project Purpose
TicketBari is a full-featured **Online Ticket Booking Platform** built using the **MERN stack**.  
Users can discover and book tickets for different transport types such as **Bus, Train, Launch, and Plane**.  
The platform supports **three roles** — **User**, **Vendor**, and **Admin** — each with dedicated dashboards and functionalities.

This project was developed as part of **Assignment B12-A11 (Category-17)** to demonstrate real-world application architecture, role-based authorization, secure authentication, and payment integration.

---

## 🌐 Live Website
🔗 **Live Site:** https://ticket-bari-3ae85.web.app

---

## 🔐 Demo Credentials

### 👑 Admin
- **Email:** admin@email.com  
- **Password:** admin123  

### 🧑‍💼 Vendor
- **Email:** vendor@email.com  
- **Password:** vendor123  

---

## 🚀 Key Features

### 🔑 Authentication & Authorization
- Email & Password Login
- Google Social Login
- Secure Firebase Authentication
- Role-based protected routes (User / Vendor / Admin)
- JWT Token used to protect APIs
- Password validation (uppercase, lowercase, minimum 6 characters)

---

### 🏠 Home Page
- Hero Banner with Swiper.js
- Advertisement Section (Max 6 admin-selected tickets)
- Latest Tickets Section (Recently added tickets)
- Extra sections (e.g. Why Choose Us, Popular Routes)

---

### 🎫 All Tickets Page
- Shows only **Admin-approved tickets**
- Search by **From → To**
- Filter by **Transport Type**
- Sort by **Price (Low → High / High → Low)**
- Pagination (6–9 tickets per page)
- Fully responsive card layout

---

### 📄 Ticket Details Page (Protected)
- Full ticket details
- Live countdown based on departure time
- “Book Now” modal with quantity input
- Booking validation:
  - Quantity cannot exceed available tickets
  - Booking disabled if ticket is expired or quantity is 0

---

## 👤 User Dashboard
- **User Profile** (name, email, role, photo)
- **My Booked Tickets**
  - Booking status: `pending | accepted | rejected | paid`
  - Countdown timer
  - Stripe payment after vendor acceptance
- **Transaction History**
  - Transaction ID
  - Amount
  - Ticket Title
  - Payment Date

---

## 🧑‍💼 Vendor Dashboard
- **Vendor Profile**
- **Add Ticket**
  - Image upload (imgbb)
  - Perks selection
  - Auto vendor info
- **My Added Tickets**
  - Update / Delete tickets
  - Verification status: pending / approved / rejected
- **Requested Bookings**
  - Accept / Reject booking requests
- **Revenue Overview**
  - Total Revenue
  - Tickets Sold
  - Tickets Added
  - Interactive charts

---

## 👑 Admin Dashboard
- **Admin Profile**
- **Manage Tickets**
  - Approve / Reject vendor tickets
- **Manage Users**
  - Make Admin / Vendor
  - Mark Vendor as Fraud
- **Advertise Tickets**
  - Toggle Advertise / Unadvertise
  - Max 6 advertised tickets at a time

---

## 💳 Payment System
- Stripe payment integration
- Payment allowed only before departure time
- Ticket quantity reduced after successful payment

---

## 🌙 Additional Features
- Dark / Light Mode Toggle
- Loading spinners for async states
- Custom 404 Error Page
- Responsive Dashboard UI
- Page reload protection on private routes

---

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- DaisyUI
- Axios
- Firebase Authentication
- Framer Motion
- Swiper.js
- Stripe.js

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe Payment API
- CORS
- dotenv

---

## 🔐 Security
- Firebase keys secured using environment variables
- MongoDB credentials hidden via `.env`
- JWT token verification for protected APIs
- CORS configured for production

---

## 📦 NPM Packages Used
- axios
- react-router-dom
- firebase
- jsonwebtoken
- stripe
- swiper
- framer-motion
- dotenv
- cors
- express
- mongodb

---

## 📂 GitHub Repositories
- **Client Repo:** https://github.com/atikhassan64/Ticket-Bari-client.git
- **Server Repo:** https://github.com/atikhassan64/Ticket-Bari-server.git

---

## 📹 Project Explanation Video
🎥 **Video Link:** video_requirement

---

## ✅ Assignment Checklist
- ✔️ 20+ meaningful client commits
- ✔️ 12+ meaningful server commits
- ✔️ Secure environment variables
- ✔️ Fully responsive UI
- ✔️ Role-based dashboards
- ✔️ Error-free production deployment
- ✔️ Reload-safe private routes

---

## ©️ Copyright
© 2025 **TicketBari**. All rights reserved.