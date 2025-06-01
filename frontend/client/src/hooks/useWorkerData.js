// frontend/client/src/hooks/useWorkerData.js
import { useState, useEffect, useCallback } from 'react';
import { getJobs, getJobById, applyForJob, getWorkerApplications } from '../services/api';

/**
 * @typedef {object} JobPosting
 * @property {string} _id - The unique identifier of the job posting.
 * @property {string} title - The title of the job.
 * @property {string} company - The company offering the job.
 * @property {string} description - The description of the job.
 * @property {string} location - The location of the job.
 * @property {string} postedAt - The ISO date string of when the job was posted.
 */

/**
 * @typedef {object} Application
 * @property {string} _id - The unique identifier of the application.
 * @property {JobPosting|string} jobPosting - The job posting applied for. Can be a populated object or just an ID.
 * @property {string} workerEmail - The email of the worker who applied.
 * @property {string} applicationDate - The ISO date string of when the application was made.
 * @property {string} status - The status of the application (e.g., "Pending", "Reviewed").
 */

/**
 * Custom hook to manage state and actions for worker-related data.
 * This includes fetching job listings, viewing job details, applying for jobs,
 * and fetching a worker's applications.
 *
 * @returns {object} An object containing worker data, states, and handler functions.
 * @property {Array<JobPosting>} jobs - List of available job postings.
 * @property {JobPosting|null} selectedJobDetails - Details of the currently selected job.
 * @property {boolean} isLoading - Main loading state for jobs list and job details fetching.
 * @property {string} feedbackMessage - General feedback message for operations.
 * @property {string} workerEmailForSearch - Email input for searching worker applications.
 * @property {Array<Application>} workerApplications - List of applications for the searched worker.
 * @property {boolean} isFetchingWorkerApps - Loading state specifically for fetching worker applications.
 * @property {function(string): Promise<void>} handleViewDetails - Function to fetch and show job details.
 * @property {function(string): Promise<void>} handleApply - Function to apply for a job.
 * @property {function(React.ChangeEvent<HTMLInputElement>): void} handleWorkerEmailSearchChange - Function to update worker email for search.
 * @property {function(React.FormEvent<HTMLFormElement>=): Promise<void>} handleFetchWorkerApplications - Function to fetch worker applications.
 * @property {React.Dispatch<React.SetStateAction<JobPosting|null>>} setSelectedJobDetails - Function to set (or clear) selected job details.
 */
const useWorkerData = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Main loading for jobs list and details
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [workerEmailForSearch, setWorkerEmailForSearch] = useState('');
  const [workerApplications, setWorkerApplications] = useState([]);
  const [isFetchingWorkerApps, setIsFetchingWorkerApps] = useState(false); // Specific loading for worker applications

  /**
   * Fetches all job postings from the API.
   * useCallback is used to ensure this function has a stable reference
   * and doesn't cause unnecessary re-renders if passed as a prop or dependency.
   */
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setFeedbackMessage('');
    try {
      const fetchedJobs = await getJobs();
      setJobs(fetchedJobs);
    } catch (error) {
      setFeedbackMessage('Failed to fetch jobs.');
      console.error('Fetch jobs error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  /**
   * Fetches and displays the details of a specific job.
   * @param {string} jobId - The ID of the job to view details for.
   */
  const handleViewDetails = useCallback(async (jobId) => {
    setIsLoading(true);
    setFeedbackMessage('');
    setSelectedJobDetails(null);
    try {
      const details = await getJobById(jobId);
      setSelectedJobDetails(details);
    } catch (error) {
      setFeedbackMessage(`Failed to fetch job details for ID: ${jobId}.`);
      console.error('Fetch job details error:', error);
      setSelectedJobDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Handles the process of applying for a job.
   * Prompts the user for their email and submits the application.
   * @param {string} jobId - The ID of the job to apply for.
   */
  const handleApply = useCallback(async (jobId) => {
    setFeedbackMessage('');
    const workerEmail = window.prompt('Please enter your email to apply:');
    if (!workerEmail) {
      setFeedbackMessage('Application cancelled: Email is required.');
      return;
    }

    setIsLoading(true); // Use main loading indicator for this action
    try {
      const applicationResult = await applyForJob({ jobPostingId: jobId, workerEmail });
      setFeedbackMessage(`Successfully applied for job! Application ID: ${applicationResult._id}`);
      console.log('Application successful:', applicationResult);
    } catch (error) {
      setFeedbackMessage('Failed to apply for job. ' + (error.response?.data?.message || error.message || 'Please try again.'));
      console.error('Apply for job error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Updates the state for the worker's email used in application search.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the email input field.
   */
  const handleWorkerEmailSearchChange = (e) => {
    setWorkerEmailForSearch(e.target.value);
  };

  /**
   * Fetches applications submitted by a worker, identified by their email.
   * Can be triggered by a form submission or directly.
   * @param {React.FormEvent<HTMLFormElement>} [e] - Optional form submission event.
   */
  const handleFetchWorkerApplications = useCallback(async (e) => {
    if (e) e.preventDefault(); // Prevent form submission if event is passed
    if (!workerEmailForSearch) {
      setFeedbackMessage('Please enter an email to search for applications.');
      return;
    }
    setIsFetchingWorkerApps(true);
    setFeedbackMessage('');
    setWorkerApplications([]);
    try {
      const apps = await getWorkerApplications(workerEmailForSearch);
      setWorkerApplications(apps);
      if (apps.length === 0) {
        setFeedbackMessage(`No applications found for ${workerEmailForSearch}.`);
      }
    } catch (error) {
      setFeedbackMessage(`Failed to fetch applications for ${workerEmailForSearch}. ` + (error.response?.data?.message || error.message || 'Please try again.'));
      console.error('Fetch worker applications error:', error);
    } finally {
      setIsFetchingWorkerApps(false);
    }
  }, [workerEmailForSearch]);

  return {
    jobs,
    selectedJobDetails,
    isLoading,
    feedbackMessage,
    workerEmailForSearch,
    workerApplications,
    isFetchingWorkerApps,
    handleViewDetails,
    handleApply,
    handleWorkerEmailSearchChange,
    handleFetchWorkerApplications,
    setSelectedJobDetails // Used to close the details view
  };
};

export default useWorkerData;
