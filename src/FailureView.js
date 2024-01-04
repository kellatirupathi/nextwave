import React from 'react';
import PropTypes from 'prop-types';

const FailureView = ({ onRetry }) => {
  return (
    <div className="FailureContainer">
      <p className="FailureMessage">Failed to fetch data</p>
      <button className="RetryButton" onClick={onRetry}>Try Again</button>
    </div>
  );
};

FailureView.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export default FailureView;
