# Mini Service Request Board - Frontend

A modern frontend application for managing service requests and job postings.

Built as part of the Full-Stack Developer Intern Technical Assessment.

---

# Live Demo

Frontend URL:

```bash
https://mini-app-frontend-two.vercel.app/
```

Backend API:

```bash
https://miniappbackend-production.up.railway.app/
```

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Logout Functionality
- Protected Routes

## Job Management
- Create Job Request
- View All Jobs
- View Single Job Details
- Update Job Status
- Delete Job

## Search & Filter
- Search jobs by keyword
- Filter jobs by category

## UI Features
- Responsive Design
- Tailwind CSS Styling
- Dynamic Job Cards
- Loading States
- Navigation Support

---

# Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

---

# Folder Structure

```bash
frontend/
│
├── app/
│   ├── jobs/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   │
│   │   ├── new/
│   │   │   └── page.tsx
│   │   │
│   │   └── components/
│   │       └── JobCard.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── services/
│   └── api.ts
│
├── public/
├── .env.local
├── package.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/MohamedNusaif/mini_app_frontend.git
```

---

# Navigate to Project

```bash
cd mini_app_frontend
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=https://miniappbackend-production.up.railway.app/api
```

---

# Run Development Server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:3000
```

---

# Build Production Version

```bash
npm run build
```

---

# Start Production Server

```bash
npm start
```

---

# Authentication Flow

## Register

Users can create a new account.

Route:

```bash
/register
```

---

## Login

Users login using email and password.

Route:

```bash
/login
```

After successful login:
- JWT token stored in localStorage
- User data stored in localStorage

---

# Protected Features

Only authenticated users can:
- Create Jobs
- Delete Jobs

If user is not authenticated:
- Redirected to Login page

---

# API Integration

Axios is used for API communication.

## API Base URL

```bash
https://miniappbackend-production.up.railway.app/api
```

---

# Main Pages

## Home Page

Route:

```bash
/
```

Features:
- View all jobs
- Search jobs
- Filter jobs
- Navigate to details

---

## Create Job Page

Route:

```bash
/jobs/new
```

Features:
- Protected route
- Create new service request

---

## Job Detail Page

Route:

```bash
/jobs/[id]
```

Features:
- View job information
- Update status
- Delete job

---

## Login Page

Route:

```bash
/login
```

Features:
- User authentication
- JWT token generation

---

## Register Page

Route:

```bash
/register
```

Features:
- New user registration

---

# Deployment

## Frontend Hosting

Hosted using:

```bash
Vercel
```

## Backend Hosting

Hosted using:

```bash
Railway
```

---

# GitHub Repository

Frontend Repository:

```bash
https://github.com/MohamedNusaif/mini_app_frontend
```

Backend Repository:

```bash
https://github.com/MohamedNusaif/mini_app_backend
```

---

# Author

Mohamed Nusaif

Full-Stack Developer Intern Assessment
