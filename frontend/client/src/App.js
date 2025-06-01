// Import React and useState hook
import React, { useState } from 'react';
// Import custom components
import CompanyView from './views/CompanyView';
import WorkerView from './views/WorkerView';
// Import basic styling
import './App.css';

// Define the main App functional component
function App() {
  // State to manage the current view ('company' or 'worker')
  const [currentView, setCurrentView] = useState('worker'); // Default to worker view

  // JSX for the component's UI
  return (
    <div className="App">
      {/* Header for the application */}
      <header className="App-header">
        <h1>Job Application Platform</h1>
        {/* Navigation buttons to switch views */}
        <nav>
          <button onClick={() => setCurrentView('worker')} disabled={currentView === 'worker'}>
            Worker View (Find Jobs)
          </button>
          <button onClick={() => setCurrentView('company')} disabled={currentView === 'company'}>
            Company View (Post Jobs)
          </button>
        </nav>
      </header>

      {/* Main content area where views are rendered based on currentView state */}
      <main>
        {/* Conditionally render WorkerView if currentView is 'worker' */}
        {currentView === 'worker' && <WorkerView />}
        {/* Conditionally render CompanyView if currentView is 'company' */}
        {currentView === 'company' && <CompanyView />}
      </main>

      {/* Footer (optional) */}
      <footer>
        <p>&copy; 2024 Job App Platform</p>
      </footer>
    </div>
  );
}

// Export the App component
export default App;
