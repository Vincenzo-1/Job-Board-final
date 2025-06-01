// Import Express framework
import express from 'express';
// Import controller functions
import {
  publishJob,
  getAllJobs,
  getJobById,
  deleteJob,
  deleteAllJobs
} from '../controllers/jobPostingController.js';

// Create an Express router instance
const router = express.Router();

// --- Routes for Job Postings ---

// POST /api/jobs - Publish a new job posting
router.post('/', publishJob);

// GET /api/jobs - View all job postings
router.get('/', getAllJobs);

// GET /api/jobs/:id - View a specific job posting by ID
router.get('/:id', getJobById);

// DELETE /api/jobs/:id - Delete a job posting by ID
router.delete('/:id', deleteJob);

// DELETE /api/jobs - Delete all job postings
router.delete('/', deleteAllJobs);

// Export the router to be used in other parts of the application
export default router;
