// Import React
import React from 'react';
// Import the custom hook
import useWorkerData from '../controllers/useWorkerDataController';

// Define the WorkerView functional component
const WorkerView = () => {
  // Use the custom hook to get state and handlers
  const {
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
    setSelectedJobDetails // For closing the details view
  } = useWorkerData();

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
