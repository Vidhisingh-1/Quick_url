import React from "react"

function RateLimitError() {
  return (
    <div className="rate-limit-container">
      <p className="error-text">
        You have hit the request limit. Please try again after 15 minutes.
      </p>
    </div>
  );
}

export default RateLimitError;