// Import Express framework
import express from 'express';
// Import Mongoose for MongoDB object modeling
import mongoose from 'mongoose';

// Import routers
import jobPostingsRouter from './routes/jobPostings.js'; // Import job postings router
import applicationsRouter from './routes/applications.js'; // Import applications router

// Initialize the Express application
const app = express();
// Define the port the server will listen on
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
// This must be placed before the route handlers
app.use(express.json());

// Use the imported routers
app.use('/api/jobs', jobPostingsRouter); // Use job postings router for paths starting with /api/jobs
app.use('/api/applications', applicationsRouter); // Use applications router for paths starting with /api/applications

// Define the MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/job_app_db';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    // Log success message on successful connection
    console.log('MongoDB connected successfully');
    // Start the server only after successful MongoDB connection
    app.listen(PORT, () => {
      // Log the port the server is running on
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    // Log error message if MongoDB connection fails
    console.error('MongoDB connection error:', err);
    // Exit the process with failure code
    process.exit(1);
  });

// Define a simple GET route for the root URL (optional: can be a health check or API welcome)
app.get('/', (req, res) => {
  // Send a "Hello World" or API status message
  res.send('Job Application Platform API is running.');
});
