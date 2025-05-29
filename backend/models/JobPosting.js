// Import Mongoose library
import mongoose from 'mongoose';

// Define the schema for a Job Posting
const jobPostingSchema = new mongoose.Schema({
  // Title of the job posting
  title: {
    type: String, // Data type is String
    required: true // This field is mandatory
  },
  // Company offering the job
  company: {
    type: String, // Data type is String
    required: true // This field is mandatory
  },
  // Detailed description of the job
  description: {
    type: String, // Data type is String
    required: true // This field is mandatory
  },
  // Location of the job
  location: {
    type: String, // Data type is String
    required: true // This field is mandatory
  },
  // Date when the job was posted
  postedAt: {
    type: Date, // Data type is Date
    default: Date.now // Default value is the current date and time
  }
});

// Create the Mongoose model from the schema
const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

// Export the JobPosting model
export default JobPosting;
