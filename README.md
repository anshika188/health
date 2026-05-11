# Compliance Health Dashboard

An enterprise-grade compliance monitoring and risk management platform built with a modern "Nexus" aesthetic.

## 🚀 Technology Stack

- **Frontend**: React.js + Vite + Tailwind CSS + Recharts + Framer Motion
- **Backend**: Node.js + Express.js + Mongoose
- **Database**: MongoDB
- **Security**: JWT-based Authentication + Role-Based Access Control (RBAC)

---

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or Atlas)

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/compliance_db
   JWT_SECRET=supersecretkey123
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server should log: `MongoDB Connected: localhost`.

### 3. Frontend Setup
1. Open a **new** terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the application:
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 🔑 Initial Setup
Since the database is newly initialized, you must **Register** a new account first.
- Navigate to the **Registration** page.
- Choose a role: **Admin**, **Auditor**, or **Employee**.
- Once registered, use those credentials to **Login**.
