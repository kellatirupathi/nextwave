import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import FailureView from './FailureView';
import ListContainer from './ListContainer';
import './App.css'; // Import the CSS file

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchListCreationAPI();
  }, []);

  const fetchListCreationAPI = () => {
    setLoading(true);
    setError(false);

    fetch('https://apis.ccbp.in/list-creation/lists')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch data');
      })
      .then((data) => {
        setLists(data.lists);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };
  
  return (
    <div className="AppContainer"> 
      {loading && <Loader />} {/* Use Loader component */}
      {error && <FailureView onRetry={fetchListCreationAPI} />} {/* Use FailureView component */}
      {!loading && !error && (
        <ListContainer lists={lists} /> 
      )}
    </div>
  );
};

export default App;
