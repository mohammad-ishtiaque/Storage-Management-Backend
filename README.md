# Secure Authentication & File Management API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)](https://www.mongodb.com/)

A complete backend system for user authentication, file management, and storage tracking with built-in Postman testing support.



## Features
- 🔐 JWT Authentication System
- 📁 File Upload (PDF/Images/Text)
- 📈 Storage Quota Management
- ⭐ Favorite Files System
- 🔄 Password Reset Flow
- 📂 Hierarchical Folder Structure
- 📊 Storage Analytics
- 🧪 Postman Test Suite

## Tech Stack
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Security**: JWT + Bcrypt
- **File Handling**: Multer
- **Email**: Nodemailer
- **Testing**: Postman

##.env setup
- MONGODB_URI=mongodb+srv://arifistiak133:arifistiak133@storage-management.q8j7u.mongodb.net/storage-management?retryWrites=true&w=majority&appName=storage-management
- JWT_SECRET='kjdklfjskdfhweuiyrfwiuefhs'
- EMAIL_USER='brock.ryan@ethereal.email'
- EMAIL_PASS='udU7U2TbFxxkpPrG9E'
- PORT=3000

## Installation

### 1. Clone Repository & run on local file
```bash
git clone https://github.com/mohammad-ishtiaque/Storage-Management-Backend
cd Storage-Management-Backend
npm install
node server.js
