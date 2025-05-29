// Import Mongoose library
import mongoose from 'mongoose';

// Define the schema for an Application
const applicationSchema = new mongoose.Schema({
  // Reference to the JobPosting this application is for
  jobPosting: {
    type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId
    ref: 'JobPosting', // Refers to the 'JobPosting' model
    required: true // This field is mandatory
  },
  // Email of the worker who applied
  workerEmail: {
    type: String, // Data type is String
    required: true // This field is mandatory
  },
  // Date when the application was submitted
  applicationDate: {
    type: Date, // Data type is Date
    default: Date.now // Default value is the current date and time
  },
  // Status of the application
  status: {
    type: String, // Data type is String
    enum: ['pending', 'viewed', 'interviewing', 'rejected', 'hired'], // Possible values for status
    default: 'pending' // Default value is 'pending'
  }
});

// Create the Mongoose model from the schema
const Application = mongoose.model('Application', applicationSchema);

// Export the Application model
export default Application;
