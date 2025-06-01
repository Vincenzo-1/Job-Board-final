// Import axios for making HTTP requests
import axios from 'axios';

// Define the base URL for the API.
// This assumes the React app is served from the same domain as the backend,
// or that a proxy is set up in package.json (e.g., "proxy": "http://localhost:5000").
const API_BASE_URL = '/api'; // Adjust if your backend is on a different port/domain during development

// --- Job Posting Service Functions ---

/**
 * Publishes a new job posting.
 * @param {object} jobData - The data for the new job posting.
 * @param {string} jobData.title - The title of the job.
 * @param {string} jobData.company - The company offering the job.
 * @param {string} jobData.description - The description of the job.
 * @param {string} jobData.location - The location of the job.
 * @returns {Promise<object>} The created job posting object.
 * @property {string} _id - The unique identifier of the job posting.
 * @property {string} title - The title of the job.
 * @property {string} company - The company offering the job.
 * @property {string} description - The description of the job.
 * @property {string} location - The location of the job.
 * @property {string} postedAt - The ISO date string of when the job was posted.
 */
export const publishJob = async (jobData) => {
  try {
    // Make a POST request to the /api/jobs endpoint
    const response = await axios.post(`${API_BASE_URL}/jobs`, jobData);
    // Return the data from the response (the created job posting)
    return response.data;
  } catch (error) {
    // Log the error to the console
    console.error('Error publishing job:', error.response ? error.response.data : error.message);
    // Throw the error to be caught by the calling function
    throw error;
  }
};

/**
 * Fetches all job postings.
 * @returns {Promise<Array<object>>} A list of job posting objects. Each object represents a job posting.
 * @property {string} _id - The unique identifier of the job posting.
 * @property {string} title - The title of the job.
 * @property {string} company - The company offering the job.
 * @property {string} description - The description of the job.
 * @property {string} location - The location of the job.
 * @property {string} postedAt - The ISO date string of when the job was posted.
 */
export const getJobs = async () => {
  try {
    // Make a GET request to the /api/jobs endpoint
    const response = await axios.get(`${API_BASE_URL}/jobs`);
    // Return the data from the response (list of job postings)
    return response.data;
  } catch (error) {
    // Log the error to the console
    console.error('Error fetching jobs:', error.response ? error.response.data : error.message);
    // Throw the error to be caught by the calling function
    throw error;
  }
};

/**
 * Fetches a single job posting by its ID.
 * @param {string} id - The ID of the job posting to fetch.
 * @returns {Promise<object>} The job posting object.
 * @property {string} _id - The unique identifier of the job posting.
 * @property {string} title - The title of the job.
 * @property {string} company - The company offering the job.
 * @property {string} description - The description of the job.
 * @property {string} location - The location of the job.
 * @property {string} postedAt - The ISO date string of when the job was posted.
 */
export const getJobById = async (id) => {
  try {
    // Make a GET request to the /api/jobs/:id endpoint
    const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
    // Return the data from the response (the job posting)
    return response.data;
  } catch (error) {
    // Log the error to the console
    console.error(`Error fetching job by ID (${id}):`, error.response ? error.response.data : error.message);
    // Throw the error to be caught by the calling function
    throw error;
  }
};

// --- Application Service Functions ---

/**
 * Submits an application for a job.
 * @param {object} applicationData - The data for the application.
 * @param {string} applicationData.jobPostingId - The ID of the job posting to apply for.
 * @param {string} applicationData.workerEmail - The email of the worker applying.
 * @returns {Promise<object>} The created application object.
 * @property {string} _id - The unique identifier of the application.
 * @property {string} jobPostingId - The ID of the job posting applied for.
 * @property {string} workerEmail - The email of the worker who applied.
 * @property {string} applicationDate - The ISO date string of when the application was made.
 * @property {string} status - The status of the application (e.g., "Pending", "Reviewed").
 */
export const applyForJob = async (applicationData) => {
  try {
    // Make a POST request to the /api/applications endpoint
    const response = await axios.post(`${API_BASE_URL}/applications`, applicationData);
    // Return the data from the response (the created application)
    return response.data;
  } catch (error) {
    // Log the error to the console
    console.error('Error applying for job:', error.response ? error.response.data : error.message);
    // Throw the error to be caught by the calling function
    throw error;
  }
};

/**
 * Fetches all applications for a specific worker.
 * @param {string} email - The email of the worker whose applications to fetch.
 * @returns {Promise<Array<object>>} A list of application objects. Each object represents an application.
 * The `jobPosting` field within each application object may be populated with details from the JobPosting model.
 * @property {string} _id - The unique identifier of the application.
 * @property {object|string} jobPosting - The job posting applied for. Can be a populated object or just an ID.
 * @property {string} jobPosting._id - (if populated) Job posting ID.
 * @property {string} jobPosting.title - (if populated) Job posting title.
 * @property {string} jobPosting.company - (if populated) Job posting company.
 * @property {string} workerEmail - The email of the worker who applied.
 * @property {string} applicationDate - The ISO date string of when the application was made.
 * @property {string} status - The status of the application.
 */
export const getWorkerApplications = async (email) => {
  try {
    // Make a GET request to the /api/applications/worker/:email endpoint
    const response = await axios.get(`${API_BASE_URL}/applications/worker/${email}`);
    // Return the data from the response (list of applications)
    return response.data;
  } catch (error) {
    // Log the error to the console
    console.error(`Error fetching applications for worker (${email}):`, error.response ? error.response.data : error.message);
    // Throw the error to be caught by the calling function
    throw error;
  }
};
