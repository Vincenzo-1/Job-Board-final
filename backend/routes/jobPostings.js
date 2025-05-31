// Import Express framework
import express from 'express';
// Import the JobPosting model
import JobPosting from '../models/JobPosting.js';

// Create an Express router instance
const router = express.Router();

// --- Routes for Job Postings ---

// POST /api/jobs - Publish a new job posting
router.post('/', async (req, res) => {
  try {
    // Destructure required fields from request body
    const { title, company, description, location } = req.body;
    // Create a new JobPosting instance
    const newJobPosting = new JobPosting({
      title,
      company,
      description,
      location
    });
    // Save the new job posting to the database
    const savedJobPosting = await newJobPosting.save();
    // Respond with the created job posting and status 201 (Created)
    res.status(201).json(savedJobPosting);
  } catch (error) {
    // If an error occurs, respond with status 500 (Internal Server Error)
    // and a JSON object containing the error message
    res.status(500).json({ message: 'Error creating job posting', error: error.message });
  }
});

// GET /api/jobs - View all job postings
router.get('/', async (req, res) => {
  try {
    // Fetch all job postings from the database
    const jobPostings = await JobPosting.find();
    // Respond with the list of job postings
    res.json(jobPostings);
  } catch (error) {
    // If an error occurs, respond with status 500 (Internal Server Error)
    // and a JSON object containing the error message
    res.status(500).json({ message: 'Error fetching job postings', error: error.message });
  }
});

// GET /api/jobs/:id - View a specific job posting by ID
router.get('/:id', async (req, res) => {
  try {
    // Find a job posting by its ID, which is passed as a URL parameter
    const jobPosting = await JobPosting.findById(req.params.id);
    // If the job posting is not found
    if (!jobPosting) {
      // Respond with status 404 (Not Found) and an error message
      return res.status(404).json({ message: 'Job posting not found' });
    }
    // Respond with the found job posting
    res.json(jobPosting);
  } catch (error) {
    // If an error occurs (e.g., invalid ID format), respond with status 500 (Internal Server Error)
    // and a JSON object containing the error message
    res.status(500).json({ message: 'Error fetching job posting', error: error.message });
  }
});
//REMOVE /api/jobs/:id - Delete a job posting by ID
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete the job posting by its ID
    const deletedJobPosting = await JobPosting.findByIdAndDelete(req.params.id);
    // If the job posting is not found
    if (!deletedJobPosting) {
      // Respond with status 404 (Not Found) and an error message
      return res.status(404).json({ message: 'Job posting not found' });
    }
    // Respond with a success message
    res.json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    // If an error occurs, respond with status 500 (Internal Server Error)
    // and a JSON object containing the error message
    res.status(500).json({ message: 'Error deleting job posting', error: error.message });
  }
});
router.delete('/', async (req, res) => {
  try {
    // Delete all job postings
    await JobPosting.deleteMany({});
    // Respond with a success message
    res.json({ message: 'All job postings deleted successfully' });
  } catch (error) {
    // If an error occurs, respond with status 500 (Internal Server Error)
    // and a JSON object containing the error message
    res.status(500).json({ message: 'Error deleting job postings', error: error.message });
  }
});
// Export the router to be used in other parts of the application
export default router;
