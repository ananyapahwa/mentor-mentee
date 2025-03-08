# Mentor-Mentee Appointment Booking Application

(Under Development)

## 📌 Project Overview
This is a web-based application designed for organizations and universities to facilitate seamless mentor-mentee interactions. The platform allows mentees to book appointments with mentors, manage schedules, and enhance professional growth.

## 🚀 Features
- **User Registration & Authentication**: Secure signup and login for mentors and mentees.
- **OTP Verification**: Email verification using OTP to ensure authenticity.
- **Role-Based Access**: Separate dashboards for mentors and mentees.
- **Appointment Booking**: Mentees can view available slots and book appointments.
- **Mentor Scheduling**: Mentors can set their available slots and manage bookings.
- **Email Notifications**: Confirmation and reminders for scheduled appointments.
- **Dashboard & Profile Management**: Users can update profiles and view upcoming meetings.

## 🛠 Tech Stack
- **Frontend**: React.js (with React Router)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for schema management)
- **Authentication**: JWT for user authentication
- **Email Service**: Nodemailer for OTP and appointment notifications


## 🚀 Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/mentor-mentee-app.git
   ```
2. Install dependencies:
   ```sh
   cd frontned
   npm install
   cd backend
   npm install
   ```
3. Create a `.env` file in the server directory:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```
4. Start the backend server:
   ```sh
   cd backend
   npx nodemon server.js
   ```
5. Start the frontend:
   ```sh
   cd frontend
   npm run dev
   ```
6. Access the application at `http://localhost:5000`

## 🎯 API Endpoints
### Authentication
- **POST** `/api/auth/register` → Register user
- **POST** `/api/auth/login` → User login
- **POST** `/api/auth/verify-otp` → OTP verification

### Mentor & Mentee Features

- **POST** `/api/appointments` → Book an appointment
- **GET** `/api/appointments/:id` → Get user’s appointments


## 🛠 Future Enhancements
- Google Calendar Integration
- Video Call Scheduling
- AI-based Mentor Recommendations
- Feedback & Rating System



