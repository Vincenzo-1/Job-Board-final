// Import Express framework
import express from 'express';
// Import controller functions
import {
  createApplication,
  getApplicationsByWorkerEmail
} from '../controllers/applicationController.js';

// Create an Express router instance
const router = express.Router();

// --- Routes for Applications ---

// POST /api/applications - Request an interview/apply for a job
router.post('/', createApplication);

// GET /api/applications/worker/:email - View applications for a specific worker
router.get('/worker/:email', getApplicationsByWorkerEmail);

// Export the router to be used in other parts of the application
export default router;
