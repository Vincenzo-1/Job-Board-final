// Import React and useState hook
import React, { useState } from 'react';
// Import the publishJob API service function
import { publishJob } from '../services/api';

// Define the CompanyView functional component
const CompanyView = () => {
  // State for form data: title, company, description, location
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: ''
  });
  // State for loading status during API call
  const [isLoading, setIsLoading] = useState(false);
  // State for feedback message to the user
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Handle input changes in the form
  const handleChange = (e) => {
    // Update formData state with the new value from the input field
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading to true
    setFeedbackMessage(''); // Clear previous feedback message

    try {
      // Call the publishJob API service function with form data
      const result = await publishJob(formData);
      // Set success feedback message
      setFeedbackMessage(`Job published successfully! ID: ${result._id}`);
      // Reset form data
      setFormData({ title: '', company: '', description: '', location: '' });
      // Log success to console (optional)
      console.log('Job published:', result);
    } catch (error) {
      // Set error feedback message
      setFeedbackMessage('Failed to publish job. Please try again.');
      // Log error to console (optional)
      console.error('Publish job error:', error);
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

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
