// Import React, useState, and useEffect hooks
import React, { useState, useEffect } from 'react';
// Import API service functions
import { getJobs, getJobById, applyForJob, getWorkerApplications } from '../services/api';

// Define the WorkerView functional component
const WorkerView = () => {
  // State for the list of job postings
  const [jobs, setJobs] = useState([]);
  // State for the currently selected job details (if any)
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  // State for loading status during API calls
  const [isLoading, setIsLoading] = useState(false);
  // State for feedback messages
  const [feedbackMessage, setFeedbackMessage] = useState('');
  // State for worker's email to view their applications
  const [workerEmailForSearch, setWorkerEmailForSearch] = useState('');
  // State for the list of applications for the searched worker
  const [workerApplications, setWorkerApplications] = useState([]);
  // State for loading status for fetching worker applications
  const [isFetchingWorkerApps, setIsFetchingWorkerApps] = useState(false);


  // useEffect hook to fetch jobs when the component mounts
  useEffect(() => {
    // Define an async function to fetch jobs
    const fetchJobs = async () => {
      setIsLoading(true); // Set loading to true
      try {
        // Call the getJobs API service function
        const fetchedJobs = await getJobs();
        setJobs(fetchedJobs); // Update jobs state
      } catch (error) {
        // Set error feedback message
        setFeedbackMessage('Failed to fetch jobs.');
        console.error('Fetch jobs error:', error); // Log error
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };
    fetchJobs(); // Call the function
  }, []); // Empty dependency array means this runs once on mount

  // Handle viewing details of a specific job
  const handleViewDetails = async (jobId) => {
    setIsLoading(true); // Set loading to true
    setFeedbackMessage(''); // Clear feedback
    try {
      // Call the getJobById API service function
      const details = await getJobById(jobId);
      setSelectedJobDetails(details); // Update selected job details state
    } catch (error) {
      // Set error feedback message
      setFeedbackMessage(`Failed to fetch job details for ID: ${jobId}.`);
      console.error('Fetch job details error:', error); // Log error
      setSelectedJobDetails(null); // Clear details on error
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  // Handle applying for a job
  const handleApply = async (jobId) => {
    setFeedbackMessage(''); // Clear feedback
    // Prompt for worker's email
    const workerEmail = window.prompt('Please enter your email to apply:');
    if (!workerEmail) { // If no email is entered or prompt is cancelled
      setFeedbackMessage('Application cancelled: Email is required.');
      return;
    }

    setIsLoading(true); // Set loading to true
    try {
      // Call the applyForJob API service function
      const applicationResult = await applyForJob({ jobPostingId: jobId, workerEmail });
      // Set success feedback message
      setFeedbackMessage(`Successfully applied for job! Application ID: ${applicationResult._id}`);
      console.log('Application successful:', applicationResult); // Log success
    } catch (error) {
      // Set error feedback message
      setFeedbackMessage('Failed to apply for job.');
      console.error('Apply for job error:', error); // Log error
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };
  
  // Handle input change for worker email search
  const handleWorkerEmailSearchChange = (e) => {
    setWorkerEmailForSearch(e.target.value);
  };

  // Handle fetching applications for a worker
  const handleFetchWorkerApplications = async (e) => {
    e.preventDefault(); // Prevent form submission if this is part of a form
    if (!workerEmailForSearch) {
      setFeedbackMessage('Please enter an email to search for applications.');
      return;
    }
    setIsFetchingWorkerApps(true);
    setFeedbackMessage('');
    setWorkerApplications([]); // Clear previous results
    try {
      const apps = await getWorkerApplications(workerEmailForSearch);
      setWorkerApplications(apps);
      if (apps.length === 0) {
        setFeedbackMessage(`No applications found for ${workerEmailForSearch}.`);
      }
    } catch (error) {
      setFeedbackMessage(`Failed to fetch applications for ${workerEmailForSearch}.`);
      console.error('Fetch worker applications error:', error);
    } finally {
      setIsFetchingWorkerApps(false);
    }
  };


  // JSX for the component's UI
  return (
    <div>
      <h2>Available Job Postings</h2>
      {/* Display loading message or list of jobs */}
      {isLoading && <p>Loading jobs...</p>}
      {/* Display feedback message if it exists */}
      {feedbackMessage && <p style={{ color: feedbackMessage.startsWith('Failed') ? 'red' : 'green' }}>{feedbackMessage}</p>}
      
      {/* List of job postings */}
      {!isLoading && jobs.length === 0 && !feedbackMessage.startsWith('Failed') && <p>No job postings available at the moment.</p>}
      <ul>
        {jobs.map((job) => (
          // List item for each job
          <li key={job._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{job.title}</h3> {/* Job title */}
            <p><strong>Company:</strong> {job.company}</p> {/* Company name */}
            <p><strong>Location:</strong> {job.location}</p> {/* Job location */}
            <p><strong>Description:</strong> {job.description.substring(0, 100)}...</p> {/* Short description */}
            {/* Button to view job details */}
            <button onClick={() => handleViewDetails(job._id)} disabled={isLoading}>
              View Details
            </button>
            {/* Button to apply for the job */}
            <button onClick={() => handleApply(job._id)} disabled={isLoading} style={{ marginLeft: '10px' }}>
              Apply
            </button>
          </li>
        ))}
      </ul>

      {/* Display selected job details if available */}
      {selectedJobDetails && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #eee' }}>
          <h3>Job Details: {selectedJobDetails.title}</h3>
          <p><strong>Company:</strong> {selectedJobDetails.company}</p>
          <p><strong>Location:</strong> {selectedJobDetails.location}</p>
          <p><strong>Description:</strong> {selectedJobDetails.description}</p>
          <p><strong>Posted At:</strong> {new Date(selectedJobDetails.postedAt).toLocaleDateString()}</p>
          <button onClick={() => setSelectedJobDetails(null)}>Close Details</button>
        </div>
      )}

      {/* Section to view applications by worker email (Optional part) */}
      <div style={{ marginTop: '30px' }}>
        <h2>View Your Applications</h2>
        <form onSubmit={handleFetchWorkerApplications}>
          <input
            type="email"
            placeholder="Enter your email"
            value={workerEmailForSearch}
            onChange={handleWorkerEmailSearchChange}
            required
          />
          <button type="submit" disabled={isFetchingWorkerApps}>
            {isFetchingWorkerApps ? 'Searching...' : 'Find My Applications'}
          </button>
        </form>
        {isFetchingWorkerApps && <p>Loading applications...</p>}
        {workerApplications.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <h3>Applications for {workerEmailForSearch}:</h3>
            <ul>
              {workerApplications.map(app => (
                <li key={app._id}>
                  <p><strong>Job Title:</strong> {app.jobPosting ? app.jobPosting.title : 'N/A (Job may be deleted)'}</p>
                  <p><strong>Company:</strong> {app.jobPosting ? app.jobPosting.company : 'N/A'}</p>
                  <p><strong>Applied On:</strong> {new Date(app.applicationDate).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {app.status}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the WorkerView component
export default WorkerView;
