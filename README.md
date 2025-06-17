# Job Search App

This is a frontend application built with Next.js 14 and TypeScript for searching jobs, liking job postings, and managing a user profile. It also includes a backend authentication system built with Express.js and MongoDB.

## Demo 👇

[DEMO LINK]('https://job-search-eight-iota.vercel.app/login')

## Features

🔍 Job Search by Title using the JSearch API

📄 Job Details Page accessible via /job-details/:id

❤️ Liked Jobs List stored in localStorage, accessible via /liked

👤 User Profile creation stored in localStorage, via /create-profile

💼 Job Recommendations on /jobs, based on the user's desired job title

🔐 Authentication System (Register/Login) using Express.js + MongoDB

## Technologies Used
- Next.js 14 (App Router) with TypeScript
- Tailwind CSS — basic clean styling
- Formik + Yup — forms & validation
- Axios + SWR — API requests & caching
- localStorage — for likes & profile
- Modular Folder Structure
- Express.js server (deployed to Render)
- MongoDB Atlas free-tier cluster
- Mongoose — MongoDB schema modeling
- Deployment on Vercel (frontend) and Render (backend)

## How to Run Locally

### Install dependencies
```bash
npm install
npm run dev
```
Frontend will be running at http://localhost:3000

### Run backend
Backend code is hosted in a separate repository: https://github.com/tonni004/test-backend

The backend provides authentication endpoints (signup/login) with Express and MongoDB.

You need to clone and run the backend separately.
```bash
git clone https://github.com/tonni004/test-backend.git
cd test-backend
npm install
npm run dev
```
Backend will run at http://localhost:5000 or your configured port.

### Environment Variables
Create a ```.env``` file in the root and backend folders.

Frontend ```.env```:
```ini
NEXT_PUBLIC_API_URL=http://localhost:5000/api
RAPIDAPI_KEY=your_rapidapi_key_here
```

Backend ```.env```:
```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Deployment
Frontend deployed on Vercel

Backend deployed on Render

### Preview images

![Home page](https://i.ibb.co/ynfJf7WT/2025-06-17-18-33-10.png)
![Liked page](https://i.ibb.co/SXjssW03/2025-06-17-18-33-16.png)
![Job page](https://i.ibb.co/XZFtbRYJ/2025-06-17-18-33-51.png)

