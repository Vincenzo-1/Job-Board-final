// backend/controllers/jobPostingController.js
import JobPosting from '../models/JobPosting.js';

// Controller function to publish a new job posting
export const publishJob = async (req, res) => {
  try {
    const { title, company, description, location } = req.body;
    const newJobPosting = new JobPosting({
      title,
      company,
      description,
      location
    });
    const savedJobPosting = await newJobPosting.save();
    res.status(201).json(savedJobPosting);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job posting', error: error.message });
  }
};

// Controller function to get all job postings
export const getAllJobs = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    res.json(jobPostings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job postings', error: error.message });
  }
};

// Controller function to get a single job posting by ID
export const getJobById = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findById(req.params.id);
    if (!jobPosting) {
      return res.status(404).json({ message: 'Job posting not found' });
    }
    res.json(jobPosting);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job posting', error: error.message });
  }
};

// Controller function to delete a job posting by ID
export const deleteJob = async (req, res) => {
  try {
    const deletedJobPosting = await JobPosting.findByIdAndDelete(req.params.id);
    if (!deletedJobPosting) {
      return res.status(404).json({ message: 'Job posting not found' });
    }
    res.json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job posting', error: error.message });
  }
};

// Controller function to delete all job postings
export const deleteAllJobs = async (req, res) => {
  try {
    await JobPosting.deleteMany({});
    res.json({ message: 'All job postings deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all job postings', error: error.message });
  }
};
