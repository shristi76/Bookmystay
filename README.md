# Book-My-Stay Backend

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
git clone https://github.com/shristi76/Bookmystay.git
cd bookmystay-backend

2.Install dependencies:
npm install


3.Create a .env file in the root directory:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4.Start the server:

npm run dev

```


## API Endpoints

### Auth

| Method | Route               | Description               |
|--------|-------------------|---------------------------|
| POST   | /api/auth/register | Register a new user       |
| POST   | /api/auth/login    | Login user and get JWT    |

### Listings

| Method | Route                     | Description                        |
|--------|---------------------------|------------------------------------|
| GET    | /api/listings             | Get all listings (with filters)    |
| GET    | /api/listings/:id         | Get listing by ID                  |
| POST   | /api/listings             | Host creates a new listing         |
| PUT    | /api/listings/:id         | Host updates a listing             |
| DELETE | /api/listings/:id         | Host deletes a listing             |
| GET    | /api/listings/my-listings | Host views their own listings      |

### Profiles

| Method | Route          | Description                       |
|--------|----------------|----------------------------------|
| GET    | /api/profile   | Get logged-in user profile        |
| POST   | /api/profile   | Create user profile               |
| PUT    | /api/profile   | Update user profile               |
| DELETE | /api/profile   | Delete user profile               |

---


## Demo

### Listing API ENDPOINTS

<img width="1445" height="643" alt="Screenshot 2025-12-25 195045" src="https://github.com/user-attachments/assets/a98259d2-ef45-44de-aa86-c9a87a08bfdf" />

---

<br><br>



<img width="963" height="439" alt="Screenshot 2025-12-25 195102" src="https://github.com/user-attachments/assets/a10f9dba-3b12-4176-9466-051347d9a453" />

---
<br><br>



<img width="963" height="439" alt="Screenshot 2025-12-25 195102" src="https://github.com/user-attachments/assets/89da8eb1-dfe8-40e7-aa19-0741122c1c93" />

---
### Booking API ENDPOINTS

<img width="1242" height="476" alt="Screenshot 2025-12-26 104339" src="https://github.com/user-attachments/assets/64758f80-2b0e-48f3-a9de-418d4fc1e99e" />

---
<br><br>


<img width="597" height="215" alt="Screenshot 2025-12-26 104353" src="https://github.com/user-attachments/assets/3559ee8f-47e0-4f7c-af6e-7598ae94bdf4" />

---

<br><br>


<img width="1384" height="538" alt="Screenshot 2025-12-26 111416" src="https://github.com/user-attachments/assets/c5252d78-e904-49d9-aeb6-8051272e2c05" />

---

## What I Learned

- Built and managed **RESTful APIs** with CRUD operations  
- Handled **API routing** and **authentication** using JWT  
- Connected and interacted with **MongoDB** using Mongoose
- Tested APIs using tools like **Thunder Client and Postman**
---

## Thank You






