# MultilevelEarning

**Overview**

This project implements a multi-level referral and earning system where users can:

1. Refer up to 8 people directly.


2. Earn 5% profit from their direct referrals (Level 1 users).


3. Earn 1% profit from indirect referrals (Level 2 users).
Earnings are updated in real-time using WebSockets whenever a referred user completes a purchase exceeding 1000Rs.



**Features**

Referral System:

Users can register with referral codes.

Supports direct and indirect referrals.

Limits direct referrals to 8 per user.


Profit Distribution:

5% profit from Level 1 users.

1% profit from Level 2 users.

Only applies for purchases above 1000Rs.


Real-Time Updates:

Uses Socket.IO for live notifications of wallet updates.


Database Design:

Tracks user profiles, referral relationships, and earnings.


APIs:

User registration.

Purchase tracking and profit distribution.




**Tech Stack**

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Real-Time Communication: Socket.IO

Other Tools: Postman (for API testing)



**Project Structure**

Project
├── server.js          # Entry point of the application
├── package.json       # Project dependencies and scripts
├── config/
│   ├── db.js          # MongoDB connection setup
├── models/
│   ├── User.js        # User schema
│   ├── Transaction.js # Transaction schema
├── controllers/
│   ├── userController.js   # Handles user-related operations
│   ├── transactionController.js # Handles purchases and profit distribution
├── routes/
│   ├── userRoutes.js        # Routes for user-related operations
│   ├── transactionRoutes.js # Routes for transactions and profits
├── README.md          # Project documentation



**Setup Instructions**


1. Install Dependencies

npm install

2. Start the Server

npm start

The server will run on http://localhost:3000 by default.




**API Endpoints**

1. User Registration

Endpoint: POST /api/users/register
Registers a new user with or without a referral code.

Request Body:

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "referralCode": "JOHN123",
  "referredBy": "PARENT123" // Optional
}

Response:

{
  "message": "User registered successfully",
  "user": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "referralCode": "JOHN123",
    "wallet": 0
  }
}


---

2. Record a Purchase

Endpoint: POST /api/transactions/purchase
Records a purchase and updates profits in real-time.

Request Body:

{
  "userId": "64f1234567abc89012345678",
  "amount": 1500
}

Response:

{
  "message": "Transaction recorded successfully"
}




**WebSocket Events**

joinRoom: Allows a user to join their unique room for live updates.
Example:

socket.emit('joinRoom', userId);
