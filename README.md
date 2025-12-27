# BookMyStay Backend

A **backend system** for a property rental application where hosts can manage listings and guests can search and view available properties. Built using **Node.js**, **Express**, and **MongoDB** with **JWT-based authentication**.

---

## Features

- User authentication with **JWT** (Register/Login)
- Role-based access: **Host** and **Guest**
- CRUD operations for **Listings**  
  - Hosts can create, update, delete, and view their own listings
  - Guests can search listings with filters (location, price)
- User **Profiles** management
- Secure routes with **authentication middleware**
- Booking dates support for listings

---

## Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT, bcryptjs  
- **Other:** dotenv for environment variables

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bookmystay-backend.git
cd bookmystay-backend

2.Install dependencies:
npm install


3.Create a .env file in the root directory:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4.Start the server:

npm run dev
