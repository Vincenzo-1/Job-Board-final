// Import React
import React from 'react';
// Import the custom hook
import useCompanyForm from '../hooks/useCompanyForm';

// Define the CompanyView functional component
const CompanyView = () => {
  // Use the custom hook to get state and handlers
  const {
    formData,
    isLoading,
    feedbackMessage,
    handleChange,
    handleSubmit
  } = useCompanyForm();

  // JSX for the component's UI
  return (
    <div>
      <h2>Publish New Job Posting</h2>
      {/* Form for submitting new job posting */}
      <form onSubmit={handleSubmit}>
        {/* Input field for job title */}
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required // HTML5 validation: field is required
          />
        </div>
        {/* Input field for company name */}
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required // HTML5 validation: field is required
          />
        </div>
        {/* Textarea for job description */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required // HTML5 validation: field is required
          />
        </div>
        {/* Input field for job location */}
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required // HTML5 validation: field is required
          />
        </div>
        {/* Submit button, disabled while loading */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Publishing...' : 'Publish Job'}
        </button>
      </form>
      {/* Display feedback message if it exists */}
      {feedbackMessage && <p>{feedbackMessage}</p>}
    </div>
  );
};

// Export the CompanyView component
export default CompanyView;
