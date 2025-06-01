// backend/controllers/applicationController.js
import Application from '../models/Application.js';
import JobPosting from '../models/JobPosting.js'; // Needed for checking if jobPostingId is valid

// Controller function to create a new application
export const createApplication = async (req, res) => {
  try {
    const { jobPostingId, workerEmail } = req.body;

    // Check if the job posting exists
    const jobExists = await JobPosting.findById(jobPostingId);
    if (!jobExists) {
      return res.status(404).json({ message: 'Job posting not found' });
    }

    const newApplication = new Application({
      jobPosting: jobPostingId,
      workerEmail
    });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Error creating application', error: error.message });
  }
};

// Controller function to get applications by worker email
export const getApplicationsByWorkerEmail = async (req, res) => {
  try {
    const applications = await Application.find({ workerEmail: req.params.email }).populate('jobPosting');
    // It's better to return an empty array if no applications are found,
    // rather than a 404, unless specifically required.
    // The client can then check for an empty array.
    // However, to maintain consistency with previous logic:
    if (!applications || applications.length === 0) {
       return res.status(404).json({ message: 'No applications found for this worker' });
    }
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
};
