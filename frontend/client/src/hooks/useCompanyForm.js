// frontend/client/src/hooks/useCompanyForm.js
import { useState } from 'react';
import { publishJob } from '../services/api';

/**
 * Custom hook to manage the state and actions for the job publishing form.
 * It handles form data, loading states, feedback messages, and submission logic.
 *
 * @returns {object} An object containing form state and handler functions.
 * @property {object} formData - The current state of the form data.
 * @property {string} formData.title - Job title.
 * @property {string} formData.company - Company name.
 * @property {string} formData.description - Job description.
 * @property {string} formData.location - Job location.
 * @property {boolean} isLoading - Loading state for form submission.
 * @property {string} feedbackMessage - Feedback message for the user.
 * @property {function(Event): void} handleChange - Function to handle form input changes.
 * @property {function(Event): Promise<void>} handleSubmit - Function to handle form submission.
 */
const useCompanyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  /**
   * Handles changes to form input fields.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - The change event from the input field.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles the submission of the job publishing form.
   * It calls the publishJob API, manages loading and feedback states, and resets the form on success.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedbackMessage('');

    try {
      const result = await publishJob(formData);
      setFeedbackMessage(`Job published successfully! ID: ${result._id}`);
      setFormData({ title: '', company: '', description: '', location: '' }); // Reset form
      console.log('Job published:', result);
    } catch (error) {
      setFeedbackMessage('Failed to publish job. Please try again.');
      console.error('Publish job error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    feedbackMessage,
    handleChange,
    handleSubmit
  };
};

export default useCompanyForm;
