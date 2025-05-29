# Job Application Platform

This project is a simple job application platform with a separate frontend (React) and backend (Node.js with Express and MongoDB).

## Project Structure

```
/
├── backend/         # Node.js, Express, Mongoose backend code
│   ├── models/      # Mongoose models (JobPosting, Application)
│   ├── routes/      # API routes (jobPostings, applications)
│   ├── server.js    # Main backend server file
│   └── package.json
├── frontend/
│   └── client/      # React application (created with Create React App)
│       ├── public/
│       ├── src/
│       │   ├── components/ # React components (CompanyView, WorkerView)
│       │   ├── services/   # API service (api.js using Axios)
│       │   ├── App.js
│       │   ├── index.js
│       │   └── package.json
└── README.md        # This file
```

## Prerequisites

*   Node.js (which includes npm) installed on your system.
*   MongoDB installed and running locally on its default port (27017).

## Setup and Running the Application

Follow these steps to get the application up and running:

### 1. Backend Setup

First, set up and start the backend server.

```bash
# Navigate to the backend directory
cd backend

# Install backend dependencies
npm install

# Start the backend server
# This will typically run on http://localhost:5000
npm start
```
*   The server will connect to a MongoDB instance at `mongodb://localhost:27017/job_app_db`.
*   You should see a console message like "MongoDB connected successfully" and "Server is running on port 5000".

### 2. Frontend Setup

Next, set up and start the frontend React development server. Open a **new terminal window or tab** for this, as the backend server needs to keep running.

```bash
# Navigate to the frontend client directory from the project root
cd frontend/client

# Install frontend dependencies
npm install

# Start the frontend development server
# This will typically run on http://localhost:3000
npm start
```
*   The React development server will automatically open your default web browser to `http://localhost:3000`.
*   The `frontend/client/package.json` includes a `"proxy": "http://localhost:5000"` setting. This means any API requests made from the React app (e.g., to `/api/jobs`) will be automatically forwarded to the backend server running on port 5000, avoiding CORS issues during development.

## How to Use the Application

1.  **Open your browser:** If it doesn't open automatically, navigate to `http://localhost:3000`.
2.  **Worker View (Default):**
    *   This view allows users to see available job postings.
    *   You can click "View Details" for more information on a specific job.
    *   Click "Apply" to apply for a job. You will be prompted for your email address.
    *   You can also search for your past applications by entering your email in the "View Your Applications" section.
3.  **Company View:**
    *   Click the "Company View (Post Jobs)" button in the header navigation.
    *   This view allows companies to publish new job postings by filling out the form and clicking "Publish Job".
    *   Feedback on the operation (success or failure) will be displayed below the form.

## API Endpoints

The backend exposes the following API endpoints under `/api`:

*   `POST /api/jobs`: Create a new job posting.
*   `GET /api/jobs`: Get all job postings.
*   `GET /api/jobs/:id`: Get a specific job posting by ID.
*   `POST /api/applications`: Submit a new application for a job.
*   `GET /api/applications/worker/:email`: Get all applications for a specific worker by their email.

---
This README provides a good overview and clear instructions for setting up and running the application.
