// Import Express framework
import express from 'express';
// Import the Application model
import Application from '../models/Application.js';
// Import the JobPosting model to verify jobPostingId
import JobPosting from '../models/JobPosting.js';

// Create an Express router instance
const router = express.Router();

// --- Routes for Applications ---

// POST /api/applications - Request an interview/apply for a job
router.post('/', async (req, res) => {
  try {
    // Destructure required fields from request body
    const { jobPostingId, workerEmail } = req.body;

    // Check if the job posting exists
    const jobExists = await JobPosting.findById(jobPostingId);
    if (!jobExists) {
      // If job posting not found, return 404
      return res.status(404).json({ message: 'Job posting not found' });
    }

    // Create a new Application instance
    const newApplication = new Application({
      jobPosting: jobPostingId, // Link to the JobPosting
      workerEmail
    });
    // Save the new application to the database
    const savedApplication = await newApplication.save();
    // Respond with the created application and status 201 (Created)
    res.status(201).json(savedApplication);
  } catch (error) {
    // If an error occurs, respond with status 500 (Internal Server Error)
    // and a JSON object containing the error message
    res.status(500).json({ message: 'Error creating application', error: error.message });
  }
});

// GET /api/applications/worker/:email - View applications for a specific worker
router.get('/worker/:email', async (req, res) => {
  try {
    // Fetch all applications submitted by a worker with the given email (passed as URL parameter)
    // Populate the 'jobPosting' field to include details of the job
    const applications = await Application.find({ workerEmail: req.params.email }).populate('jobPosting');
    // If no applications are found for the worker
    if (!applications || applications.length === 0) {
      // Respond with status 404 (Not Found) and an appropriate message
      return res.status(404).json({ message: 'No applications found for this worker' });
    }
    // Respond with the list of applications
    res.json(applications);
  } catch (error) {
    // If an error occurs, respond with status 500 (Internal Server Error)
    // and a JSON object containing the error message
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Export the router to be used in other parts of the application
export default router;
